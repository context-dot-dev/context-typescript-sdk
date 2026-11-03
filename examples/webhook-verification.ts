#!/usr/bin/env -S npm run tsn -T

import { createHmac } from 'node:crypto';

import ContextDev from 'context.dev';

/**
 * Verify an `X-Context-Signature` header locally, with no network calls.
 *
 * Run with:
 *   yarn tsn -T examples/webhook-verification.ts
 */

async function main() {
  const client = new ContextDev({ apiKey: 'api_key_for_local_verification_only' });

  const secret = 'whsec_example_secret';
  const body = JSON.stringify({
    event: 'change.detected',
    id: 'evt_123',
    created_at: new Date().toISOString(),
    data: { change: { id: 'chg_123' } },
  });

  // Stand in for the header Context.dev sends with each delivery attempt.
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHmac('sha256', secret).update(`${timestamp}.`).update(body).digest('hex');
  const header = `t=${timestamp},v1=${signature}`;

  console.log('valid signature:', await client.webhooks.verifySignature(body, header, secret));

  const tamperedBody = body.replace('chg_123', 'chg_999');
  console.log('tampered payload:', await client.webhooks.verifySignature(tamperedBody, header, secret));

  const event = await client.webhooks.unwrap(body, { 'x-context-signature': header }, secret);
  console.log('event:', event.event, event.id);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
