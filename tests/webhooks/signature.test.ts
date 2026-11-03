import { createHmac, randomBytes } from 'node:crypto';

import ContextDev, {
  constructWebhookEvent,
  computeWebhookSignature,
  ContextDevError,
  DEFAULT_WEBHOOK_TOLERANCE_IN_SECONDS,
  getWebhookSignatureHeader,
  parseSignatureHeader,
  verifyWebhookSignature,
  WEBHOOK_SIGNATURE_HEADER,
  WEBHOOK_SECRET_ENV_VAR,
} from 'context.dev';

const SECRET = 'whsec_test_2f7c1d0b4a';

/** Independent implementation of the documented signing scheme, used to cross-check the SDK. */
function sign(secret: string, timestamp: string | number, body: string | Uint8Array): string {
  return createHmac('sha256', secret).update(`${timestamp}.`).update(body).digest('hex');
}

function headerFor(timestamp: string | number, ...signatures: string[]): string {
  return [`t=${timestamp}`, ...signatures.map((signature) => `v1=${signature}`)].join(',');
}

const NOW = 1_765_000_000_000; // fixed clock: 2025-12-05T23:33:20Z
const NOW_SECONDS = NOW / 1000;

const BODY = JSON.stringify({
  event: 'change.detected',
  id: 'evt_123',
  created_at: '2025-12-05T23:00:00Z',
  data: { change: { id: 'chg_123' } },
});

const client = new ContextDev({ apiKey: 'My API Key' });

beforeAll(() => {
  const globalCrypto = (globalThis as { crypto?: { subtle?: unknown } }).crypto;
  if (!globalCrypto?.subtle) {
    // Some test environments do not expose the Web Crypto API as a global.
    (globalThis as { crypto?: unknown }).crypto = (
      require('node:crypto') as typeof import('node:crypto')
    ).webcrypto;
  }
});

describe('computeWebhookSignature', () => {
  test('matches an independent HMAC-SHA256 implementation', async () => {
    const timestamp = `${NOW_SECONDS}`;
    await expect(computeWebhookSignature({ secret: SECRET, timestamp, payload: BODY })).resolves.toBe(
      sign(SECRET, timestamp, BODY),
    );
  });

  test('accepts a numeric timestamp', async () => {
    await expect(
      computeWebhookSignature({ secret: SECRET, timestamp: NOW_SECONDS, payload: BODY }),
    ).resolves.toBe(sign(SECRET, NOW_SECONDS, BODY));
  });

  test('handles non-ASCII payloads and byte payloads identically', async () => {
    const body = JSON.stringify({ event: 'run.completed', data: { note: 'héllo — ✓' } });
    const bytes = new TextEncoder().encode(body);
    const timestamp = `${NOW_SECONDS}`;

    const expected = sign(SECRET, timestamp, Buffer.from(body, 'utf-8'));
    await expect(computeWebhookSignature({ secret: SECRET, timestamp, payload: body })).resolves.toBe(
      expected,
    );
    await expect(computeWebhookSignature({ secret: SECRET, timestamp, payload: bytes })).resolves.toBe(
      expected,
    );
    await expect(
      computeWebhookSignature({
        secret: SECRET,
        timestamp,
        payload: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
      }),
    ).resolves.toBe(expected);
  });

  test('handles an empty body', async () => {
    await expect(computeWebhookSignature({ secret: SECRET, timestamp: 1, payload: '' })).resolves.toBe(
      sign(SECRET, 1, ''),
    );
  });

  test('matches an independent implementation across randomized inputs', async () => {
    for (let i = 0; i < 25; i++) {
      const secret = randomBytes(1 + (i % 32)).toString('base64');
      const timestamp = `${1_700_000_000 + i * 977}`;
      const payload = randomBytes(i * 7).toString('utf-8');

      await expect(computeWebhookSignature({ secret, timestamp, payload })).resolves.toBe(
        sign(secret, timestamp, Buffer.from(payload, 'utf-8')),
      );
    }
  });
});

describe('parseSignatureHeader', () => {
  test('parses a timestamp and signature', () => {
    expect(parseSignatureHeader(headerFor(1234, 'a'.repeat(64)))).toEqual({
      timestamp: '1234',
      signatures: ['a'.repeat(64)],
    });
  });

  test('keeps the timestamp exactly as sent', () => {
    expect(parseSignatureHeader('t=001234,v1=' + 'b'.repeat(64)).timestamp).toEqual('001234');
  });

  test('tolerates whitespace, unknown schemes, and repeated v1 values', () => {
    const parsed = parseSignatureHeader(
      `  t=99 , v0=${'c'.repeat(64)} , v1=${'d'.repeat(64)},v1=${'e'.repeat(64)}  `,
    );
    expect(parsed.timestamp).toEqual('99');
    expect(parsed.signatures).toEqual(['d'.repeat(64), 'e'.repeat(64)]);
  });

  test.each([[''], ['   '], ['v1=' + 'a'.repeat(64)], ['t=123'], ['nonsense']])('rejects %p', (header) => {
    expect(() => parseSignatureHeader(header)).toThrow(ContextDevError);
  });
});

