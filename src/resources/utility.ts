// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Prefetch brand and styleguide data so later lookups return sooner.
 */
export class Utility extends APIResource {
  /**
   * Start fetching a domain's brand or styleguide data in the background so a later
   * lookup returns faster. Accepts a domain or a work email.
   *
   * @example
   * ```ts
   * const response = await client.utility.prefetch({
   *   identifier: { domain: 'stripe.com' },
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
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Domain queued for prefetching.
   */
  domain?: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: UtilityPrefetchResponse.KeyMetadata;

  /**
   * Human-readable confirmation.
   */
  message?: string;

  /**
   * Always `ok` on success.
   */
  status?: string;

  /**
   * Data type that was queued, from the request.
   */
  type?: 'brand' | 'styleguide';
}

export namespace UtilityPrefetchResponse {
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

export interface UtilityPrefetchParams {
  /**
   * Domain or work email to prefetch. Provide exactly one.
   */
  identifier:
    | UtilityPrefetchParams.UtilityPrefetchDomainIdentifier
    | UtilityPrefetchParams.UtilityPrefetchEmailIdentifier;

  /**
   * Data to prefetch.
   */
  type: 'brand' | 'styleguide';

  /**
   * Access policy IDs to apply; each URL must pass all of them. Requires access
   * policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
   */
  tags?: Array<string>;

  /**
   * Request deadline. The request fails with 408 when it passes.
   */
  timeoutOpts?: UtilityPrefetchParams.TimeoutOpts;
}

export namespace UtilityPrefetchParams {
  /**
   * Prefetch by domain.
   */
  export interface UtilityPrefetchDomainIdentifier {
    /**
     * Domain to prefetch, such as `stripe.com`.
     */
    domain: string;
  }

  /**
   * Prefetch by work email. Context.dev uses the email's domain.
   */
  export interface UtilityPrefetchEmailIdentifier {
    /**
     * Work email whose domain to prefetch. Free email providers such as `gmail.com`
     * and disposable addresses are rejected with 422.
     */
    email: string;
  }

  /**
   * Request deadline. The request fails with 408 when it passes.
   */
  export interface TimeoutOpts {
    /**
     * Deadline in milliseconds.
     */
    milliseconds: number;

    /**
     * Only `fail` is supported: the request returns 408 at the deadline.
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
