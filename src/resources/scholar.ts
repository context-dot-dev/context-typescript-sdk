// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Search full-text academic papers from arXiv and Europe PMC.
 */
export class Scholar extends APIResource {
  /**
   * Search full-text papers from arXiv and Europe PMC. Returns up to 250 relevant
   * papers with matching passages and full-text links.
   *
   * @example
   * ```ts
   * const response = await client.scholar.search({
   *   query: 'CRISPR off-target effects in human cells',
   * });
   * ```
   */
  search(body: ScholarSearchParams, options?: RequestOptions): APIPromise<ScholarSearchResponse> {
    return this._client.post('/scholar/search', { body, ...options });
  }
}

export interface ScholarSearchResponse {
  /**
   * Matching papers in the requested order.
   */
  data: Array<ScholarSearchResponse.Data>;

  /**
   * Whether another page is available.
   */
  has_more: boolean;

  /**
   * Page summary.
   */
  meta: ScholarSearchResponse.Meta;

  /**
   * Cursor for the next page, or null on the last page.
   */
  next_cursor: string | null;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: ScholarSearchResponse.KeyMetadata;
}

export namespace ScholarSearchResponse {
  export interface Data {
    /**
     * Stable paper identifier.
     */
    id: string;

    /**
     * Format of the linked full text. jats is XML.
     */
    full_text_format: 'pdf' | 'html' | 'jats';

    /**
     * Direct link to the full text.
     */
    full_text_url: string;

    /**
     * Publication time in ISO 8601, or null when unknown.
     */
    published_at: string | null;

    /**
     * Matching passage, or opening passage for an ID-only query.
     */
    snippet: string;

    /**
     * Paper title.
     */
    title: string;

    /**
     * Paper landing page.
     */
    url: string;
  }

  /**
   * Page summary.
   */
  export interface Meta {
    /**
     * Papers in this page.
     */
    count: number;
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface ScholarSearchParams {
  /**
   * A topic or question. Append one arxiv:, pmcid:, pmid:, or doi: ID to search
   * within an indexed paper.
   */
  query: string;

  /**
   * Use next_cursor to fetch the next page.
   */
  cursor?: string | null;

  /**
   * Filter by publication date.
   */
  filterBy?: ScholarSearchParams.FilterBy;

  /**
   * Papers per page.
   */
  limit?: number;

  /**
   * Order the top 250 matches. date_desc puts newest first, with undated papers
   * last.
   */
  sort?: 'relevance' | 'date_desc';

  /**
   * Labels for filtering usage in the dashboard.
   */
  tags?: Array<string>;
}

export namespace ScholarSearchParams {
  /**
   * Filter by publication date.
   */
  export interface FilterBy {
    /**
     * Publication date range. Undated papers are excluded.
     */
    date?: FilterBy.Date;
  }

  export namespace FilterBy {
    /**
     * Publication date range. Undated papers are excluded.
     */
    export interface Date {
      /**
       * Inclusive start date, in Unix milliseconds.
       */
      from?: number;

      /**
       * Inclusive end date, in Unix milliseconds.
       */
      to?: number;
    }
  }
}

export declare namespace Scholar {
  export {
    type ScholarSearchResponse as ScholarSearchResponse,
    type ScholarSearchParams as ScholarSearchParams,
  };
}