describe('verifyWebhookSignature', () => {
  const timestamp = `${NOW_SECONDS}`;
  const signature = sign(SECRET, timestamp, BODY);

  test('accepts a correctly signed payload', async () => {
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(timestamp, signature),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(true);
  });

  test('accepts uppercase hex signatures', async () => {
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(timestamp, signature.toUpperCase()),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(true);
  });

  test('accepts a signature when only one of several v1 values matches', async () => {
    const stale = sign('a-different-secret', timestamp, BODY);
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(timestamp, stale, signature),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(true);
  });

  test('rejects a modified payload', async () => {
    const tampered = BODY.replace('chg_123', 'chg_999');
    await expect(
      verifyWebhookSignature({
        payload: tampered,
        signature: headerFor(timestamp, signature),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(false);
  });

  test('rejects a signature created with a different secret', async () => {
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(timestamp, sign('another-secret', timestamp, BODY)),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(false);
  });

  test('rejects a signature replayed under a different timestamp', async () => {
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(NOW_SECONDS + 1, signature),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(false);
  });

  test('rejects stale and far-future timestamps', async () => {
    const staleTimestamp = `${NOW_SECONDS - DEFAULT_WEBHOOK_TOLERANCE_IN_SECONDS - 1}`;
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(staleTimestamp, sign(SECRET, staleTimestamp, BODY)),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(false);

    const futureTimestamp = `${NOW_SECONDS + DEFAULT_WEBHOOK_TOLERANCE_IN_SECONDS + 1}`;
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(futureTimestamp, sign(SECRET, futureTimestamp, BODY)),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(false);
  });

  test('accepts a timestamp exactly at the tolerance boundary', async () => {
    const boundary = `${NOW_SECONDS - DEFAULT_WEBHOOK_TOLERANCE_IN_SECONDS}`;
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(boundary, sign(SECRET, boundary, BODY)),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toBe(true);
  });

  test('honours a custom tolerance', async () => {
    const old = `${NOW_SECONDS - 30}`;
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(old, sign(SECRET, old, BODY)),
        secret: SECRET,
        toleranceInSeconds: 10,
        now: () => NOW,
      }),
    ).resolves.toBe(false);
  });

  test('can skip the timestamp check', async () => {
    const old = `${NOW_SECONDS - 86_400}`;
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(old, sign(SECRET, old, BODY)),
        secret: SECRET,
        toleranceInSeconds: null,
        now: () => NOW,
      }),
    ).resolves.toBe(true);
  });

  test.each([
    ['an empty header', ''],
    ['a missing timestamp', `v1=${signature}`],
    ['a missing signature', `t=${timestamp}`],
    ['a non-numeric timestamp', headerFor(`${timestamp}.5`, signature)],
    ['a non-hex signature', headerFor(timestamp, 'z'.repeat(64))],
    ['a truncated signature', headerFor(timestamp, signature.slice(0, 32))],
  ])('returns false for %s', async (_, header) => {
    await expect(
      verifyWebhookSignature({ payload: BODY, signature: header, secret: SECRET, now: () => NOW }),
    ).resolves.toBe(false);
  });

  test('falls back to the environment variable for the secret', async () => {
    const previous = process.env[WEBHOOK_SECRET_ENV_VAR];
    process.env[WEBHOOK_SECRET_ENV_VAR] = SECRET;
    try {
      await expect(
        verifyWebhookSignature({
          payload: BODY,
          signature: headerFor(timestamp, signature),
          now: () => NOW,
        }),
      ).resolves.toBe(true);
    } finally {
      if (previous === undefined) {
        delete process.env[WEBHOOK_SECRET_ENV_VAR];
      } else {
        process.env[WEBHOOK_SECRET_ENV_VAR] = previous;
      }
    }
  });

  test('throws when no secret is available', async () => {
    const previous = process.env[WEBHOOK_SECRET_ENV_VAR];
    delete process.env[WEBHOOK_SECRET_ENV_VAR];
    try {
      await expect(
        verifyWebhookSignature({
          payload: BODY,
          signature: headerFor(timestamp, signature),
          now: () => NOW,
        }),
      ).rejects.toThrow(ContextDevError);
    } finally {
      if (previous !== undefined) process.env[WEBHOOK_SECRET_ENV_VAR] = previous;
    }
  });

  test('throws for a negative tolerance', async () => {
    await expect(
      verifyWebhookSignature({
        payload: BODY,
        signature: headerFor(timestamp, signature),
        secret: SECRET,
        toleranceInSeconds: -1,
        now: () => NOW,
      }),
    ).rejects.toThrow(ContextDevError);
  });
});

