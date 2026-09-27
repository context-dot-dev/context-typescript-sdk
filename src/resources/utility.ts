// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Utility extends APIResource {
  /**
   * Queue brand or styleguide data so a later lookup can return sooner.
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
   * The domain that was queued for prefetching
   */
  domain?: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: UtilityPrefetchResponse.KeyMetadata;

  /**
   * Success message
   */
  message?: string;

  /**
   * Always `ok` on success.
   */
  status?: string;

  /**
   * The type of prefetch that was queued, echoed from the request
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
   * Data to prefetch.
   */
  type: 'brand' | 'styleguide';

  /**
   * Labels for filtering usage in the dashboard.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: UtilityPrefetchParams.TimeoutOpts;
}

export namespace UtilityPrefetchParams {
  /**
   * Prefetch by domain.
   */
  export interface UtilityPrefetchDomainIdentifier {
    /**
     * Domain, e.g. `stripe.com`.
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
   * Request deadline and what to return when it passes.
   */
  export interface TimeoutOpts {
    /**
     * Deadline in milliseconds.
     */
    milliseconds: number;

    /**
     * Only "fail" is supported: return 408 at the deadline.
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
