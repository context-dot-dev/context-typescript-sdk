// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Report bugs, docs mismatches, and friction with any Context.dev API. Submissions cost no credits and use a separate rate limit.
 */
export class Feedback extends APIResource {
  /**
   * Report a problem with a Context.dev API call, docs page, SDK, or CLI. Include
   * request_id, url, or both.
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
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: FeedbackSubmitResponse.KeyMetadata;
}

export namespace FeedbackSubmitResponse {
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
   * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
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
