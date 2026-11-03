// This file is maintained by hand and is not generated from the OpenAPI spec. See CONTRIBUTING.md.

import { ContextDevError } from '../core/error';
import { decodeUTF8, encodeUTF8 } from '../internal/utils/bytes';
import { readEnv } from '../internal/utils/env';

/**
 * Header Context.dev uses to sign every webhook delivery attempt.
 *
 * Its value contains `t=<unix timestamp>,v1=<hex HMAC>`.
 */
export const WEBHOOK_SIGNATURE_HEADER = 'X-Context-Signature';

/**
 * How old (in seconds) a webhook signature may be before it is rejected.
 *
 * Matches the 5 minute replay window documented at https://docs.context.dev/webhooks.
 */
export const DEFAULT_WEBHOOK_TOLERANCE_IN_SECONDS = 300;

/** Environment variable read when no webhook secret is passed explicitly. */
export const WEBHOOK_SECRET_ENV_VAR = 'CONTEXT_DEV_WEBHOOK_SECRET';

/**
 * The raw, unmodified request body of a webhook delivery.
 *
 * Signature verification must run against the exact bytes that were received, before JSON parsing.
 */
export type WebhookPayload = string | Uint8Array | ArrayBuffer;

/**
 * Request headers, either as a `Headers` instance or as a plain object such as
 * Node's `req.headers`. Header names are matched case-insensitively.
 */
export type WebhookSignatureHeaders = Headers | Record<string, string | readonly string[] | undefined>;

/** Event names Context.dev currently sends. */
export type WebhookEventName =
  | 'batch.completed'
  | 'batch.failed'
  | 'batch.cancelled'
  | 'change.detected'
  | 'run.completed';

/**
 * The JSON envelope of a webhook delivery.
 *
 * Every payload has `event`, `id`, and `created_at`. `event` mirrors the `X-Context-Event`
 * header and `id` mirrors `X-Context-Id`; use `id` as the deduplication key, including across
 * retries and replays.
 */
export interface WebhookEvent<TData = unknown, TName extends string = WebhookEventName> {
  /** Event that triggered this delivery, e.g. `batch.completed`. */
  event: TName;

  /** Stable event ID. Deduplicate on this value across retries and replays. */
  id: string;

  /** ISO 8601 timestamp of when the event was created. */
  created_at: string;

  /** Event-specific payload. */
  data: TData;
}

/** Result of parsing an `X-Context-Signature` header. */
export interface ParsedWebhookSignature {
  /** Unix timestamp in seconds, exactly as it appeared in the header. */
  timestamp: string;

  /** Every `v1` signature in the header, in the order they appeared. */
  signatures: string[];
}

/** Options that control how a signature is checked. */
export interface WebhookVerificationOptions {
  /**
   * Maximum allowed difference, in seconds, between the signature timestamp and now.
   * Defaults to {@link DEFAULT_WEBHOOK_TOLERANCE_IN_SECONDS}. Pass `null` to skip the
   * timestamp check entirely (not recommended).
   */
  toleranceInSeconds?: number | null | undefined;

  /**
   * Clock used to compute the current time, in milliseconds since the epoch.
   * Defaults to `Date.now`.
   */
  now?: (() => number) | undefined;
}

/** Parameters for {@link verifyWebhookSignature}. */
export interface VerifyWebhookSignatureParams extends WebhookVerificationOptions {
  /** Raw, unmodified request body. */
  payload: WebhookPayload;

  /** Value of the `X-Context-Signature` header. */
  signature: string;

  /**
   * Webhook signing secret. Defaults to the `CONTEXT_DEV_WEBHOOK_SECRET` environment variable.
   */
  secret?: string | undefined;
}

/** Parameters for {@link computeWebhookSignature}. */
export interface ComputeWebhookSignatureParams {
  /** Webhook signing secret. */
  secret: string;

  /** Unix timestamp in seconds, as sent in the `t=` part of the signature header. */
  timestamp: number | string;

  /** Raw, unmodified request body. */
  payload: WebhookPayload;
}

const hexPattern = /^[a-f0-9]+$/i;
const timestampPattern = /^[0-9]+$/;

/**
 * Parse an `X-Context-Signature` header of the form `t=<unix>,v1=<hex>[,v1=<hex>...]`.
 *
 * @throws {ContextDevError} when the header is empty, has no `t=` value, or has no `v1=` value.
 */
