// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource batch', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.batch.retrieve('batch_9f2c8a');
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
    const responsePromise = client.batch.list();
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
      client.batch.list(
        {
          cursor: 'cursor',
          limit: 1,
          q: 'batch_1a2b',
          search_type: 'exact',
          status: 'queued',
          tags: 'docs,competitor',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.batch.delete('batch_9f2c8a');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('cancel', async () => {
    const responsePromise = client.batch.cancel('batch_9f2c8a');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getResults', async () => {
    const responsePromise = client.batch.getResults('batch_9f2c8a');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getResults: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.batch.getResults(
        'batch_9f2c8a',
        { cursor: 'cursor', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('submit: only required params', async () => {
    const responsePromise = client.batch.submit({
      input: {
        data: {
          format: 'markdown',
          urls: [
            { url: 'https://example.com/products/anvil' },
            { url: 'https://example.com/products/hammer' },
          ],
        },
        mode: 'scrape',
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
  test.skip('submit: required and optional params', async () => {
    const response = await client.batch.submit({
      input: {
        data: {
          format: 'markdown',
          urls: [
            {
              url: 'https://example.com/products/anvil',
              itemId: 'sku-1',
              meta: { category: 'bar' },
            },
            {
              url: 'https://example.com/products/hammer',
              itemId: 'sku-2',
              meta: { foo: 'bar' },
            },
          ],
          options: {
            country: 'de',
            excludeSelectors: ['x'],
            includeHTML: true,
            includeImages: true,
            includeLinks: true,
            includeSelectors: ['x'],
            maxAgeMs: 0,
            pdf: {
              end: 1,
              ocr: true,
              shouldParse: true,
              start: 1,
            },
            settleAnimations: true,
            shortenBase64Images: true,
            useMainContentOnly: true,
            waitForMs: 0,
          },
        },
        mode: 'scrape',
      },
      tags: ['docs', 'competitor'],
      webhook: {
        url: 'https://example.com',
        retry: { delays_seconds: [10, 60, 300, 1800, 7200, 21600, 57600] },
      },
      webhookUrl: 'webhookUrl',
      'Idempotency-Key': 'Idempotency-Key',
    });
  });
});
