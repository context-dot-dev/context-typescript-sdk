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
   * Check progress, and get download links once the batch finishes.
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
   * List your batches from newest to oldest. Filter by status or continue with a
   * cursor.
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
   * Permanently delete a finished batch and its stored results. Active batches must
   * settle first.
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
   * Stop a batch from starting new pages. In-progress pages finish, and unused
   * credits are refunded.
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
   * Page through a finished batch's results as JSON instead of downloading the
   * NDJSON files.
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
   * Scrape 25K URLs or crawl large websites asynchronously.
   *
   * @example
   * ```ts
   * const response = await client.batch.submit({
   *   input: {
   *     data: {
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
 * The crawl controls as submitted, so the limits requested can be compared against
 * what the crawl reached.
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
 * What submission took in, and what it charged for.
 */
export interface Intake {
  /**
   * URLs dropped before reserving because another entry resolved to the same page.
   * Non-zero for sitemap crawls too, whose sitemaps routinely list a page more than
   * once.
   */
  duplicates: number;

  /**
   * URLs from your list rejected as unusable; the same ones are itemised in
   * `invalid_urls` at submission. Null for a crawl — a crawl that resolves no usable
   * page is rejected outright with a 400 rather than accepted with an empty list.
   */
  invalid: number | null;

  /**
   * Pages credits were reserved for. Everything else — progress, the refund, the
   * completion percentage — is measured against this.
   */
  reserved: number;

  /**
   * Whether `reserved` is an upper bound the batch may finish under. True only for a
   * crawl that follows links, whose reachable page count is unknowable until it
   * runs. False for a scrape and for a sitemap crawl, where `reserved` is an exact
   * page count.
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
   * Batch ID used to retrieve or cancel the job.
   */
  id: string;

  /**
   * The crawl controls as submitted, so the limits requested can be compared against
   * what the crawl reached.
   */
  crawl: CrawlControls | null;

  /**
   * What this batch has done to your credit balance.
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
   * What submission took in, and what it charged for.
   */
  input: Intake;

  /**
   * Rejected URLs, up to 100. These are not charged.
   */
  invalid_urls: Array<BatchRetrieveResponse.InvalidURL>;

  /**
   * How pages were selected. Matches `input.mode` on the submit request.
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
   * Download links, available once the batch reaches a final status and null before
   * then. GET /batch/{batch_id}/results serves the same records as paginated JSON.
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
   * What this batch has done to your credit balance.
   */
  export interface Credits {
    /**
     * `reserved` minus `refunded` plus `ocr_charged` — what the batch has cost so far.
     * Equal to `reserved` until the batch settles.
     */
    net: number;

    /**
     * Credits charged for PDF pages recovered by OCR (pdf.ocr=true), 1 per recovered
     * page, on top of `reserved`. Stays 0 until the batch settles.
     */
    ocr_charged: number;

    /**
     * Credits returned for pages that did not succeed. Stays 0 until the batch reaches
     * a final status, then settles in one movement.
     */
    refunded: number;

    /**
     * Credits debited from your balance the moment the batch was accepted. This is a
     * charge, not a forecast — the whole amount leaves the balance up front.
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
     * Reserved pages not yet attempted. A cancelled batch keeps reporting the URLs it
     * never reached; a crawl whose `input.reserved_is_ceiling` is true reports 0 once
     * final, because its unspent budget was never real pages.
     */
    pending: number;

    /**
     * Pages scraped successfully.
     */
    succeeded: number;
  }

  /**
   * Download links, available once the batch reaches a final status and null before
   * then. GET /batch/{batch_id}/results serves the same records as paginated JSON.
   */
  export interface Results {
    /**
     * When the download URLs expire.
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
     * Credits used by this request.
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
   * Batches on this page.
   */
  data?: Array<BatchListResponse.Data>;

  /**
   * Whether another page is available.
   */
  has_more?: boolean;

  /**
   * Credit usage, included whenever a valid API key is provided.
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
     * Batch ID used to retrieve or cancel the job.
     */
    id: string;

    /**
     * The crawl controls as submitted, so the limits requested can be compared against
     * what the crawl reached.
     */
    crawl: BatchAPI.CrawlControls | null;

    /**
     * What this batch has done to your credit balance.
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
     * What submission took in, and what it charged for.
     */
    input: BatchAPI.Intake;

    /**
     * How pages were selected. Matches `input.mode` on the submit request.
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
     * Download links, available once the batch reaches a final status and null before
     * then. GET /batch/{batch_id}/results serves the same records as paginated JSON.
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
     * What this batch has done to your credit balance.
     */
    export interface Credits {
      /**
       * `reserved` minus `refunded` plus `ocr_charged` — what the batch has cost so far.
       * Equal to `reserved` until the batch settles.
       */
      net: number;

      /**
       * Credits charged for PDF pages recovered by OCR (pdf.ocr=true), 1 per recovered
       * page, on top of `reserved`. Stays 0 until the batch settles.
       */
      ocr_charged: number;

      /**
       * Credits returned for pages that did not succeed. Stays 0 until the batch reaches
       * a final status, then settles in one movement.
       */
      refunded: number;

      /**
       * Credits debited from your balance the moment the batch was accepted. This is a
       * charge, not a forecast — the whole amount leaves the balance up front.
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
       * Reserved pages not yet attempted. A cancelled batch keeps reporting the URLs it
       * never reached; a crawl whose `input.reserved_is_ceiling` is true reports 0 once
       * final, because its unspent budget was never real pages.
       */
      pending: number;

      /**
       * Pages scraped successfully.
       */
      succeeded: number;
    }

    /**
     * Download links, available once the batch reaches a final status and null before
     * then. GET /batch/{batch_id}/results serves the same records as paginated JSON.
     */
    export interface Results {
      /**
       * When the download URLs expire.
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

export interface BatchDeleteResponse {
  /**
   * ID of the deleted batch.
   */
  id?: string;

  /**
   * Always true on success.
   */
  deleted?: boolean;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: BatchDeleteResponse.KeyMetadata;
}

export namespace BatchDeleteResponse {
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

export interface BatchCancelResponse {
  /**
   * Batch ID.
   */
  id: string;

  /**
   * The crawl controls as submitted, so the limits requested can be compared against
   * what the crawl reached.
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
   * What submission took in, and what it charged for.
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
   * Always `cancelling`. Work already in flight finishes; the batch reaches
   * `cancelled` shortly after.
   */
  status: 'cancelling';

  /**
   * Tags stored on the batch at submission.
   */
  tags: Array<string>;

  /**
   * There is no finish time yet — the batch is still winding down.
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
     * Credits debited at submission. The unspent remainder is refunded once the batch
     * settles — read `credits.refunded` from GET /batch/{batch_id} then.
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
     * Reserved pages that will now be skipped, and refunded when the batch settles.
     */
    pending: number;

    /**
     * Pages scraped successfully before the request landed.
     */
    succeeded: number;
  }

  /**
   * There is no finish time yet — the batch is still winding down.
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
     * Credits used by this request.
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
   * Result records on this page.
   */
  data?: Array<BatchGetResultsResponse.Ok | BatchGetResultsResponse.Error>;

  /**
   * Whether another page is available.
   */
  has_more?: boolean;

  /**
   * Credit usage, included whenever a valid API key is provided.
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
     * Cache outcome for this response. Composite responses are hits only when every
     * cache-controlled fetch contributing to the output was a hit; age_ms is the
     * oldest contributing hit.
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
     * Caller-supplied identifier echoed from submission.
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
     * PDF pages of this document recovered by OCR (pdf.ocr=true). Each recovered page
     * bills 1 credit on top of the page base credit; absent when no OCR ran.
     */
    ocr_pages?: number;
  }

  export namespace Ok {
    /**
     * Cache outcome for this response. Composite responses are hits only when every
     * cache-controlled fetch contributing to the output was a hit; age_ms is the
     * oldest contributing hit.
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
     * Caller-supplied identifier echoed from submission.
     */
    itemId?: string;

    /**
     * Caller-supplied metadata echoed from submission.
     */
    meta?: { [key: string]: unknown };
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

export interface BatchSubmitResponse {
  /**
   * Batch ID. Poll GET /batch/{batch_id} with it.
   */
  id: string;

  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: BatchSubmitResponse.CacheMetadata;

  /**
   * The crawl controls as submitted, so the limits requested can be compared against
   * what the crawl reached.
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
   * What submission took in, and what it charged for.
   */
  input: Intake;

  /**
   * Rejected URLs, up to 100. These are not charged.
   */
  invalid_urls: Array<BatchSubmitResponse.InvalidURL>;

  /**
   * How pages will be selected.
   */
  mode: 'scrape' | 'crawl';

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
   * Signing secret for the completion webhook, returned only here and never again.
   * Store it now; it is not repeated by GET /batch/{batch_id}.
   */
  webhook_secret?: string;
}

export namespace BatchSubmitResponse {
  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
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
     * Credits just debited from your balance. Whatever the batch does not spend is
     * refunded when it settles.
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
     * Credits used by this request.
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
   * Body param: Completion webhook settings. Cannot be combined with webhookUrl.
   * Omitting retry preserves legacy delivery; retry: {} opts into durable retries.
   */
  webhook?: BatchSubmitParams.Webhook;

  /**
   * Body param: Legacy URL notified when the batch finishes. Preserves one
   * best-effort attempt. Cannot be combined with webhook.
   */
  webhookUrl?: string;

  /**
   * Header param: Any string unique to this submission. Retries with the same key
   * return the original batch.
   */
  'Idempotency-Key'?: string;
}

export namespace BatchSubmitParams {
  /**
   * Scrape up to 25K URLs in one batch.
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
         * Fetch the target page through a residential proxy in this country (ISO 3166-1
         * alpha-2).
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
         * Also include each page's HTML in its result record, as an `html` field alongside
         * the Markdown.
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
         * Keep only the subtrees matching these CSS selectors. Filtered pages are always
         * fetched fresh, ignoring `maxAgeMs`.
         */
        includeSelectors?: Array<string> | null;

        /**
         * Return a cached result if a prior scrape for the same parameters exists and is
         * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
         * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
         */
        maxAgeMs?: number | null;

        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait briefly for CSS and transition animations to settle before extraction, on
         * pages that render in a browser.
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
           * When true, OCR the selected PDF pages that have no usable text layer (scans),
           * replacing each recovered page's text with the OCR result while pages with a real
           * text layer keep it. Billed at 1 credit per page OCR actually recovered, on top
           * of the base request cost. When false, no OCR runs.
           */
          ocr?: boolean;

          /**
           * When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and
           * a 400 PDF_SKIPPED is returned.
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
         * Fetch the target page through a residential proxy in this country (ISO 3166-1
         * alpha-2).
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
         * Keep only the subtrees matching these CSS selectors. Filtered pages are always
         * fetched fresh, ignoring `maxAgeMs`.
         */
        includeSelectors?: Array<string> | null;

        /**
         * Return a cached result if a prior scrape for the same parameters exists and is
         * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
         * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
         */
        maxAgeMs?: number | null;

        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait briefly for CSS and transition animations to settle before extraction, on
         * pages that render in a browser.
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
           * When true, OCR the selected PDF pages that have no usable text layer (scans),
           * replacing each recovered page's text with the OCR result while pages with a real
           * text layer keep it. Billed at 1 credit per page OCR actually recovered, on top
           * of the base request cost. When false, no OCR runs.
           */
          ocr?: boolean;

          /**
           * When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and
           * a 400 PDF_SKIPPED is returned.
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
         * Fetch the target page through a residential proxy in this country (ISO 3166-1
         * alpha-2).
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
         * Also include each page's HTML in its result record, as an `html` field alongside
         * the Markdown.
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
         * Keep only the subtrees matching these CSS selectors. Filtered pages are always
         * fetched fresh, ignoring `maxAgeMs`.
         */
        includeSelectors?: Array<string> | null;

        /**
         * Return a cached result if a prior scrape for the same parameters exists and is
         * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
         * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
         */
        maxAgeMs?: number | null;

        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait briefly for CSS and transition animations to settle before extraction, on
         * pages that render in a browser.
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
           * When true, OCR the selected PDF pages that have no usable text layer (scans),
           * replacing each recovered page's text with the OCR result while pages with a real
           * text layer keep it. Billed at 1 credit per page OCR actually recovered, on top
           * of the base request cost. When false, no OCR runs.
           */
          ocr?: boolean;

          /**
           * When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and
           * a 400 PDF_SKIPPED is returned.
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
         * Fetch the target page through a residential proxy in this country (ISO 3166-1
         * alpha-2).
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
         * Keep only the subtrees matching these CSS selectors. Filtered pages are always
         * fetched fresh, ignoring `maxAgeMs`.
         */
        includeSelectors?: Array<string> | null;

        /**
         * Return a cached result if a prior scrape for the same parameters exists and is
         * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
         * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
         */
        maxAgeMs?: number | null;

        /**
         * PDF parsing controls. Use start/end to limit text extraction and embedded-image
         * detection/OCR to an inclusive 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait briefly for CSS and transition animations to settle before extraction, on
         * pages that render in a browser.
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
           * When true, OCR the selected PDF pages that have no usable text layer (scans),
           * replacing each recovered page's text with the OCR result while pages with a real
           * text layer keep it. Billed at 1 credit per page OCR actually recovered, on top
           * of the base request cost. When false, no OCR runs.
           */
          ocr?: boolean;

          /**
           * When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and
           * a 400 PDF_SKIPPED is returned.
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
   * Completion webhook settings. Cannot be combined with webhookUrl. Omitting retry
   * preserves legacy delivery; retry: {} opts into durable retries.
   */
  export interface Webhook {
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
