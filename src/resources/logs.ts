// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Read your organization's API request logs to debug failed calls. These endpoints cost no credits and use a separate rate limit.
 */
export class Logs extends APIResource {
  /**
   * Get one logged API call, including its request input and response body.
   */
  retrieve(requestID: string, options?: RequestOptions): APIPromise<LogRetrieveResponse> {
    return this._client.get(path`/logs/${requestID}`, options);
  }

  /**
   * List your organization's API requests, newest first. Defaults to the last 24
   * hours.
   */
  list(query: LogListParams | null | undefined = {}, options?: RequestOptions): APIPromise<LogListResponse> {
    return this._client.get('/logs', { query, ...options });
  }
}

export interface LogRetrieveResponse {
  data: LogRetrieveResponse.Data;

  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  /**
   * Credit usage, included whenever a valid API key is provided.
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
     * The `error_code` from the response, or null on success.
     */
    error_code: string | null;

    /**
     * What was sent with the request.
     */
    input: Data.Input;

    /**
     * ID of the API key that made the request.
     */
    key_id: string | null;

    /**
     * Server-side processing time in milliseconds.
     */
    latency_ms: number;

    /**
     * HTTP method.
     */
    method: string;

    /**
     * Endpoint path as called.
     */
    path: string;

    /**
     * Request ID of the logged API call.
     */
    request_id: string;

    /**
     * HTTP status code returned.
     */
    status_code: number;

    /**
     * Request tags supplied by the caller.
     */
    tags: Array<string>;

    /**
     * When the request completed.
     */
    timestamp: string;

    /**
     * User-Agent header of the request.
     */
    user_agent: string | null;

    /**
     * Whether the request was made under zero data retention.
     */
    zdr: boolean;

    /**
     * Credit usage, included whenever a valid API key is provided.
     */
    key_metadata?: Data.KeyMetadata;

    /**
     * The retained JSON response with credentials redacted, or null when unavailable.
     */
    response?: unknown;
  }

  export namespace Data {
    /**
     * What was sent with the request.
     */
    export interface Input {
      /**
       * Query parameters as sent.
       */
      query: { [key: string]: unknown };

      /**
       * Request body with credentials and uploaded content redacted.
       */
      body?: unknown;
    }

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

export interface LogListResponse {
  /**
   * Log entries, newest first.
   */
  data: Array<LogListResponse.Data>;

  /**
   * Whether a next page exists.
   */
  has_more: boolean;

  /**
   * Entries per page.
   */
  limit: number;

  /**
   * Current page number.
   */
  page: number;

  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  /**
   * Credit usage, included whenever a valid API key is provided.
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
     * The `error_code` from the response, or null on success.
     */
    error_code: string | null;

    /**
     * ID of the API key that made the request.
     */
    key_id: string | null;

    /**
     * Server-side processing time in milliseconds.
     */
    latency_ms: number;

    /**
     * HTTP method.
     */
    method: string;

    /**
     * Endpoint path as called.
     */
    path: string;

    /**
     * Request ID of the logged API call.
     */
    request_id: string;

    /**
     * HTTP status code returned.
     */
    status_code: number;

    /**
     * Request tags supplied by the caller.
     */
    tags: Array<string>;

    /**
     * When the request completed.
     */
    timestamp: string;

    /**
     * Whether the request was made under zero data retention.
     */
    zdr: boolean;
  }

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

export interface LogListParams {
  /**
   * Filter by the `error_code` returned in the response.
   */
  error_code?: string;

  /**
   * Only include requests that returned a 4xx or 5xx status.
   */
  errors_only?: boolean;

  /**
   * Only include requests at or after this ISO 8601 timestamp. Defaults to 24 hours
   * before `to`.
   */
  from?: string;

  /**
   * Filter by the API key that made the request.
   */
  key_id?: string;

  /**
   * Number of log entries per page.
   */
  limit?: number;

  /**
   * Page number, starting at 1.
   */
  page?: number;

  /**
   * Filter by endpoint path, with or without the /v1 prefix.
   */
  path?: string;

  /**
   * Case-insensitive substring match against the request query and body, e.g. a
   * domain.
   */
  search?: string;

  /**
   * Filter by exact HTTP status code.
   */
  status_code?: number;

  /**
   * Comma-separated request tags. Matches requests carrying any of them. Up to 20
   * tags, each 1-50 characters.
   */
  tags?: string;

  /**
   * Only include requests at or before this ISO 8601 timestamp. Defaults to now.
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
