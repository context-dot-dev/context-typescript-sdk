// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Search full-text academic papers from arXiv and Europe PMC.
 */
export class Scholar extends APIResource {
  /**
   * Search the full text of papers from arXiv and Europe PMC by topic or question.
   * Each result includes the matching passage and a direct link to the full text.
   * Page through up to 250 matches, ranked by relevance or newest first.
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
   * Papers on this page, in the requested order.
   */
  data: Array<ScholarSearchResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

  /**
   * Summary of this page.
   */
  meta: ScholarSearchResponse.Meta;

  /**
   * Pass as `cursor` to fetch the next page. `null` on the last page.
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
     * Unique ID of the paper.
     */
    id: string;

    /**
     * Format of the full text at `full_text_url`. `jats` is JATS XML.
     */
    full_text_format: 'pdf' | 'html' | 'jats';

    /**
     * Direct URL of the full text.
     */
    full_text_url: string;

    /**
     * When the paper was published. `null` when unknown.
     */
    published_at: string | null;

    /**
     * Passage that matches the query, or the opening passage when the query is only a
     * paper ID.
     */
    snippet: string;

    /**
     * Title of the paper.
     */
    title: string;

    /**
     * URL of the paper's landing page.
     */
    url: string;
  }

  /**
   * Summary of this page.
   */
  export interface Meta {
    /**
     * Number of papers on this page.
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
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface ScholarSearchParams {
  /**
   * Topic or question to search for. Append one `arxiv:`, `pmcid:`, `pmid:`, or
   * `doi:` ID to search within that paper, such as `protein folding pmid:34265844`,
   * or send the ID on its own.
   */
  query: string;

  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string | null;

  /**
   * Filter by publication date.
   */
  filterBy?: ScholarSearchParams.FilterBy;

  /**
   * Maximum number of papers to return per page.
   */
  limit?: number;

  /**
   * `relevance` puts the closest matches first; `date_desc` puts the newest papers
   * first, with undated papers last. Both orders apply to the top 250 matches.
   */
  sort?: 'relevance' | 'date_desc';

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
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