export function parseSignatureHeader(header: string): ParsedWebhookSignature {
  if (typeof header !== 'string' || header.trim().length === 0) {
    throw new ContextDevError(
      `Expected a ${WEBHOOK_SIGNATURE_HEADER} header value of the form "t=<unix>,v1=<hex>" but received an empty value.`,
    );
  }

  let timestamp: string | undefined;
  const signatures: string[] = [];

  for (const rawPart of header.split(',')) {
    const part = rawPart.trim();
    if (part.length === 0) continue;

    const separator = part.indexOf('=');
    if (separator < 0) continue;

    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (value.length === 0) continue;

    if (key === 't') {
      timestamp ??= value;
    } else if (key === 'v1') {
      signatures.push(value);
    }
  }

  if (timestamp === undefined) {
    throw new ContextDevError(
      `The ${WEBHOOK_SIGNATURE_HEADER} header is missing the "t=" timestamp: ${JSON.stringify(header)}.`,
    );
  }

  if (signatures.length === 0) {
    throw new ContextDevError(
      `The ${WEBHOOK_SIGNATURE_HEADER} header is missing a "v1=" signature: ${JSON.stringify(header)}.`,
    );
  }

  return { timestamp, signatures };
}

/**
 * Read the value of the {@link WEBHOOK_SIGNATURE_HEADER} header from a `Headers` instance or a
 * plain object. Returns `undefined` when the header is absent.
 */
export function getWebhookSignatureHeader(
  headers: WebhookSignatureHeaders | null | undefined,
): string | undefined {
  if (headers == null) return undefined;

  if (typeof (headers as Headers).get === 'function') {
    const value = (headers as Headers).get(WEBHOOK_SIGNATURE_HEADER);
    return value == null ? undefined : value;
  }

  const expectedName = WEBHOOK_SIGNATURE_HEADER.toLowerCase();
  for (const [name, value] of Object.entries(
    headers as Record<string, string | readonly string[] | undefined>,
  )) {
    if (name.toLowerCase() !== expectedName) continue;
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (typeof entry === 'string') return entry;
      }
    }
    return undefined;
  }

  return undefined;
}

/**
 * Compute the hex HMAC-SHA256 signature Context.dev sends in the `v1=` part of the
 * {@link WEBHOOK_SIGNATURE_HEADER} header.
 *
 * Useful for tests and for building your own receiver helpers; most integrations should call
 * {@link verifyWebhookSignature} or `client.webhooks.unwrap()` instead.
 */
export async function computeWebhookSignature({
  secret,
  timestamp,
  payload,
}: ComputeWebhookSignatureParams): Promise<string> {
  const digest = await hmacSha256(secret, `${timestamp}.`, payload);
  return toHex(digest);
}

/**
 * Verify that a webhook delivery was signed with the given secret.
 *
 * Verification follows the Context.dev contract: HMAC-SHA256 over `<timestamp>.<raw body>`,
 * compared in constant time, with a bounded timestamp age to stop replay attacks.
 *
 * @returns `true` when the signature is valid, `false` for a malformed header, an expired
 * timestamp, or a signature mismatch.
 * @throws {ContextDevError} when no secret is available, or when the environment lacks the Web
 * Crypto API.
 */
export async function verifyWebhookSignature({
  payload,
  signature,
  secret,
  toleranceInSeconds,
  now = Date.now,
}: VerifyWebhookSignatureParams): Promise<boolean> {
  const signingSecret = secret ?? readEnv(WEBHOOK_SECRET_ENV_VAR);
  if (signingSecret === undefined || signingSecret.length === 0) {
    throw new ContextDevError(
      `A webhook signing secret is required to verify signatures; pass \`secret\` or set the ${WEBHOOK_SECRET_ENV_VAR} environment variable.`,
    );
  }

  let parsed: ParsedWebhookSignature;
  try {
    parsed = parseSignatureHeader(signature);
  } catch {
    return false;
  }

  if (!timestampPattern.test(parsed.timestamp)) return false;

  const tolerance =
    toleranceInSeconds === undefined ? DEFAULT_WEBHOOK_TOLERANCE_IN_SECONDS : toleranceInSeconds;

  if (tolerance !== null) {
    if (typeof tolerance !== 'number' || !Number.isFinite(tolerance) || tolerance < 0) {
      throw new ContextDevError(
        `\`toleranceInSeconds\` must be a non-negative number or null, received ${String(
          toleranceInSeconds,
        )}.`,
      );
    }

    const timestamp = Number(parsed.timestamp);
    if (!Number.isSafeInteger(timestamp)) return false;

    if (Math.abs(now() / 1000 - timestamp) > tolerance) return false;
  }

  const expected = await hmacSha256(signingSecret, `${parsed.timestamp}.`, payload);

  let matches = false;
  for (const candidate of parsed.signatures) {
    const actual = fromHex(candidate);
    // Compare every candidate so the work done does not depend on which one matches.
    if (actual !== undefined && timingSafeEqual(actual, expected)) {
      matches = true;
    }
  }

  return matches;
}

