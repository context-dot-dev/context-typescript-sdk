// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource feedback', () => {
  // Mock server tests are disabled
  test.skip('submit: only required params', async () => {
    const responsePromise = client.feedback.submit({
      category: 'bug',
      note: 'Markdown drops the plan comparison table; expected all 4 rows.',
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
    const response = await client.feedback.submit({
      category: 'bug',
      note: 'Markdown drops the plan comparison table; expected all 4 rows.',
      request_id: '3f1c2a6e-8b4d-4c1e-9f0a-2d7b5e6c8a91',
      tags: ['production', 'team-alpha'],
      url: 'https://stripe.com/pricing',
    });
  });
});
