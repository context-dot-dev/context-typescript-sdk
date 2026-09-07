// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource monitors', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.monitors.create({
      name: 'Acme pricing page',
      target: { type: 'page', url: 'https://acme.com/pricing' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.monitors.create({
      name: 'Acme pricing page',
      target: {
        type: 'page',
        url: 'https://acme.com/pricing',
        instructions:
          'Report pricing or plan availability changes. Ignore counters, timestamps, testimonials, and navigation.',
        normalize_whitespace: true,
      },
      change_detection: { type: 'exact' },
      mode: 'web',
      schedule: {
        frequency: 6,
        type: 'interval',
        unit: 'hours',
      },
      tags: ['pricing', 'competitor'],
      webhook: {
        url: 'https://example.com/webhook',
        events: ['change.detected', 'run.completed'],
        retry: { delays_seconds: [10, 60, 300, 1800, 7200, 21600, 57600] },
      },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.monitors.retrieve('mon_123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.monitors.update('mon_123', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.monitors.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitors.list(
        {
          change_detection_type: 'exact',
          cursor: 'cursor',
          limit: 1,
          q: 'pricing',
          search_by: ['name'],
          search_type: 'exact',
          status: 'active',
          tag: 'pricing',
          tags: ['x'],
          target_type: 'page',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.monitors.delete('mon_123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getCreditUsage', async () => {
    const responsePromise = client.monitors.getCreditUsage();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getCreditUsage: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitors.getCreditUsage(
        { since: '2026-06-01T00:00:00Z', until: '2026-06-28T00:00:00Z' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('getLimits', async () => {
    const responsePromise = client.monitors.getLimits();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listAccountChanges', async () => {
    const responsePromise = client.monitors.listAccountChanges();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listAccountChanges: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitors.listAccountChanges(
        {
          change_detection_type: 'exact',
          cursor: 'cursor',
          limit: 1,
          monitor_id: 'mon_123',
          since: '2026-06-01T00:00:00Z',
          tag: 'pricing',
          target_type: 'page',
          until: '2026-06-28T00:00:00Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listAccountRuns', async () => {
    const responsePromise = client.monitors.listAccountRuns();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listAccountRuns: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitors.listAccountRuns(
        {
          cursor: 'cursor',
          limit: 1,
          status: 'queued',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listChanges', async () => {
    const responsePromise = client.monitors.listChanges('mon_123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listChanges: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitors.listChanges(
        'mon_123',
        {
          cursor: 'cursor',
          limit: 1,
          since: '2026-06-01T00:00:00Z',
          tag: 'pricing',
          until: '2026-06-28T00:00:00Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listRuns', async () => {
    const responsePromise = client.monitors.listRuns('mon_123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listRuns: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.monitors.listRuns(
        'mon_123',
        {
          cursor: 'cursor',
          limit: 1,
          status: 'queued',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retrieveChange', async () => {
    const responsePromise = client.monitors.retrieveChange('chg_123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('run', async () => {
    const responsePromise = client.monitors.run('mon_123');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
