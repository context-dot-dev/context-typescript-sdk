// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource scholar', () => {
  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.scholar.search({ query: 'CRISPR off-target effects in human cells' });
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
    const response = await client.scholar.search({
      query: 'CRISPR off-target effects in human cells',
      cursor: 'cursor',
      filterBy: { date: { from: 0, to: 0 } },
      limit: 1,
      sort: 'relevance',
      tags: ['production', 'team-alpha'],
    });
  });
});
