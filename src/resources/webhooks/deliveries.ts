// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DeliveriesAPI from './deliveries';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Inspect and retry batch and monitor webhook deliveries without rerunning the underlying work.
 */
export class Deliveries extends APIResource {
  /**
   * Get the live status, retry policy, latest attempt, and replay expiration for a
   * retained delivery. Use the attempts endpoint for its complete paginated history.
   * This endpoint costs no credits.
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
   * List retained batch and monitor webhook deliveries for your organization, newest
   * first. Filter by at most one of batch_id, monitor_id, or run_id, optionally
   * combined with status. Historical events without retained payloads are not
   * listed. This endpoint costs no credits.
   *
   * @example
   * ```ts
   * const deliveries = await client.webhooks.deliveries.list();
   * ```
   */
  list(
    query: DeliveryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DeliveryListResponse> {
    return this._client.get('/webhooks/deliveries', { query, ...options });
  }

  /**
   * List individual HTTP attempts for a delivery, newest first, including their
   * destination, timestamps, HTTP status, and error. An interrupted attempt may have
   * reached the endpoint even when its outcome is unknown. This endpoint costs no
   * credits.
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
   * Queue an immediate attempt without rerunning or billing the underlying batch or
   * monitor. A waiting retry is brought forward. A failed delivery gets one
   * additional attempt without restarting its automatic retry budget. Set force:
   * true to resend an acknowledged delivery. An in-progress attempt cannot be
   * duplicated. The stored event body, event ID, and creation time remain unchanged;
   * each attempt receives a fresh signature. Monitor retries use the current URL and
   * secret; removing the webhook cancels pending deliveries. Batch result URLs in
   * old payloads may have expired: retrieve the batch to get fresh URLs. Replay is
   * available for seven days. A successful attempt cancels remaining automatic
   * retries. Idempotency-Key is scoped to your organization and retained with the
   * delivery metadata; repeating the same key and input returns the original
   * accepted response.
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
  id: string;

  attempt: number;

  completed_at: string | null;

  error: Attempt.Error | null;

  http_status: number | null;

  started_at: string;

  trigger: 'initial' | 'automatic' | 'manual';

  url: string;
}

export namespace Attempt {
  export interface Error {
    code: string;

    message: string;
  }
}

export interface Delivery {
  id: string;

  /**
   * Number of delivery attempts started, including any attempt in progress.
   */
  attempt_count: number;

  created_at: string;

  /**
   * Most recent successful acknowledgment; retained if a later forced resend fails.
   */
  delivered_at: string | null;

  event: 'batch.completed' | 'batch.failed' | 'batch.cancelled' | 'change.detected' | 'run.completed';

  /**
   * Stable event ID. Unchanged across automatic and manual attempts; use it to
   * deduplicate events.
   */
  event_id: string;

  last_attempt: Delivery.LastAttempt;

  last_error: Delivery.LastError | null;

  next_attempt_at: string | null;

  /**
   * Opt into durable webhook delivery. An empty object uses the default retry
   * schedule. Omit retry to preserve legacy delivery behavior. The policy is
   * snapshotted for each event.
   */
  retry: WebhooksAPI.RetryConfig;

  /**
   * Seven days after event creation. Manual retries after this time return 410.
   * Delivery and attempt metadata remain available for up to 30 days.
   */
  retry_expires_at: string;

  source: Delivery.UnionMember0 | Delivery.UnionMember1;

  status: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

  /**
   * Destination recorded for this delivery. Each attempt records the URL it used.
   * Monitor retries use the currently configured URL and signing secret.
   */
  url: string;
}

export namespace Delivery {
  export interface LastAttempt extends DeliveriesAPI.Attempt {}

  export interface LastError {
    code: string;

    message: string;
  }

  export interface UnionMember0 {
    batch_id: string;

    type: 'batch';
  }

  export interface UnionMember1 {
    monitor_id: string;

    run_id: string;

    type: 'monitor';
  }
}

export interface DeliveryRetrieveResponse extends Delivery {
  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: DeliveryRetrieveResponse.KeyMetadata;
}

export namespace DeliveryRetrieveResponse {
  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  export interface KeyMetadata {
    /**
     * The number of credits consumed by this request.
     */
    credits_consumed: number;

    /**
     * The number of credits remaining for your organization after this request.
     */
    credits_remaining: number;
  }
}

export interface DeliveryListResponse {
  data: Array<Delivery>;

  has_more: boolean;

  next_cursor: string | null;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: DeliveryListResponse.KeyMetadata;
}

export namespace DeliveryListResponse {
  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  export interface KeyMetadata {
    /**
     * The number of credits consumed by this request.
     */
    credits_consumed: number;

    /**
     * The number of credits remaining for your organization after this request.
     */
    credits_remaining: number;
  }
}

export interface DeliveryListAttemptsResponse {
  data: Array<Attempt>;

  has_more: boolean;

  next_cursor: string | null;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: DeliveryListAttemptsResponse.KeyMetadata;
}

export namespace DeliveryListAttemptsResponse {
  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  export interface KeyMetadata {
    /**
     * The number of credits consumed by this request.
     */
    credits_consumed: number;

    /**
     * The number of credits remaining for your organization after this request.
     */
    credits_remaining: number;
  }
}

export interface DeliveryRetryResponse extends Delivery {
  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: DeliveryRetryResponse.KeyMetadata;
}

export namespace DeliveryRetryResponse {
  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  export interface KeyMetadata {
    /**
     * The number of credits consumed by this request.
     */
    credits_consumed: number;

    /**
     * The number of credits remaining for your organization after this request.
     */
    credits_remaining: number;
  }
}

export interface DeliveryRetrieveParams {
  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;
}

export interface DeliveryListParams {
  batch_id?: string;

  cursor?: string;

  limit?: number;

  monitor_id?: string;

  run_id?: string;

  status?: 'pending' | 'delivering' | 'retrying' | 'delivered' | 'failed' | 'cancelled';

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;
}

export interface DeliveryListAttemptsParams {
  cursor?: string;

  limit?: number;

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;
}

export interface DeliveryRetryParams {
  /**
   * Body param
   */
  force?: boolean;

  /**
   * Body param: Optional tags for tracking usage. Up to 20 tags, each 1 to 50
   * characters.
   */
  tags?: Array<string>;

  /**
   * Header param
   */
  'Idempotency-Key'?: string;
}

export declare namespace Deliveries {
  export {
    type Attempt as Attempt,
    type Delivery as Delivery,
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
