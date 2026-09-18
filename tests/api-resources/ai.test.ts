// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource ai', () => {
  // Mock server tests are disabled
  test.skip('extractProduct: only required params', async () => {
    const responsePromise = client.ai.extractProduct({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractProduct: required and optional params', async () => {
    const response = await client.ai.extractProduct({
      url: 'https://example.com',
      maxAgeMs: 0,
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1000, behavior: 'fail' },
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('extractProducts: only required params', async () => {
    const responsePromise = client.ai.extractProducts({ domain: 'domain' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractProducts: required and optional params', async () => {
    const response = await client.ai.extractProducts({
      domain: 'domain',
      maxAgeMs: 0,
      maxProducts: 1,
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1000, behavior: 'fail' },
    });
  });
});
