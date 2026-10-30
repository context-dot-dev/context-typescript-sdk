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
   * Get batch progress and result download links. Result files are deleted 180 days
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
   * Page through a finished batch’s results as JSON. Each record contains result
   * with the same outputs and per-format errors as POST /web/scrape. Results remain
   * available for 180 days.
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
   * Scrape up to 100,000 URLs, or crawl a site, asynchronously using the same
   * formats and scrape parameters as POST /web/scrape. Choose Markdown, HTML,
   * screenshots, images, bytes, parsed fields, products, highlights, and JSON. Poll
   * the batch ID or receive a webhook when it finishes.
   *
   * @example
   * ```ts
   * const response = await client.batch.submit({
   *   input: {
   *     mode: 'scrape',
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
   *       formats: { markdown: true, html: true },
   *       sharedParams: { mainContentOnly: true },
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
   * Regex pattern URLs must not match to be crawled. Null when the crawl set none.
   */
  exclude_url_pattern: string | null;

  /**
   * Whether links to subdomains were followed. Always false for a sitemap crawl.
   */
  follow_subdomains: boolean;

  /**
   * Languages whose pages were followed; null when all languages were.
   */
  languages:
    | 'same_as_start_url'
    | Array<
        | 'am'
        | 'ar'
        | 'az'
        | 'be'
        | 'bg'
        | 'bn'
        | 'ca'
        | 'ceb'
        | 'cs'
        | 'cy'
        | 'da'
        | 'de'
        | 'el'
        | 'en'
        | 'es'
        | 'et'
        | 'eu'
        | 'fa'
        | 'fi'
        | 'fr'
        | 'gu'
        | 'ha'
        | 'haw'
        | 'he'
        | 'hi'
        | 'hr'
        | 'hu'
        | 'hy'
        | 'id'
        | 'is'
        | 'it'
        | 'ja'
        | 'ka'
        | 'kk'
        | 'kn'
        | 'ko'
        | 'ku'
        | 'ky'
        | 'lo'
        | 'lt'
        | 'lv'
        | 'mk'
        | 'ml'
        | 'mn'
        | 'mr'
        | 'ms'
        | 'ne'
        | 'nl'
        | 'no'
        | 'or'
        | 'pa'
        | 'pl'
        | 'ps'
        | 'pt'
        | 'ro'
        | 'ru'
        | 'sk'
        | 'sl'
        | 'so'
        | 'sq'
        | 'sr'
        | 'sv'
        | 'sw'
        | 'ta'
        | 'te'
        | 'th'
        | 'tl'
        | 'tr'
        | 'uk'
        | 'ur'
        | 'uz'
        | 'vi'
        | 'yo'
        | 'zh'
      >
    | null;

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
   * Regex pattern URLs had to match to be crawled. Null when the crawl set none.
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
   * Outputs requested for each page. Matches input.data.formats on submission.
   */
  formats: BatchRetrieveResponse.Formats;

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
   * Result download links; null until the batch finishes. Files are deleted 180 days
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
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BatchRetrieveResponse.KeyMetadata;

  /**
   * Access policy IDs applied to every page.
   */
  policies?: Array<string>;

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

  /**
   * Outputs requested for each page. Matches input.data.formats on submission.
   */
  export interface Formats {
    /**
     * The original HTTP response body.
     */
    bytes?: boolean;

    /**
     * Markdown excerpts relevant to `highlightsParams.query`.
     */
    highlights?: boolean;

    /**
     * Rendered HTML.
     */
    html?: boolean;

    /**
     * Images found on the page.
     */
    images?: boolean;

    /**
     * An object matching `jsonParams.schema`, extracted from the page.
     */
    json?: boolean;

    /**
     * Page content as Markdown.
     */
    markdown?: boolean;

    /**
     * Fields extracted with custom rules or a prebuilt parser, returned as `parsed`.
     */
    parse?: boolean;

    /**
     * Product details such as name, price, and availability.
     */
    product?: boolean;

    /**
     * A screenshot of the page.
     */
    screenshot?: boolean;
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
   * Result download links; null until the batch finishes. Files are deleted 180 days
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
     * Outputs requested for each page. Matches input.data.formats on submission.
     */
    formats: Data.Formats;

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
     * Result download links; null until the batch finishes. Files are deleted 180 days
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

    /**
     * Access policy IDs applied to every page.
     */
    policies?: Array<string>;
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
     * Outputs requested for each page. Matches input.data.formats on submission.
     */
    export interface Formats {
      /**
       * The original HTTP response body.
       */
      bytes?: boolean;

      /**
       * Markdown excerpts relevant to `highlightsParams.query`.
       */
      highlights?: boolean;

      /**
       * Rendered HTML.
       */
      html?: boolean;

      /**
       * Images found on the page.
       */
      images?: boolean;

      /**
       * An object matching `jsonParams.schema`, extracted from the page.
       */
      json?: boolean;

      /**
       * Page content as Markdown.
       */
      markdown?: boolean;

      /**
       * Fields extracted with custom rules or a prebuilt parser, returned as `parsed`.
       */
      parse?: boolean;

      /**
       * Product details such as name, price, and availability.
       */
      product?: boolean;

      /**
       * A screenshot of the page.
       */
      screenshot?: boolean;
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
     * Result download links; null until the batch finishes. Files are deleted 180 days
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
   * Outputs requested for each page. Matches input.data.formats on submission.
   */
  formats: BatchCancelResponse.Formats;

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
   * Credits this request used and your remaining balance.
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
   * Outputs requested for each page. Matches input.data.formats on submission.
   */
  export interface Formats {
    /**
     * The original HTTP response body.
     */
    bytes?: boolean;

    /**
     * Markdown excerpts relevant to `highlightsParams.query`.
     */
    highlights?: boolean;

    /**
     * Rendered HTML.
     */
    html?: boolean;

    /**
     * Images found on the page.
     */
    images?: boolean;

    /**
     * An object matching `jsonParams.schema`, extracted from the page.
     */
    json?: boolean;

    /**
     * Page content as Markdown.
     */
    markdown?: boolean;

    /**
     * Fields extracted with custom rules or a prebuilt parser, returned as `parsed`.
     */
    parse?: boolean;

    /**
     * Product details such as name, price, and availability.
     */
    product?: boolean;

    /**
     * A screenshot of the page.
     */
    screenshot?: boolean;
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
   * At least one requested output succeeded. Check result.isPartial and each output
   * success for incomplete results.
   */
  export interface Ok {
    /**
     * Credits charged for this page, including OCR. Cached outputs use the same
     * pricing as POST /web/scrape.
     */
    credits_used: number;

    /**
     * The same response as POST /web/scrape, including per-format success, failure,
     * and partial results.
     */
    result: Ok.Result;

    status: 'ok';

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

    /**
     * PDF pages recovered by OCR. Omitted when OCR did not run.
     */
    ocr_pages?: number;
  }

  export namespace Ok {
    /**
     * The same response as POST /web/scrape, including per-format success, failure,
     * and partial results.
     */
    export interface Result {
      /**
       * The original HTTP response body, unchanged by waits, actions, and filters.
       */
      bytes: Result.Bytes;

      /**
       * Whether this response came from cache.
       */
      cache_metadata: Result.CacheMetadata;

      /**
       * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
       * omitted text.
       */
      highlights: Result.Highlights;

      /**
       * Rendered HTML after content filters.
       */
      html: Result.HTML;

      /**
       * Images after content filters. `[]` when none are found.
       */
      images: Result.Images;

      /**
       * Object matching `jsonParams.schema`.
       */
      json: Result.Json;

      /**
       * Markdown after content filters.
       */
      markdown: Result.Markdown;

      /**
       * Page metadata. Fields are omitted when not found.
       */
      metadata: Result.Metadata;

      /**
       * Custom rules return fields after content filters; unmatched fields are null ([]
       * for lists). The google-maps parser returns business records in data.results,
       * google-maps-reviews returns data.reviews, and the google-play parser returns one
       * app record as data, google-play-reviews returns data.reviews, app-store and
       * app-store-reviews do the same for the App Store, g2-reviews returns data.reviews
       * for a G2 product, instagram-profile and instagram-post return one record as
       * data, instagram-feed returns data.posts, tiktok-profile and tiktok-video return
       * one record as data, tiktok-feed returns data.videos, tiktok-comments returns
       * data.comments, tiktok-followers, tiktok-following, and tiktok-user-search return
       * data.users, yelp-search returns up to 20 ranked organic businesses in
       * data.businesses, plus total and pagination, from a Yelp search URL; yelp-reviews
       * returns up to 20 latest public reviews in data.reviews, with business details
       * and next_offset, from a Yelp business URL; emails, phone-numbers, and links
       * return data.emails, data.phone_numbers, and data.links from the rendered page;
       * the store, Maps, G2, Instagram, and TikTok parsers read their data directly,
       * independently of DOM filters and other outputs.
       */
      parsed: Result.Parsed;

      /**
       * Product details found on the page.
       */
      product: Result.Product;

      /**
       * Authenticated browser profile used for this scrape, or null when no profile was
       * requested. New and existing profile requests both return the profile ID.
       */
      profile: Result.Profile | null;

      /**
       * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
       * support.
       */
      request_id: string;

      /**
       * Screenshot as a base64 image data URL.
       */
      screenshot: Result.Screenshot;

      /**
       * Final URL after redirects and browser actions.
       */
      url: string;

      /**
       * True when at least one requested output succeeds but the response has failed or
       * incomplete outputs. Absent when all requested outputs fail.
       */
      isPartial?: true;

      /**
       * Credits this request used and your remaining balance.
       */
      key_metadata?: Result.KeyMetadata;
    }

    export namespace Result {
      /**
       * The original HTTP response body, unchanged by waits, actions, and filters.
       */
      export interface Bytes {
        data: Bytes.Data | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      export namespace Bytes {
        export interface Data {
          /**
           * Body as base64, after HTTP decompression. Up to 50 MiB decoded.
           */
          base64: string;

          contentType: string;
        }
      }

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
       * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
       * omitted text.
       */
      export interface Highlights {
        data: Array<string> | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Rendered HTML after content filters.
       */
      export interface HTML {
        data: string | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Images after content filters. `[]` when none are found.
       */
      export interface Images {
        data: Array<Images.Data> | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      export namespace Images {
        export interface Data {
          /**
           * Alt text, if present.
           */
          alt: string | null;

          /**
           * Image URL, or a data URI for inline images.
           */
          url: string;

          classification?:
            | 'photography'
            | 'illustration'
            | 'logo'
            | 'wordmark'
            | 'icon'
            | 'pattern'
            | 'graphic'
            | 'other';

          /**
           * Hosted image URL, valid for 24 hours after capture. Requires `file` enrichment
           * and ZDR disabled.
           */
          fileUrl?: string;

          height?: number;

          width?: number;
        }
      }

      /**
       * Object matching `jsonParams.schema`.
       */
      export interface Json {
        data: { [key: string]: unknown } | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * True when the page was too long to read in full, so values found only in the
         * unread parts may be missing.
         */
        isTruncated?: true;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Markdown after content filters.
       */
      export interface Markdown {
        data: string | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Page metadata. Fields are omitted when not found.
       */
      export interface Metadata {
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
         * Up to 500 h1–h6 headings in document order, before content filtering.
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

      /**
       * Custom rules return fields after content filters; unmatched fields are null ([]
       * for lists). The google-maps parser returns business records in data.results,
       * google-maps-reviews returns data.reviews, and the google-play parser returns one
       * app record as data, google-play-reviews returns data.reviews, app-store and
       * app-store-reviews do the same for the App Store, g2-reviews returns data.reviews
       * for a G2 product, instagram-profile and instagram-post return one record as
       * data, instagram-feed returns data.posts, tiktok-profile and tiktok-video return
       * one record as data, tiktok-feed returns data.videos, tiktok-comments returns
       * data.comments, tiktok-followers, tiktok-following, and tiktok-user-search return
       * data.users, yelp-search returns up to 20 ranked organic businesses in
       * data.businesses, plus total and pagination, from a Yelp search URL; yelp-reviews
       * returns up to 20 latest public reviews in data.reviews, with business details
       * and next_offset, from a Yelp business URL; emails, phone-numbers, and links
       * return data.emails, data.phone_numbers, and data.links from the rendered page;
       * the store, Maps, G2, Instagram, and TikTok parsers read their data directly,
       * independently of DOM filters and other outputs.
       */
      export interface Parsed {
        data: { [key: string]: unknown } | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * The selected prebuilt parser name, or custom when type is omitted, custom rules
         * are used, or parsing is not requested.
         */
        type:
          | 'custom'
          | 'google-maps'
          | 'google-maps-reviews'
          | 'google-play'
          | 'google-play-reviews'
          | 'app-store'
          | 'app-store-reviews'
          | 'g2-reviews'
          | 'instagram-profile'
          | 'instagram-post'
          | 'instagram-feed'
          | 'tiktok-profile'
          | 'tiktok-video'
          | 'tiktok-feed'
          | 'tiktok-comments'
          | 'tiktok-followers'
          | 'tiktok-following'
          | 'tiktok-user-search'
          | 'yelp-search'
          | 'yelp-reviews'
          | 'emails'
          | 'phone-numbers'
          | 'links';

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Product details found on the page.
       */
      export interface Product {
        data: Product.Data | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      export namespace Product {
        export interface Data {
          /**
           * Whether the page is a product detail page.
           */
          isProductPage: boolean;

          /**
           * The extracted product, or null when the page is not a product detail page.
           */
          product: Data.Product | null;
        }

        export namespace Data {
          /**
           * The extracted product, or null when the page is not a product detail page.
           */
          export interface Product {
            /**
             * Stock or ordering availability.
             */
            availability:
              | 'in_stock'
              | 'out_of_stock'
              | 'limited_availability'
              | 'preorder'
              | 'backorder'
              | 'made_to_order'
              | 'discontinued'
              | null;

            /**
             * Brand or vendor.
             */
            brand: string | null;

            /**
             * Product category.
             */
            category: string | null;

            /**
             * ISO 4217 currency code.
             */
            currency: string | null;

            /**
             * Product description.
             */
            description: string | null;

            /**
             * Product dimensions as shown on the page.
             */
            dimensions: Array<string>;

            /**
             * Key features and specifications.
             */
            features: Array<string>;

            /**
             * Product image URLs, main image first.
             */
            images: Array<string>;

            /**
             * Main product image URL.
             */
            imageUrl: string | null;

            /**
             * Product name.
             */
            name: string;

            /**
             * Current price.
             */
            price: number | null;

            /**
             * List price before any discount.
             */
            regularPrice: number | null;

            /**
             * Product identifier such as a SKU or model number.
             */
            sku: string | null;

            /**
             * Product tags.
             */
            tags: Array<string>;

            /**
             * Intended audience.
             */
            targetAudience: Array<string>;

            /**
             * Product variations, such as different colors or sizes, with their attributes and
             * images. Empty if none are found. May not include every variation offered by the
             * store.
             */
            variants: Array<Product.Variant>;
          }

          export namespace Product {
            export interface Variant {
              /**
               * Explicit variant attributes such as color, size, material, pattern and
               * properties declared by page.
               */
              attributes: { [key: string]: string };

              /**
               * Original source image URLs explicitly attached to this variant.
               */
              images: Array<string>;

              sku: string | null;

              /**
               * Variant or offer URL when provided by the source. May be shared by variants.
               */
              url: string | null;
            }
          }
        }
      }

      /**
       * Authenticated browser profile used for this scrape, or null when no profile was
       * requested. New and existing profile requests both return the profile ID.
       */
      export interface Profile {
        /**
         * Save this ID after creating a profile, then reuse it as
         * sharedParams.profile.profileId with type "existing".
         */
        id: string;
      }

      /**
       * Screenshot as a base64 image data URL.
       */
      export interface Screenshot {
        data: string | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
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
     * Credits charged for this page, including OCR. Cached outputs use the same
     * pricing as POST /web/scrape.
     */
    credits_used?: number;

    /**
     * Your `itemId` from submission.
     */
    itemId?: string;

    /**
     * Caller-supplied metadata echoed from submission.
     */
    meta?: { [key: string]: unknown };

    /**
     * PDF pages recovered by OCR. Omitted when OCR did not run.
     */
    ocr_pages?: number;

    /**
     * Per-format failures when scraping returned a structured response. Omitted for
     * errors that prevent scraping.
     */
    result?: Error.Result;
  }

  export namespace Error {
    /**
     * Per-format failures when scraping returned a structured response. Omitted for
     * errors that prevent scraping.
     */
    export interface Result {
      /**
       * The original HTTP response body, unchanged by waits, actions, and filters.
       */
      bytes: Result.Bytes;

      /**
       * Whether this response came from cache.
       */
      cache_metadata: Result.CacheMetadata;

      /**
       * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
       * omitted text.
       */
      highlights: Result.Highlights;

      /**
       * Rendered HTML after content filters.
       */
      html: Result.HTML;

      /**
       * Images after content filters. `[]` when none are found.
       */
      images: Result.Images;

      /**
       * Object matching `jsonParams.schema`.
       */
      json: Result.Json;

      /**
       * Markdown after content filters.
       */
      markdown: Result.Markdown;

      /**
       * Page metadata. Fields are omitted when not found.
       */
      metadata: Result.Metadata;

      /**
       * Custom rules return fields after content filters; unmatched fields are null ([]
       * for lists). The google-maps parser returns business records in data.results,
       * google-maps-reviews returns data.reviews, and the google-play parser returns one
       * app record as data, google-play-reviews returns data.reviews, app-store and
       * app-store-reviews do the same for the App Store, g2-reviews returns data.reviews
       * for a G2 product, instagram-profile and instagram-post return one record as
       * data, instagram-feed returns data.posts, tiktok-profile and tiktok-video return
       * one record as data, tiktok-feed returns data.videos, tiktok-comments returns
       * data.comments, tiktok-followers, tiktok-following, and tiktok-user-search return
       * data.users, yelp-search returns up to 20 ranked organic businesses in
       * data.businesses, plus total and pagination, from a Yelp search URL; yelp-reviews
       * returns up to 20 latest public reviews in data.reviews, with business details
       * and next_offset, from a Yelp business URL; emails, phone-numbers, and links
       * return data.emails, data.phone_numbers, and data.links from the rendered page;
       * the store, Maps, G2, Instagram, and TikTok parsers read their data directly,
       * independently of DOM filters and other outputs.
       */
      parsed: Result.Parsed;

      /**
       * Product details found on the page.
       */
      product: Result.Product;

      /**
       * Authenticated browser profile used for this scrape, or null when no profile was
       * requested. New and existing profile requests both return the profile ID.
       */
      profile: Result.Profile | null;

      /**
       * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
       * support.
       */
      request_id: string;

      /**
       * Screenshot as a base64 image data URL.
       */
      screenshot: Result.Screenshot;

      /**
       * Final URL after redirects and browser actions.
       */
      url: string;

      /**
       * True when at least one requested output succeeds but the response has failed or
       * incomplete outputs. Absent when all requested outputs fail.
       */
      isPartial?: true;

      /**
       * Credits this request used and your remaining balance.
       */
      key_metadata?: Result.KeyMetadata;
    }

    export namespace Result {
      /**
       * The original HTTP response body, unchanged by waits, actions, and filters.
       */
      export interface Bytes {
        data: Bytes.Data | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      export namespace Bytes {
        export interface Data {
          /**
           * Body as base64, after HTTP decompression. Up to 50 MiB decoded.
           */
          base64: string;

          contentType: string;
        }
      }

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
       * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
       * omitted text.
       */
      export interface Highlights {
        data: Array<string> | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Rendered HTML after content filters.
       */
      export interface HTML {
        data: string | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Images after content filters. `[]` when none are found.
       */
      export interface Images {
        data: Array<Images.Data> | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      export namespace Images {
        export interface Data {
          /**
           * Alt text, if present.
           */
          alt: string | null;

          /**
           * Image URL, or a data URI for inline images.
           */
          url: string;

          classification?:
            | 'photography'
            | 'illustration'
            | 'logo'
            | 'wordmark'
            | 'icon'
            | 'pattern'
            | 'graphic'
            | 'other';

          /**
           * Hosted image URL, valid for 24 hours after capture. Requires `file` enrichment
           * and ZDR disabled.
           */
          fileUrl?: string;

          height?: number;

          width?: number;
        }
      }

      /**
       * Object matching `jsonParams.schema`.
       */
      export interface Json {
        data: { [key: string]: unknown } | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * True when the page was too long to read in full, so values found only in the
         * unread parts may be missing.
         */
        isTruncated?: true;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Markdown after content filters.
       */
      export interface Markdown {
        data: string | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Page metadata. Fields are omitted when not found.
       */
      export interface Metadata {
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
         * Up to 500 h1–h6 headings in document order, before content filtering.
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

      /**
       * Custom rules return fields after content filters; unmatched fields are null ([]
       * for lists). The google-maps parser returns business records in data.results,
       * google-maps-reviews returns data.reviews, and the google-play parser returns one
       * app record as data, google-play-reviews returns data.reviews, app-store and
       * app-store-reviews do the same for the App Store, g2-reviews returns data.reviews
       * for a G2 product, instagram-profile and instagram-post return one record as
       * data, instagram-feed returns data.posts, tiktok-profile and tiktok-video return
       * one record as data, tiktok-feed returns data.videos, tiktok-comments returns
       * data.comments, tiktok-followers, tiktok-following, and tiktok-user-search return
       * data.users, yelp-search returns up to 20 ranked organic businesses in
       * data.businesses, plus total and pagination, from a Yelp search URL; yelp-reviews
       * returns up to 20 latest public reviews in data.reviews, with business details
       * and next_offset, from a Yelp business URL; emails, phone-numbers, and links
       * return data.emails, data.phone_numbers, and data.links from the rendered page;
       * the store, Maps, G2, Instagram, and TikTok parsers read their data directly,
       * independently of DOM filters and other outputs.
       */
      export interface Parsed {
        data: { [key: string]: unknown } | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * The selected prebuilt parser name, or custom when type is omitted, custom rules
         * are used, or parsing is not requested.
         */
        type:
          | 'custom'
          | 'google-maps'
          | 'google-maps-reviews'
          | 'google-play'
          | 'google-play-reviews'
          | 'app-store'
          | 'app-store-reviews'
          | 'g2-reviews'
          | 'instagram-profile'
          | 'instagram-post'
          | 'instagram-feed'
          | 'tiktok-profile'
          | 'tiktok-video'
          | 'tiktok-feed'
          | 'tiktok-comments'
          | 'tiktok-followers'
          | 'tiktok-following'
          | 'tiktok-user-search'
          | 'yelp-search'
          | 'yelp-reviews'
          | 'emails'
          | 'phone-numbers'
          | 'links';

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      /**
       * Product details found on the page.
       */
      export interface Product {
        data: Product.Data | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
      }

      export namespace Product {
        export interface Data {
          /**
           * Whether the page is a product detail page.
           */
          isProductPage: boolean;

          /**
           * The extracted product, or null when the page is not a product detail page.
           */
          product: Data.Product | null;
        }

        export namespace Data {
          /**
           * The extracted product, or null when the page is not a product detail page.
           */
          export interface Product {
            /**
             * Stock or ordering availability.
             */
            availability:
              | 'in_stock'
              | 'out_of_stock'
              | 'limited_availability'
              | 'preorder'
              | 'backorder'
              | 'made_to_order'
              | 'discontinued'
              | null;

            /**
             * Brand or vendor.
             */
            brand: string | null;

            /**
             * Product category.
             */
            category: string | null;

            /**
             * ISO 4217 currency code.
             */
            currency: string | null;

            /**
             * Product description.
             */
            description: string | null;

            /**
             * Product dimensions as shown on the page.
             */
            dimensions: Array<string>;

            /**
             * Key features and specifications.
             */
            features: Array<string>;

            /**
             * Product image URLs, main image first.
             */
            images: Array<string>;

            /**
             * Main product image URL.
             */
            imageUrl: string | null;

            /**
             * Product name.
             */
            name: string;

            /**
             * Current price.
             */
            price: number | null;

            /**
             * List price before any discount.
             */
            regularPrice: number | null;

            /**
             * Product identifier such as a SKU or model number.
             */
            sku: string | null;

            /**
             * Product tags.
             */
            tags: Array<string>;

            /**
             * Intended audience.
             */
            targetAudience: Array<string>;

            /**
             * Product variations, such as different colors or sizes, with their attributes and
             * images. Empty if none are found. May not include every variation offered by the
             * store.
             */
            variants: Array<Product.Variant>;
          }

          export namespace Product {
            export interface Variant {
              /**
               * Explicit variant attributes such as color, size, material, pattern and
               * properties declared by page.
               */
              attributes: { [key: string]: string };

              /**
               * Original source image URLs explicitly attached to this variant.
               */
              images: Array<string>;

              sku: string | null;

              /**
               * Variant or offer URL when provided by the source. May be shared by variants.
               */
              url: string | null;
            }
          }
        }
      }

      /**
       * Authenticated browser profile used for this scrape, or null when no profile was
       * requested. New and existing profile requests both return the profile ID.
       */
      export interface Profile {
        /**
         * Save this ID after creating a profile, then reuse it as
         * sharedParams.profile.profileId with type "existing".
         */
        id: string;
      }

      /**
       * Screenshot as a base64 image data URL.
       */
      export interface Screenshot {
        data: string | null;

        requested: boolean;

        /**
         * `true` if returned, `false` if it failed, `null` if not requested.
         */
        success: boolean | null;

        /**
         * Why the output failed. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Explanation of the failure and possible next steps.
         */
        message?: string;
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
   * Outputs requested for each page. Matches input.data.formats on submission.
   */
  formats: BatchSubmitResponse.Formats;

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
   * Credits this request used and your remaining balance.
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

  /**
   * Outputs requested for each page. Matches input.data.formats on submission.
   */
  export interface Formats {
    /**
     * The original HTTP response body.
     */
    bytes?: boolean;

    /**
     * Markdown excerpts relevant to `highlightsParams.query`.
     */
    highlights?: boolean;

    /**
     * Rendered HTML.
     */
    html?: boolean;

    /**
     * Images found on the page.
     */
    images?: boolean;

    /**
     * An object matching `jsonParams.schema`, extracted from the page.
     */
    json?: boolean;

    /**
     * Page content as Markdown.
     */
    markdown?: boolean;

    /**
     * Fields extracted with custom rules or a prebuilt parser, returned as `parsed`.
     */
    parse?: boolean;

    /**
     * Product details such as name, price, and availability.
     */
    product?: boolean;

    /**
     * A screenshot of the page.
     */
    screenshot?: boolean;
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
   * Include batches submitted with Scrape Anything formats. Defaults to false.
   */
  shouldIncludeUnified?: boolean;

  /**
   * Filter by status.
   */
  status?: 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Tags to filter by (matches batches having any of them). Pass repeated `tags`
   * params or one comma-separated list, e.g. `tags=docs,competitor`.
   */
  tags?: string | Array<string>;
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
   * Body param: Access policy IDs to apply to every page. A URL must pass every
   * policy.
   */
  policies?: Array<string>;

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
   * Scrape a list of up to 100,000 URLs.
   */
  export interface Scrape {
    /**
     * Pages to scrape and their output format.
     */
    data: Scrape.Markdown | Scrape.HTML | Scrape.BatchUnifiedScrapeData;

    /**
     * Scrape the pages in `data.urls`.
     */
    mode: 'scrape';
  }

  export namespace Scrape {
    /**
     * @deprecated Scrape the listed pages as Markdown.
     */
    export interface Markdown {
      /**
       * Return page content as Markdown.
       */
      format: 'markdown';

      /**
       * Pages to scrape. Maximum 100000.
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
         * Include image references in the Markdown (`html-conversion` only).
         */
        includeImages?: boolean;

        /**
         * Include links in the Markdown (`html-conversion` only).
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
         * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait for CSS animations to finish before extracting, on browser-rendered pages.
         */
        settleAnimations?: boolean;

        /**
         * Shorten inline base64 image data (`html-conversion` only).
         */
        shortenBase64Images?: boolean;

        /**
         * Markdown sources in order of preference: `html-conversion` converts the page
         * HTML, `markdown-direct` uses Markdown the site publishes.
         */
        sourcePreference?: Array<'html-conversion' | 'markdown-direct'>;

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
         * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
         */
        export interface Pdf {
          /**
           * Last PDF page to parse (1-based, inclusive). Defaults to the final page. Must
           * be >= start.
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
           * First 1-based PDF page to parse.
           */
          start?: number;
        }
      }
    }

    /**
     * @deprecated Scrape the listed pages as HTML.
     */
    export interface HTML {
      /**
       * Return page content as HTML.
       */
      format: 'html';

      /**
       * Pages to scrape. Maximum 100000.
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
         * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
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
         * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
         */
        export interface Pdf {
          /**
           * Last PDF page to parse (1-based, inclusive). Defaults to the final page. Must
           * be >= start.
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
           * First 1-based PDF page to parse.
           */
          start?: number;
        }
      }
    }

    /**
     * Use the same formats and parameters as POST /web/scrape, replacing url with
     * urls. Options apply to every page.
     */
    export interface BatchUnifiedScrapeData {
      /**
       * Outputs to return. Set at least one to `true`.
       */
      formats: BatchUnifiedScrapeData.Formats;

      /**
       * Pages to scrape. Maximum 100000.
       */
      urls: Array<BatchUnifiedScrapeData.URL>;

      /**
       * Requires `formats.highlights: true`; required when it is set.
       */
      highlightsParams?: BatchUnifiedScrapeData.HighlightsParams;

      /**
       * Image options. Requires formats.images: true.
       */
      imageParams?: BatchUnifiedScrapeData.ImageParams;

      /**
       * Requires `formats.json: true`; required when it is set.
       */
      jsonParams?: BatchUnifiedScrapeData.JsonParams;

      /**
       * Markdown options. Requires `formats.markdown`.
       */
      markdownParams?: BatchUnifiedScrapeData.MarkdownParams;

      /**
       * Maximum age of a cached output, in milliseconds. `0` fetches fresh. Defaults to
       * 3 days (259200000 ms). Maximum: 1 year (31536000000 ms).
       */
      maxAgeMs?: number;

      /**
       * Requires `formats.parse: true`; required when it is set.
       */
      parseParams?: BatchUnifiedScrapeData.CustomParser | BatchUnifiedScrapeData.PrebuiltParser;

      /**
       * Product options. Requires formats.product: true.
       */
      productParams?: BatchUnifiedScrapeData.ProductParams;

      /**
       * Screenshot options. Requires formats.screenshot: true.
       */
      screenshotParams?: BatchUnifiedScrapeData.ScreenshotParams;

      /**
       * Browser and content settings shared by all outputs.
       */
      sharedParams?: BatchUnifiedScrapeData.SharedParams;

      /**
       * Labels for filtering usage in the dashboard.
       */
      tags?: Array<string>;

      /**
       * Deadline for each page, using the same behavior and defaults as POST
       * /web/scrape.
       */
      timeoutOpts?: BatchUnifiedScrapeData.TimeoutOpts;

      /**
       * Batches persist their results. Only disabled is supported; enabled returns
       * ZDR_NOT_SUPPORTED.
       */
      zdr?: 'disabled';
    }

    export namespace BatchUnifiedScrapeData {
      /**
       * Outputs to return. Set at least one to `true`.
       */
      export interface Formats {
        /**
         * The original HTTP response body.
         */
        bytes?: boolean;

        /**
         * Markdown excerpts relevant to `highlightsParams.query`.
         */
        highlights?: boolean;

        /**
         * Rendered HTML.
         */
        html?: boolean;

        /**
         * Images found on the page.
         */
        images?: boolean;

        /**
         * An object matching `jsonParams.schema`, extracted from the page.
         */
        json?: boolean;

        /**
         * Page content as Markdown.
         */
        markdown?: boolean;

        /**
         * Fields extracted with custom rules or a prebuilt parser, returned as `parsed`.
         */
        parse?: boolean;

        /**
         * Product details such as name, price, and availability.
         */
        product?: boolean;

        /**
         * A screenshot of the page.
         */
        screenshot?: boolean;
      }

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
       * Requires `formats.highlights: true`; required when it is set.
       */
      export interface HighlightsParams {
        /**
         * The question or topic to find passages for.
         */
        query: string;

        /**
         * Maximum combined length of returned passages.
         */
        maxCharacters?: number;
      }

      /**
       * Image options. Requires formats.images: true.
       */
      export interface ImageParams {
        /**
         * Set `visual` to drop visual duplicates, keeping the largest copy.
         */
        dedupe?: 'none' | 'visual';

        /**
         * Extra data per image: `dimensions`, `classification`, or a hosted `file` URL.
         */
        enrich?: Array<'dimensions' | 'classification' | 'file'>;
      }

      /**
       * Requires `formats.json: true`; required when it is set.
       */
      export interface JsonParams {
        /**
         * JSON Schema (not an example object) for a top-level object, up to 50 KB. Use
         * optional or nullable fields for missing facts.
         */
        schema: { [key: string]: unknown };

        /**
         * Extra guidance, such as which facts to prefer or how to read a field.
         */
        instructions?: string;
      }

      /**
       * Markdown options. Requires `formats.markdown`.
       */
      export interface MarkdownParams {
        /**
         * Include images in the Markdown (`html-conversion` only).
         */
        includeImages?: boolean;

        /**
         * Keep link URLs in the Markdown (`html-conversion` only).
         */
        includeLinks?: boolean;

        /**
         * How base64 images appear when `includeImages` is set (`html-conversion` only).
         */
        inlineImages?: 'placeholder' | 'preserve';

        /**
         * Markdown sources in order of preference: `html-conversion` converts the page
         * HTML, `markdown-direct` uses Markdown the site publishes.
         */
        sourcePreference?: Array<'html-conversion' | 'markdown-direct'>;
      }

      export interface CustomParser {
        /**
         * Field names mapped to CSS selectors (`h1`, `a@href`) or rule objects. Max 100
         * fields, 5 levels.
         */
        rules: { [key: string]: string | CustomParser.UnionMember1 };

        /**
         * Extract fields using custom CSS rules. This is the default when type is omitted.
         */
        type?: 'custom';
      }

      export namespace CustomParser {
        export interface UnionMember1 {
          /**
           * CSS selector to match within the current page or parent rule.
           */
          selector: string;

          /**
           * Return text, HTML, an attribute such as `@href`, or nested field rules. Defaults
           * to text.
           */
          output?: 'text' | 'html' | string | unknown;

          /**
           * Return the first match with `item` or all matches with `list`.
           */
          type?: 'item' | 'list';
        }
      }

      export interface PrebuiltParser {
        /**
         * google-maps parses Google Maps business data into data.results. Accepts Maps
         * place, search, and internal data URLs. Uses a US exit and English labels
         * regardless of hl or Accept-Language. google-maps-reviews returns the reviews of
         * a place in data.reviews, in the same shape as the Serper reviews API (rating,
         * date, isoDate, snippet, translatedSnippet, likes, user, media, response, link,
         * id), plus language, guided ratings in details, and user.isLocalGuide; data also
         * carries the place featureId, cid, and sort. sort and limit pick the order and
         * count, and oldest is exact. It accepts Maps place, search, and ?cid= URLs, plus
         * search.google.com/local/reviews URLs, so the google_maps_url and
         * google_reviews_url fields of google-maps results work as input. An unknown place
         * returns no reviews. google-play parses a Play Store app into data: details,
         * developer contact, ratings, price, permissions, and data safety.
         * google-play-reviews returns the 200 newest reviews of the app, with developer
         * replies, in data.reviews. Both Play parsers accept app details URLs
         * (play.google.com/store/apps/details?id=…); hl and gl set the language and
         * storefront, defaulting to en and us. app-store parses an App Store app into
         * data: details, developer, ratings, price, version, and screenshots.
         * app-store-reviews returns up to the 500 newest reviews in data.reviews. Both App
         * Store parsers accept app URLs (apps.apple.com/us/app/…/id…); the country in the
         * path sets the storefront, defaulting to us. g2-reviews returns the 25 most
         * recently published reviews of a G2 product in data.reviews (rating, title,
         * likes, dislikes, problems_solved, reviewer role, company size, and industry),
         * plus data.product. It accepts G2 product URLs (g2.com/products/…), follows
         * renamed products, and keeps star-rating filters from the URL
         * (filters[nps_score][]=1 to 5); other filters, sort orders, and pages are
         * ignored. instagram-profile parses a public profile (instagram.com/{username})
         * into data: bio, links, follower and post counts, category, business address,
         * similar_accounts, and latest_posts (up to the 12 posts at the top of the
         * profile, newest first). Instagram lists pinned posts there ahead of newer ones,
         * so posts with is_pinned true can be older; when Instagram shows only a rounded
         * post count (32K), post_count is that rounded number and is_post_count_rounded is
         * true. instagram-post parses a post or reel (/p/…, /reel/…) into data: caption,
         * hashtags, mentions, like, comment, and view counts (like_count and view_count
         * are null when the owner hides them), media URLs, tagged users, collaborators,
         * location, and the top ~14 comments in data.comments. instagram-feed returns the
         * top posts for a hashtag or keyword (/explore/tags/…, /popular/…) or the recent
         * posts at a location (/explore/locations/{id}/…) in data.posts; keyword posts
         * carry only the shortcode, owner, thumbnail, and views, plus the caption when
         * Instagram shows it. All three Instagram parsers read public data without logging
         * in, so private accounts return no posts and follower lists are unavailable.
         * tiktok-profile parses a public profile (tiktok.com/@{username}) into data:
         * nickname, bio, bio link, follower, following, like, and video counts, verified,
         * private, and business flags, and business category; it does not list videos.
         * tiktok-video parses a video or photo post (/@{username}/video/{id} or
         * /@{username}/photo/{id}) into data: caption, hashtags, mentions, author, view,
         * like, comment, share, save, and repost counts, duration, thumbnail, a video_url
         * that downloads without cookies, image_urls for photo posts, music, location, and
         * ad, paid-partnership, and AI-generated flags. tiktok-feed returns videos in the
         * tiktok-video shape as data.videos: the latest 15 from a profile URL, the top 30
         * from a hashtag URL (/tag/{name}), or the top 12 from a search URL
         * (/search?q={query}). tiktok-comments returns the first 20 comments of a video or
         * photo post as data.comments: text, posted_at, like and reply counts, whether the
         * author liked it, and the commenter. tiktok-followers and tiktok-following return
         * up to 30 accounts of a profile as data.users, in the tiktok-profile shape.
         * tiktok-user-search returns the top 10 accounts for a user search URL
         * (/search/user?q={query}) as data.users: id, username, nickname, biography,
         * avatar_url, sec_uid, follower_count, like_count, and is_verified. The TikTok
         * parsers accept tiktok.com, www.tiktok.com, and m.tiktok.com URLs but not short
         * links (vm.tiktok.com, vt.tiktok.com, tiktok.com/t/…). yelp-search accepts Yelp
         * search URLs with find_desc and find_loc, reads start as the result offset, and
         * returns up to 20 ranked organic businesses in data.businesses with total and
         * pagination. yelp-reviews accepts a Yelp business URL (yelp.com/biz/{alias}),
         * uses optional start for the offset, and always sorts newest first; unsupported
         * sort and review filters are rejected, while tracking params are ignored. It
         * returns up to 20 latest public reviews in data.reviews with business details and
         * pagination.next_offset. Each review has rating, full text, updated_at, and
         * author; owner replies and photos are not included. emails accepts any page and
         * returns its email addresses as data.emails ([{ email }]), read from mailto
         * links, Cloudflare-protected addresses, and visible text. phone-numbers accepts
         * any page and returns its valid phone numbers in E.164 as data.phone_numbers ([{
         * phone }]), read from tel links and visible text; numbers without a country code
         * are read for the country of the site TLD, defaulting to US. links accepts any
         * page and returns its unique http(s) links as data.links ([{ url, text }]), with
         * absolute URLs; text falls back to aria-label or image alt and is null when a
         * link has none. The emails parser reads the rendered page and respects content
         * filters; the other prebuilt parsers read their data independently of DOM
         * filters.
         */
        parser:
          | 'google-maps'
          | 'google-maps-reviews'
          | 'google-play'
          | 'google-play-reviews'
          | 'app-store'
          | 'app-store-reviews'
          | 'g2-reviews'
          | 'instagram-profile'
          | 'instagram-post'
          | 'instagram-feed'
          | 'tiktok-profile'
          | 'tiktok-video'
          | 'tiktok-feed'
          | 'tiktok-comments'
          | 'tiktok-followers'
          | 'tiktok-following'
          | 'tiktok-user-search'
          | 'yelp-search'
          | 'yelp-reviews'
          | 'emails'
          | 'phone-numbers'
          | 'links';

        /**
         * Use a prebuilt parser instead of custom rules.
         */
        type: 'prebuilt';

        /**
         * google-maps-reviews only. Maximum number of reviews to return. Defaults to 100;
         * maximum 1000.
         */
        limit?: number;

        /**
         * google-maps-reviews only. Order of data.reviews. newest, relevant, highest, and
         * lowest follow Google; oldest returns the earliest reviews first, which Google
         * itself does not offer.
         */
        sort?: 'newest' | 'oldest' | 'relevant' | 'highest' | 'lowest';
      }

      /**
       * Product options. Requires formats.product: true.
       */
      export interface ProductParams {
        /**
         * Drop visually duplicate product images, keeping the largest copy.
         */
        dedupeImages?: boolean;

        /**
         * @deprecated Ignored. The AI fallback runs automatically.
         */
        useAIFallback?: boolean;
      }

      /**
       * Screenshot options. Requires formats.screenshot: true.
       */
      export interface ScreenshotParams {
        /**
         * What to capture: `viewport`, `fullPage`, one element, or a rectangle. Max 40
         * megapixels.
         */
        area?: 'viewport' | 'fullPage' | ScreenshotParams.Element | ScreenshotParams.Rectangle;

        /**
         * Image format for the screenshot.
         */
        format?: 'png' | 'jpeg' | 'webp';
      }

      export namespace ScreenshotParams {
        export interface Element {
          /**
           * CSS selector matching exactly one visible element.
           */
          selector: string;
        }

        /**
         * Pixels from the document origin.
         */
        export interface Rectangle {
          /**
           * Height of the capture in pixels.
           */
          height: number;

          /**
           * Width of the capture in pixels.
           */
          width: number;

          /**
           * Left edge of the capture, in pixels from the document origin.
           */
          x: number;

          /**
           * Top edge of the capture, in pixels from the document origin.
           */
          y: number;
        }
      }

      /**
       * Browser and content settings shared by all outputs.
       */
      export interface SharedParams {
        /**
         * Browser steps run in order before capture. Requires a paid plan. Skips the
         * cache.
         */
        actions?: Array<
          SharedParams.Perform | SharedParams.Scroll | SharedParams.Wait | SharedParams.WaitFor
        >;

        /**
         * Proxy country as a two-letter code, such as `US`. Case-insensitive.
         */
        country?: string;

        /**
         * Accept cookie banners before actions and capture.
         */
        dismissCookies?: boolean;

        /**
         * Close other popups before actions and capture.
         */
        dismissPopups?: boolean;

        /**
         * Remove elements matching these CSS selectors. Overrides `includeSelectors`.
         */
        excludeSelectors?: Array<string>;

        /**
         * HTTP headers to send to the target site. Requests with headers skip the cache.
         */
        headers?: { [key: string]: string };

        /**
         * Include iframe content in HTML and text outputs. Screenshots always show visible
         * frames.
         */
        includeFrames?: boolean;

        /**
         * Keep only elements matching these CSS selectors.
         */
        includeSelectors?: Array<string>;

        /**
         * Keep only the main content. Doesn't affect `screenshot`, `bytes`, or `product`.
         */
        mainContentOnly?: boolean;

        /**
         * Document parsing options.
         */
        parsers?: SharedParams.Parsers;

        /**
         * Create or reuse an authenticated browser profile. Requires a paid plan and an
         * HTTPS target. Profiles persist session state, bypass shared caches, and cannot
         * be combined with ZDR, custom headers, raw bytes, or prebuilt parsers.
         */
        profile?: SharedParams.Existing | SharedParams.New;

        /**
         * Wait for CSS animations to finish before capture. Defaults to `true` when
         * `screenshot` is requested.
         */
        settleAnimations?: boolean;

        /**
         * Emulate a light or dark color scheme.
         */
        theme?: 'light' | 'dark';

        /**
         * Browser size in pixels. Omit for 1920 × 1080. When provided, missing dimensions
         * default to 1440 × 900.
         */
        viewport?: SharedParams.Viewport;

        /**
         * Milliseconds, or a CSS selector to wait for, after actions. Defaults to 500
         * (2000 with frames or XML).
         */
        waitFor?: number | string;
      }

      export namespace SharedParams {
        export interface Perform {
          /**
           * One browser instruction, such as clicking a button or entering text.
           */
          action: string;

          /**
           * Use `perform` for a plain-language browser instruction.
           */
          type: 'perform';
        }

        export interface Scroll {
          /**
           * Use `scroll` to move through the page or a container.
           */
          type: 'scroll';

          /**
           * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
           */
          amount?: number | 'viewport' | 'max';

          /**
           * Direction to scroll.
           */
          direction?: 'down' | 'up' | 'left' | 'right';

          /**
           * Maximum number of scroll steps for this action.
           */
          maxScrolls?: number;

          /**
           * Scroll this container. Omit to scroll the page.
           */
          selector?: string;
        }

        export interface Wait {
          /**
           * Time to pause in milliseconds before the next action.
           */
          milliseconds: number;

          /**
           * Use `wait` to pause for a fixed duration.
           */
          type: 'wait';
        }

        export interface WaitFor {
          /**
           * CSS selector to wait for before continuing.
           */
          selector: string;

          /**
           * Use `waitFor` to wait for a matching element.
           */
          type: 'waitFor';
        }

        /**
         * Document parsing options.
         */
        export interface Parsers {
          /**
           * PDF page range and OCR.
           */
          pdf?: Parsers.Pdf;
        }

        export namespace Parsers {
          /**
           * PDF page range and OCR.
           */
          export interface Pdf {
            /**
             * Last page to parse. Must be at least `startPage`.
             */
            endPage?: number;

            /**
             * Start each page in the Markdown with a `<!-- page N -->` line using its original
             * 1-based page number; these responses are never served from cache.
             */
            includeNumberedPages?: boolean;

            /**
             * Set `auto` to read scanned pages with OCR.
             */
            ocr?: 'off' | 'auto';

            /**
             * First page to parse, starting at 1.
             */
            startPage?: number;
          }
        }

        export interface Existing {
          /**
           * The ID returned in profile.id by an earlier scrape.
           */
          profileId: string;

          /**
           * Reuse a saved browser profile.
           */
          type: 'existing';
        }

        export interface New {
          /**
           * Username or email for the target website.
           */
          identifier: string;

          /**
           * Password used to sign in. It is never stored in the profile.
           */
          password: string;

          /**
           * Sign in and create a browser profile.
           */
          type: 'new';

          /**
           * Optional label shown when listing profiles with `GET /org/browser/profiles`.
           */
          description?: string;
        }

        /**
         * Browser size in pixels. Omit for 1920 × 1080. When provided, missing dimensions
         * default to 1440 × 900.
         */
        export interface Viewport {
          /**
           * Browser viewport height in pixels.
           */
          height?: number;

          /**
           * Browser viewport width in pixels.
           */
          width?: number;
        }
      }

      /**
       * Deadline for each page, using the same behavior and defaults as POST
       * /web/scrape.
       */
      export interface TimeoutOpts {
        /**
         * Deadline in milliseconds.
         */
        milliseconds: number;

        /**
         * "fail" returns 408 at the deadline. "return-partial" returns available results;
         * inspect the response’s partial flag. "return-partial" requires at least 5000 ms.
         */
        behavior?: 'fail' | 'return-partial';
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
    data: Crawl.Markdown | Crawl.HTML | Crawl.BatchUnifiedCrawlData;

    /**
     * Discover and scrape pages from `data.source`.
     */
    mode: 'crawl';
  }

  export namespace Crawl {
    /**
     * @deprecated Crawl pages and return Markdown.
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
           * Regex pattern for URLs to exclude, even when they match `regex`. The `start_url`
           * itself is always included.
           */
          excludeRegex?: string;

          /**
           * Follow links to subdomains.
           */
          followSubdomains?: boolean;

          /**
           * Only follow pages in these languages, or `same_as_start_url`; all languages when
           * omitted.
           */
          languages?:
            | 'same_as_start_url'
            | Array<
                | 'am'
                | 'ar'
                | 'az'
                | 'be'
                | 'bg'
                | 'bn'
                | 'ca'
                | 'ceb'
                | 'cs'
                | 'cy'
                | 'da'
                | 'de'
                | 'el'
                | 'en'
                | 'es'
                | 'et'
                | 'eu'
                | 'fa'
                | 'fi'
                | 'fr'
                | 'gu'
                | 'ha'
                | 'haw'
                | 'he'
                | 'hi'
                | 'hr'
                | 'hu'
                | 'hy'
                | 'id'
                | 'is'
                | 'it'
                | 'ja'
                | 'ka'
                | 'kk'
                | 'kn'
                | 'ko'
                | 'ku'
                | 'ky'
                | 'lo'
                | 'lt'
                | 'lv'
                | 'mk'
                | 'ml'
                | 'mn'
                | 'mr'
                | 'ms'
                | 'ne'
                | 'nl'
                | 'no'
                | 'or'
                | 'pa'
                | 'pl'
                | 'ps'
                | 'pt'
                | 'ro'
                | 'ru'
                | 'sk'
                | 'sl'
                | 'so'
                | 'sq'
                | 'sr'
                | 'sv'
                | 'sw'
                | 'ta'
                | 'te'
                | 'th'
                | 'tl'
                | 'tr'
                | 'uk'
                | 'ur'
                | 'uz'
                | 'vi'
                | 'yo'
                | 'zh'
              >;

          /**
           * Maximum link depth. Source pages are depth 0. No limit when omitted.
           */
          maxDepth?: number;

          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 100000.
           */
          maxUrls?: number;

          /**
           * Regex pattern for URLs to include. The `start_url` itself is always included.
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
           * Regex pattern; sitemap URLs matching it are not scraped, even when they match
           * `regex`.
           */
          excludeRegex?: string;

          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 100000.
           */
          maxUrls?: number;

          /**
           * Regex pattern; only sitemap URLs matching it are scraped.
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
         * Include image references in the Markdown (`html-conversion` only).
         */
        includeImages?: boolean;

        /**
         * Include links in the Markdown (`html-conversion` only).
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
         * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
         */
        pdf?: Options.Pdf;

        /**
         * Wait for CSS animations to finish before extracting, on browser-rendered pages.
         */
        settleAnimations?: boolean;

        /**
         * Shorten inline base64 image data (`html-conversion` only).
         */
        shortenBase64Images?: boolean;

        /**
         * Markdown sources in order of preference: `html-conversion` converts the page
         * HTML, `markdown-direct` uses Markdown the site publishes.
         */
        sourcePreference?: Array<'html-conversion' | 'markdown-direct'>;

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
         * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
         */
        export interface Pdf {
          /**
           * Last PDF page to parse (1-based, inclusive). Defaults to the final page. Must
           * be >= start.
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
           * First 1-based PDF page to parse.
           */
          start?: number;
        }
      }
    }

    /**
     * @deprecated Crawl pages and return HTML.
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
           * Regex pattern for URLs to exclude, even when they match `regex`. The `start_url`
           * itself is always included.
           */
          excludeRegex?: string;

          /**
           * Follow links to subdomains.
           */
          followSubdomains?: boolean;

          /**
           * Only follow pages in these languages, or `same_as_start_url`; all languages when
           * omitted.
           */
          languages?:
            | 'same_as_start_url'
            | Array<
                | 'am'
                | 'ar'
                | 'az'
                | 'be'
                | 'bg'
                | 'bn'
                | 'ca'
                | 'ceb'
                | 'cs'
                | 'cy'
                | 'da'
                | 'de'
                | 'el'
                | 'en'
                | 'es'
                | 'et'
                | 'eu'
                | 'fa'
                | 'fi'
                | 'fr'
                | 'gu'
                | 'ha'
                | 'haw'
                | 'he'
                | 'hi'
                | 'hr'
                | 'hu'
                | 'hy'
                | 'id'
                | 'is'
                | 'it'
                | 'ja'
                | 'ka'
                | 'kk'
                | 'kn'
                | 'ko'
                | 'ku'
                | 'ky'
                | 'lo'
                | 'lt'
                | 'lv'
                | 'mk'
                | 'ml'
                | 'mn'
                | 'mr'
                | 'ms'
                | 'ne'
                | 'nl'
                | 'no'
                | 'or'
                | 'pa'
                | 'pl'
                | 'ps'
                | 'pt'
                | 'ro'
                | 'ru'
                | 'sk'
                | 'sl'
                | 'so'
                | 'sq'
                | 'sr'
                | 'sv'
                | 'sw'
                | 'ta'
                | 'te'
                | 'th'
                | 'tl'
                | 'tr'
                | 'uk'
                | 'ur'
                | 'uz'
                | 'vi'
                | 'yo'
                | 'zh'
              >;

          /**
           * Maximum link depth. Source pages are depth 0. No limit when omitted.
           */
          maxDepth?: number;

          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 100000.
           */
          maxUrls?: number;

          /**
           * Regex pattern for URLs to include. The `start_url` itself is always included.
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
           * Regex pattern; sitemap URLs matching it are not scraped, even when they match
           * `regex`.
           */
          excludeRegex?: string;

          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 100000.
           */
          maxUrls?: number;

          /**
           * Regex pattern; only sitemap URLs matching it are scraped.
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
         * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
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
         * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
         */
        export interface Pdf {
          /**
           * Last PDF page to parse (1-based, inclusive). Defaults to the final page. Must
           * be >= start.
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
           * First 1-based PDF page to parse.
           */
          start?: number;
        }
      }
    }

    /**
     * Use the same formats and parameters as POST /web/scrape, replacing url with
     * source. Options apply to every page.
     */
    export interface BatchUnifiedCrawlData {
      /**
       * Outputs to return. Set at least one to `true`.
       */
      formats: BatchUnifiedCrawlData.Formats;

      /**
       * How to find pages to crawl.
       */
      source: BatchUnifiedCrawlData.StartURL | BatchUnifiedCrawlData.Sitemap;

      /**
       * Requires `formats.highlights: true`; required when it is set.
       */
      highlightsParams?: BatchUnifiedCrawlData.HighlightsParams;

      /**
       * Image options. Requires formats.images: true.
       */
      imageParams?: BatchUnifiedCrawlData.ImageParams;

      /**
       * Requires `formats.json: true`; required when it is set.
       */
      jsonParams?: BatchUnifiedCrawlData.JsonParams;

      /**
       * Markdown options. Requires `formats.markdown`.
       */
      markdownParams?: BatchUnifiedCrawlData.MarkdownParams;

      /**
       * Maximum age of a cached output, in milliseconds. `0` fetches fresh. Defaults to
       * 3 days (259200000 ms). Maximum: 1 year (31536000000 ms).
       */
      maxAgeMs?: number;

      /**
       * Requires `formats.parse: true`; required when it is set.
       */
      parseParams?: BatchUnifiedCrawlData.CustomParser | BatchUnifiedCrawlData.PrebuiltParser;

      /**
       * Product options. Requires formats.product: true.
       */
      productParams?: BatchUnifiedCrawlData.ProductParams;

      /**
       * Screenshot options. Requires formats.screenshot: true.
       */
      screenshotParams?: BatchUnifiedCrawlData.ScreenshotParams;

      /**
       * Browser and content settings shared by all outputs.
       */
      sharedParams?: BatchUnifiedCrawlData.SharedParams;

      /**
       * Labels for filtering usage in the dashboard.
       */
      tags?: Array<string>;

      /**
       * Deadline for each page, using the same behavior and defaults as POST
       * /web/scrape.
       */
      timeoutOpts?: BatchUnifiedCrawlData.TimeoutOpts;

      /**
       * Batches persist their results. Only disabled is supported; enabled returns
       * ZDR_NOT_SUPPORTED.
       */
      zdr?: 'disabled';
    }

    export namespace BatchUnifiedCrawlData {
      /**
       * Outputs to return. Set at least one to `true`.
       */
      export interface Formats {
        /**
         * The original HTTP response body.
         */
        bytes?: boolean;

        /**
         * Markdown excerpts relevant to `highlightsParams.query`.
         */
        highlights?: boolean;

        /**
         * Rendered HTML.
         */
        html?: boolean;

        /**
         * Images found on the page.
         */
        images?: boolean;

        /**
         * An object matching `jsonParams.schema`, extracted from the page.
         */
        json?: boolean;

        /**
         * Page content as Markdown.
         */
        markdown?: boolean;

        /**
         * Fields extracted with custom rules or a prebuilt parser, returned as `parsed`.
         */
        parse?: boolean;

        /**
         * Product details such as name, price, and availability.
         */
        product?: boolean;

        /**
         * A screenshot of the page.
         */
        screenshot?: boolean;
      }

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
           * Regex pattern for URLs to exclude, even when they match `regex`. The `start_url`
           * itself is always included.
           */
          excludeRegex?: string;

          /**
           * Follow links to subdomains.
           */
          followSubdomains?: boolean;

          /**
           * Only follow pages in these languages, or `same_as_start_url`; all languages when
           * omitted.
           */
          languages?:
            | 'same_as_start_url'
            | Array<
                | 'am'
                | 'ar'
                | 'az'
                | 'be'
                | 'bg'
                | 'bn'
                | 'ca'
                | 'ceb'
                | 'cs'
                | 'cy'
                | 'da'
                | 'de'
                | 'el'
                | 'en'
                | 'es'
                | 'et'
                | 'eu'
                | 'fa'
                | 'fi'
                | 'fr'
                | 'gu'
                | 'ha'
                | 'haw'
                | 'he'
                | 'hi'
                | 'hr'
                | 'hu'
                | 'hy'
                | 'id'
                | 'is'
                | 'it'
                | 'ja'
                | 'ka'
                | 'kk'
                | 'kn'
                | 'ko'
                | 'ku'
                | 'ky'
                | 'lo'
                | 'lt'
                | 'lv'
                | 'mk'
                | 'ml'
                | 'mn'
                | 'mr'
                | 'ms'
                | 'ne'
                | 'nl'
                | 'no'
                | 'or'
                | 'pa'
                | 'pl'
                | 'ps'
                | 'pt'
                | 'ro'
                | 'ru'
                | 'sk'
                | 'sl'
                | 'so'
                | 'sq'
                | 'sr'
                | 'sv'
                | 'sw'
                | 'ta'
                | 'te'
                | 'th'
                | 'tl'
                | 'tr'
                | 'uk'
                | 'ur'
                | 'uz'
                | 'vi'
                | 'yo'
                | 'zh'
              >;

          /**
           * Maximum link depth. Source pages are depth 0. No limit when omitted.
           */
          maxDepth?: number;

          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 100000.
           */
          maxUrls?: number;

          /**
           * Regex pattern for URLs to include. The `start_url` itself is always included.
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
           * Regex pattern; sitemap URLs matching it are not scraped, even when they match
           * `regex`.
           */
          excludeRegex?: string;

          /**
           * Maximum pages to fetch. Unused reserved credits are refunded. Maximum 100000.
           */
          maxUrls?: number;

          /**
           * Regex pattern; only sitemap URLs matching it are scraped.
           */
          regex?: string;
        }
      }

      /**
       * Requires `formats.highlights: true`; required when it is set.
       */
      export interface HighlightsParams {
        /**
         * The question or topic to find passages for.
         */
        query: string;

        /**
         * Maximum combined length of returned passages.
         */
        maxCharacters?: number;
      }

      /**
       * Image options. Requires formats.images: true.
       */
      export interface ImageParams {
        /**
         * Set `visual` to drop visual duplicates, keeping the largest copy.
         */
        dedupe?: 'none' | 'visual';

        /**
         * Extra data per image: `dimensions`, `classification`, or a hosted `file` URL.
         */
        enrich?: Array<'dimensions' | 'classification' | 'file'>;
      }

      /**
       * Requires `formats.json: true`; required when it is set.
       */
      export interface JsonParams {
        /**
         * JSON Schema (not an example object) for a top-level object, up to 50 KB. Use
         * optional or nullable fields for missing facts.
         */
        schema: { [key: string]: unknown };

        /**
         * Extra guidance, such as which facts to prefer or how to read a field.
         */
        instructions?: string;
      }

      /**
       * Markdown options. Requires `formats.markdown`.
       */
      export interface MarkdownParams {
        /**
         * Include images in the Markdown (`html-conversion` only).
         */
        includeImages?: boolean;

        /**
         * Keep link URLs in the Markdown (`html-conversion` only).
         */
        includeLinks?: boolean;

        /**
         * How base64 images appear when `includeImages` is set (`html-conversion` only).
         */
        inlineImages?: 'placeholder' | 'preserve';

        /**
         * Markdown sources in order of preference: `html-conversion` converts the page
         * HTML, `markdown-direct` uses Markdown the site publishes.
         */
        sourcePreference?: Array<'html-conversion' | 'markdown-direct'>;
      }

      export interface CustomParser {
        /**
         * Field names mapped to CSS selectors (`h1`, `a@href`) or rule objects. Max 100
         * fields, 5 levels.
         */
        rules: { [key: string]: string | CustomParser.UnionMember1 };

        /**
         * Extract fields using custom CSS rules. This is the default when type is omitted.
         */
        type?: 'custom';
      }

      export namespace CustomParser {
        export interface UnionMember1 {
          /**
           * CSS selector to match within the current page or parent rule.
           */
          selector: string;

          /**
           * Return text, HTML, an attribute such as `@href`, or nested field rules. Defaults
           * to text.
           */
          output?: 'text' | 'html' | string | unknown;

          /**
           * Return the first match with `item` or all matches with `list`.
           */
          type?: 'item' | 'list';
        }
      }

      export interface PrebuiltParser {
        /**
         * google-maps parses Google Maps business data into data.results. Accepts Maps
         * place, search, and internal data URLs. Uses a US exit and English labels
         * regardless of hl or Accept-Language. google-maps-reviews returns the reviews of
         * a place in data.reviews, in the same shape as the Serper reviews API (rating,
         * date, isoDate, snippet, translatedSnippet, likes, user, media, response, link,
         * id), plus language, guided ratings in details, and user.isLocalGuide; data also
         * carries the place featureId, cid, and sort. sort and limit pick the order and
         * count, and oldest is exact. It accepts Maps place, search, and ?cid= URLs, plus
         * search.google.com/local/reviews URLs, so the google_maps_url and
         * google_reviews_url fields of google-maps results work as input. An unknown place
         * returns no reviews. google-play parses a Play Store app into data: details,
         * developer contact, ratings, price, permissions, and data safety.
         * google-play-reviews returns the 200 newest reviews of the app, with developer
         * replies, in data.reviews. Both Play parsers accept app details URLs
         * (play.google.com/store/apps/details?id=…); hl and gl set the language and
         * storefront, defaulting to en and us. app-store parses an App Store app into
         * data: details, developer, ratings, price, version, and screenshots.
         * app-store-reviews returns up to the 500 newest reviews in data.reviews. Both App
         * Store parsers accept app URLs (apps.apple.com/us/app/…/id…); the country in the
         * path sets the storefront, defaulting to us. g2-reviews returns the 25 most
         * recently published reviews of a G2 product in data.reviews (rating, title,
         * likes, dislikes, problems_solved, reviewer role, company size, and industry),
         * plus data.product. It accepts G2 product URLs (g2.com/products/…), follows
         * renamed products, and keeps star-rating filters from the URL
         * (filters[nps_score][]=1 to 5); other filters, sort orders, and pages are
         * ignored. instagram-profile parses a public profile (instagram.com/{username})
         * into data: bio, links, follower and post counts, category, business address,
         * similar_accounts, and latest_posts (up to the 12 posts at the top of the
         * profile, newest first). Instagram lists pinned posts there ahead of newer ones,
         * so posts with is_pinned true can be older; when Instagram shows only a rounded
         * post count (32K), post_count is that rounded number and is_post_count_rounded is
         * true. instagram-post parses a post or reel (/p/…, /reel/…) into data: caption,
         * hashtags, mentions, like, comment, and view counts (like_count and view_count
         * are null when the owner hides them), media URLs, tagged users, collaborators,
         * location, and the top ~14 comments in data.comments. instagram-feed returns the
         * top posts for a hashtag or keyword (/explore/tags/…, /popular/…) or the recent
         * posts at a location (/explore/locations/{id}/…) in data.posts; keyword posts
         * carry only the shortcode, owner, thumbnail, and views, plus the caption when
         * Instagram shows it. All three Instagram parsers read public data without logging
         * in, so private accounts return no posts and follower lists are unavailable.
         * tiktok-profile parses a public profile (tiktok.com/@{username}) into data:
         * nickname, bio, bio link, follower, following, like, and video counts, verified,
         * private, and business flags, and business category; it does not list videos.
         * tiktok-video parses a video or photo post (/@{username}/video/{id} or
         * /@{username}/photo/{id}) into data: caption, hashtags, mentions, author, view,
         * like, comment, share, save, and repost counts, duration, thumbnail, a video_url
         * that downloads without cookies, image_urls for photo posts, music, location, and
         * ad, paid-partnership, and AI-generated flags. tiktok-feed returns videos in the
         * tiktok-video shape as data.videos: the latest 15 from a profile URL, the top 30
         * from a hashtag URL (/tag/{name}), or the top 12 from a search URL
         * (/search?q={query}). tiktok-comments returns the first 20 comments of a video or
         * photo post as data.comments: text, posted_at, like and reply counts, whether the
         * author liked it, and the commenter. tiktok-followers and tiktok-following return
         * up to 30 accounts of a profile as data.users, in the tiktok-profile shape.
         * tiktok-user-search returns the top 10 accounts for a user search URL
         * (/search/user?q={query}) as data.users: id, username, nickname, biography,
         * avatar_url, sec_uid, follower_count, like_count, and is_verified. The TikTok
         * parsers accept tiktok.com, www.tiktok.com, and m.tiktok.com URLs but not short
         * links (vm.tiktok.com, vt.tiktok.com, tiktok.com/t/…). yelp-search accepts Yelp
         * search URLs with find_desc and find_loc, reads start as the result offset, and
         * returns up to 20 ranked organic businesses in data.businesses with total and
         * pagination. yelp-reviews accepts a Yelp business URL (yelp.com/biz/{alias}),
         * uses optional start for the offset, and always sorts newest first; unsupported
         * sort and review filters are rejected, while tracking params are ignored. It
         * returns up to 20 latest public reviews in data.reviews with business details and
         * pagination.next_offset. Each review has rating, full text, updated_at, and
         * author; owner replies and photos are not included. emails accepts any page and
         * returns its email addresses as data.emails ([{ email }]), read from mailto
         * links, Cloudflare-protected addresses, and visible text. phone-numbers accepts
         * any page and returns its valid phone numbers in E.164 as data.phone_numbers ([{
         * phone }]), read from tel links and visible text; numbers without a country code
         * are read for the country of the site TLD, defaulting to US. links accepts any
         * page and returns its unique http(s) links as data.links ([{ url, text }]), with
         * absolute URLs; text falls back to aria-label or image alt and is null when a
         * link has none. The emails parser reads the rendered page and respects content
         * filters; the other prebuilt parsers read their data independently of DOM
         * filters.
         */
        parser:
          | 'google-maps'
          | 'google-maps-reviews'
          | 'google-play'
          | 'google-play-reviews'
          | 'app-store'
          | 'app-store-reviews'
          | 'g2-reviews'
          | 'instagram-profile'
          | 'instagram-post'
          | 'instagram-feed'
          | 'tiktok-profile'
          | 'tiktok-video'
          | 'tiktok-feed'
          | 'tiktok-comments'
          | 'tiktok-followers'
          | 'tiktok-following'
          | 'tiktok-user-search'
          | 'yelp-search'
          | 'yelp-reviews'
          | 'emails'
          | 'phone-numbers'
          | 'links';

        /**
         * Use a prebuilt parser instead of custom rules.
         */
        type: 'prebuilt';

        /**
         * google-maps-reviews only. Maximum number of reviews to return. Defaults to 100;
         * maximum 1000.
         */
        limit?: number;

        /**
         * google-maps-reviews only. Order of data.reviews. newest, relevant, highest, and
         * lowest follow Google; oldest returns the earliest reviews first, which Google
         * itself does not offer.
         */
        sort?: 'newest' | 'oldest' | 'relevant' | 'highest' | 'lowest';
      }

      /**
       * Product options. Requires formats.product: true.
       */
      export interface ProductParams {
        /**
         * Drop visually duplicate product images, keeping the largest copy.
         */
        dedupeImages?: boolean;

        /**
         * @deprecated Ignored. The AI fallback runs automatically.
         */
        useAIFallback?: boolean;
      }

      /**
       * Screenshot options. Requires formats.screenshot: true.
       */
      export interface ScreenshotParams {
        /**
         * What to capture: `viewport`, `fullPage`, one element, or a rectangle. Max 40
         * megapixels.
         */
        area?: 'viewport' | 'fullPage' | ScreenshotParams.Element | ScreenshotParams.Rectangle;

        /**
         * Image format for the screenshot.
         */
        format?: 'png' | 'jpeg' | 'webp';
      }

      export namespace ScreenshotParams {
        export interface Element {
          /**
           * CSS selector matching exactly one visible element.
           */
          selector: string;
        }

        /**
         * Pixels from the document origin.
         */
        export interface Rectangle {
          /**
           * Height of the capture in pixels.
           */
          height: number;

          /**
           * Width of the capture in pixels.
           */
          width: number;

          /**
           * Left edge of the capture, in pixels from the document origin.
           */
          x: number;

          /**
           * Top edge of the capture, in pixels from the document origin.
           */
          y: number;
        }
      }

      /**
       * Browser and content settings shared by all outputs.
       */
      export interface SharedParams {
        /**
         * Browser steps run in order before capture. Requires a paid plan. Skips the
         * cache.
         */
        actions?: Array<
          SharedParams.Perform | SharedParams.Scroll | SharedParams.Wait | SharedParams.WaitFor
        >;

        /**
         * Proxy country as a two-letter code, such as `US`. Case-insensitive.
         */
        country?: string;

        /**
         * Accept cookie banners before actions and capture.
         */
        dismissCookies?: boolean;

        /**
         * Close other popups before actions and capture.
         */
        dismissPopups?: boolean;

        /**
         * Remove elements matching these CSS selectors. Overrides `includeSelectors`.
         */
        excludeSelectors?: Array<string>;

        /**
         * HTTP headers to send to the target site. Requests with headers skip the cache.
         */
        headers?: { [key: string]: string };

        /**
         * Include iframe content in HTML and text outputs. Screenshots always show visible
         * frames.
         */
        includeFrames?: boolean;

        /**
         * Keep only elements matching these CSS selectors.
         */
        includeSelectors?: Array<string>;

        /**
         * Keep only the main content. Doesn't affect `screenshot`, `bytes`, or `product`.
         */
        mainContentOnly?: boolean;

        /**
         * Document parsing options.
         */
        parsers?: SharedParams.Parsers;

        /**
         * Create or reuse an authenticated browser profile. Requires a paid plan and an
         * HTTPS target. Profiles persist session state, bypass shared caches, and cannot
         * be combined with ZDR, custom headers, raw bytes, or prebuilt parsers.
         */
        profile?: SharedParams.Existing | SharedParams.New;

        /**
         * Wait for CSS animations to finish before capture. Defaults to `true` when
         * `screenshot` is requested.
         */
        settleAnimations?: boolean;

        /**
         * Emulate a light or dark color scheme.
         */
        theme?: 'light' | 'dark';

        /**
         * Browser size in pixels. Omit for 1920 × 1080. When provided, missing dimensions
         * default to 1440 × 900.
         */
        viewport?: SharedParams.Viewport;

        /**
         * Milliseconds, or a CSS selector to wait for, after actions. Defaults to 500
         * (2000 with frames or XML).
         */
        waitFor?: number | string;
      }

      export namespace SharedParams {
        export interface Perform {
          /**
           * One browser instruction, such as clicking a button or entering text.
           */
          action: string;

          /**
           * Use `perform` for a plain-language browser instruction.
           */
          type: 'perform';
        }

        export interface Scroll {
          /**
           * Use `scroll` to move through the page or a container.
           */
          type: 'scroll';

          /**
           * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
           */
          amount?: number | 'viewport' | 'max';

          /**
           * Direction to scroll.
           */
          direction?: 'down' | 'up' | 'left' | 'right';

          /**
           * Maximum number of scroll steps for this action.
           */
          maxScrolls?: number;

          /**
           * Scroll this container. Omit to scroll the page.
           */
          selector?: string;
        }

        export interface Wait {
          /**
           * Time to pause in milliseconds before the next action.
           */
          milliseconds: number;

          /**
           * Use `wait` to pause for a fixed duration.
           */
          type: 'wait';
        }

        export interface WaitFor {
          /**
           * CSS selector to wait for before continuing.
           */
          selector: string;

          /**
           * Use `waitFor` to wait for a matching element.
           */
          type: 'waitFor';
        }

        /**
         * Document parsing options.
         */
        export interface Parsers {
          /**
           * PDF page range and OCR.
           */
          pdf?: Parsers.Pdf;
        }

        export namespace Parsers {
          /**
           * PDF page range and OCR.
           */
          export interface Pdf {
            /**
             * Last page to parse. Must be at least `startPage`.
             */
            endPage?: number;

            /**
             * Start each page in the Markdown with a `<!-- page N -->` line using its original
             * 1-based page number; these responses are never served from cache.
             */
            includeNumberedPages?: boolean;

            /**
             * Set `auto` to read scanned pages with OCR.
             */
            ocr?: 'off' | 'auto';

            /**
             * First page to parse, starting at 1.
             */
            startPage?: number;
          }
        }

        export interface Existing {
          /**
           * The ID returned in profile.id by an earlier scrape.
           */
          profileId: string;

          /**
           * Reuse a saved browser profile.
           */
          type: 'existing';
        }

        export interface New {
          /**
           * Username or email for the target website.
           */
          identifier: string;

          /**
           * Password used to sign in. It is never stored in the profile.
           */
          password: string;

          /**
           * Sign in and create a browser profile.
           */
          type: 'new';

          /**
           * Optional label shown when listing profiles with `GET /org/browser/profiles`.
           */
          description?: string;
        }

        /**
         * Browser size in pixels. Omit for 1920 × 1080. When provided, missing dimensions
         * default to 1440 × 900.
         */
        export interface Viewport {
          /**
           * Browser viewport height in pixels.
           */
          height?: number;

          /**
           * Browser viewport width in pixels.
           */
          width?: number;
        }
      }

      /**
       * Deadline for each page, using the same behavior and defaults as POST
       * /web/scrape.
       */
      export interface TimeoutOpts {
        /**
         * Deadline in milliseconds.
         */
        milliseconds: number;

        /**
         * "fail" returns 408 at the deadline. "return-partial" returns available results;
         * inspect the response’s partial flag. "return-partial" requires at least 5000 ms.
         */
        behavior?: 'fail' | 'return-partial';
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
