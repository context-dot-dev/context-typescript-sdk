// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource deliveries', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.webhooks.deliveries.retrieve('whd_210b9798eb53baa4e69d31c1071cf03d');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.webhooks.deliveries.retrieve(
        'whd_210b9798eb53baa4e69d31c1071cf03d',
        { tags: ['production', 'team-alpha'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.webhooks.deliveries.list({ type: 'batch' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: required and optional params', async () => {
    const response = await client.webhooks.deliveries.list({
      type: 'batch',
      batch_id: 'batch_id',
      created_after: '2026-09-01T00:00:00Z',
      cursor: 'whd_210b9798eb53baa4e69d31c1071cf03d',
      limit: 1,
      status: 'pending',
      tags: ['production', 'team-alpha'],
    });
  });

  // Mock server tests are disabled
  test.skip('listAttempts', async () => {
    const responsePromise = client.webhooks.deliveries.listAttempts('whd_210b9798eb53baa4e69d31c1071cf03d');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listAttempts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.webhooks.deliveries.listAttempts(
        'whd_210b9798eb53baa4e69d31c1071cf03d',
        {
          cursor: 'wha_210b9798eb53baa4e69d31c1071cf03d',
          limit: 1,
          tags: ['production', 'team-alpha'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('retry', async () => {
    const responsePromise = client.webhooks.deliveries.retry('whd_210b9798eb53baa4e69d31c1071cf03d');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retry: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.webhooks.deliveries.retry(
        'whd_210b9798eb53baa4e69d31c1071cf03d',
        {
          force: true,
          tags: ['production', 'team-alpha'],
          'Idempotency-Key': 'Idempotency-Key',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });
});