describe('constructWebhookEvent', () => {
  const timestamp = `${NOW_SECONDS}`;
  const signature = sign(SECRET, timestamp, BODY);

  test('returns the parsed event envelope', async () => {
    const event = await constructWebhookEvent({
      payload: BODY,
      signature: headerFor(timestamp, signature),
      secret: SECRET,
      now: () => NOW,
    });

    expect(event.event).toBe('change.detected');
    expect(event.id).toBe('evt_123');
    expect(event.created_at).toBe('2025-12-05T23:00:00Z');
    expect(event.data).toEqual({ change: { id: 'chg_123' } });
  });

  test('throws when the signature does not match', async () => {
    await expect(
      constructWebhookEvent({
        payload: BODY.replace('evt_123', 'evt_456'),
        signature: headerFor(timestamp, signature),
        secret: SECRET,
        now: () => NOW,
      }),
    ).rejects.toThrow(/signature verification failed/i);
  });

  test('throws when the payload is not JSON', async () => {
    const body = 'not json';
    await expect(
      constructWebhookEvent({
        payload: body,
        signature: headerFor(timestamp, sign(SECRET, timestamp, body)),
        secret: SECRET,
        now: () => NOW,
      }),
    ).rejects.toThrow(/not valid JSON/i);
  });

  test.each([['"a string"'], ['[1, 2, 3]'], ['null']])('throws when the payload is %s', async (body) => {
    await expect(
      constructWebhookEvent({
        payload: body,
        signature: headerFor(timestamp, sign(SECRET, timestamp, body)),
        secret: SECRET,
        now: () => NOW,
      }),
    ).rejects.toThrow(/must be a JSON object/i);
  });

  test('throws when the envelope has no event name', async () => {
    const body = JSON.stringify({ id: 'evt_123', data: {} });
    await expect(
      constructWebhookEvent({
        payload: body,
        signature: headerFor(timestamp, sign(SECRET, timestamp, body)),
        secret: SECRET,
        now: () => NOW,
      }),
    ).rejects.toThrow(/missing the `event` field/i);
  });

  test('accepts byte payloads', async () => {
    const bytes = new TextEncoder().encode(BODY);
    await expect(
      constructWebhookEvent({
        payload: bytes,
        signature: headerFor(timestamp, signature),
        secret: SECRET,
        now: () => NOW,
      }),
    ).resolves.toMatchObject({ event: 'change.detected' });
  });
});

describe('getWebhookSignatureHeader', () => {
  const value = 't=123,v1=abc';

  test('reads a Headers instance case-insensitively', () => {
    expect(getWebhookSignatureHeader(new Headers({ [WEBHOOK_SIGNATURE_HEADER]: value }))).toBe(value);
  });

  test('reads a plain object with any header casing', () => {
    expect(getWebhookSignatureHeader({ 'x-context-signature': value })).toBe(value);
    expect(getWebhookSignatureHeader({ 'X-Context-Signature': value })).toBe(value);
  });

  test('reads the first entry of a repeated header', () => {
    expect(getWebhookSignatureHeader({ 'x-context-signature': [value, 't=456,v1=def'] })).toBe(value);
  });

  test('returns undefined when the header is missing', () => {
    expect(getWebhookSignatureHeader({})).toBeUndefined();
    expect(getWebhookSignatureHeader(undefined)).toBeUndefined();
    expect(getWebhookSignatureHeader(null)).toBeUndefined();
  });
});

describe('client.webhooks helpers', () => {
  const timestamp = `${NOW_SECONDS}`;
  const signature = sign(SECRET, timestamp, BODY);

  test('verifySignature verifies a signature header', async () => {
    await expect(
      client.webhooks.verifySignature(BODY, headerFor(timestamp, signature), SECRET, {
        now: () => NOW,
      }),
    ).resolves.toBe(true);

    await expect(
      client.webhooks.verifySignature(BODY, headerFor(timestamp, signature), 'wrong', {
        now: () => NOW,
      }),
    ).resolves.toBe(false);
  });

  test('unwrap verifies and parses a delivery', async () => {
    const event = await client.webhooks.unwrap(
      BODY,
      { 'x-context-signature': headerFor(timestamp, signature) },
      SECRET,
      { now: () => NOW },
    );

    expect(event.event).toBe('change.detected');
  });

  test('unwrap throws when the signature header is missing', async () => {
    await expect(client.webhooks.unwrap(BODY, {}, SECRET)).rejects.toThrow(ContextDevError);
  });

  test('unwrap throws when the delivery was not signed with the secret', async () => {
    await expect(
      client.webhooks.unwrap(
        BODY,
        { 'x-context-signature': headerFor(timestamp, randomBytes(32).toString('hex')) },
        SECRET,
        { now: () => NOW },
      ),
    ).rejects.toThrow(/signature verification failed/i);
  });
});
