import ContextDev, { ContextDevError, paginateCursor, paginateNumbered } from 'context.dev';

async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const items: T[] = [];
  for await (const item of iterable) {
    items.push(item);
  }
  return items;
}

type Page = { data: Array<{ id: string }>; next_cursor: string | null };

function cursorPage(ids: string[], nextCursor: string | null): Page {
  return { data: ids.map((id) => ({ id })), next_cursor: nextCursor };
}

describe('paginateCursor', () => {
  test('yields every item and passes cursors in order', async () => {
    const requested: Array<string | undefined> = [];
    const pages: Record<string, Page> = {
      '': cursorPage(['a', 'b'], 'c1'),
      c1: cursorPage(['c'], 'c2'),
      c2: cursorPage(['d'], null),
    };

    const items = await collect(
      paginateCursor(
        async (cursor) => {
          requested.push(cursor);
          return pages[cursor ?? '']!;
        },
        { items: (page) => page.data, nextCursor: (page) => page.next_cursor },
      ),
    );

    expect(items.map((item) => item.id)).toEqual(['a', 'b', 'c', 'd']);
    expect(requested).toEqual([undefined, 'c1', 'c2']);
  });

  test.each([[null], [undefined], ['']])('stops when the next cursor is %p', async (nextCursor) => {
    let calls = 0;
    const items = await collect(
      paginateCursor(
        async () => {
          calls++;
          return { data: [{ id: 'only' }], next_cursor: nextCursor };
        },
        { items: (page) => page.data, nextCursor: (page) => page.next_cursor },
      ),
    );

    expect(items).toHaveLength(1);
    expect(calls).toBe(1);
  });

  test('does not request more pages than maxPages', async () => {
    let calls = 0;
    const items = await collect(
      paginateCursor(
        async () => {
          calls++;
          return { data: [{ id: `item-${calls}` }], next_cursor: `cursor-${calls}` };
        },
        { items: (page) => page.data, nextCursor: (page) => page.next_cursor },
        { maxPages: 2 },
      ),
    );

    expect(calls).toBe(2);
    expect(items.map((item) => item.id)).toEqual(['item-1', 'item-2']);
  });

  test('throws instead of looping when a cursor repeats', async () => {
    await expect(
      collect(
        paginateCursor(async () => ({ data: [], next_cursor: 'same-cursor' }), {
          items: (page) => page.data,
          nextCursor: (page) => page.next_cursor,
        }),
      ),
    ).rejects.toThrow(ContextDevError);
  });

  test('propagates errors from the page fetcher', async () => {
    await expect(
      collect(
        paginateCursor(
          async () => {
            throw new Error('boom');
          },
          { items: (page: Page) => page.data, nextCursor: (page) => page.next_cursor },
        ),
      ),
    ).rejects.toThrow('boom');
  });

  test('stop when the consumer breaks out of the loop', async () => {
    let calls = 0;
    for await (const item of paginateCursor(
      async () => {
        calls++;
        return cursorPage([`item-${calls}`], `cursor-${calls}`);
      },
      { items: (page) => page.data, nextCursor: (page) => page.next_cursor },
    )) {
      expect(item.id).toBe('item-1');
      break;
    }

    expect(calls).toBe(1);
  });

  test('rejects an invalid maxPages', async () => {
    await expect(
      collect(
        paginateCursor(
          async () => cursorPage(['a'], null),
          { items: (page) => page.data, nextCursor: (page) => page.next_cursor },
          { maxPages: 0 },
        ),
      ),
    ).rejects.toThrow(ContextDevError);
  });
});

describe('paginateNumbered', () => {
  type NumberedPage = { data: Array<{ id: string }>; has_more: boolean };

  function page(ids: string[], hasMore: boolean): NumberedPage {
    return { data: ids.map((id) => ({ id })), has_more: hasMore };
  }

  test('follows has_more from page 1 by default', async () => {
    const requested: number[] = [];
    const pages: Record<number, NumberedPage> = {
      1: page(['a'], true),
      2: page(['b'], true),
      3: page(['c'], false),
    };

    const items = await collect(
      paginateNumbered(
        async (pageNumber) => {
          requested.push(pageNumber);
          return pages[pageNumber]!;
        },
        { items: (page) => page.data, hasMore: (page) => page.has_more },
      ),
    );

    expect(items.map((item) => item.id)).toEqual(['a', 'b', 'c']);
    expect(requested).toEqual([1, 2, 3]);
  });

  test('honours startPage', async () => {
    const requested: number[] = [];
    await collect(
      paginateNumbered(
        async (pageNumber) => {
          requested.push(pageNumber);
          return page(['x'], pageNumber < 7);
        },
        { items: (page) => page.data, hasMore: (page) => page.has_more },
        { startPage: 5, maxPages: 2 },
      ),
    );

    expect(requested).toEqual([5, 6]);
  });

  test('stops when a page claims more results but is empty', async () => {
    let calls = 0;
    const items = await collect(
      paginateNumbered(
        async () => {
          calls++;
          return page([], true);
        },
        { items: (page) => page.data, hasMore: (page) => page.has_more },
      ),
    );

    expect(items).toEqual([]);
    expect(calls).toBe(1);
  });

  test('rejects an invalid startPage', async () => {
    await expect(
      collect(
        paginateNumbered(
          async () => page(['a'], false),
          { items: (page) => page.data, hasMore: (page) => page.has_more },
          { startPage: 0 },
        ),
      ),
    ).rejects.toThrow(ContextDevError);
  });
});

