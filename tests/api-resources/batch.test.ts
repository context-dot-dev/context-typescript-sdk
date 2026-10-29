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
          shouldIncludeUnified: true,
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
        { cursor: '321669910225:155771193', limit: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('submit: only required params', async () => {
    const responsePromise = client.batch.submit({
      input: {
        data: {
          formats: {},
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
          formats: {
            bytes: true,
            highlights: true,
            html: true,
            images: true,
            json: true,
            markdown: true,
            parse: true,
            product: true,
            screenshot: true,
          },
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
          highlightsParams: { query: 'x', maxCharacters: 100 },
          imageParams: { dedupe: 'none', enrich: ['dimensions'] },
          jsonParams: {
            schema: {
              type: 'bar',
              properties: 'bar',
              required: 'bar',
              additionalProperties: 'bar',
            },
            instructions: 'instructions',
          },
          markdownParams: {
            includeImages: true,
            includeLinks: true,
            inlineImages: 'placeholder',
            sourcePreference: ['html-conversion'],
          },
          maxAgeMs: 0,
          parseParams: {
            rules: {
              title: 'h1',
              links: {
                selector: 'a',
                output: '@href',
                type: 'list',
              },
            },
            type: 'custom',
          },
          productParams: { dedupeImages: true, useAIFallback: true },
          screenshotParams: { area: 'viewport', format: 'png' },
          sharedParams: {
            actions: [{ action: 'Click the product details tab', type: 'perform' }],
            country: 'US',
            dismissCookies: true,
            dismissPopups: true,
            excludeSelectors: ['P'],
            headers: { 'Accept-Language': 'en-US' },
            includeFrames: true,
            includeSelectors: ['P'],
            mainContentOnly: true,
            parsers: {
              pdf: {
                endPage: 1,
                includeNumberedPages: true,
                ocr: 'off',
                startPage: 1,
              },
            },
            profile: { profileId: 'prof_210b9798eb53baa4e69d31c1071cf03d', type: 'existing' },
            settleAnimations: true,
            theme: 'light',
            viewport: { height: 240, width: 240 },
            waitFor: 500,
          },
          tags: ['production', 'team-alpha'],
          timeoutOpts: { milliseconds: 1, behavior: 'fail' },
          zdr: 'disabled',
        },
        mode: 'scrape',
      },
      policies: ['pol_3f9c2a7e5b8d4c1f9a6e0b2d7c4f8a1e'],
      tags: ['docs', 'competitor'],
      webhook: {
        url: 'https://example.com',
        retry: { delays_seconds: [10, 60, 300, 1800, 7200, 21600, 57600] },
      },
      webhookUrl: 'https://example.com',
      'Idempotency-Key': 'Idempotency-Key',
    });
  });
});
