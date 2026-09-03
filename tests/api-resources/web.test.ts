// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource web', () => {
  // Mock server tests are disabled
  test.skip('extract: only required params', async () => {
    const responsePromise = client.web.extract({
      schema: {
        type: 'bar',
        properties: 'bar',
        required: 'bar',
        additionalProperties: 'bar',
      },
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
  test.skip('extract: required and optional params', async () => {
    const response = await client.web.extract({
      schema: {
        type: 'bar',
        properties: 'bar',
        required: 'bar',
        additionalProperties: 'bar',
      },
      url: 'https://example.com',
      actions: [{ do: 'wait', timeMs: 0 }],
      factCheck: true,
      followSubdomains: true,
      includeFrames: true,
      instructions: 'instructions',
      maxAgeMs: 0,
      maxDepth: 0,
      maxPages: 1,
      pdf: {
        end: 1,
        shouldParse: true,
        start: 1,
      },
      settleAnimations: true,
      stopAfterMs: 10000,
      tags: ['production', 'team-alpha'],
      timeoutMS: 1000,
      waitForMs: 0,
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
      timeoutMS: 1000,
    });
  });

  // Mock server tests are disabled
  test.skip('extractFonts', async () => {
    const responsePromise = client.web.extractFonts();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractFonts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.web.extractFonts(
        {
          directUrl: 'https://example.com',
          domain: 'xxx',
          maxAgeMs: 0,
          tags: ['production', 'team-alpha'],
          timeoutMS: 1000,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
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
          timeoutMS: 1000,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
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
          maxAgeMs: 0,
          page: 'login',
          scrollOffset: 0,
          tags: ['production', 'team-alpha'],
          timeoutMS: 1,
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
        timeoutMS: 1000,
        useMainContentOnly: true,
        waitForMs: 0,
      },
      numResults: 10,
      queryFanout: true,
      tags: ['production', 'team-alpha'],
      timeoutMS: 1000,
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
      timeoutMS: 1000,
      urlRegex: '^https?://[^/]+/blog/',
      useMainContentOnly: true,
      waitForMs: 0,
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('webScrapeHTML: only required params', async () => {
    const responsePromise = client.web.webScrapeHTML({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webScrapeHTML: required and optional params', async () => {
    const response = await client.web.webScrapeHTML({
      url: 'https://example.com',
      actions: [{ do: 'wait', timeMs: 0 }],
      country: 'de',
      excludeSelectors: ['x'],
      headers: { foo: 'J!' },
      includeFrames: true,
      includeSelectors: ['x'],
      maxAgeMs: 0,
      pdf: {
        end: 1,
        ocr: true,
        shouldParse: true,
        start: 1,
      },
      settleAnimations: true,
      tags: ['production', 'team-alpha'],
      timeoutMS: 1,
      useMainContentOnly: true,
      waitForMs: 0,
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('webScrapeImages: only required params', async () => {
    const responsePromise = client.web.webScrapeImages({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webScrapeImages: required and optional params', async () => {
    const response = await client.web.webScrapeImages({
      url: 'https://example.com',
      actions: [{ do: 'wait', timeMs: 0 }],
      dedupe: true,
      enrichment: {
        classification: true,
        hostedUrl: true,
        maxTimePerMs: 1,
        resolution: true,
      },
      headers: { foo: 'J!' },
      maxAgeMs: 0,
      tags: ['production', 'team-alpha'],
      timeoutMS: 1,
      waitForMs: 0,
    });
  });

  // Mock server tests are disabled
  test.skip('webScrapeMd: only required params', async () => {
    const responsePromise = client.web.webScrapeMd({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webScrapeMd: required and optional params', async () => {
    const response = await client.web.webScrapeMd({
      url: 'https://example.com',
      actions: [{ do: 'wait', timeMs: 0 }],
      country: 'de',
      excludeSelectors: ['x'],
      headers: { foo: 'J!' },
      includeFrames: true,
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
      tags: ['production', 'team-alpha'],
      timeoutMS: 1,
      useMainContentOnly: true,
      waitForMs: 0,
      zdr: 'enabled',
    });
  });

  // Mock server tests are disabled
  test.skip('webScrapeSitemap: only required params', async () => {
    const responsePromise = client.web.webScrapeSitemap({ domain: 'xxx' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webScrapeSitemap: required and optional params', async () => {
    const response = await client.web.webScrapeSitemap({
      domain: 'xxx',
      headers: { foo: 'J!' },
      includeSubdomains: true,
      maxLinks: 1,
      search: 'help center and troubleshooting articles',
      sitemapUrl: 'https://example.com',
      tags: ['production', 'team-alpha'],
      timeoutMS: 1,
      urlRegex: '^https?://[^/]+/blog/',
      zdr: 'enabled',
    });
  });
});