describe('resource auto-pagination', () => {
  interface Recorded {
    url: string;
    method: string;
    body: unknown;
  }

  function mockClient(pages: unknown[]): { client: ContextDev; requests: Recorded[] } {
    const requests: Recorded[] = [];
    let index = 0;

    const client = new ContextDev({
      apiKey: 'My API Key',
      baseURL: 'https://api.test/v1',
      maxRetries: 0,
      fetch: async (url: any, init: any) => {
        requests.push({
          url: String(url),
          method: String(init?.method ?? 'GET'),
          body: typeof init?.body === 'string' ? JSON.parse(init.body) : undefined,
        });

        const page = pages[index++];
        if (page === undefined) throw new Error(`Unexpected request #${index} to ${url}`);

        return new Response(JSON.stringify(page), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      },
    });

    return { client, requests };
  }

  test('client.monitors.listAutoPaging follows next_cursor', async () => {
    const { client, requests } = mockClient([
      { data: [{ id: 'mon_1' }, { id: 'mon_2' }], has_more: true, next_cursor: 'c1', request_id: 'r' },
      { data: [{ id: 'mon_3' }], has_more: false, next_cursor: null, request_id: 'r' },
    ]);

    const monitors = await collect(client.monitors.listAutoPaging({ status: 'active' }));

    expect(monitors.map((monitor) => monitor.id)).toEqual(['mon_1', 'mon_2', 'mon_3']);
    expect(requests).toHaveLength(2);
    expect(requests[0]!.url).toContain('/v1/monitors?');
    expect(requests[0]!.url).toContain('status=active');
    expect(requests[1]!.url).toContain('cursor=c1');
  });

  test('client.monitors.listAutoPaging honours maxPages', async () => {
    const { client, requests } = mockClient([
      { data: [{ id: 'mon_1' }], has_more: true, next_cursor: 'c1', request_id: 'r' },
    ]);

    const monitors = await collect(client.monitors.listAutoPaging({}, { maxPages: 1 }));

    expect(monitors.map((monitor) => monitor.id)).toEqual(['mon_1']);
    expect(requests).toHaveLength(1);
  });

  test.each([
    [
      'listAccountChangesAutoPaging',
      (client: ContextDev) => client.monitors.listAccountChangesAutoPaging(),
      '/v1/monitors/changes',
    ],
    [
      'listAccountRunsAutoPaging',
      (client: ContextDev) => client.monitors.listAccountRunsAutoPaging(),
      '/v1/monitors/runs',
    ],
    [
      'listChangesAutoPaging',
      (client: ContextDev) => client.monitors.listChangesAutoPaging('mon_1'),
      '/v1/monitors/mon_1/changes',
    ],
    [
      'listRunsAutoPaging',
      (client: ContextDev) => client.monitors.listRunsAutoPaging('mon_1'),
      '/v1/monitors/mon_1/runs',
    ],
    [
      'deliveries.listAttemptsAutoPaging',
      (client: ContextDev) => client.webhooks.deliveries.listAttemptsAutoPaging('whd_1'),
      '/v1/webhooks/deliveries/whd_1/attempts',
    ],
    [
      'browser.profiles.listAutoPaging',
      (client: ContextDev) => client.browser.profiles.listAutoPaging(),
      '/v1/org/browser/profiles',
    ],
  ] as const)('%s yields the page items', async (_, iterate, expectedPath) => {
    const { client, requests } = mockClient([
      { data: [{ id: 'item_1' }], has_more: false, next_cursor: null, request_id: 'r' },
    ]);

    const items = await collect(iterate(client) as AsyncIterable<{ id: string }>);

    expect(items.map((item) => item.id)).toEqual(['item_1']);
    expect(requests[0]!.url).toContain(expectedPath);
  });
});

describe('POST-body auto-pagination endpoints', () => {
  function mockClient(pages: unknown[]): {
    client: ContextDev;
    requests: Array<{ url: string; body: unknown }>;
  } {
    const requests: Array<{ url: string; body: unknown }> = [];
    let index = 0;

    const client = new ContextDev({
      apiKey: 'My API Key',
      baseURL: 'https://api.test/v1',
      maxRetries: 0,
      fetch: async (url: any, init: any) => {
        requests.push({
          url: String(url),
          body: typeof init?.body === 'string' ? JSON.parse(init.body) : undefined,
        });

        const page = pages[index++];
        if (page === undefined) throw new Error(`Unexpected request #${index}`);

        return new Response(JSON.stringify(page), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      },
    });

    return { client, requests };
  }

  test('client.webhooks.deliveries.listAutoPaging sends the cursor in the body', async () => {
    const { client, requests } = mockClient([
      { data: [{ id: 'whd_1' }], has_more: true, next_cursor: 'd1', request_id: 'r' },
      { data: [{ id: 'whd_2' }], has_more: false, next_cursor: null, request_id: 'r' },
    ]);

    const deliveries = await collect(client.webhooks.deliveries.listAutoPaging({ type: 'batch' }));

    expect(deliveries.map((delivery) => delivery.id)).toEqual(['whd_1', 'whd_2']);
    expect(requests.map((request) => request.body)).toEqual([
      { type: 'batch' },
      { type: 'batch', cursor: 'd1' },
    ]);
  });

  test('client.batch.getResultsAutoPaging follows next_cursor', async () => {
    const { client, requests } = mockClient([
      {
        data: [{ status: 'ok', url: 'https://a.test', credits_used: 1, result: {} }],
        has_more: true,
        next_cursor: 'b2',
        request_id: 'r',
      },
      {
        data: [{ status: 'error', url: 'https://b.test', credits_used: 1, result: {} }],
        has_more: false,
        next_cursor: null,
        request_id: 'r',
      },
    ]);

    const records = await collect(client.batch.getResultsAutoPaging('batch_1', { limit: 1 }));

    expect(records.map((record) => record.status)).toEqual(['ok', 'error']);
    expect(requests[0]!.url).toContain('/v1/batch/batch_1/results');
    expect(requests[0]!.url).toContain('limit=1');
    expect(requests[1]!.url).toContain('cursor=b2');
  });

  test('client.news.searchAutoPaging follows next_cursor', async () => {
    const { client, requests } = mockClient([
      { data: [{ id: 'news_1' }], has_more: true, next_cursor: 'n1', request_id: 'r', meta: {} },
      { data: [{ id: 'news_2' }], has_more: false, next_cursor: null, request_id: 'r', meta: {} },
    ]);

    const articles = await collect(
      client.news.searchAutoPaging({
        searchBy: { type: 'entity', entity: { type: 'domain', domain: 'stripe.com' } },
      }),
    );

    expect(articles.map((article) => article.id)).toEqual(['news_1', 'news_2']);
    expect(requests[1]!.body).toMatchObject({ cursor: 'n1' });
  });

  test('client.people.searchAutoPaging follows next_cursor', async () => {
    const { client, requests } = mockClient([
      { request_id: 'r', results: [{ name: 'Ada' }], next_cursor: 'p1' },
      { request_id: 'r', results: [{ name: 'Grace' }], next_cursor: null },
    ]);

    const people = await collect(client.people.searchAutoPaging({ query: 'engineers' }));

    expect(people.map((person) => person.name)).toEqual(['Ada', 'Grace']);
    expect(requests[1]!.body).toMatchObject({ query: 'engineers', cursor: 'p1' });
  });
});

describe('page-numbered endpoint auto-pagination', () => {
  function mockClient(pages: unknown[]): { client: ContextDev; urls: string[] } {
    const urls: string[] = [];
    let index = 0;

    const client = new ContextDev({
      apiKey: 'My API Key',
      baseURL: 'https://api.test/v1',
      maxRetries: 0,
      fetch: async (url: any) => {
        urls.push(String(url));

        const page = pages[index++];
        if (page === undefined) throw new Error(`Unexpected request #${index} to ${url}`);

        return new Response(JSON.stringify(page), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      },
    });

    return { client, urls };
  }

  test('client.logs.listAutoPaging walks page numbers while has_more is set', async () => {
    const { client, urls } = mockClient([
      { data: [{ request_id: 'log_1' }], has_more: true, limit: 1, page: 1, request_id: 'r' },
      { data: [{ request_id: 'log_2' }], has_more: false, limit: 1, page: 2, request_id: 'r' },
    ]);

    const entries = await collect(client.logs.listAutoPaging({ errors_only: true, limit: 1 }));

    expect(entries.map((entry) => entry.request_id)).toEqual(['log_1', 'log_2']);
    expect(urls[0]).toContain('page=1');
    expect(urls[1]).toContain('page=2');
  });

  test('client.logs.listAutoPaging starts at the requested page', async () => {
    const { client, urls } = mockClient([
      { data: [{ request_id: 'log_9' }], has_more: false, limit: 1, page: 9, request_id: 'r' },
    ]);

    const entries = await collect(client.logs.listAutoPaging({ page: 9 }));

    expect(entries).toHaveLength(1);
    expect(urls[0]).toContain('page=9');
  });

  test('client.logs.listAutoPaging honours maxPages', async () => {
    const { client, urls } = mockClient([
      { data: [{ request_id: 'log_1' }], has_more: true, limit: 1, page: 1, request_id: 'r' },
    ]);

    const entries = await collect(client.logs.listAutoPaging({}, { maxPages: 1 }));

    expect(entries).toHaveLength(1);
    expect(urls).toHaveLength(1);
  });
});
