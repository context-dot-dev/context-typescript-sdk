// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Inspect your organization's API requests, including retained inputs and responses.
 */
export class Logs extends APIResource {
  /**
   * Retrieve a request's metadata, retained input, and response. A request that just
   * finished can return 404 `NOT_FOUND` for a few seconds, so retry shortly.
   */
  retrieve(requestID: string, options?: RequestOptions): APIPromise<LogRetrieveResponse> {
    return this._client.get(path`/org/logs/${requestID}`, options);
  }

  /**
   * List your organization's API requests, newest first. Filter by time, endpoint,
   * API key, status, error code, tags, or text. Includes batch settlements and
   * monitor runs.
   */
  list(query: LogListParams | null | undefined = {}, options?: RequestOptions): APIPromise<LogListResponse> {
    return this._client.get('/org/logs', { query, ...options });
  }
}

export interface LogRetrieveResponse {
  data: LogRetrieveResponse.Data;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: LogRetrieveResponse.KeyMetadata;
}

export namespace LogRetrieveResponse {
  export interface Data {
    /**
     * Credits charged for this request.
     */
    credits_used: number;

    /**
     * The response's `error_code`. `null` on success.
     */
    error_code: string | null;

    /**
     * Input retained from the request.
     */
    input: Data.Input;

    /**
     * ID of the API key that made the request. Can be `null` for `MONITOR` and `BATCH`
     * entries.
     */
    key_id: string | null;

    /**
     * Server-side processing time, in milliseconds.
     */
    latency_ms: number;

    /**
     * HTTP method, or `MONITOR` for a monitor run and `BATCH` for a batch settlement.
     */
    method: string;

    /**
     * Endpoint path that was called.
     */
    path: string;

    /**
     * ID of the logged request.
     */
    request_id: string;

    /**
     * HTTP status code of the response.
     */
    status_code: number;

    /**
     * Tags sent with the request.
     */
    tags: Array<string>;

    /**
     * When the request completed.
     */
    timestamp: string;

    /**
     * The request's `User-Agent` header.
     */
    user_agent: string | null;

    /**
     * Whether the request used zero data retention (ZDR).
     */
    zdr: boolean;

    /**
     * Retained JSON response with credentials redacted. `null` when unavailable, such
     * as under ZDR.
     */
    response?: unknown;
  }

  export namespace Data {
    /**
     * Input retained from the request.
     */
    export interface Input {
      /**
       * Query parameters of the request.
       */
      query: { [key: string]: unknown };

      /**
       * Request body with credentials and uploaded content redacted.
       */
      body?: unknown;
    }
  }

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

export interface LogListResponse {
  /**
   * Log entries on this page, newest first.
   */
  data: Array<LogListResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

  /**
   * Maximum number of log entries to return per page.
   */
  limit: number;

  /**
   * Current page number.
   */
  page: number;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: LogListResponse.KeyMetadata;
}

export namespace LogListResponse {
  export interface Data {
    /**
     * Credits charged for this request.
     */
    credits_used: number;

    /**
     * The response's `error_code`. `null` on success.
     */
    error_code: string | null;

    /**
     * ID of the API key that made the request. Can be `null` for `MONITOR` and `BATCH`
     * entries.
     */
    key_id: string | null;

    /**
     * Server-side processing time, in milliseconds.
     */
    latency_ms: number;

    /**
     * HTTP method, or `MONITOR` for a monitor run and `BATCH` for a batch settlement.
     */
    method: string;

    /**
     * Endpoint path that was called.
     */
    path: string;

    /**
     * ID of the logged request.
     */
    request_id: string;

    /**
     * HTTP status code of the response.
     */
    status_code: number;

    /**
     * Tags sent with the request.
     */
    tags: Array<string>;

    /**
     * When the request completed.
     */
    timestamp: string;

    /**
     * Whether the request used zero data retention (ZDR).
     */
    zdr: boolean;
  }

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

export interface LogListParams {
  /**
   * Filter by the `error_code` returned in the response.
   */
  error_code?: string;

  /**
   * Return only requests that failed with a 4xx or 5xx status.
   */
  errors_only?: boolean;

  /**
   * Return requests at or after this time. Defaults to 24 hours before `to`.
   */
  from?: string;

  /**
   * Filter by the ID of the API key that made the request.
   */
  key_id?: string;

  /**
   * Maximum number of log entries to return per page.
   */
  limit?: number;

  /**
   * Page number, starting at 1.
   */
  page?: number;

  /**
   * Filter by endpoint path, with or without the `/v1` prefix.
   */
  path?: string;

  /**
   * Case-insensitive text to find in the request query or body, such as a domain.
   */
  search?: string;

  /**
   * Filter by exact HTTP status code.
   */
  status_code?: number;

  /**
   * Comma-separated tags. Returns log entries that have any of them. Up to 20 tags
   * of 1 to 50 characters each.
   */
  tags?: string;

  /**
   * Return requests at or before this time. Defaults to now.
   */
  to?: string;
}

export declare namespace Logs {
  export {
    type LogRetrieveResponse as LogRetrieveResponse,
    type LogListResponse as LogListResponse,
    type LogListParams as LogListParams,
  };
}
