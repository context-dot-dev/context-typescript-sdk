// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource news', () => {
  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.news.search({
      searchBy: {
        entity: { domain: 'stripe.com', type: 'domain' },
        type: 'entity',
      },
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
  test.skip('search: required and optional params', async () => {
    const response = await client.news.search({
      searchBy: {
        entity: { domain: 'stripe.com', type: 'domain' },
        type: 'entity',
      },
      cursor: 'cursor',
      filterBy: {
        articleLanguage: ['ar'],
        articleType: ['editorial'],
        date: { from: 0, to: 0 },
        sourceCountry: ['ae'],
        sourceDomain: ['x'],
      },
      limit: 1,
      sortBy: { type: 'relevance' },
      tags: ['production', 'team-alpha'],
    });
  });
});