/**
 * Verify a webhook delivery and return its parsed event envelope.
 *
 * Always verify against the raw request body, before parsing JSON.
 *
 * @throws {ContextDevError} when verification fails or the payload is not a valid event envelope.
 */
export async function constructWebhookEvent<TEvent extends WebhookEvent = WebhookEvent>(
  params: VerifyWebhookSignatureParams,
): Promise<TEvent> {
  const verified = await verifyWebhookSignature(params);
  if (!verified) {
    throw new ContextDevError(
      `Webhook signature verification failed; the ${WEBHOOK_SIGNATURE_HEADER} header did not match the payload.`,
    );
  }

  const text = typeof params.payload === 'string' ? params.payload : decodeUTF8(toBytes(params.payload));

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new ContextDevError('Webhook payload is not valid JSON.');
  }

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new ContextDevError('Webhook payload must be a JSON object.');
  }

  const event = (parsed as { event?: unknown }).event;
  if (typeof event !== 'string' || event.length === 0) {
    throw new ContextDevError('Webhook payload is missing the `event` field.');
  }

  return parsed as TEvent;
}

function toBytes(payload: WebhookPayload): Uint8Array {
  if (typeof payload === 'string') return encodeUTF8(payload);
  if (payload instanceof Uint8Array) return payload;
  if (payload instanceof ArrayBuffer) return new Uint8Array(payload);

  throw new ContextDevError(
    'Expected the webhook payload to be a string, Uint8Array, or ArrayBuffer containing the raw request body.',
  );
}

function concatBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  if (a.length === 0) return b;
  if (b.length === 0) return a;

  const joined = new Uint8Array(a.length + b.length);
  joined.set(a, 0);
  joined.set(b, a.length);
  return joined;
}

/**
 * The subset of the Web Crypto API used for HMAC-SHA256, described structurally so that this
 * module type-checks in runtimes whose TypeScript setup does not include DOM or Node crypto types.
 */
interface WebCryptoSubtle {
  importKey(
    format: 'raw',
    keyData: Uint8Array,
    algorithm: { name: 'HMAC'; hash: 'SHA-256' },
    extractable: boolean,
    keyUsages: Array<'sign'>,
  ): Promise<unknown>;

  sign(algorithm: { name: 'HMAC' }, key: unknown, data: Uint8Array): Promise<ArrayBuffer>;
}

async function hmacSha256(secret: string, prefix: string, payload: WebhookPayload): Promise<Uint8Array> {
  const subtle = getSubtleCrypto();

  const key = await subtle.importKey('raw', encodeUTF8(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ]);
  const message = concatBytes(encodeUTF8(prefix), toBytes(payload));
  const digest = await subtle.sign({ name: 'HMAC' }, key, message);

  return new Uint8Array(digest);
}

function getSubtleCrypto(): WebCryptoSubtle {
  const subtle = (globalThis as { crypto?: { subtle?: WebCryptoSubtle } }).crypto?.subtle;
  if (subtle === undefined) {
    throw new ContextDevError(
      'Webhook signature verification requires the Web Crypto API (`globalThis.crypto.subtle`), which is not available in this environment.',
    );
  }

  return subtle;
}

function toHex(bytes: Uint8Array): string {
  let hex = '';
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, '0');
  }
  return hex;
}

function fromHex(hex: string): Uint8Array | undefined {
  if (hex.length === 0 || hex.length % 2 !== 0 || !hexPattern.test(hex)) return undefined;

  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;

  let difference = 0;
  for (let i = 0; i < a.length; i++) {
    difference |= a[i]! ^ b[i]!;
  }

  return difference === 0;
}
