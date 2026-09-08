// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Inspect and retry webhook deliveries. These endpoints cost no credits.
 */
export class Deliveries extends APIResource {
  /**
   * Get a webhook delivery, including its status and latest attempt.
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
   * List your batch or monitor webhook deliveries, newest first.
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
   * List delivery attempts, newest first.
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
   * Retry a webhook delivery within seven days of creation.
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
   * Completion time, or null while in progress.
   */
  completed_at: string | null;

  /**
   * Attempt error, or null if none.
   */
  error: Attempt.Error | null;

  /**
   * HTTP response status, or null if no response was received.
   */
  http_status: number | null;

  /**
   * Attempt start time.
   */
  started_at: string;

  /**
   * What started this attempt.
   */
  trigger: 'initial' | 'automatic' | 'manual';

  /**
   * URL used for this attempt.
   */
  url: string;
}

export namespace Attempt {
  /**
   * Attempt error, or null if none.
   */
  export interface Error {
    /**
     * Error code.
     */
    code: string;

    /**
     * Error details.
     */
    message: string;
  }
}

export interface Delivery {
  /**
   * Delivery ID.
   */
  id: string;

  /**
   * Event creation time.
   */
  created_at: string;

  /**
   * Last successful delivery time, or null if never delivered.
   */
  delivered_at: string | null;

  /**
   * Webhook event type.
   */
  event: 'batch.completed' | 'batch.failed' | 'batch.cancelled' | 'change.detected' | 'run.completed';

  /**
   * Stable event ID for deduplicating received webhooks.
   */
  event_id: string;

  /**
   * Latest attempt, or null if none.
   */
  last_attempt: Attempt | null;

  /**
   * Latest delivery error, or null if none.
   */
  last_error: Delivery.LastError | null;

  /**
   * Next scheduled attempt, or null if none.
   */
  next_attempt_at: string | null;

  /**
   * Webhook retry settings. Use {} for the default schedule.
   */
  retry: WebhooksAPI.RetryConfig;

  /**
   * Manual retry deadline, seven days after event creation.
   */
  retry_expires_at: string;

  /**
   * Batch or monitor run that produced the event.
   */
  source: Delivery.Batch | Delivery.Monitor;

  /**
   * Current delivery status.
   */
  status: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

  /**
   * Webhook destination URL.
   */
  url: string;
}

export namespace Delivery {
  /**
   * Latest delivery error, or null if none.
   */
  export interface LastError {
    /**
     * Error code.
     */
    code: string;

    /**
     * Error details.
     */
    message: string;
  }

  export interface Batch {
    /**
     * Batch ID.
     */
    batch_id: string;

    /**
     * Delivery source.
     */
    type: 'batch';
  }

  export interface Monitor {
    /**
     * Monitor ID.
     */
    monitor_id: string;

    /**
     * Monitor run ID.
     */
    run_id: string;

    /**
     * Delivery source.
     */
    type: 'monitor';
  }
}

export interface DeliverySummary {
  /**
   * Delivery ID.
   */
  id: string;

  /**
   * Event creation time.
   */
  created_at: string;

  /**
   * Last successful delivery time, or null if never delivered.
   */
  delivered_at: string | null;

  /**
   * Webhook event type.
   */
  event: 'batch.completed' | 'batch.failed' | 'batch.cancelled' | 'change.detected' | 'run.completed';

  /**
   * Latest delivery error, or null if none.
   */
  last_error: DeliverySummary.LastError | null;

  /**
   * Next scheduled attempt, or null if none.
   */
  next_attempt_at: string | null;

  /**
   * Manual retry deadline, seven days after event creation.
   */
  retry_expires_at: string;

  /**
   * Batch or monitor run that produced the event.
   */
  source: DeliverySummary.Batch | DeliverySummary.Monitor;

  /**
   * Current delivery status.
   */
  status: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

  /**
   * Webhook destination URL.
   */
  url: string;
}

export namespace DeliverySummary {
  /**
   * Latest delivery error, or null if none.
   */
  export interface LastError {
    /**
     * Error code.
     */
    code: string;

