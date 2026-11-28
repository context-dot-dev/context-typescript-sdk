// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Report bugs, wrong results, and docs mismatches to the Context.dev team.
 */
export class Feedback extends APIResource {
  /**
   * Report a bug, docs mismatch, or wrong result to the Context.dev team. Send
   * `request_id`, `url`, or both. Any API key can submit, and a repeat report for
   * the same `request_id` returns the original feedback.
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
   * `true` when feedback for this `request_id` was already recorded. `feedback_id`
   * is then the original ID.
   */
  already_submitted: boolean;

  /**
   * Unique ID of the feedback.
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
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface FeedbackSubmitParams {
  /**
   * Kind of issue. Use `quality_degradation` for wrong or incomplete results and
   * `bad_brand` for wrong or outdated brand data, such as a logo or colors.
   */
  category:
    | 'bug'
    | 'docs_mismatch'
    | 'friction'
    | 'feature_gap'
    | 'quality_degradation'
    | 'bad_brand'
    | 'other';

  /**
   * What went wrong and what you expected instead. Leave out API keys and personal
   * data.
   */
  note: string;

  /**
   * ID of the API call the feedback is about, from its `request_id` or
   * `X-Request-Id` header. Send this, `url`, or both.
   */
  request_id?: string;

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
   */
  tags?: Array<string>;

  /**
   * URL the feedback is about, such as one page of a crawl or a docs page. Send
   * this, `request_id`, or both.
   */
  url?: string;
}

export declare namespace Feedback {
  export {
    type FeedbackSubmitResponse as FeedbackSubmitResponse,
    type FeedbackSubmitParams as FeedbackSubmitParams,
  };
}
