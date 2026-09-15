// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource brand', () => {
  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.brand.retrieve({ domain: 'xxx', type: 'by_domain' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.brand.retrieve({
      domain: 'xxx',
      type: 'by_domain',
      force_language: 'afrikaans',
      maxAgeMs: 0,
      maxSpeed: true,
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1000, behavior: 'fail' },
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveSimplified: only required params', async () => {
    const responsePromise = client.brand.retrieveSimplified({ domain: 'xxx' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveSimplified: required and optional params', async () => {
    const response = await client.brand.retrieveSimplified({
      domain: 'xxx',
      maxAgeMs: 0,
      tags: ['production', 'team-alpha'],
      theme: 'light',
      timeoutOpts: { milliseconds: 1000, behavior: 'fail' },
    });
  });

  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.brand.search({ query: 'x' });
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
    const response = await client.brand.search({
      query: 'x',
      autocomplete: true,
      queryBy: ['name'],
      tags: ['production', 'team-alpha'],
      typoTolerance: 0,
    });
  });
});