    /**
     * Error details.
     */
    message: string;
  }

  export interface Batch {
    /**
     * Batch ID.
     */
    batch_id: string;

    /**
     * Delivery source.
     */
    type: 'batch';
  }

  export interface Monitor {
    /**
     * Monitor ID.
     */
    monitor_id: string;

    /**
     * Monitor run ID.
     */
    run_id: string;

    /**
     * Delivery source.
     */
    type: 'monitor';
  }
}

export interface DeliveryRetrieveResponse extends Delivery {
  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: DeliveryRetrieveResponse.KeyMetadata;
}

export namespace DeliveryRetrieveResponse {
  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  export interface KeyMetadata {
    /**
     * Credits used by this request.
     */
    credits_consumed: number;

    /**
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface DeliveryListResponse {
  /**
   * Webhook deliveries.
   */
  data: Array<DeliverySummary>;

  /**
   * Whether more deliveries are available.
   */
  has_more: boolean;

  /**
   * Next page cursor, or null on the last page.
   */
  next_cursor: string | null;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: DeliveryListResponse.KeyMetadata;
}

export namespace DeliveryListResponse {
  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  export interface KeyMetadata {
    /**
     * Credits used by this request.
     */
    credits_consumed: number;

    /**
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface DeliveryListAttemptsResponse {
  /**
   * Delivery attempts.
   */
  data: Array<Attempt>;

  /**
   * Whether more attempts are available.
   */
  has_more: boolean;

  /**
   * Next page cursor, or null on the last page.
   */
  next_cursor: string | null;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: DeliveryListAttemptsResponse.KeyMetadata;
}

export namespace DeliveryListAttemptsResponse {
  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  export interface KeyMetadata {
    /**
     * Credits used by this request.
     */
    credits_consumed: number;

    /**
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface DeliveryRetryResponse {
  /**
   * Delivery ID.
   */
  id: string;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: DeliveryRetryResponse.KeyMetadata;
}

export namespace DeliveryRetryResponse {
  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  export interface KeyMetadata {
    /**
     * Credits used by this request.
     */
    credits_consumed: number;

    /**
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface DeliveryRetrieveParams {
  /**
   * Comma-separated tags for tracking request usage. Up to 20 tags, each 1-50
   * characters.
   */
  tags?: Array<string>;
}

export type DeliveryListParams = DeliveryListParams.ByBatch | DeliveryListParams.ByMonitor;

export declare namespace DeliveryListParams {
  export interface ByBatch {
    /**
     * Delivery source.
     */
    type: 'batch';

    /**
     * Filter by batch ID.
     */
    batch_id?: string;

    /**
     * Only include events created after this ISO 8601 timestamp.
     */
    created_after?: string;

    /**
     * The next_cursor from the previous response.
     */
    cursor?: string;

    /**
     * Number of deliveries to return.
     */
    limit?: number;

    /**
     * Filter by delivery status.
     */
    status?: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

    /**
     * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
     */
    tags?: Array<string>;
  }

  export interface ByMonitor {
    /**
     * Delivery source.
     */
    type: 'monitor';

    /**
     * Only include events created after this ISO 8601 timestamp.
     */
    created_after?: string;

    /**
     * The next_cursor from the previous response.
     */
    cursor?: string;

    /**
     * Number of deliveries to return.
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
     * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
     */
    tags?: Array<string>;
  }
}

export interface DeliveryListAttemptsParams {
  /**
   * The next_cursor from the previous response.
   */
  cursor?: string;

  /**
   * Number of attempts to return.
   */
  limit?: number;

  /**
   * Comma-separated tags for tracking request usage. Up to 20 tags, each 1-50
   * characters.
   */
  tags?: Array<string>;
}

export interface DeliveryRetryParams {
  /**
   * Body param: Resend a delivery that already succeeded.
   */
  force?: boolean;

  /**
   * Body param: Optional tags for tracking usage. Up to 20 tags, each 1 to 50
   * characters.
   */
  tags?: Array<string>;

  /**
   * Header param: Unique key to prevent duplicate retry requests.
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
