// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Report API issues and documentation mismatches.
 */
export class Feedback extends APIResource {
  /**
   * Report an API issue or documentation mismatch, including request IDs when
   * available.
   *
   * @example
   * ```ts
   * const response = await client.feedback.submit({
   *   category: 'bug',
   *   note: 'Markdown drops the plan comparison table; expected all 4 rows.',
   *   request_id: '3f1c2a6e-8b4d-4c1e-9f0a-2d7b5e6c8a91',
   *   url: 'https://stripe.com/pricing',
   * });
   * ```
   */
  submit(body: FeedbackSubmitParams, options?: RequestOptions): APIPromise<FeedbackSubmitResponse> {
    return this._client.post('/feedback', { body, ...options });
  }
}

export interface FeedbackSubmitResponse {
  /**
   * True when feedback for this request_id was already recorded; the original
   * feedback_id is returned.
   */
  already_submitted: boolean;

  /**
   * ID of the stored feedback.
   */
  feedback_id: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: FeedbackSubmitResponse.KeyMetadata;
}

export namespace FeedbackSubmitResponse {
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

export interface FeedbackSubmitParams {
  /**
   * Kind of issue.
   */
  category: 'bug' | 'docs_mismatch' | 'friction' | 'feature_gap' | 'quality_degradation' | 'other';

  /**
   * What went wrong and what you expected instead.
   */
  note: string;

  /**
   * The request_id of the API call the feedback is about, from its response body or
   * X-Request-Id header.
   */
  request_id?: string;

  /**
   * Labels for filtering usage in the dashboard.
   */
  tags?: Array<string>;

  /**
   * The page the feedback is about, such as one page of a crawl or a docs page.
   */
  url?: string;
}

export declare namespace Feedback {
  export {
    type FeedbackSubmitResponse as FeedbackSubmitResponse,
    type FeedbackSubmitParams as FeedbackSubmitParams,
  };
}
