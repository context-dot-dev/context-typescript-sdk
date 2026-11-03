// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { ContextDevError } from '../../core/error';
import * as DeliveriesAPI from './deliveries';
import {
  Attempt,
  Deliveries,
  Delivery,
  DeliveryListAttemptsParams,
  DeliveryListAttemptsResponse,
  DeliveryListParams,
  DeliveryListResponse,
  DeliveryRetrieveParams,
  DeliveryRetrieveResponse,
  DeliveryRetryParams,
  DeliveryRetryResponse,
  DeliverySummary,
} from './deliveries';
import {
  constructWebhookEvent,
  getWebhookSignatureHeader,
  verifyWebhookSignature,
  WEBHOOK_SIGNATURE_HEADER,
  type WebhookEvent,
  type WebhookPayload,
  type WebhookSignatureHeaders,
  type WebhookVerificationOptions,
} from '../../lib/webhooks';

export class Webhooks extends APIResource {
  deliveries: DeliveriesAPI.Deliveries = new DeliveriesAPI.Deliveries(this._client);

  /**
   * Verify that a webhook delivery was signed by Context.dev.
   *
   * Pass the raw request body exactly as received, before parsing it as JSON. Returns `true`
   * when the HMAC-SHA256 signature in the `X-Context-Signature` header is valid and its
   * timestamp is inside the replay window.
   *
   * @example
   * ```ts
   * app.post('/webhooks/context', async (req, res) => {
   *   const verified = await client.webhooks.verifySignature(
   *     req.rawBody,
   *     req.headers['x-context-signature'],
   *     process.env['CONTEXT_DEV_WEBHOOK_SECRET'],
   *   );
   *
   *   if (!verified) return res.status(400).send('invalid signature');
   *   res.status(200).send('ok');
   * });
   * ```
   */
  verifySignature(
    payload: WebhookPayload,
    signature: string,
    secret?: string,
    options?: WebhookVerificationOptions,
  ): Promise<boolean> {
    return verifyWebhookSignature({ payload, signature, secret, ...options });
  }

  /**
   * Verify a webhook delivery and return its parsed event envelope.
   *
   * Reads the `X-Context-Signature` header from the given headers (a `Headers` instance or a
   * plain object such as Node's `req.headers`), then verifies and parses the raw body.
   *
   * @example
   * ```ts
   * const event = await client.webhooks.unwrap(req.rawBody, req.headers);
   *
   * if (event.event === 'change.detected') {
   *   console.log(event.data);
   * }
   * ```
   */
  async unwrap<TEvent extends WebhookEvent = WebhookEvent>(
    payload: WebhookPayload,
    headers: WebhookSignatureHeaders,
    secret?: string,
    options?: WebhookVerificationOptions,
  ): Promise<TEvent> {
    const signature = getWebhookSignatureHeader(headers);
    if (signature === undefined) {
      throw new ContextDevError(
        `Missing the ${WEBHOOK_SIGNATURE_HEADER} header; pass the headers received with the webhook delivery.`,
      );
    }

    return constructWebhookEvent<TEvent>({ payload, signature, secret, ...options });
  }
}

/**
 * Webhook retry settings. Use {} for the default schedule.
 */
export interface RetryConfig {
  /**
   * Retry delays in seconds, totaling at most 72 hours. Use [] to disable automatic
   * retries.
   */
  delays_seconds?: Array<number>;
}

Webhooks.Deliveries = Deliveries;

export declare namespace Webhooks {
  export { type RetryConfig as RetryConfig };

  export {
    Deliveries as Deliveries,
    type Attempt as Attempt,
    type Delivery as Delivery,
    type DeliverySummary as DeliverySummary,
    type DeliveryRetrieveResponse as DeliveryRetrieveResponse,
    type DeliveryListResponse as DeliveryListResponse,
    type DeliveryListAttemptsResponse as DeliveryListAttemptsResponse,
    type DeliveryRetryResponse as DeliveryRetryResponse,
    type DeliveryRetrieveParams as DeliveryRetrieveParams,
    type DeliveryListParams as DeliveryListParams,
    type DeliveryListAttemptsParams as DeliveryListAttemptsParams,
    type DeliveryRetryParams as DeliveryRetryParams,
  };
}
