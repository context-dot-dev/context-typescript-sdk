// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource web', () => {
  // Mock server tests are disabled
  test.skip('answers: only required params', async () => {
    const responsePromise = client.web.answers({
      task: 'Find the pricing page URL and plan names for context.dev.',
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
  test.skip('answers: required and optional params', async () => {
    const response = await client.web.answers({
      task: 'Find the pricing page URL and plan names for context.dev.',
      json_format: { pricing_page_url: 'bar', plans: 'bar' },
      mode: 'fast',
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1000, behavior: 'fail' },
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('extractCompetitors: only required params', async () => {
    const responsePromise = client.web.extractCompetitors({ domain: 'xxx' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractCompetitors: required and optional params', async () => {
    const response = await client.web.extractCompetitors({
      domain: 'xxx',
      numCompetitors: 1,
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1000, behavior: 'fail' },
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('extractStyleguide', async () => {
    const responsePromise = client.web.extractStyleguide();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractStyleguide: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.web.extractStyleguide(
        {
          colorScheme: 'light',
          directUrl: 'https://example.com',
          domain: 'xxx',
          maxAgeMs: 0,
          tags: ['production', 'team-alpha'],
          timeoutOpts: { milliseconds: 1, behavior: 'fail' },
          zdr: 'enabled',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('mapUrls: only required params', async () => {
    const responsePromise = client.web.mapUrls({ domain: 'xxx' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('mapUrls: required and optional params', async () => {
    const response = await client.web.mapUrls({
      domain: 'xxx',
      headers: { foo: 'J!' },
      includeSubdomains: true,
      maxLinks: 1,
      search: 'help center and troubleshooting articles',
      sitemapUrl: 'https://example.com',
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1, behavior: 'fail' },
      urlRegex: '^https?://[^/]+/blog/',
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('scrape: only required params', async () => {
    const responsePromise = client.web.scrape({
      formats: {},
      url: 'https://example.com',
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
  test.skip('scrape: required and optional params', async () => {
    const response = await client.web.scrape({
      formats: {
        bytes: true,
        html: true,
        images: true,
        json: true,
        markdown: true,
        parse: true,
        screenshot: true,
      },
      url: 'https://example.com',
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
      },
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
            ocr: 'off',
            startPage: 1,
          },
        },
        settleAnimations: true,
        theme: 'light',
        viewport: { height: 240, width: 240 },
        waitFor: 500,
      },
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1, behavior: 'fail' },
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('screenshot', async () => {
    const responsePromise = client.web.screenshot();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('screenshot: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.web.screenshot(
        {
          clearPopups: true,
          colorScheme: 'light',
          country: 'de',
          directUrl: 'https://example.com',
          domain: 'xxx',
          fullScreenshot: 'true',
          handleCookiePopup: true,
          headers: { foo: 'J!' },
          maxAgeMs: 0,
          page: 'login',
          scrollOffset: 0,
          tags: ['production', 'team-alpha'],
          timeoutOpts: { milliseconds: 1, behavior: 'fail' },
          viewport: { height: 240, width: 240 },
          waitForMs: 0,
          zdr: 'enabled',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.web.search({ query: 'x' });
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
    const response = await client.web.search({
      query: 'x',
      country: 'af',
      excludeDomains: ['string'],
      freshness: 'last_24_hours',
      includeDomains: ['string'],
      markdownOptions: {
        enabled: true,
        includeFrames: true,
        includeImages: true,
        includeLinks: true,
        maxAgeMs: 0,
        pdf: {
          end: 1,
          shouldParse: true,
          start: 1,
        },
        shortenBase64Images: true,
        timeoutOpts: { milliseconds: 1, behavior: 'fail' },
        useMainContentOnly: true,
        waitForMs: 0,
      },
      numResults: 10,
      queryFanout: true,
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1000, behavior: 'fail' },
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('webCrawlMd: only required params', async () => {
    const responsePromise = client.web.webCrawlMd({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webCrawlMd: required and optional params', async () => {
    const response = await client.web.webCrawlMd({
      url: 'https://example.com',
      country: 'de',
      excludeSelectors: ['string'],
      followSubdomains: true,
      includeFrames: true,
      includeImages: true,
      includeLinks: true,
      includeSelectors: ['string'],
      maxAgeMs: 0,
      maxDepth: 0,
      maxPages: 1,
      pdf: {
        end: 1,
        ocr: true,
        shouldParse: true,
        start: 1,
      },
      settleAnimations: true,
      shortenBase64Images: true,
      stopAfterMs: 10000,
      tags: ['production', 'team-alpha'],
      timeoutOpts: { milliseconds: 1000, behavior: 'fail' },
      urlRegex: '^https?://[^/]+/blog/',
      useMainContentOnly: true,
      waitForMs: 0,
      zdr: 'enabled',
    });
  });
});
