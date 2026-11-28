// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Inspect and retry batch and monitor webhook deliveries.
 */
export class Deliveries extends APIResource {
  /**
   * Retrieve a webhook delivery's status, retry settings, and most recent attempt.
   *
   * @example
   * ```ts
   * const delivery = await client.webhooks.deliveries.retrieve(
   *   'whd_210b9798eb53baa4e69d31c1071cf03d',
   * );
   * ```
   */
  retrieve(
    deliveryID: string,
    query: DeliveryRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DeliveryRetrieveResponse> {
    return this._client.get(path`/webhooks/deliveries/${deliveryID}`, { query, ...options });
  }

  /**
   * List webhook deliveries for your batches or monitors from the last 30 days,
   * newest first. Filter by source, status, or creation time.
   *
   * @example
   * ```ts
   * const deliveries = await client.webhooks.deliveries.list({
   *   type: 'batch',
   *   limit: 25,
   *   status: 'failed',
   * });
   * ```
   */
  list(body: DeliveryListParams, options?: RequestOptions): APIPromise<DeliveryListResponse> {
    return this._client.post('/webhooks/deliveries', { body, ...options });
  }

  /**
   * List a webhook delivery's attempts, newest first.
   *
   * @example
   * ```ts
   * const response =
   *   await client.webhooks.deliveries.listAttempts(
   *     'whd_210b9798eb53baa4e69d31c1071cf03d',
   *   );
   * ```
   */
  listAttempts(
    deliveryID: string,
    query: DeliveryListAttemptsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DeliveryListAttemptsResponse> {
    return this._client.get(path`/webhooks/deliveries/${deliveryID}/attempts`, { query, ...options });
  }

  /**
   * Resend a delivery's original payload to the source's current webhook URL, signed
   * with its current secret. Available for 7 days after the event.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.deliveries.retry(
   *   'whd_210b9798eb53baa4e69d31c1071cf03d',
   * );
   * ```
   */
  retry(
    deliveryID: string,
    params: DeliveryRetryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DeliveryRetryResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params ?? {};
    return this._client.post(path`/webhooks/deliveries/${deliveryID}/retry`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface Attempt {
  /**
   * Attempt number, starting at 1.
   */
  attempt: number;

  /**
   * When the attempt finished. `null` while in progress.
   */
  completed_at: string | null;

  /**
   * Why the attempt failed. `null` when it did not fail.
   */
  error: Attempt.Error | null;

  /**
   * HTTP status your endpoint returned. `null` when no response was received.
   */
  http_status: number | null;

  /**
   * When the attempt started.
   */
  started_at: string;

  /**
   * What started the attempt: `initial` is the first send, `automatic` is a
   * scheduled retry, and `manual` came from
   * `POST /webhooks/deliveries/{delivery_id}/retry`.
   */
  trigger: 'initial' | 'automatic' | 'manual';

  /**
   * URL this attempt was sent to.
   */
  url: string;
}

export namespace Attempt {
  /**
   * Why the attempt failed. `null` when it did not fail.
   */
  export interface Error {
    /**
     * Machine-readable error code.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
  }
}

export interface Delivery {
  /**
   * Unique ID of the delivery.
   */
  id: string;

  /**
   * When the event was created.
   */
  created_at: string;

  /**
   * When the delivery last succeeded. `null` until it succeeds.
   */
  delivered_at: string | null;

  /**
   * Event that triggered the delivery.
   */
  event: 'batch.completed' | 'batch.failed' | 'batch.cancelled' | 'change.detected' | 'run.completed';

  /**
   * Event ID, sent as `X-Context-Id` and as `id` in the payload. It stays the same
   * across retries, so use it to deduplicate.
   */
  event_id: string;

  /**
   * Most recent attempt. `null` before the first attempt.
   */
  last_attempt: Attempt | null;

  /**
   * Most recent delivery error. `null` when there is none.
   */
  last_error: Delivery.LastError | null;

  /**
   * When the next attempt is scheduled. `null` when none is scheduled.
   */
  next_attempt_at: string | null;

  /**
   * Automatic retry settings. Pass `{}` for the default schedule.
   */
  retry: WebhooksAPI.RetryConfig;

  /**
   * Last time you can retry the delivery manually, 7 days after the event.
   */
  retry_expires_at: string;

  /**
   * Batch or monitor run that produced the event.
   */
  source: Delivery.Batch | Delivery.Monitor;

  /**
   * Delivery state. `pending` is waiting for an attempt, `delivering` has an attempt
   * in progress, `retrying` is waiting for an automatic retry, `delivered` was
   * acknowledged with a 2xx, `failed` has no automatic retries left, and `cancelled`
   * means the source or its webhook was removed.
   */
  status: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

  /**
   * URL the webhook is sent to.
   */
  url: string;
}

export namespace Delivery {
  /**
   * Most recent delivery error. `null` when there is none.
   */
  export interface LastError {
    /**
     * Machine-readable error code.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
  }

  export interface Batch {
    /**
     * ID of the batch.
     */
    batch_id: string;

    /**
     * The event came from a batch.
     */
    type: 'batch';
  }

  export interface Monitor {
    /**
     * ID of the monitor.
     */
    monitor_id: string;

    /**
     * ID of the monitor run.
     */
    run_id: string;

    /**
     * The event came from a monitor run.
     */
    type: 'monitor';
  }
}

export interface DeliverySummary {
  /**
   * Unique ID of the delivery.
   */
  id: string;

  /**
   * When the event was created.
   */
  created_at: string;

  /**
   * When the delivery last succeeded. `null` until it succeeds.
   */
  delivered_at: string | null;

  /**
   * Event that triggered the delivery.
   */
  event: 'batch.completed' | 'batch.failed' | 'batch.cancelled' | 'change.detected' | 'run.completed';

  /**
   * Most recent delivery error. `null` when there is none.
   */
  last_error: DeliverySummary.LastError | null;

  /**
   * When the next attempt is scheduled. `null` when none is scheduled.
   */
  next_attempt_at: string | null;

  /**
   * Last time you can retry the delivery manually, 7 days after the event.
   */
  retry_expires_at: string;

  /**
   * Batch or monitor run that produced the event.
   */
  source: DeliverySummary.Batch | DeliverySummary.Monitor;

  /**
   * Delivery state. `pending` is waiting for an attempt, `delivering` has an attempt
   * in progress, `retrying` is waiting for an automatic retry, `delivered` was
   * acknowledged with a 2xx, `failed` has no automatic retries left, and `cancelled`
   * means the source or its webhook was removed.
   */
  status: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

  /**
   * URL the webhook is sent to.
   */
  url: string;
}

export namespace DeliverySummary {
  /**
   * Most recent delivery error. `null` when there is none.
   */
  export interface LastError {
    /**
     * Machine-readable error code.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
  }

  export interface Batch {
    /**
     * ID of the batch.
     */
    batch_id: string;

    /**
     * The event came from a batch.
     */
    type: 'batch';
  }

  export interface Monitor {
    /**
     * ID of the monitor.
     */
    monitor_id: string;

    /**
     * ID of the monitor run.
     */
    run_id: string;

    /**
     * The event came from a monitor run.
     */
    type: 'monitor';
  }
}

export interface DeliveryRetrieveResponse extends Delivery {
  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: DeliveryRetrieveResponse.KeyMetadata;
}

export namespace DeliveryRetrieveResponse {
  /**
   * Credits this request used and your remaining balance.
   */
  export interface KeyMetadata {
    /**
     * Credits charged for this request.
     */
    credits_consumed: number;

    /**
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface DeliveryListResponse {
  /**
   * Webhook deliveries on this page.
   */
  data: Array<DeliverySummary>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

  /**
   * Pass as `cursor` to fetch the next page. `null` on the last page.
   */
  next_cursor: string | null;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: DeliveryListResponse.KeyMetadata;
}

export namespace DeliveryListResponse {
  /**
   * Credits this request used and your remaining balance.
   */
  export interface KeyMetadata {
    /**
     * Credits charged for this request.
     */
    credits_consumed: number;

    /**
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface DeliveryListAttemptsResponse {
  /**
   * Delivery attempts on this page.
   */
  data: Array<Attempt>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

  /**
   * Pass as `cursor` to fetch the next page. `null` on the last page.
   */
  next_cursor: string | null;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: DeliveryListAttemptsResponse.KeyMetadata;
}

export namespace DeliveryListAttemptsResponse {
  /**
   * Credits this request used and your remaining balance.
   */
  export interface KeyMetadata {
    /**
     * Credits charged for this request.
     */
    credits_consumed: number;

    /**
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface DeliveryRetryResponse {
  /**
   * Unique ID of the delivery.
   */
  id: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: DeliveryRetryResponse.KeyMetadata;
}

export namespace DeliveryRetryResponse {
  /**
   * Credits this request used and your remaining balance.
   */
  export interface KeyMetadata {
    /**
     * Credits charged for this request.
     */
    credits_consumed: number;

    /**
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface DeliveryRetrieveParams {
  /**
   * Comma-separated labels for this request, such as `production,team-alpha`. Filter
   * usage and request logs by them.
   */
  tags?: Array<string>;
}

export type DeliveryListParams = DeliveryListParams.ByBatch | DeliveryListParams.ByMonitor;

export declare namespace DeliveryListParams {
  export interface ByBatch {
    /**
     * List batch webhook deliveries.
     */
    type: 'batch';

    /**
     * Filter by batch ID.
     */
    batch_id?: string;

    /**
     * Only include deliveries created after this time.
     */
    created_after?: string;

    /**
     * Cursor from the previous page's `next_cursor`. Omit for the first page.
     */
    cursor?: string;

    /**
     * Maximum number of deliveries to return per page.
     */
    limit?: number;

    /**
     * Filter by delivery status.
     */
    status?: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

    /**
     * Labels for this request. Filter usage and request logs by them in the dashboard
     * or with `GET /org/logs`.
     */
    tags?: Array<string>;
  }

  export interface ByMonitor {
    /**
     * List monitor webhook deliveries.
     */
    type: 'monitor';

    /**
     * Only include deliveries created after this time.
     */
    created_after?: string;

    /**
     * Cursor from the previous page's `next_cursor`. Omit for the first page.
     */
    cursor?: string;

    /**
     * Maximum number of deliveries to return per page.
     */
    limit?: number;

    /**
     * Filter by monitor ID.
     */
    monitor_id?: string;

    /**
     * Filter by monitor run ID.
     */
    run_id?: string;

    /**
     * Filter by delivery status.
     */
    status?: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

    /**
     * Labels for this request. Filter usage and request logs by them in the dashboard
     * or with `GET /org/logs`.
     */
    tags?: Array<string>;
  }
}

export interface DeliveryListAttemptsParams {
  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of attempts to return per page.
   */
  limit?: number;

  /**
   * Comma-separated labels for this request, such as `production,team-alpha`. Filter
   * usage and request logs by them.
   */
  tags?: Array<string>;
}

export interface DeliveryRetryParams {
  /**
   * Body param: Resend even if the delivery already succeeded.
   */
  force?: boolean;

  /**
   * Body param: Labels for this request. Filter usage and request logs by them in
   * the dashboard or with `GET /org/logs`.
   */
  tags?: Array<string>;

  /**
   * Header param: Unique key for this retry. Repeating the request with the same key
   * does not send the payload again.
   */
  'Idempotency-Key'?: string;
}

export declare namespace Deliveries {
  export {
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
