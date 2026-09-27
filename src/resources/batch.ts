// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as BatchAPI from './batch';
import * as WebhooksAPI from './webhooks/webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Scrape many pages or crawl a site asynchronously.
 */
export class Batch extends APIResource {
  /**
   * Get batch progress and result download links. Result files are deleted 7 days
   * after the batch finishes.
   *
   * @example
   * ```ts
   * const batch = await client.batch.retrieve('batch_9f2c8a');
   * ```
   */
  retrieve(batchID: string, options?: RequestOptions): APIPromise<BatchRetrieveResponse> {
    return this._client.get(path`/batch/${batchID}`, options);
  }

  /**
   * List your batches, newest first, with optional filters.
   *
   * @example
   * ```ts
   * const batches = await client.batch.list();
   * ```
   */
  list(
    query: BatchListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchListResponse> {
    return this._client.get('/batch/list', { query, ...options });
  }

  /**
   * Permanently delete a finished batch and its results. Its webhook deliveries can
   * no longer be retried.
   *
   * @example
   * ```ts
   * const batch = await client.batch.delete('batch_9f2c8a');
   * ```
   */
  delete(batchID: string, options?: RequestOptions): APIPromise<BatchDeleteResponse> {
    return this._client.delete(path`/batch/${batchID}`, options);
  }

  /**
   * Stop a batch from starting new pages. Pages already in progress finish before
   * the batch becomes cancelled.
   *
   * @example
   * ```ts
   * const response = await client.batch.cancel('batch_9f2c8a');
   * ```
   */
  cancel(batchID: string, options?: RequestOptions): APIPromise<BatchCancelResponse> {
    return this._client.post(path`/batch/${batchID}/cancel`, options);
  }

  /**
   * Page through a finished batch’s results as JSON. Results remain available for 7
   * days.
   *
   * @example
   * ```ts
   * const response = await client.batch.getResults(
   *   'batch_9f2c8a',
   * );
   * ```
   */
  getResults(
    batchID: string,
    query: BatchGetResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchGetResultsResponse> {
    return this._client.get(path`/batch/${batchID}/results`, { query, ...options });
  }

  /**
   * Scrape up to 25,000 URLs, or crawl a site, asynchronously. Poll the batch ID or
   * receive a webhook when it finishes.
   *
   * @example
   * ```ts
   * const response = await client.batch.submit({
   *   input: {
   *     mode: 'scrape',
   *     data: {
   *       format: 'markdown',
   *       urls: [
   *         {
   *           url: 'https://example.com/products/anvil',
   *           itemId: 'sku-1',
   *           meta: { category: 'tools' },
   *         },
   *         {
   *           url: 'https://example.com/products/hammer',
   *           itemId: 'sku-2',
   *         },
   *       ],
   *       options: { useMainContentOnly: true },
   *     },
   *   },
   * });
   * ```
   */
  submit(params: BatchSubmitParams, options?: RequestOptions): APIPromise<BatchSubmitResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/batch/submit', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Page failures sharing one error code.
 */
export interface PageErrorCount {
  /**
   * Error code for these failures.
   */
  code: string;

  /**
   * Pages that failed with this code.
   */
  count: number;
}

/**
 * A failure of the batch as a whole, distinct from the per-page failures in
 * `page_errors`.
 */
export interface Failure {
  /**
   * Why the batch itself stopped.
   */
  code: string;

  /**
   * Human-readable explanation.
   */
  message: string;
}

/**
 * Crawl settings as submitted.
 */
export interface CrawlControls {
  /**
   * Whether links to subdomains were followed. Always false for a sitemap crawl.
   */
  follow_subdomains: boolean;

  /**
   * Link depth limit. Always 0 for a sitemap crawl, which never follows links off
   * its URLs; null when a `start_url` crawl set no limit.
   */
  max_depth: number | null;

  /**
   * The `maxUrls` submitted with the crawl. A sitemap crawl scrapes only the URLs
   * its sitemap actually lists, up to this many, so `input.reserved` is often lower.
   */
  max_pages: number;

  /**
   * Where the crawl started.
   */
  source: CrawlControls.StartURL | CrawlControls.Sitemap;

  /**
   * RE2 pattern URLs had to match to be crawled. Null when the crawl set none.
   */
  url_pattern: string | null;
}

export namespace CrawlControls {
  /**
   * The crawl discovered pages by following links from one URL.
   */
  export interface StartURL {
    type: 'start_url';

    /**
     * Page the crawl started from.
     */
    url: string;
  }

  /**
   * The crawl scraped the pages listed in the domain's sitemap.
   */
  export interface Sitemap {
    /**
     * Domain whose sitemap supplied the pages.
     */
    domain: string;

    type: 'sitemap';
  }
}

/**
 * What the submission accepted.
 */
export interface Intake {
  /**
   * URLs dropped before reserving because another entry resolved to the same page.
   * Non-zero for sitemap crawls too, whose sitemaps routinely list a page more than
   * once.
   */
  duplicates: number;

  /**
   * Rejected input URLs; `null` for a crawl.
   */
  invalid: number | null;

  /**
   * Pages accepted; progress counts toward this total.
   */
  reserved: number;

  /**
   * True when `reserved` is a crawl ceiling; false when it is an exact URL count.
   */
  reserved_is_ceiling: boolean;

  /**
   * URLs in the list you sent, before validation and de-duplication. Null for a
   * crawl, which is given a source rather than a list.
   */
  submitted: number | null;
}

export interface BatchRetrieveResponse {
  /**
   * Batch ID.
   */
  id: string;

  /**
   * Crawl settings as submitted.
   */
  crawl: CrawlControls | null;

  /**
   * Batch credit usage and settlement.
   */
  credits: BatchRetrieveResponse.Credits;

  /**
   * A failure of the batch as a whole, distinct from the per-page failures in
   * `page_errors`.
   */
  failure: Failure | null;

  /**
   * What each page is returned as. Matches `input.data.format` on the submit
   * request.
   */
  format: 'markdown' | 'html';

  /**
   * What the submission accepted.
   */
  input: Intake;

  /**
   * Rejected URLs (first 100).
   */
  invalid_urls: Array<BatchRetrieveResponse.InvalidURL>;

  /**
   * `scrape` (URL list) or `crawl`.
   */
  mode: 'scrape' | 'crawl';

  /**
   * Individual page failures grouped by error code, sorted by count. Unrelated to
   * `failure`, which is the batch itself failing.
   */
  page_errors: Array<PageErrorCount>;

  /**
   * Pages attempted so far. Use `status` to check completion.
   */
  progress: BatchRetrieveResponse.Progress;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Result download links; null until the batch finishes. Files are deleted 7 days
   * after the batch finishes.
   */
  results: BatchRetrieveResponse.Results | null;

  /**
   * Current state. `completed`, `cancelled`, and `failed` are final.
   */
  status: 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Tags stored on the batch at submission.
   */
  tags: Array<string>;

  timing: BatchRetrieveResponse.Timing;

  /**
   * API key usage for this request.
   */
  key_metadata?: BatchRetrieveResponse.KeyMetadata;

  /**
   * Batch completion delivery ID, when available.
   */
  webhook_delivery_id?: string;
}

export namespace BatchRetrieveResponse {
  /**
   * Batch credit usage and settlement.
   */
  export interface Credits {
    /**
     * `reserved` minus `refunded` plus `ocr_charged`.
     */
    net: number;

    /**
     * OCR usage charged when the batch settles.
     */
    ocr_charged: number;

    /**
     * Credits returned for unsuccessful pages when the batch settles.
     */
    refunded: number;

    /**
     * Credits held when the batch was accepted.
     */
    reserved: number;
  }

  export interface InvalidURL {
    /**
     * Why it was rejected.
     */
    reason: string;

    /**
     * Rejected URL.
     */
    url: string;
  }

  /**
   * Pages attempted so far. Use `status` to check completion.
   */
  export interface Progress {
    /**
     * Pages that could not be scraped.
     */
    failed: number;

    /**
     * Accepted pages not yet attempted. Unused crawl capacity is excluded after
     * completion.
     */
    pending: number;

    /**
     * Pages scraped successfully.
     */
    succeeded: number;
  }

  /**
   * Result download links; null until the batch finishes. Files are deleted 7 days
   * after the batch finishes.
   */
  export interface Results {
    /**
     * When these links expire (24 hours after this response).
     */
    expires_at: string;

    /**
     * Result files. Order is not guaranteed.
     */
    files: Array<Results.File>;
  }

  export namespace Results {
    export interface File {
      /**
       * Compressed file size in bytes.
       */
      bytes: number;

      /**
       * Results in this file.
       */
      items: number;

      /**
       * Temporary URL for a gzipped NDJSON file.
       */
      url: string;
    }
  }

  export interface Timing {
    /**
     * When processing finished. Null while active.
     */
    completed_at: string | null;

    /**
     * When the batch was created.
     */
    created_at: string;

    /**
     * When processing started. Null while queued.
     */
    started_at: string | null;
  }

  /**
   * API key usage for this request.
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

export interface BatchListResponse {
  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Batches on this page.
   */
  data?: Array<BatchListResponse.Data>;

  /**
   * Whether another page is available.
   */
  has_more?: boolean;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BatchListResponse.KeyMetadata;

  /**
   * Cursor for the next page.
   */
  next_cursor?: string | null;
}

export namespace BatchListResponse {
  /**
   * An asynchronous web scraping job.
   */
  export interface Data {
    /**
     * Batch ID.
     */
    id: string;

    /**
     * Crawl settings as submitted.
     */
    crawl: BatchAPI.CrawlControls | null;

    /**
     * Batch credit usage and settlement.
     */
    credits: Data.Credits;

    /**
     * A failure of the batch as a whole, distinct from the per-page failures in
     * `page_errors`.
     */
    failure: BatchAPI.Failure | null;

    /**
     * What each page is returned as. Matches `input.data.format` on the submit
     * request.
     */
    format: 'markdown' | 'html';

    /**
     * What the submission accepted.
     */
    input: BatchAPI.Intake;

    /**
     * `scrape` (URL list) or `crawl`.
     */
    mode: 'scrape' | 'crawl';

    /**
     * Individual page failures grouped by error code, sorted by count. Unrelated to
     * `failure`, which is the batch itself failing.
     */
    page_errors: Array<BatchAPI.PageErrorCount>;

    /**
     * Pages attempted so far. Use `status` to check completion.
     */
    progress: Data.Progress;

    /**
     * Result download links; null until the batch finishes. Files are deleted 7 days
     * after the batch finishes.
     */
    results: Data.Results | null;

    /**
     * Current state. `completed`, `cancelled`, and `failed` are final.
     */
    status: 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

    /**
     * Tags stored on the batch at submission.
     */
    tags: Array<string>;

    timing: Data.Timing;
  }

  export namespace Data {
    /**
     * Batch credit usage and settlement.
     */
    export interface Credits {
      /**
       * `reserved` minus `refunded` plus `ocr_charged`.
       */
      net: number;

      /**
       * OCR usage charged when the batch settles.
       */
      ocr_charged: number;

      /**
       * Credits returned for unsuccessful pages when the batch settles.
       */
      refunded: number;

      /**
       * Credits held when the batch was accepted.
       */
      reserved: number;
    }

    /**
     * Pages attempted so far. Use `status` to check completion.
     */
    export interface Progress {
      /**
       * Pages that could not be scraped.
       */
      failed: number;

      /**
       * Accepted pages not yet attempted. Unused crawl capacity is excluded after
       * completion.
       */
      pending: number;

      /**
       * Pages scraped successfully.
       */
      succeeded: number;
    }

    /**
     * Result download links; null until the batch finishes. Files are deleted 7 days
     * after the batch finishes.
     */
    export interface Results {
      /**
       * When these links expire (24 hours after this response).
       */
      expires_at: string;

      /**
       * Result files. Order is not guaranteed.
       */
      files: Array<Results.File>;
    }

    export namespace Results {
      export interface File {
        /**
         * Compressed file size in bytes.
         */
        bytes: number;

        /**
         * Results in this file.
         */
        items: number;

        /**
         * Temporary URL for a gzipped NDJSON file.
         */
        url: string;
      }
    }

    export interface Timing {
      /**
       * When processing finished. Null while active.
       */
      completed_at: string | null;

      /**
       * When the batch was created.
       */
      created_at: string;

      /**
       * When processing started. Null while queued.
       */
      started_at: string | null;
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface BatchDeleteResponse {
  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * ID of the deleted batch.
   */
  id?: string;

  /**
   * Always true on success.
   */
  deleted?: boolean;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BatchDeleteResponse.KeyMetadata;
}

export namespace BatchDeleteResponse {
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

export interface BatchCancelResponse {
  /**
   * Batch ID.
   */
  id: string;

  /**
   * Crawl settings as submitted.
   */
  crawl: CrawlControls | null;

  /**
   * What this batch cost so far.
   */
  credits: BatchCancelResponse.Credits;

  /**
   * What each page is returned as.
   */
  format: 'markdown' | 'html';

  /**
   * What the submission accepted.
   */
  input: Intake;

  /**
   * How pages were selected.
   */
  mode: 'scrape' | 'crawl';

  /**
   * Page failures so far, grouped by error code and sorted by count.
   */
  page_errors: Array<PageErrorCount>;

  /**
   * How far the batch got before cancellation.
   */
  progress: BatchCancelResponse.Progress;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Always `cancelling`. Work already in flight finishes; the batch reaches
   * `cancelled` shortly after.
   */
  status: 'cancelling';

  /**
   * Tags stored on the batch at submission.
   */
  tags: Array<string>;

  /**
   * Batch timestamps.
   */
  timing: BatchCancelResponse.Timing;

  /**
   * API key usage for this request.
   */
  key_metadata?: BatchCancelResponse.KeyMetadata;
}

export namespace BatchCancelResponse {
  /**
   * What this batch cost so far.
   */
  export interface Credits {
    /**
     * Credits held at submission; unused credits are refunded when the batch settles.
     */
    reserved: number;
  }

  /**
   * How far the batch got before cancellation.
   */
  export interface Progress {
    /**
     * Pages that could not be scraped before the request landed.
     */
    failed: number;

    /**
     * Pages that will be skipped.
     */
    pending: number;

    /**
     * Pages scraped successfully before the request landed.
     */
    succeeded: number;
  }

  /**
   * Batch timestamps.
   */
  export interface Timing {
    /**
     * When the batch was created.
     */
    created_at: string;

    /**
     * When processing started. Null if it was cancelled while still queued.
     */
    started_at: string | null;
  }

  /**
   * API key usage for this request.
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

export interface BatchGetResultsResponse {
  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Result records on this page.
   */
  data?: Array<BatchGetResultsResponse.Ok | BatchGetResultsResponse.Error>;

  /**
   * Whether another page is available.
   */
  has_more?: boolean;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BatchGetResultsResponse.KeyMetadata;

  /**
   * Cursor for the next page.
   */
  next_cursor?: string | null;
}

export namespace BatchGetResultsResponse {
  /**
   * A page the batch fetched successfully.
   */
  export interface Ok {
    /**
     * Whether this response came from cache.
     */
    cache_metadata: Ok.CacheMetadata;

    /**
     * URL the content was read from, after redirects.
     */
    final_url: string;

    /**
     * HTTP status of the final response, when known.
     */
    http_status: number | null;

    /**
     * Metadata extracted from the scraped page HTML.
     */
    metadata: Ok.Metadata;

    /**
     * The page was scraped.
     */
    status: 'ok';

    /**
     * URL as submitted, or as discovered by the crawl.
     */
    url: string;

    /**
     * Page HTML. Present on html batches, and on markdown batches submitted with
     * `options.includeHTML`.
     */
    html?: string;

    /**
     * Your `itemId` from submission.
     */
    itemId?: string;

    /**
     * Page content as Markdown. Present on markdown batches.
     */
    markdown?: string;

    /**
     * Caller-supplied metadata echoed from submission.
     */
    meta?: { [key: string]: unknown };

    /**
     * Number of PDF pages recovered by OCR. Omitted when OCR did not run.
     */
    ocr_pages?: number;
  }

  export namespace Ok {
    /**
     * Whether this response came from cache.
     */
    export interface CacheMetadata {
      /**
       * Age of the cached data in milliseconds. Zero for miss and zdr responses.
       */
      age_ms: number;

      /**
       * Whether the response was served from cache, required fresh work, or honored
       * zero-data-retention cache bypass.
       */
      status: 'hit' | 'miss' | 'zdr';
    }

    /**
     * Metadata extracted from the scraped page HTML.
     */
    export interface Metadata {
      /**
       * Final URL scraped after redirects or scraper fallback, when known. Falls back to
       * sourceUrl when unavailable.
       */
      finalUrl: string;

      /**
       * Original URL requested by the caller.
       */
      sourceUrl: string;

      /**
       * Additional non-social meta tags not promoted to top-level metadata fields.
       */
      additionalMeta?: { [key: string]: string | Array<string> };

      /**
       * Resolved alternate links from link rel=alternate tags.
       */
      alternates?: Array<Metadata.Alternate>;

      /**
       * Author metadata, when present.
       */
      author?: string;

      /**
       * Resolved canonical URL, when present.
       */
      canonicalUrl?: string;

      /**
       * Best description extracted from standard, Open Graph, or Twitter metadata.
       */
      description?: string;

      /**
       * Resolved favicon URL, when present.
       */
      favicon?: string;

      /**
       * Page headings (h1–h6) in document order, extracted from the unfiltered document.
       * Capped at the first 500 headings. Omitted when the page has none.
       */
      headings?: Array<Metadata.Heading>;

      /**
       * Primary resolved preview image from Open Graph, Twitter, or image metadata.
       */
      image?: string;

      /**
       * JSON-LD structured data blocks parsed from the page.
       */
      jsonLd?: Array<{ [key: string]: unknown }>;

      /**
       * Keywords extracted from the page's keywords meta tag.
       */
      keywords?: Array<string>;

      /**
       * Language extracted from html lang or language meta tags.
       */
      language?: string;

      /**
       * Modified timestamp/date from page metadata, when present.
       */
      modifiedTime?: string;

      /**
       * Open Graph metadata with the og: prefix removed and keys camel-cased.
       */
      openGraph?: { [key: string]: string | Array<string> };

      /**
       * Published timestamp/date from page metadata, when present.
       */
      publishedTime?: string;

      /**
       * Robots meta directive, when present.
       */
      robots?: string;

      /**
       * Site or application name from page metadata.
       */
      siteName?: string;

      /**
       * Best title extracted from the page.
       */
      title?: string;

      /**
       * Twitter card metadata with the twitter: prefix removed and keys camel-cased.
       */
      twitter?: { [key: string]: string | Array<string> };
    }

    export namespace Metadata {
      export interface Alternate {
        /**
         * Resolved alternate URL.
         */
        href: string;

        /**
         * Language or locale for the alternate URL, when present.
         */
        hreflang?: string;

        /**
         * Alternate resource title, when present.
         */
        title?: string;

        /**
         * Alternate resource MIME type, when present.
         */
        type?: string;
      }

      export interface Heading {
        /**
         * Heading level, 1–6 (from h1–h6).
         */
        level: number;

        /**
         * Heading text with whitespace collapsed, truncated to 1000 characters.
         */
        text: string;
      }
    }
  }

  /**
   * A page the batch could not fetch.
   */
  export interface Error {
    /**
     * Why the page failed.
     */
    error_code: string;

    /**
     * Human-readable failure detail.
     */
    message: string;

    /**
     * The page could not be scraped.
     */
    status: 'error';

    /**
     * URL as submitted, or as discovered by the crawl.
     */
    url: string;

    /**
     * Your `itemId` from submission.
     */
    itemId?: string;

    /**
     * Caller-supplied metadata echoed from submission.
     */
    meta?: { [key: string]: unknown };
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

export interface BatchSubmitResponse {
  /**
   * Batch ID. Poll GET /batch/{batch_id} with it.
   */
  id: string;

  /**
   * Whether this response came from cache.
   */
  cache_metadata: BatchSubmitResponse.CacheMetadata;

  /**
   * Crawl settings as submitted.
   */
  crawl: CrawlControls | null;

  /**
   * When the batch was created.
   */
  created_at: string;

  /**
   * What accepting this batch cost.
   */
  credits: BatchSubmitResponse.Credits;

  /**
   * What each page will be returned as.
   */
  format: 'markdown' | 'html';

  /**
   * What the submission accepted.
   */
  input: Intake;

  /**
   * Rejected URLs (first 100).
   */
  invalid_urls: Array<BatchSubmitResponse.InvalidURL>;

  /**
   * How pages will be selected.
   */
  mode: 'scrape' | 'crawl';

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Always `queued`. An accepted batch has not started yet.
   */
  status: 'queued';

  /**
   * Tags stored on the batch.
   */
  tags: Array<string>;

  /**
   * API key usage for this request.
   */
  key_metadata?: BatchSubmitResponse.KeyMetadata;

  /**
   * Secret for verifying `X-Context-Signature`. Only submit returns it, so store it.
   */
  webhook_secret?: string;
}

export namespace BatchSubmitResponse {
  /**
   * Whether this response came from cache.
   */
  export interface CacheMetadata {
    /**
     * Age of the cached data in milliseconds. Zero for miss and zdr responses.
     */
    age_ms: number;

    /**
     * Whether the response was served from cache, required fresh work, or honored
     * zero-data-retention cache bypass.
     */
    status: 'hit' | 'miss' | 'zdr';
  }

  /**
   * What accepting this batch cost.
   */
  export interface Credits {
    /**
     * Credits held at submission.
     */
    reserved: number;
  }

  export interface InvalidURL {
    /**
     * Why it was rejected.
     */
    reason: string;

    /**
     * Rejected URL.
     */
    url: string;
  }

  /**
   * API key usage for this request.
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

export interface BatchListParams {
  /**
   * Cursor from the previous page.
   */
  cursor?: string;

  /**
   * Batches per page. Defaults to 25.
   */
  limit?: number;

  /**
   * Free-text search term, matched against the batch id, crawl source (start URL or
   * sitemap domain), and tags.
   */
  q?: string;

  /**
   * `prefix` for as-you-type prefix matching (default), `exact` for full-token
   * matching.
   */
  search_type?: 'exact' | 'prefix';

  /**
   * Filter by status.
   */
  status?: 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Comma-separated list of tags to filter by (matches batches having any of them).
   */
  tags?: string;
}

export interface BatchGetResultsParams {
  /**
   * next_cursor from the previous page.
   */
  cursor?: string;

  /**
   * Records per page. Defaults to 25. A page can close early so its payload stays
   * under ~8 MB; rely on next_cursor rather than counting records.
   */
  limit?: number;
}

export interface BatchSubmitParams {
  /**
   * Body param: Choose a URL list or a site crawl.
   */
  input: BatchSubmitParams.Scrape | BatchSubmitParams.Crawl;

  /**
   * Body param: Tags stored on the batch. Filter the batch list by them later.
   */
  tags?: Array<string>;

  /**
   * Body param: Where to send the batch's final-status event. Omit `retry` for one
   * attempt; `{}` uses the default retry schedule.
   */
  webhook?: BatchSubmitParams.Webhook;

  /**
   * Body param: Legacy URL notified when the batch finishes. Preserves one
   * best-effort attempt. Cannot be combined with webhook.
   */
  webhookUrl?: string;

  /**
   * Header param: Unique key per submission. Retrying with the same key and body
   * returns the original batch; a different body returns `409`.
   */
  'Idempotency-Key'?: string;
}

export namespace BatchSubmitParams {
  /**
   * Scrape a list of up to 25,000 URLs.
   */
  export interface Scrape {
    /**
     * Pages to scrape and their output format.
     */
    data: Scrape.Markdown | Scrape.HTML;

    /**
     * Scrape the pages in `data.urls`.
     */
    mode: 'scrape';
  }

  export namespace Scrape {
    /**
     * Scrape the listed pages as Markdown.
     */
    export interface Markdown {
      /**
       * Return page content as Markdown.
       */
      format: 'markdown';

      /**
       * Pages to scrape. Maximum 25000.
       */
      urls: Array<Markdown.URL>;

      /**
       * Options for Markdown output.
       */
      options?: Markdown.Options;
    }

    export namespace Markdown {
      /**
       * A page to scrape, with optional data for matching results.
       */
      export interface URL {
        /**
         * Page URL to scrape.
         */
        url: string;

        /**
         * Your ID for this page, returned with its result. The same URL can use different
         * IDs.
         */
        itemId?: string;

        /**
         * Custom JSON returned unchanged with this page result.
         */
        meta?: { [key: string]: unknown };
      }

      /**
       * Options for Markdown output.
       */
      export interface Options {
        /**
         * Fetch from this country (ISO 3166-1 alpha-2).
         */
        country?:
          | 'ad'
          | 'ae'
          | 'af'
          | 'ag'
          | 'ai'
          | 'al'
          | 'am'
          | 'ao'
          | 'ar'
          | 'at'
          | 'au'
          | 'aw'
          | 'az'
          | 'ba'
          | 'bb'
          | 'bd'
          | 'be'
          | 'bf'
          | 'bg'
          | 'bh'
          | 'bi'
          | 'bj'
          | 'bm'
          | 'bn'
          | 'bo'
          | 'bq'
          | 'br'
          | 'bs'
          | 'bw'
          | 'by'
          | 'bz'
          | 'ca'
          | 'cd'
          | 'cf'
          | 'cg'
          | 'ch'
          | 'ci'
          | 'cl'
          | 'cm'
          | 'cn'
          | 'co'
          | 'cr'
          | 'cv'
          | 'cw'
          | 'cy'
          | 'cz'
          | 'de'
          | 'dj'
          | 'dk'
          | 'dm'
          | 'do'
          | 'dz'
          | 'ec'
          | 'ee'
          | 'eg'
          | 'es'
          | 'et'
          | 'fi'
          | 'fj'
          | 'fr'
          | 'ga'
          | 'gb'
          | 'gd'
          | 'ge'
          | 'gf'
          | 'gg'
          | 'gh'
          | 'gm'
          | 'gn'
          | 'gp'
          | 'gq'
          | 'gr'
          | 'gt'
          | 'gu'
          | 'gw'
          | 'gy'
          | 'hk'
          | 'hn'
          | 'hr'
          | 'ht'
          | 'hu'
          | 'id'
          | 'ie'
          | 'il'
          | 'im'
          | 'in'
          | 'iq'
          | 'ir'
          | 'is'
          | 'it'
          | 'je'
          | 'jm'
          | 'jo'
          | 'jp'
          | 'ke'
          | 'kg'
          | 'kh'
          | 'kn'
          | 'kr'
          | 'kw'
          | 'ky'
          | 'kz'
          | 'la'
          | 'lb'
          | 'lc'
          | 'lk'
          | 'lr'
          | 'ls'
          | 'lt'
          | 'lu'
          | 'lv'
          | 'ly'
          | 'ma'
          | 'mc'
          | 'md'
          | 'me'
          | 'mf'
          | 'mg'
          | 'mk'
          | 'ml'
          | 'mm'
          | 'mn'
          | 'mo'
          | 'mq'
          | 'mr'
          | 'mt'
          | 'mu'
          | 'mv'
          | 'mw'
          | 'mx'
          | 'my'
          | 'mz'
          | 'na'
          | 'nc'
          | 'ne'
          | 'ng'
          | 'ni'
          | 'nl'
          | 'no'
          | 'np'
          | 'nz'
          | 'om'
          | 'pa'
          | 'pe'
          | 'pf'
          | 'pg'
          | 'ph'
          | 'pk'
          | 'pl'
          | 'pr'
          | 'ps'
          | 'pt'
          | 'py'
          | 'qa'
          | 're'
          | 'ro'
          | 'rs'
          | 'ru'
          | 'rw'
          | 'sa'
          | 'sc'
          | 'sd'
          | 'se'
          | 'sg'
          | 'si'
          | 'sk'
          | 'sl'
          | 'sm'
          | 'sn'
          | 'so'
          | 'sr'
          | 'ss'
          | 'st'
          | 'sv'
          | 'sx'
          | 'sy'
          | 'sz'
          | 'tc'
          | 'td'
          | 'tg'
          | 'th'
          | 'tj'
          | 'tl'
          | 'tm'
          | 'tn'
          | 'tr'
          | 'tt'
          | 'tw'
          | 'tz'
          | 'ua'
          | 'ug'
          | 'us'
          | 'uy'
          | 'uz'
          | 'vc'
          | 've'
          | 'vg'
          | 'vi'
          | 'vn'
          | 'ye'
          | 'yt'
          | 'za'
          | 'zm'
          | 'zw';

        /**
         * Remove elements matching these CSS selectors. Applied after `includeSelectors`,
         * so an element matching both is removed.
         */
        excludeSelectors?: Array<string> | null;

        /**
         * Also return each page's HTML in `html`.
         */
        includeHTML?: boolean;

        /**
         * Include image references in the Markdown.
         */
        includeImages?: boolean;

        /**
         * Include links in the Markdown.
         */
        includeLinks?: boolean;

        /**
         * Keep only elements matching these CSS selectors. Filtered pages ignore
         * `maxAgeMs`.
         */
        includeSelectors?: Array<string> | null;

        /**
         * Maximum cache age in milliseconds. Defaults to 3 days (259200000 ms). Maximum: 1
         * year (31536000000 ms). `0` fetches fresh.
         */
        maxAgeMs?: number | null;

        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait for CSS animations to finish before extracting, on browser-rendered pages.
         */
        settleAnimations?: boolean;

        /**
         * Shorten inline base64 image data.
         */
        shortenBase64Images?: boolean;

        /**
         * Return the main content without navigation or footers.
         */
        useMainContentOnly?: boolean;

        /**
         * How long to wait after initial page load, in milliseconds. `0` waits 500 ms.
         */
        waitForMs?: number;
      }

      export namespace Options {
        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        export interface Pdf {
          /**
           * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
           * Must be greater than or equal to start when both are provided.
           */
          end?: number;

          /**
           * Read scanned PDF pages with OCR; preserve pages that already have text.
           */
          ocr?: boolean;

          /**
           * Parse PDF URLs. When false, PDFs fail with `PDF_SKIPPED`.
           */
          shouldParse?: boolean;

          /**
           * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
           */
          start?: number;
        }
      }
    }

    /**
     * Scrape the listed pages as HTML.
     */
    export interface HTML {
      /**
       * Return page content as HTML.
       */
      format: 'html';

      /**
       * Pages to scrape. Maximum 25000.
       */
      urls: Array<HTML.URL>;

      /**
       * Options for HTML output.
       */
      options?: HTML.Options;
    }

    export namespace HTML {
      /**
       * A page to scrape, with optional data for matching results.
       */
      export interface URL {
        /**
         * Page URL to scrape.
         */
        url: string;

        /**
         * Your ID for this page, returned with its result. The same URL can use different
         * IDs.
         */
        itemId?: string;

        /**
         * Custom JSON returned unchanged with this page result.
         */
        meta?: { [key: string]: unknown };
      }

      /**
       * Options for HTML output.
       */
      export interface Options {
        /**
         * Fetch from this country (ISO 3166-1 alpha-2).
         */
        country?:
          | 'ad'
          | 'ae'
          | 'af'
          | 'ag'
          | 'ai'
          | 'al'
          | 'am'
          | 'ao'
          | 'ar'
          | 'at'
          | 'au'
          | 'aw'
          | 'az'
          | 'ba'
          | 'bb'
          | 'bd'
          | 'be'
          | 'bf'
          | 'bg'
          | 'bh'
          | 'bi'
          | 'bj'
          | 'bm'
          | 'bn'
          | 'bo'
          | 'bq'
          | 'br'
          | 'bs'
          | 'bw'
          | 'by'
          | 'bz'
          | 'ca'
          | 'cd'
          | 'cf'
          | 'cg'
          | 'ch'
          | 'ci'
          | 'cl'
          | 'cm'
          | 'cn'
          | 'co'
          | 'cr'
          | 'cv'
          | 'cw'
          | 'cy'
          | 'cz'
          | 'de'
          | 'dj'
          | 'dk'
          | 'dm'
          | 'do'
          | 'dz'
          | 'ec'
          | 'ee'
          | 'eg'
          | 'es'
          | 'et'
          | 'fi'
          | 'fj'
          | 'fr'
          | 'ga'
          | 'gb'
          | 'gd'
          | 'ge'
          | 'gf'
          | 'gg'
          | 'gh'
          | 'gm'
          | 'gn'
          | 'gp'
          | 'gq'
          | 'gr'
          | 'gt'
          | 'gu'
          | 'gw'
          | 'gy'
          | 'hk'
          | 'hn'
          | 'hr'
          | 'ht'
          | 'hu'
          | 'id'
          | 'ie'
          | 'il'
          | 'im'
          | 'in'
          | 'iq'
          | 'ir'
          | 'is'
          | 'it'
          | 'je'
          | 'jm'
          | 'jo'
          | 'jp'
          | 'ke'
          | 'kg'
          | 'kh'
          | 'kn'
          | 'kr'
          | 'kw'
          | 'ky'
          | 'kz'
          | 'la'
          | 'lb'
          | 'lc'
          | 'lk'
          | 'lr'
          | 'ls'
          | 'lt'
          | 'lu'
          | 'lv'
          | 'ly'
          | 'ma'
          | 'mc'
          | 'md'
          | 'me'
          | 'mf'
          | 'mg'
          | 'mk'
          | 'ml'
          | 'mm'
          | 'mn'
          | 'mo'
          | 'mq'
          | 'mr'
          | 'mt'
          | 'mu'
          | 'mv'
          | 'mw'
          | 'mx'
          | 'my'
          | 'mz'
          | 'na'
          | 'nc'
          | 'ne'
          | 'ng'
          | 'ni'
          | 'nl'
          | 'no'
          | 'np'
          | 'nz'
          | 'om'
          | 'pa'
          | 'pe'
          | 'pf'
          | 'pg'
          | 'ph'
          | 'pk'
          | 'pl'
          | 'pr'
          | 'ps'
          | 'pt'
          | 'py'
          | 'qa'
          | 're'
          | 'ro'
          | 'rs'
          | 'ru'
          | 'rw'
          | 'sa'
          | 'sc'
          | 'sd'
          | 'se'
          | 'sg'
          | 'si'
          | 'sk'
          | 'sl'
          | 'sm'
          | 'sn'
          | 'so'
          | 'sr'
          | 'ss'
          | 'st'
          | 'sv'
          | 'sx'
          | 'sy'
          | 'sz'
          | 'tc'
          | 'td'
          | 'tg'
          | 'th'
          | 'tj'
          | 'tl'
          | 'tm'
          | 'tn'
          | 'tr'
          | 'tt'
          | 'tw'
          | 'tz'
          | 'ua'
          | 'ug'
          | 'us'
          | 'uy'
          | 'uz'
          | 'vc'
          | 've'
          | 'vg'
          | 'vi'
          | 'vn'
          | 'ye'
          | 'yt'
          | 'za'
          | 'zm'
          | 'zw';

        /**
         * Remove elements matching these CSS selectors. Applied after `includeSelectors`,
         * so an element matching both is removed.
         */
        excludeSelectors?: Array<string> | null;

        /**
         * Keep only elements matching these CSS selectors. Filtered pages ignore
         * `maxAgeMs`.
         */
        includeSelectors?: Array<string> | null;

        /**
         * Maximum cache age in milliseconds. Defaults to 3 days (259200000 ms). Maximum: 1
         * year (31536000000 ms). `0` fetches fresh.
         */
        maxAgeMs?: number | null;

        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait for CSS animations to finish before extracting, on browser-rendered pages.
         */
        settleAnimations?: boolean;

        /**
         * Return the main content without navigation or footers.
         */
        useMainContentOnly?: boolean;

        /**
         * How long to wait after initial page load, in milliseconds. `0` waits 500 ms.
         */
        waitForMs?: number;
      }

      export namespace Options {
        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        export interface Pdf {
          /**
           * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
           * Must be greater than or equal to start when both are provided.
           */
          end?: number;

          /**
           * Read scanned PDF pages with OCR; preserve pages that already have text.
           */
          ocr?: boolean;

          /**
           * Parse PDF URLs. When false, PDFs fail with `PDF_SKIPPED`.
           */
          shouldParse?: boolean;

          /**
           * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
           */
          start?: number;
        }
      }
    }
  }

  /**
   * Crawl pages starting from a URL or from a domain's sitemap.
   */
  export interface Crawl {
    /**
     * Crawl source and output format.
     */
    data: Crawl.Markdown | Crawl.HTML;

    /**
     * Discover and scrape pages from `data.source`.
     */
    mode: 'crawl';
  }

  export namespace Crawl {
    /**
     * Crawl pages and return Markdown.
     */
    export interface Markdown {
      /**
       * Return page content as Markdown.
       */
      format: 'markdown';

      /**
       * How to find pages to crawl.
       */
      source: Markdown.StartURL | Markdown.Sitemap;

      /**
       * Options for Markdown output.
       */
      options?: Markdown.Options;
    }

    export namespace Markdown {
      /**
       * Discover pages by following links from one URL.
       */
      export interface StartURL {
        /**
         * Start from one page.
         */
        type: 'start_url';

        /**
         * Page where crawling begins. A URL without a scheme is read as https://.
         */
        url: string;

        /**
         * Limits and filters for page discovery.
         */
        controls?: StartURL.Controls;
      }

      export namespace StartURL {
        /**
         * Limits and filters for page discovery.
         */
        export interface Controls {
          /**
           * Follow links to subdomains.
           */
          followSubdomains?: boolean;

          /**
           * Maximum link depth. Source pages are depth 0. No limit when omitted.
           */
          maxDepth?: number;

          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 25000.
           */
          maxUrls?: number;

          /**
           * RE2 pattern for URLs to include. The `start_url` itself is always included.
           */
          regex?: string;
        }
      }

      /**
       * Scrape the pages listed in a domain's sitemap. Links on those pages are not
       * followed.
       */
      export interface Sitemap {
        /**
         * Domain whose sitemap lists the pages to scrape. A full URL is reduced to its
         * domain.
         */
        domain: string;

        /**
         * Scrape the URLs in the domain's sitemap.
         */
        type: 'sitemap';

        /**
         * Limits and filters for the sitemap URLs. A sitemap batch scrapes exactly those
         * URLs and never follows links off them, so there is no crawl depth here.
         */
        controls?: Sitemap.Controls;
      }

      export namespace Sitemap {
        /**
         * Limits and filters for the sitemap URLs. A sitemap batch scrapes exactly those
         * URLs and never follows links off them, so there is no crawl depth here.
         */
        export interface Controls {
          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 25000.
           */
          maxUrls?: number;

          /**
           * RE2 pattern; only sitemap URLs matching it are scraped.
           */
          regex?: string;
        }
      }

      /**
       * Options for Markdown output.
       */
      export interface Options {
        /**
         * Fetch from this country (ISO 3166-1 alpha-2).
         */
        country?:
          | 'ad'
          | 'ae'
          | 'af'
          | 'ag'
          | 'ai'
          | 'al'
          | 'am'
          | 'ao'
          | 'ar'
          | 'at'
          | 'au'
          | 'aw'
          | 'az'
          | 'ba'
          | 'bb'
          | 'bd'
          | 'be'
          | 'bf'
          | 'bg'
          | 'bh'
          | 'bi'
          | 'bj'
          | 'bm'
          | 'bn'
          | 'bo'
          | 'bq'
          | 'br'
          | 'bs'
          | 'bw'
          | 'by'
          | 'bz'
          | 'ca'
          | 'cd'
          | 'cf'
          | 'cg'
          | 'ch'
          | 'ci'
          | 'cl'
          | 'cm'
          | 'cn'
          | 'co'
          | 'cr'
          | 'cv'
          | 'cw'
          | 'cy'
          | 'cz'
          | 'de'
          | 'dj'
          | 'dk'
          | 'dm'
          | 'do'
          | 'dz'
          | 'ec'
          | 'ee'
          | 'eg'
          | 'es'
          | 'et'
          | 'fi'
          | 'fj'
          | 'fr'
          | 'ga'
          | 'gb'
          | 'gd'
          | 'ge'
          | 'gf'
          | 'gg'
          | 'gh'
          | 'gm'
          | 'gn'
          | 'gp'
          | 'gq'
          | 'gr'
          | 'gt'
          | 'gu'
          | 'gw'
          | 'gy'
          | 'hk'
          | 'hn'
          | 'hr'
          | 'ht'
          | 'hu'
          | 'id'
          | 'ie'
          | 'il'
          | 'im'
          | 'in'
          | 'iq'
          | 'ir'
          | 'is'
          | 'it'
          | 'je'
          | 'jm'
          | 'jo'
          | 'jp'
          | 'ke'
          | 'kg'
          | 'kh'
          | 'kn'
          | 'kr'
          | 'kw'
          | 'ky'
          | 'kz'
          | 'la'
          | 'lb'
          | 'lc'
          | 'lk'
          | 'lr'
          | 'ls'
          | 'lt'
          | 'lu'
          | 'lv'
          | 'ly'
          | 'ma'
          | 'mc'
          | 'md'
          | 'me'
          | 'mf'
          | 'mg'
          | 'mk'
          | 'ml'
          | 'mm'
          | 'mn'
          | 'mo'
          | 'mq'
          | 'mr'
          | 'mt'
          | 'mu'
          | 'mv'
          | 'mw'
          | 'mx'
          | 'my'
          | 'mz'
          | 'na'
          | 'nc'
          | 'ne'
          | 'ng'
          | 'ni'
          | 'nl'
          | 'no'
          | 'np'
          | 'nz'
          | 'om'
          | 'pa'
          | 'pe'
          | 'pf'
          | 'pg'
          | 'ph'
          | 'pk'
          | 'pl'
          | 'pr'
          | 'ps'
          | 'pt'
          | 'py'
          | 'qa'
          | 're'
          | 'ro'
          | 'rs'
          | 'ru'
          | 'rw'
          | 'sa'
          | 'sc'
          | 'sd'
          | 'se'
          | 'sg'
          | 'si'
          | 'sk'
          | 'sl'
          | 'sm'
          | 'sn'
          | 'so'
          | 'sr'
          | 'ss'
          | 'st'
          | 'sv'
          | 'sx'
          | 'sy'
          | 'sz'
          | 'tc'
          | 'td'
          | 'tg'
          | 'th'
          | 'tj'
          | 'tl'
          | 'tm'
          | 'tn'
          | 'tr'
          | 'tt'
          | 'tw'
          | 'tz'
          | 'ua'
          | 'ug'
          | 'us'
          | 'uy'
          | 'uz'
          | 'vc'
          | 've'
          | 'vg'
          | 'vi'
          | 'vn'
          | 'ye'
          | 'yt'
          | 'za'
          | 'zm'
          | 'zw';

        /**
         * Remove elements matching these CSS selectors. Applied after `includeSelectors`,
         * so an element matching both is removed.
         */
        excludeSelectors?: Array<string> | null;

        /**
         * Also return each page's HTML in `html`.
         */
        includeHTML?: boolean;

        /**
         * Include image references in the Markdown.
         */
        includeImages?: boolean;

        /**
         * Include links in the Markdown.
         */
        includeLinks?: boolean;

        /**
         * Keep only elements matching these CSS selectors. Filtered pages ignore
         * `maxAgeMs`.
         */
        includeSelectors?: Array<string> | null;

        /**
         * Maximum cache age in milliseconds. Defaults to 3 days (259200000 ms). Maximum: 1
         * year (31536000000 ms). `0` fetches fresh.
         */
        maxAgeMs?: number | null;

        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait for CSS animations to finish before extracting, on browser-rendered pages.
         */
        settleAnimations?: boolean;

        /**
         * Shorten inline base64 image data.
         */
        shortenBase64Images?: boolean;

        /**
         * Return the main content without navigation or footers.
         */
        useMainContentOnly?: boolean;

        /**
         * How long to wait after initial page load, in milliseconds. `0` waits 500 ms.
         */
        waitForMs?: number;
      }

      export namespace Options {
        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        export interface Pdf {
          /**
           * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
           * Must be greater than or equal to start when both are provided.
           */
          end?: number;

          /**
           * Read scanned PDF pages with OCR; preserve pages that already have text.
           */
          ocr?: boolean;

          /**
           * Parse PDF URLs. When false, PDFs fail with `PDF_SKIPPED`.
           */
          shouldParse?: boolean;

          /**
           * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
           */
          start?: number;
        }
      }
    }

    /**
     * Crawl pages and return HTML.
     */
    export interface HTML {
      /**
       * Return page content as HTML.
       */
      format: 'html';

      /**
       * How to find pages to crawl.
       */
      source: HTML.StartURL | HTML.Sitemap;

      /**
       * Options for HTML output.
       */
      options?: HTML.Options;
    }

    export namespace HTML {
      /**
       * Discover pages by following links from one URL.
       */
      export interface StartURL {
        /**
         * Start from one page.
         */
        type: 'start_url';

        /**
         * Page where crawling begins. A URL without a scheme is read as https://.
         */
        url: string;

        /**
         * Limits and filters for page discovery.
         */
        controls?: StartURL.Controls;
      }

      export namespace StartURL {
        /**
         * Limits and filters for page discovery.
         */
        export interface Controls {
          /**
           * Follow links to subdomains.
           */
          followSubdomains?: boolean;

          /**
           * Maximum link depth. Source pages are depth 0. No limit when omitted.
           */
          maxDepth?: number;

          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 25000.
           */
          maxUrls?: number;

          /**
           * RE2 pattern for URLs to include. The `start_url` itself is always included.
           */
          regex?: string;
        }
      }

      /**
       * Scrape the pages listed in a domain's sitemap. Links on those pages are not
       * followed.
       */
      export interface Sitemap {
        /**
         * Domain whose sitemap lists the pages to scrape. A full URL is reduced to its
         * domain.
         */
        domain: string;

        /**
         * Scrape the URLs in the domain's sitemap.
         */
        type: 'sitemap';

        /**
         * Limits and filters for the sitemap URLs. A sitemap batch scrapes exactly those
         * URLs and never follows links off them, so there is no crawl depth here.
         */
        controls?: Sitemap.Controls;
      }

      export namespace Sitemap {
        /**
         * Limits and filters for the sitemap URLs. A sitemap batch scrapes exactly those
         * URLs and never follows links off them, so there is no crawl depth here.
         */
        export interface Controls {
          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 25000.
           */
          maxUrls?: number;

          /**
           * RE2 pattern; only sitemap URLs matching it are scraped.
           */
          regex?: string;
        }
      }

      /**
       * Options for HTML output.
       */
      export interface Options {
        /**
         * Fetch from this country (ISO 3166-1 alpha-2).
         */
        country?:
          | 'ad'
          | 'ae'
          | 'af'
          | 'ag'
          | 'ai'
          | 'al'
          | 'am'
          | 'ao'
          | 'ar'
          | 'at'
          | 'au'
          | 'aw'
          | 'az'
          | 'ba'
          | 'bb'
          | 'bd'
          | 'be'
          | 'bf'
          | 'bg'
          | 'bh'
          | 'bi'
          | 'bj'
          | 'bm'
          | 'bn'
          | 'bo'
          | 'bq'
          | 'br'
          | 'bs'
          | 'bw'
          | 'by'
          | 'bz'
          | 'ca'
          | 'cd'
          | 'cf'
          | 'cg'
          | 'ch'
          | 'ci'
          | 'cl'
          | 'cm'
          | 'cn'
          | 'co'
          | 'cr'
          | 'cv'
          | 'cw'
          | 'cy'
          | 'cz'
          | 'de'
          | 'dj'
          | 'dk'
          | 'dm'
          | 'do'
          | 'dz'
          | 'ec'
          | 'ee'
          | 'eg'
          | 'es'
          | 'et'
          | 'fi'
          | 'fj'
          | 'fr'
          | 'ga'
          | 'gb'
          | 'gd'
          | 'ge'
          | 'gf'
          | 'gg'
          | 'gh'
          | 'gm'
          | 'gn'
          | 'gp'
          | 'gq'
          | 'gr'
          | 'gt'
          | 'gu'
          | 'gw'
          | 'gy'
          | 'hk'
          | 'hn'
          | 'hr'
          | 'ht'
          | 'hu'
          | 'id'
          | 'ie'
          | 'il'
          | 'im'
          | 'in'
          | 'iq'
          | 'ir'
          | 'is'
          | 'it'
          | 'je'
          | 'jm'
          | 'jo'
          | 'jp'
          | 'ke'
          | 'kg'
          | 'kh'
          | 'kn'
          | 'kr'
          | 'kw'
          | 'ky'
          | 'kz'
          | 'la'
          | 'lb'
          | 'lc'
          | 'lk'
          | 'lr'
          | 'ls'
          | 'lt'
          | 'lu'
          | 'lv'
          | 'ly'
          | 'ma'
          | 'mc'
          | 'md'
          | 'me'
          | 'mf'
          | 'mg'
          | 'mk'
          | 'ml'
          | 'mm'
          | 'mn'
          | 'mo'
          | 'mq'
          | 'mr'
          | 'mt'
          | 'mu'
          | 'mv'
          | 'mw'
          | 'mx'
          | 'my'
          | 'mz'
          | 'na'
          | 'nc'
          | 'ne'
          | 'ng'
          | 'ni'
          | 'nl'
          | 'no'
          | 'np'
          | 'nz'
          | 'om'
          | 'pa'
          | 'pe'
          | 'pf'
          | 'pg'
          | 'ph'
          | 'pk'
          | 'pl'
          | 'pr'
          | 'ps'
          | 'pt'
          | 'py'
          | 'qa'
          | 're'
          | 'ro'
          | 'rs'
          | 'ru'
          | 'rw'
          | 'sa'
          | 'sc'
          | 'sd'
          | 'se'
          | 'sg'
          | 'si'
          | 'sk'
          | 'sl'
          | 'sm'
          | 'sn'
          | 'so'
          | 'sr'
          | 'ss'
          | 'st'
          | 'sv'
          | 'sx'
          | 'sy'
          | 'sz'
          | 'tc'
          | 'td'
          | 'tg'
          | 'th'
          | 'tj'
          | 'tl'
          | 'tm'
          | 'tn'
          | 'tr'
          | 'tt'
          | 'tw'
          | 'tz'
          | 'ua'
          | 'ug'
          | 'us'
          | 'uy'
          | 'uz'
          | 'vc'
          | 've'
          | 'vg'
          | 'vi'
          | 'vn'
          | 'ye'
          | 'yt'
          | 'za'
          | 'zm'
          | 'zw';

        /**
         * Remove elements matching these CSS selectors. Applied after `includeSelectors`,
         * so an element matching both is removed.
         */
        excludeSelectors?: Array<string> | null;

        /**
         * Keep only elements matching these CSS selectors. Filtered pages ignore
         * `maxAgeMs`.
         */
        includeSelectors?: Array<string> | null;

        /**
         * Maximum cache age in milliseconds. Defaults to 3 days (259200000 ms). Maximum: 1
         * year (31536000000 ms). `0` fetches fresh.
         */
        maxAgeMs?: number | null;

        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait for CSS animations to finish before extracting, on browser-rendered pages.
         */
        settleAnimations?: boolean;

        /**
         * Return the main content without navigation or footers.
         */
        useMainContentOnly?: boolean;

        /**
         * How long to wait after initial page load, in milliseconds. `0` waits 500 ms.
         */
        waitForMs?: number;
      }

      export namespace Options {
        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        export interface Pdf {
          /**
           * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
           * Must be greater than or equal to start when both are provided.
           */
          end?: number;

          /**
           * Read scanned PDF pages with OCR; preserve pages that already have text.
           */
          ocr?: boolean;

          /**
           * Parse PDF URLs. When false, PDFs fail with `PDF_SKIPPED`.
           */
          shouldParse?: boolean;

          /**
           * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
           */
          start?: number;
        }
      }
    }
  }

  /**
   * Where to send the batch's final-status event. Omit `retry` for one attempt; `{}`
   * uses the default retry schedule.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives batch completion, failure, or cancellation
     * events.
     */
    url: string;

    /**
     * Webhook retry settings. Use {} for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;
  }
}

export declare namespace Batch {
  export {
    type PageErrorCount as PageErrorCount,
    type Failure as Failure,
    type CrawlControls as CrawlControls,
    type Intake as Intake,
    type BatchRetrieveResponse as BatchRetrieveResponse,
    type BatchListResponse as BatchListResponse,
    type BatchDeleteResponse as BatchDeleteResponse,
    type BatchCancelResponse as BatchCancelResponse,
    type BatchGetResultsResponse as BatchGetResultsResponse,
    type BatchSubmitResponse as BatchSubmitResponse,
    type BatchListParams as BatchListParams,
    type BatchGetResultsParams as BatchGetResultsParams,
    type BatchSubmitParams as BatchSubmitParams,
  };
}
