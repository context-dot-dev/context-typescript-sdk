// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Utility extends APIResource {
  /**
   * Signal that you may fetch data soon to improve latency. The type field selects
   * what to prefetch ('brand' queues a brand data fetch, 'styleguide' queues a
   * styleguide extraction) and identifier carries exactly one lookup key: a domain,
   * or an email whose domain is extracted and validated (free email providers and
   * disposable email addresses are not allowed).
   *
   * @example
   * ```ts
   * const response = await client.utility.prefetch({
   *   identifier: { domain: 'xxx' },
   *   type: 'brand',
   * });
   * ```
   */
  prefetch(body: UtilityPrefetchParams, options?: RequestOptions): APIPromise<UtilityPrefetchResponse> {
    return this._client.post('/utility/prefetch', { body, ...options });
  }
}

export interface UtilityPrefetchResponse {
  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  /**
   * The domain that was queued for prefetching
   */
  domain?: string;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: UtilityPrefetchResponse.KeyMetadata;

  /**
   * Success message
   */
  message?: string;

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;

  /**
   * The type of prefetch that was queued, echoed from the request
   */
  type?: 'brand' | 'styleguide';
}

export namespace UtilityPrefetchResponse {
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

export interface UtilityPrefetchParams {
  /**
   * Identifier of the target to prefetch. Provide exactly one of domain or email.
   */
  identifier:
    | UtilityPrefetchParams.UtilityPrefetchDomainIdentifier
    | UtilityPrefetchParams.UtilityPrefetchEmailIdentifier;

  /**
   * What to prefetch: 'brand' warms the brand data cache, 'styleguide' warms the
   * styleguide cache.
   */
  type: 'brand' | 'styleguide';

  /**
   * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  timeoutOpts?: UtilityPrefetchParams.TimeoutOpts;
}

export namespace UtilityPrefetchParams {
  /**
   * Prefetch by domain.
   */
  export interface UtilityPrefetchDomainIdentifier {
    /**
     * Domain name to prefetch data for
     */
    domain: string;
  }

  /**
   * Prefetch by email. The domain will be extracted and validated.
   */
  export interface UtilityPrefetchEmailIdentifier {
    /**
     * Email address to prefetch data for. The domain will be extracted from the email.
     * Free email providers (gmail.com, yahoo.com, etc.) and disposable email addresses
     * are not allowed.
     */
    email: string;
  }

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. This endpoint supports "fail": return 408
     * REQUEST_TIMEOUT without charging credits.
     */
    behavior?: 'fail';
  }
}

export declare namespace Utility {
  export {
    type UtilityPrefetchResponse as UtilityPrefetchResponse,
    type UtilityPrefetchParams as UtilityPrefetchParams,
  };
}
