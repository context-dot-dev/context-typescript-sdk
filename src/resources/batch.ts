// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as BatchAPI from './batch';
import * as WebhooksAPI from './webhooks/webhooks';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Scrape up to 100,000 URLs or crawl a site asynchronously.
 */
export class Batch extends APIResource {
  /**
   * Retrieve a batch's status, progress, and credit usage, plus links to download
   * its results once it finishes. Result files are deleted 180 days after the batch
   * finishes.
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
   * List your batches, newest first. Filter by status or tags, or search by batch
   * ID, crawl source, or tag.
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
   * Stop a batch from starting new pages. Pages already in progress finish, then the
   * batch becomes `cancelled` and unused credits are refunded.
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
   * Page through a finished batch's results as JSON. Each record's `result` has the
   * same outputs and per-format errors as `POST /web/scrape`. Results are kept for
   * 180 days after the batch finishes.
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
   * Scrape up to 100,000 URLs, or crawl a site, asynchronously with every Scrape
   * Anything format and option from `POST /web/scrape`. Poll `GET /batch/{batch_id}`
   * or pass `webhook` to be notified when the batch finishes. URLs and credits are
   * checked after the batch is accepted, so a batch that fails those checks ends as
   * `failed` with a `failure` code instead of returning an error.
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
   * Number of pages that failed with this code.
   */
  count: number;
}

/**
 * Why the batch as a whole failed. Individual page failures are counted in
 * `page_errors`.
 */
export interface Failure {
  /**
   * Machine-readable failure code, such as `stalled` or `USAGE_EXCEEDED`.
   */
  code: string;

  /**
   * Human-readable explanation of the failure.
   */
  message: string;
}

/**
 * Crawl settings as submitted.
 */
export interface CrawlControls {
  /**
   * Matchers for the pages the crawl skipped. `null` when it skipped none.
   */
  exclude: Array<CrawlControls.CrawlRegexMatcher | CrawlControls.CrawlProductMatcher> | null;

  /**
   * Regex that excluded matching URLs from the crawl. `null` when the crawl set
   * none.
   */
  exclude_url_pattern: string | null;

  /**
   * Matchers for the links the crawl followed. `null` when it followed every link.
   */
  follow: Array<
    CrawlControls.CrawlRegexMatcher | CrawlControls.CrawlPaginationMatcher | CrawlControls.CrawlProductMatcher
  > | null;

  /**
   * Whether links to subdomains were followed. Always `false` for a sitemap crawl.
   */
  follow_subdomains: boolean;

  /**
   * Languages whose pages were followed. `null` when all languages were.
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
   * Maximum link depth. Always `0` for a sitemap crawl; `null` when a `start_url`
   * crawl set no limit.
   */
  max_depth: number | null;

  /**
   * The `maxUrls` submitted with the crawl. A sitemap crawl scrapes only the URLs
   * its sitemap lists, up to this many, so `input.reserved` can be lower.
   */
  max_pages: number;

  /**
   * Matchers for the pages the crawl returned. `null` when it returned every fetched
   * page.
   */
  scrape: Array<CrawlControls.CrawlRegexMatcher | CrawlControls.CrawlProductMatcher> | null;

  /**
   * Where the crawl started.
   */
  source: CrawlControls.StartURL | CrawlControls.Sitemap;

  /**
   * Regex that URLs had to match to be crawled. `null` when the crawl set none.
   */
  url_pattern: string | null;
}

export namespace CrawlControls {
  /**
   * Pages whose URL matches a regex pattern.
   */
  export interface CrawlRegexMatcher {
    /**
     * Match pages by URL pattern.
     */
    kind: 'regex';

    /**
     * Regular expression matched against the page URL.
     */
    pattern: string;
  }

  /**
   * Product detail pages.
   */
  export interface CrawlProductMatcher {
    /**
     * Match product detail pages.
     */
    kind: 'product';
  }

  /**
   * Pages whose URL matches a regex pattern.
   */
  export interface CrawlRegexMatcher {
    /**
     * Match pages by URL pattern.
     */
    kind: 'regex';

    /**
     * Regular expression matched against the page URL.
     */
    pattern: string;
  }

  /**
   * Further pages of a paginated list, such as page 2 of a catalog.
   */
  export interface CrawlPaginationMatcher {
    /**
     * Match the further pages of a paginated list.
     */
    kind: 'pagination';
  }

  /**
   * Product detail pages.
   */
  export interface CrawlProductMatcher {
    /**
     * Match product detail pages.
     */
    kind: 'product';
  }

  /**
   * Pages whose URL matches a regex pattern.
   */
  export interface CrawlRegexMatcher {
    /**
     * Match pages by URL pattern.
     */
    kind: 'regex';

    /**
     * Regular expression matched against the page URL.
     */
    pattern: string;
  }

  /**
   * Product detail pages.
   */
  export interface CrawlProductMatcher {
    /**
     * Match product detail pages.
     */
    kind: 'product';
  }

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
 * Page counts from your submission.
 */
export interface Intake {
  /**
   * URLs dropped because another entry resolved to the same page. Sitemap crawls
   * report duplicates too, since sitemaps often list a page more than once.
   */
  duplicates: number;

  /**
   * URLs rejected as invalid. `null` for a crawl.
   */
  invalid: number | null;

  /**
   * Pages accepted for scraping. `progress` counts toward this total.
   */
  reserved: number;

  /**
   * `true` when `reserved` is a crawl ceiling, `false` when it is an exact URL
   * count.
   */
  reserved_is_ceiling: boolean;

  /**
   * URLs in your list before validation and de-duplication. `null` for a crawl.
   */
  submitted: number | null;
}

export interface BatchRetrieveResponse {
  /**
   * Unique ID of the batch.
   */
  id: string;

  /**
   * Crawl settings as submitted.
   */
  crawl: CrawlControls | null;

  /**
   * Credits reserved, refunded, and charged for the batch.
   */
  credits: BatchRetrieveResponse.Credits;

  /**
   * Why the batch as a whole failed. Individual page failures are counted in
   * `page_errors`.
   */
  failure: Failure | null;

  /**
   * Formats requested for each page, as submitted in `input.data.formats`.
   */
  formats: BatchRetrieveResponse.Formats;

  /**
   * Page counts from your submission.
   */
  input: Intake;

  /**
   * URLs rejected from your list, up to the first 100.
   */
  invalid_urls: Array<BatchRetrieveResponse.InvalidURL>;

  /**
   * `scrape` for a URL list, `crawl` for a site crawl.
   */
  mode: 'scrape' | 'crawl';

  /**
   * Page failures grouped by error code, most common first. For the batch itself
   * failing, see `failure`.
   */
  page_errors: Array<PageErrorCount>;

  /**
   * Page counts so far. Check `status` to know when the batch is done.
   */
  progress: BatchRetrieveResponse.Progress;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Links to download the results. `null` until the batch finishes; the files are
   * deleted 180 days after that.
   */
  results: BatchRetrieveResponse.Results | null;

  /**
   * Current state. `pending` batches are being validated or are waiting for a slot
   * under your plan's concurrent batch limit, `queued` batches are ready to start,
   * and `running` batches are scraping. `completed`, `cancelled`, and `failed` are
   * final.
   */
  status: 'pending' | 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Tags set when the batch was submitted.
   */
  tags: Array<string>;

  /**
   * When the batch was created, started, and finished.
   */
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
   * ID of the batch's final-status webhook delivery, for
   * `GET /webhooks/deliveries/{delivery_id}`. Omitted until a delivery exists.
   */
  webhook_delivery_id?: string;
}

export namespace BatchRetrieveResponse {
  /**
   * Credits reserved, refunded, and charged for the batch.
   */
  export interface Credits {
    /**
     * `reserved` minus `refunded` plus `ocr_charged`.
     */
    net: number;

    /**
     * Credits charged for OCR when the batch finishes.
     */
    ocr_charged: number;

    /**
     * Credits returned when the batch finishes, such as for failed or unattempted
     * pages.
     */
    refunded: number;

    /**
     * Credits reserved before scraping starts. `0` while `pending`.
     */
    reserved: number;
  }

  /**
   * Formats requested for each page, as submitted in `input.data.formats`.
   */
  export interface Formats {
    /**
     * Return the original HTTP response body.
     */
    bytes?: boolean;

    /**
     * Return Markdown excerpts relevant to `highlightsParams.query`.
     */
    highlights?: boolean;

    /**
     * Return the rendered HTML.
     */
    html?: boolean;

    /**
     * Return the images found on the page.
     */
    images?: boolean;

    /**
     * Return an object matching `jsonParams.schema`, extracted from the page text and
     * embedded data such as JSON-LD, meta tags, and framework state.
     */
    json?: boolean;

    /**
     * Return the page content, or a video transcript, as Markdown.
     */
    markdown?: boolean;

    /**
     * Return fields extracted with custom rules or a prebuilt parser, as `parsed`.
     */
    parse?: boolean;

    /**
     * Return product details such as name, price, and availability.
     */
    product?: boolean;

    /**
     * Return a screenshot of the page.
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
   * Page counts so far. Check `status` to know when the batch is done.
   */
  export interface Progress {
    /**
     * Pages that could not be scraped.
     */
    failed: number;

    /**
     * Accepted pages not yet attempted. A link-following crawl reports `0` once it
     * finishes, since its unused page budget is not counted.
     */
    pending: number;

    /**
     * Pages scraped successfully.
     */
    succeeded: number;
  }

  /**
   * Links to download the results. `null` until the batch finishes; the files are
   * deleted 180 days after that.
   */
  export interface Results {
    /**
     * When these links expire, 24 hours after this response. Retrieve the batch again
     * for fresh links.
     */
    expires_at: string;

    /**
     * Result files, in no particular order.
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
       * Number of result records in this file.
       */
      items: number;

      /**
       * Temporary download URL for a gzipped NDJSON file of result records.
       */
      url: string;
    }
  }

  /**
   * When the batch was created, started, and finished.
   */
  export interface Timing {
    /**
     * When the batch reached a final status. `null` until then.
     */
    completed_at: string | null;

    /**
     * When the batch was created.
     */
    created_at: string;

    /**
     * When scraping started. `null` until the batch is `running`.
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
     * Credits your organization has left after this request.
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
   * Whether more results are available after this page.
   */
  has_more?: boolean;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BatchListResponse.KeyMetadata;

  /**
   * Pass as `cursor` to fetch the next page. `null` on the last page.
   */
  next_cursor?: string | null;
}

export namespace BatchListResponse {
  /**
   * An asynchronous scrape or crawl job.
   */
  export interface Data {
    /**
     * Unique ID of the batch.
     */
    id: string;

    /**
     * Crawl settings as submitted.
     */
    crawl: BatchAPI.CrawlControls | null;

    /**
     * Credits reserved, refunded, and charged for the batch.
     */
    credits: Data.Credits;

    /**
     * Why the batch as a whole failed. Individual page failures are counted in
     * `page_errors`.
     */
    failure: BatchAPI.Failure | null;

    /**
     * Formats requested for each page, as submitted in `input.data.formats`.
     */
    formats: Data.Formats;

    /**
     * Page counts from your submission.
     */
    input: BatchAPI.Intake;

    /**
     * `scrape` for a URL list, `crawl` for a site crawl.
     */
    mode: 'scrape' | 'crawl';

    /**
     * Page failures grouped by error code, most common first. For the batch itself
     * failing, see `failure`.
     */
    page_errors: Array<BatchAPI.PageErrorCount>;

    /**
     * Page counts so far. Check `status` to know when the batch is done.
     */
    progress: Data.Progress;

    /**
     * Links to download the results. `null` until the batch finishes; the files are
     * deleted 180 days after that.
     */
    results: Data.Results | null;

    /**
     * Current state. `pending` batches are being validated or are waiting for a slot
     * under your plan's concurrent batch limit, `queued` batches are ready to start,
     * and `running` batches are scraping. `completed`, `cancelled`, and `failed` are
     * final.
     */
    status: 'pending' | 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

    /**
     * Tags set when the batch was submitted.
     */
    tags: Array<string>;

    /**
     * When the batch was created, started, and finished.
     */
    timing: Data.Timing;

    /**
     * Access policy IDs applied to every page.
     */
    policies?: Array<string>;
  }

  export namespace Data {
    /**
     * Credits reserved, refunded, and charged for the batch.
     */
    export interface Credits {
      /**
       * `reserved` minus `refunded` plus `ocr_charged`.
       */
      net: number;

      /**
       * Credits charged for OCR when the batch finishes.
       */
      ocr_charged: number;

      /**
       * Credits returned when the batch finishes, such as for failed or unattempted
       * pages.
       */
      refunded: number;

      /**
       * Credits reserved before scraping starts. `0` while `pending`.
       */
      reserved: number;
    }

    /**
     * Formats requested for each page, as submitted in `input.data.formats`.
     */
    export interface Formats {
      /**
       * Return the original HTTP response body.
       */
      bytes?: boolean;

      /**
       * Return Markdown excerpts relevant to `highlightsParams.query`.
       */
      highlights?: boolean;

      /**
       * Return the rendered HTML.
       */
      html?: boolean;

      /**
       * Return the images found on the page.
       */
      images?: boolean;

      /**
       * Return an object matching `jsonParams.schema`, extracted from the page text and
       * embedded data such as JSON-LD, meta tags, and framework state.
       */
      json?: boolean;

      /**
       * Return the page content, or a video transcript, as Markdown.
       */
      markdown?: boolean;

      /**
       * Return fields extracted with custom rules or a prebuilt parser, as `parsed`.
       */
      parse?: boolean;

      /**
       * Return product details such as name, price, and availability.
       */
      product?: boolean;

      /**
       * Return a screenshot of the page.
       */
      screenshot?: boolean;
    }

    /**
     * Page counts so far. Check `status` to know when the batch is done.
     */
    export interface Progress {
      /**
       * Pages that could not be scraped.
       */
      failed: number;

      /**
       * Accepted pages not yet attempted. A link-following crawl reports `0` once it
       * finishes, since its unused page budget is not counted.
       */
      pending: number;

      /**
       * Pages scraped successfully.
       */
      succeeded: number;
    }

    /**
     * Links to download the results. `null` until the batch finishes; the files are
     * deleted 180 days after that.
     */
    export interface Results {
      /**
       * When these links expire, 24 hours after this response. Retrieve the batch again
       * for fresh links.
       */
      expires_at: string;

      /**
       * Result files, in no particular order.
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
         * Number of result records in this file.
         */
        items: number;

        /**
         * Temporary download URL for a gzipped NDJSON file of result records.
         */
        url: string;
      }
    }

    /**
     * When the batch was created, started, and finished.
     */
    export interface Timing {
      /**
       * When the batch reached a final status. `null` until then.
       */
      completed_at: string | null;

      /**
       * When the batch was created.
       */
      created_at: string;

      /**
       * When scraping started. `null` until the batch is `running`.
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
     * Credits your organization has left after this request.
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
   * Always `true`.
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
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface BatchCancelResponse {
  /**
   * Unique ID of the batch.
   */
  id: string;

  /**
   * Crawl settings as submitted.
   */
  crawl: CrawlControls | null;

  /**
   * Credits reserved for the batch.
   */
  credits: BatchCancelResponse.Credits;

  /**
   * Formats requested for each page, as submitted in `input.data.formats`.
   */
  formats: BatchCancelResponse.Formats;

  /**
   * Page counts from your submission.
   */
  input: Intake;

  /**
   * `scrape` for a URL list, `crawl` for a site crawl.
   */
  mode: 'scrape' | 'crawl';

  /**
   * Page failures so far, grouped by error code, most common first.
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
   * Always `cancelling`. Pages in progress finish, then the batch becomes
   * `cancelled`.
   */
  status: 'cancelling';

  /**
   * Tags set when the batch was submitted.
   */
  tags: Array<string>;

  /**
   * When the batch was created and started.
   */
  timing: BatchCancelResponse.Timing;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BatchCancelResponse.KeyMetadata;
}

export namespace BatchCancelResponse {
  /**
   * Credits reserved for the batch.
   */
  export interface Credits {
    /**
     * Credits reserved for the batch. Unused credits are refunded once it reaches
     * `cancelled`.
     */
    reserved: number;
  }

  /**
   * Formats requested for each page, as submitted in `input.data.formats`.
   */
  export interface Formats {
    /**
     * Return the original HTTP response body.
     */
    bytes?: boolean;

    /**
     * Return Markdown excerpts relevant to `highlightsParams.query`.
     */
    highlights?: boolean;

    /**
     * Return the rendered HTML.
     */
    html?: boolean;

    /**
     * Return the images found on the page.
     */
    images?: boolean;

    /**
     * Return an object matching `jsonParams.schema`, extracted from the page text and
     * embedded data such as JSON-LD, meta tags, and framework state.
     */
    json?: boolean;

    /**
     * Return the page content, or a video transcript, as Markdown.
     */
    markdown?: boolean;

    /**
     * Return fields extracted with custom rules or a prebuilt parser, as `parsed`.
     */
    parse?: boolean;

    /**
     * Return product details such as name, price, and availability.
     */
    product?: boolean;

    /**
     * Return a screenshot of the page.
     */
    screenshot?: boolean;
  }

  /**
   * How far the batch got before cancellation.
   */
  export interface Progress {
    /**
     * Pages that could not be scraped before cancellation.
     */
    failed: number;

    /**
     * Pages not yet attempted, which will be skipped.
     */
    pending: number;

    /**
     * Pages scraped successfully before cancellation.
     */
    succeeded: number;
  }

  /**
   * When the batch was created and started.
   */
  export interface Timing {
    /**
     * When the batch was created.
     */
    created_at: string;

    /**
     * When scraping started. `null` if the batch was cancelled before it started.
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
     * Credits your organization has left after this request.
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
   * Results on this page.
   */
  data?: Array<BatchGetResultsResponse.Ok | BatchGetResultsResponse.Error>;

  /**
   * Whether more results are available after this page.
   */
  has_more?: boolean;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BatchGetResultsResponse.KeyMetadata;

  /**
   * Pass as `cursor` to fetch the next page. `null` on the last page.
   */
  next_cursor?: string | null;
}

export namespace BatchGetResultsResponse {
  /**
   * A page where at least one requested format succeeded. Check `result.isPartial`
   * and each format's `success` for incomplete results.
   */
  export interface Ok {
    /**
     * Credits charged for this page, including OCR. Cached results are priced the same
     * as in `POST /web/scrape`.
     */
    credits_used: number;

    /**
     * Scrape output, in the same shape as a `POST /web/scrape` response.
     */
    result: Ok.Result;

    /**
     * The page was scraped.
     */
    status: 'ok';

    /**
     * URL as submitted, or as discovered by the crawl.
     */
    url: string;

    /**
     * The `itemId` you submitted with this URL.
     */
    itemId?: string;

    /**
     * The `meta` you submitted with this URL.
     */
    meta?: { [key: string]: unknown };

    /**
     * Number of PDF pages read with OCR. Omitted when OCR did not run.
     */
    ocr_pages?: number;
  }

  export namespace Ok {
    /**
     * Scrape output, in the same shape as a `POST /web/scrape` response.
     */
    export interface Result {
      /**
       * The original HTTP response body, unchanged by waits, actions, and filters.
       */
      bytes: Result.Bytes;

      /**
       * Cache status of this response.
       */
      cache_metadata: Result.CacheMetadata;

      /**
       * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
       * omitted text.
       */
      highlights: Result.Highlights;

      /**
       * Rendered HTML of the page, after content filters.
       */
      html: Result.HTML;

      /**
       * Images found on the page, after content filters. `[]` when there are none.
       */
      images: Result.Images;

      /**
       * Object matching `jsonParams.schema`.
       */
      json: Result.Json;

      /**
       * Page content as Markdown, after content filters.
       */
      markdown: Result.Markdown;

      /**
       * Page metadata. Fields are omitted when not found.
       */
      metadata: Result.Metadata;

      /**
       * Fields extracted by `parseParams`. Custom rules return each field after content
       * filters, with `null` when nothing matches (`[]` for `list` rules). Prebuilt
       * parsers return the record or lists described under `parseParams.parser`.
       */
      parsed: Result.Parsed;

      /**
       * Product details found on the page.
       */
      product: Result.Product;

      /**
       * Browser profile used for this scrape. `null` when no profile was requested.
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
       * `true` when at least one requested output succeeded but others failed or are
       * incomplete. Absent otherwise.
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

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      export namespace Bytes {
        export interface Data {
          /**
           * Response body as base64, after HTTP decompression. Up to 50 MiB decoded.
           */
          base64: string;

          /**
           * `Content-Type` of the response.
           */
          contentType: string;
        }
      }

      /**
       * Cache status of this response.
       */
      export interface CacheMetadata {
        /**
         * Age of the cached data, in milliseconds. `0` for `miss` and `zdr`.
         */
        age_ms: number;

        /**
         * `hit` when served from cache, `miss` when fetched fresh, `zdr` when zero data
         * retention bypassed the cache.
         */
        status: 'hit' | 'miss' | 'zdr';
      }

      /**
       * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
       * omitted text.
       */
      export interface Highlights {
        data: Array<string> | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Rendered HTML of the page, after content filters.
       */
      export interface HTML {
        data: string | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Images found on the page, after content filters. `[]` when there are none.
       */
      export interface Images {
        data: Array<Images.Data> | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      export namespace Images {
        export interface Data {
          /**
           * Alt text. `null` when the image has none.
           */
          alt: string | null;

          /**
           * Image URL, or a data URI for inline images.
           */
          url: string;

          /**
           * What the image shows, such as a photo, logo, or icon. Requires `classification`
           * enrichment.
           */
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
           * Hosted copy of the image, valid for 24 hours after capture. Requires `file`
           * enrichment; not returned with ZDR.
           */
          fileUrl?: string;

          /**
           * Image height in pixels. Requires `dimensions` enrichment.
           */
          height?: number;

          /**
           * Image width in pixels. Requires `dimensions` enrichment.
           */
          width?: number;
        }
      }

      /**
       * Object matching `jsonParams.schema`.
       */
      export interface Json {
        data: { [key: string]: unknown } | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * `true` when the page was too long to read in full, so values that appear only in
         * the unread part may be missing.
         */
        isTruncated?: true;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Page content as Markdown, after content filters.
       */
      export interface Markdown {
        data: string | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Page metadata. Fields are omitted when not found.
       */
      export interface Metadata {
        /**
         * Other non-social meta tags that don't have their own field.
         */
        additionalMeta?: { [key: string]: string | Array<string> };

        /**
         * Alternate links from `link rel="alternate"` tags, as absolute URLs.
         */
        alternates?: Array<Metadata.Alternate>;

        /**
         * Author, when present.
         */
        author?: string;

        /**
         * Absolute canonical URL, when present.
         */
        canonicalUrl?: string;

        /**
         * Best available description, from standard, Open Graph, or Twitter meta tags.
         */
        description?: string;

        /**
         * Absolute favicon URL, when present.
         */
        favicon?: string;

        /**
         * Headings (`h1` to `h6`) in document order, from the full page before any
         * filtering. Up to 500. Omitted when the page has none.
         */
        headings?: Array<Metadata.Heading>;

        /**
         * Main preview image URL, from Open Graph, Twitter, or image meta tags.
         */
        image?: string;

        /**
         * JSON-LD structured data blocks parsed from the page.
         */
        jsonLd?: Array<{ [key: string]: unknown }>;

        /**
         * Keywords from the page's `keywords` meta tag.
         */
        keywords?: Array<string>;

        /**
         * Page language, from the `html` `lang` attribute or language meta tags.
         */
        language?: string;

        /**
         * Last-modified date or timestamp from page metadata, when present.
         */
        modifiedTime?: string;

        /**
         * Open Graph tags, with the `og:` prefix removed and keys in camelCase.
         */
        openGraph?: { [key: string]: string | Array<string> };

        /**
         * Publish date or timestamp from page metadata, when present.
         */
        publishedTime?: string;

        /**
         * `robots` meta directive, when present.
         */
        robots?: string;

        /**
         * Site or app name from page metadata.
         */
        siteName?: string;

        /**
         * Best available page title.
         */
        title?: string;

        /**
         * Twitter card tags, with the `twitter:` prefix removed and keys in camelCase.
         */
        twitter?: { [key: string]: string | Array<string> };
      }

      export namespace Metadata {
        export interface Alternate {
          /**
           * Absolute URL of the alternate version.
           */
          href: string;

          /**
           * Language or locale of the alternate version, when present.
           */
          hreflang?: string;

          /**
           * Title of the alternate version, when present.
           */
          title?: string;

          /**
           * MIME type of the alternate version, when present.
           */
          type?: string;
        }

        export interface Heading {
          /**
           * Heading level, from 1 (`h1`) to 6 (`h6`).
           */
          level: number;

          /**
           * Heading text with whitespace collapsed, truncated to 1000 characters.
           */
          text: string;
        }
      }

      /**
       * Fields extracted by `parseParams`. Custom rules return each field after content
       * filters, with `null` when nothing matches (`[]` for `list` rules). Prebuilt
       * parsers return the record or lists described under `parseParams.parser`.
       */
      export interface Parsed {
        data: { [key: string]: unknown } | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Prebuilt parser that ran, or `custom` for custom rules or when `parse` was not
         * requested.
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
          | 'reddit-post'
          | 'reddit-search'
          | 'reddit-subreddit'
          | 'reddit-user'
          | 'yelp-search'
          | 'yelp-reviews'
          | 'tripadvisor-reviews'
          | 'car-rental-availability'
          | 'car-rental-locations'
          | 'emails'
          | 'phone-numbers'
          | 'links';

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Product details found on the page.
       */
      export interface Product {
        data: Product.Data | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
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
           * The extracted product. `null` when the page is not a product detail page.
           */
          product: Data.Product | null;
        }

        export namespace Data {
          /**
           * The extracted product. `null` when the page is not a product detail page.
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
             * ISO 4217 currency code of `price`.
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
             * Product variants, such as colors or sizes, with their attributes and images.
             * `[]` when none are found. May not include every variant the store offers.
             */
            variants: Array<Product.Variant>;
          }

          export namespace Product {
            export interface Variant {
              /**
               * Attributes that define this variant, such as color, size, material, or pattern,
               * as stated on the page.
               */
              attributes: { [key: string]: string };

              /**
               * Image URLs the source attaches to this variant.
               */
              images: Array<string>;

              /**
               * SKU of this variant. `null` when the source does not state one.
               */
              sku: string | null;

              /**
               * URL of this variant or offer, when the source provides one. Several variants can
               * share a URL.
               */
              url: string | null;

              /**
               * Stock or ordering availability of this variant.
               */
              availability?:
                | 'in_stock'
                | 'out_of_stock'
                | 'limited_availability'
                | 'preorder'
                | 'backorder'
                | 'made_to_order'
                | 'discontinued'
                | null;

              /**
               * Currency code of `price`, such as `USD` or `EUR`, when stated.
               */
              currency?: string | null;

              /**
               * Price of this variant, when the source states one per variant.
               */
              price?: number | null;
            }
          }
        }
      }

      /**
       * Browser profile used for this scrape. `null` when no profile was requested.
       */
      export interface Profile {
        /**
         * ID of the browser profile. After creating a profile, save it and pass it as
         * `sharedParams.profile.profileId` with `type: "existing"`.
         */
        id: string;
      }

      /**
       * Screenshot as a base64 image data URL.
       */
      export interface Screenshot {
        data: string | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
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
         * Credits your organization has left after this request.
         */
        credits_remaining: number;
      }
    }
  }

  /**
   * A page that could not be scraped.
   */
  export interface Error {
    /**
     * Machine-readable error code, such as `NOT_FOUND`.
     */
    error_code: string;

    /**
     * Human-readable explanation of the error.
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
     * Credits charged for this page, including OCR. Cached results are priced the same
     * as in `POST /web/scrape`.
     */
    credits_used?: number;

    /**
     * The `itemId` you submitted with this URL.
     */
    itemId?: string;

    /**
     * The `meta` you submitted with this URL.
     */
    meta?: { [key: string]: unknown };

    /**
     * Number of PDF pages read with OCR. Omitted when OCR did not run.
     */
    ocr_pages?: number;

    /**
     * Per-format errors, when the scrape returned a response. Omitted when the page
     * could not be scraped at all.
     */
    result?: Error.Result;
  }

  export namespace Error {
    /**
     * Per-format errors, when the scrape returned a response. Omitted when the page
     * could not be scraped at all.
     */
    export interface Result {
      /**
       * The original HTTP response body, unchanged by waits, actions, and filters.
       */
      bytes: Result.Bytes;

      /**
       * Cache status of this response.
       */
      cache_metadata: Result.CacheMetadata;

      /**
       * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
       * omitted text.
       */
      highlights: Result.Highlights;

      /**
       * Rendered HTML of the page, after content filters.
       */
      html: Result.HTML;

      /**
       * Images found on the page, after content filters. `[]` when there are none.
       */
      images: Result.Images;

      /**
       * Object matching `jsonParams.schema`.
       */
      json: Result.Json;

      /**
       * Page content as Markdown, after content filters.
       */
      markdown: Result.Markdown;

      /**
       * Page metadata. Fields are omitted when not found.
       */
      metadata: Result.Metadata;

      /**
       * Fields extracted by `parseParams`. Custom rules return each field after content
       * filters, with `null` when nothing matches (`[]` for `list` rules). Prebuilt
       * parsers return the record or lists described under `parseParams.parser`.
       */
      parsed: Result.Parsed;

      /**
       * Product details found on the page.
       */
      product: Result.Product;

      /**
       * Browser profile used for this scrape. `null` when no profile was requested.
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
       * `true` when at least one requested output succeeded but others failed or are
       * incomplete. Absent otherwise.
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

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      export namespace Bytes {
        export interface Data {
          /**
           * Response body as base64, after HTTP decompression. Up to 50 MiB decoded.
           */
          base64: string;

          /**
           * `Content-Type` of the response.
           */
          contentType: string;
        }
      }

      /**
       * Cache status of this response.
       */
      export interface CacheMetadata {
        /**
         * Age of the cached data, in milliseconds. `0` for `miss` and `zdr`.
         */
        age_ms: number;

        /**
         * `hit` when served from cache, `miss` when fetched fresh, `zdr` when zero data
         * retention bypassed the cache.
         */
        status: 'hit' | 'miss' | 'zdr';
      }

      /**
       * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
       * omitted text.
       */
      export interface Highlights {
        data: Array<string> | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Rendered HTML of the page, after content filters.
       */
      export interface HTML {
        data: string | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Images found on the page, after content filters. `[]` when there are none.
       */
      export interface Images {
        data: Array<Images.Data> | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      export namespace Images {
        export interface Data {
          /**
           * Alt text. `null` when the image has none.
           */
          alt: string | null;

          /**
           * Image URL, or a data URI for inline images.
           */
          url: string;

          /**
           * What the image shows, such as a photo, logo, or icon. Requires `classification`
           * enrichment.
           */
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
           * Hosted copy of the image, valid for 24 hours after capture. Requires `file`
           * enrichment; not returned with ZDR.
           */
          fileUrl?: string;

          /**
           * Image height in pixels. Requires `dimensions` enrichment.
           */
          height?: number;

          /**
           * Image width in pixels. Requires `dimensions` enrichment.
           */
          width?: number;
        }
      }

      /**
       * Object matching `jsonParams.schema`.
       */
      export interface Json {
        data: { [key: string]: unknown } | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * `true` when the page was too long to read in full, so values that appear only in
         * the unread part may be missing.
         */
        isTruncated?: true;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Page content as Markdown, after content filters.
       */
      export interface Markdown {
        data: string | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Page metadata. Fields are omitted when not found.
       */
      export interface Metadata {
        /**
         * Other non-social meta tags that don't have their own field.
         */
        additionalMeta?: { [key: string]: string | Array<string> };

        /**
         * Alternate links from `link rel="alternate"` tags, as absolute URLs.
         */
        alternates?: Array<Metadata.Alternate>;

        /**
         * Author, when present.
         */
        author?: string;

        /**
         * Absolute canonical URL, when present.
         */
        canonicalUrl?: string;

        /**
         * Best available description, from standard, Open Graph, or Twitter meta tags.
         */
        description?: string;

        /**
         * Absolute favicon URL, when present.
         */
        favicon?: string;

        /**
         * Headings (`h1` to `h6`) in document order, from the full page before any
         * filtering. Up to 500. Omitted when the page has none.
         */
        headings?: Array<Metadata.Heading>;

        /**
         * Main preview image URL, from Open Graph, Twitter, or image meta tags.
         */
        image?: string;

        /**
         * JSON-LD structured data blocks parsed from the page.
         */
        jsonLd?: Array<{ [key: string]: unknown }>;

        /**
         * Keywords from the page's `keywords` meta tag.
         */
        keywords?: Array<string>;

        /**
         * Page language, from the `html` `lang` attribute or language meta tags.
         */
        language?: string;

        /**
         * Last-modified date or timestamp from page metadata, when present.
         */
        modifiedTime?: string;

        /**
         * Open Graph tags, with the `og:` prefix removed and keys in camelCase.
         */
        openGraph?: { [key: string]: string | Array<string> };

        /**
         * Publish date or timestamp from page metadata, when present.
         */
        publishedTime?: string;

        /**
         * `robots` meta directive, when present.
         */
        robots?: string;

        /**
         * Site or app name from page metadata.
         */
        siteName?: string;

        /**
         * Best available page title.
         */
        title?: string;

        /**
         * Twitter card tags, with the `twitter:` prefix removed and keys in camelCase.
         */
        twitter?: { [key: string]: string | Array<string> };
      }

      export namespace Metadata {
        export interface Alternate {
          /**
           * Absolute URL of the alternate version.
           */
          href: string;

          /**
           * Language or locale of the alternate version, when present.
           */
          hreflang?: string;

          /**
           * Title of the alternate version, when present.
           */
          title?: string;

          /**
           * MIME type of the alternate version, when present.
           */
          type?: string;
        }

        export interface Heading {
          /**
           * Heading level, from 1 (`h1`) to 6 (`h6`).
           */
          level: number;

          /**
           * Heading text with whitespace collapsed, truncated to 1000 characters.
           */
          text: string;
        }
      }

      /**
       * Fields extracted by `parseParams`. Custom rules return each field after content
       * filters, with `null` when nothing matches (`[]` for `list` rules). Prebuilt
       * parsers return the record or lists described under `parseParams.parser`.
       */
      export interface Parsed {
        data: { [key: string]: unknown } | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Prebuilt parser that ran, or `custom` for custom rules or when `parse` was not
         * requested.
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
          | 'reddit-post'
          | 'reddit-search'
          | 'reddit-subreddit'
          | 'reddit-user'
          | 'yelp-search'
          | 'yelp-reviews'
          | 'tripadvisor-reviews'
          | 'car-rental-availability'
          | 'car-rental-locations'
          | 'emails'
          | 'phone-numbers'
          | 'links';

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
         */
        message?: string;
      }

      /**
       * Product details found on the page.
       */
      export interface Product {
        data: Product.Data | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
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
           * The extracted product. `null` when the page is not a product detail page.
           */
          product: Data.Product | null;
        }

        export namespace Data {
          /**
           * The extracted product. `null` when the page is not a product detail page.
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
             * ISO 4217 currency code of `price`.
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
             * Product variants, such as colors or sizes, with their attributes and images.
             * `[]` when none are found. May not include every variant the store offers.
             */
            variants: Array<Product.Variant>;
          }

          export namespace Product {
            export interface Variant {
              /**
               * Attributes that define this variant, such as color, size, material, or pattern,
               * as stated on the page.
               */
              attributes: { [key: string]: string };

              /**
               * Image URLs the source attaches to this variant.
               */
              images: Array<string>;

              /**
               * SKU of this variant. `null` when the source does not state one.
               */
              sku: string | null;

              /**
               * URL of this variant or offer, when the source provides one. Several variants can
               * share a URL.
               */
              url: string | null;

              /**
               * Stock or ordering availability of this variant.
               */
              availability?:
                | 'in_stock'
                | 'out_of_stock'
                | 'limited_availability'
                | 'preorder'
                | 'backorder'
                | 'made_to_order'
                | 'discontinued'
                | null;

              /**
               * Currency code of `price`, such as `USD` or `EUR`, when stated.
               */
              currency?: string | null;

              /**
               * Price of this variant, when the source states one per variant.
               */
              price?: number | null;
            }
          }
        }
      }

      /**
       * Browser profile used for this scrape. `null` when no profile was requested.
       */
      export interface Profile {
        /**
         * ID of the browser profile. After creating a profile, save it and pass it as
         * `sharedParams.profile.profileId` with `type: "existing"`.
         */
        id: string;
      }

      /**
       * Screenshot as a base64 image data URL.
       */
      export interface Screenshot {
        data: string | null;

        /**
         * Whether you requested this output in `formats`.
         */
        requested: boolean;

        /**
         * `true` when the output succeeded, `false` when it failed, `null` when it was not
         * requested.
         */
        success: boolean | null;

        /**
         * Machine-readable error code. Present only when `success` is `false`.
         */
        error_code?: string;

        /**
         * Human-readable explanation of the error and how to resolve it.
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
         * Credits your organization has left after this request.
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
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface BatchSubmitResponse {
  /**
   * Unique ID of the batch. Pass it to `GET /batch/{batch_id}` to track progress.
   */
  id: string;

  /**
   * Cache status of this response.
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
   * Credits reserved for the batch.
   */
  credits: BatchSubmitResponse.Credits;

  /**
   * Formats requested for each page, as submitted in `input.data.formats`.
   */
  formats: BatchSubmitResponse.Formats;

  /**
   * Page counts from your submission.
   */
  input: Intake;

  /**
   * URLs rejected from your list, up to the first 100.
   */
  invalid_urls: Array<BatchSubmitResponse.InvalidURL>;

  /**
   * `scrape` for a URL list, `crawl` for a site crawl.
   */
  mode: 'scrape' | 'crawl';

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Current state. `pending` batches are being validated or are waiting for a slot
   * under your plan's concurrent batch limit, `queued` batches are ready to start,
   * and `running` batches are scraping. `completed`, `cancelled`, and `failed` are
   * final.
   */
  status: 'pending' | 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Tags set when the batch was submitted.
   */
  tags: Array<string>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BatchSubmitResponse.KeyMetadata;

  /**
   * Secret for verifying `X-Context-Signature` on this batch's webhooks. Returned
   * only here and only when you set a webhook, so store it.
   */
  webhook_secret?: string;
}

export namespace BatchSubmitResponse {
  /**
   * Cache status of this response.
   */
  export interface CacheMetadata {
    /**
     * Age of the cached data, in milliseconds. `0` for `miss` and `zdr`.
     */
    age_ms: number;

    /**
     * `hit` when served from cache, `miss` when fetched fresh, `zdr` when zero data
     * retention bypassed the cache.
     */
    status: 'hit' | 'miss' | 'zdr';
  }

  /**
   * Credits reserved for the batch.
   */
  export interface Credits {
    /**
     * Credits reserved after validation, before scraping starts. `0` while `pending`.
     */
    reserved: number;
  }

  /**
   * Formats requested for each page, as submitted in `input.data.formats`.
   */
  export interface Formats {
    /**
     * Return the original HTTP response body.
     */
    bytes?: boolean;

    /**
     * Return Markdown excerpts relevant to `highlightsParams.query`.
     */
    highlights?: boolean;

    /**
     * Return the rendered HTML.
     */
    html?: boolean;

    /**
     * Return the images found on the page.
     */
    images?: boolean;

    /**
     * Return an object matching `jsonParams.schema`, extracted from the page text and
     * embedded data such as JSON-LD, meta tags, and framework state.
     */
    json?: boolean;

    /**
     * Return the page content, or a video transcript, as Markdown.
     */
    markdown?: boolean;

    /**
     * Return fields extracted with custom rules or a prebuilt parser, as `parsed`.
     */
    parse?: boolean;

    /**
     * Return product details such as name, price, and availability.
     */
    product?: boolean;

    /**
     * Return a screenshot of the page.
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
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface BatchListParams {
  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of batches to return per page.
   */
  limit?: number;

  /**
   * Search term matched against batch IDs, crawl sources (start URL or sitemap
   * domain), and tags.
   */
  q?: string;

  /**
   * How `q` matches: `prefix` matches the start of a term, for search-as-you-type,
   * and `exact` matches whole terms. Defaults to `prefix`.
   */
  search_type?: 'exact' | 'prefix';

  /**
   * Filter by batch status.
   */
  status?: 'pending' | 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Comma-separated tags. Returns batches that have any of them. You can also repeat
   * the `tags` parameter.
   */
  tags?: string | Array<string>;
}

export interface BatchGetResultsParams {
  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of results to return per page. A page can hold fewer to stay
   * under about 8 MB, so page with `next_cursor` instead of counting records.
   */
  limit?: number;
}

export interface BatchSubmitParams {
  /**
   * Body param: What to scrape: a list of URLs (`scrape`) or a site crawl (`crawl`).
   */
  input: BatchSubmitParams.Scrape | BatchSubmitParams.Crawl;

  /**
   * Body param: Access policy IDs to apply to every page; each URL must pass all of
   * them. Requires access policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Body param: Tags to store on the batch. Filter `GET /batch/list` by them later.
   */
  tags?: Array<string>;

  /**
   * Body param: Webhook to notify when the batch finishes. Omit `retry` for a single
   * attempt, or pass `retry: {}` for the default retry schedule.
   */
  webhook?: BatchSubmitParams.Webhook;

  /**
   * Header param: Unique key for this submission. Retrying with the same key and
   * body returns the original batch instead of creating another; a different body
   * returns `409`.
   */
  'Idempotency-Key'?: string;
}

export namespace BatchSubmitParams {
  /**
   * Scrape a list of up to 100,000 URLs.
   */
  export interface Scrape {
    /**
     * URLs to scrape, with the formats and options to apply to each page.
     */
    data: Scrape.BatchUnifiedScrapeData | Scrape.Markdown | Scrape.HTML;

    /**
     * Scrape the pages in `data.urls`.
     */
    mode: 'scrape';
  }

  export namespace Scrape {
    /**
     * The same formats and options as `POST /web/scrape`, with `urls` in place of
     * `url`. Options apply to every page.
     */
    export interface BatchUnifiedScrapeData {
      /**
       * Outputs to return. Set at least one to `true`.
       */
      formats: BatchUnifiedScrapeData.Formats;

      /**
       * Pages to scrape, up to 100,000.
       */
      urls: Array<BatchUnifiedScrapeData.URL>;

      /**
       * Query for the `highlights` output. Required when `formats.highlights` is `true`,
       * and allowed only then.
       */
      highlightsParams?: BatchUnifiedScrapeData.HighlightsParams;

      /**
       * Options for the `images` output. Requires `formats.images: true`.
       */
      imageParams?: BatchUnifiedScrapeData.ImageParams;

      /**
       * Schema and instructions for the `json` output. Required when `formats.json` is
       * `true`, and allowed only then.
       */
      jsonParams?: BatchUnifiedScrapeData.JsonParams;

      /**
       * Options for the `markdown` output. Requires `formats.markdown: true`.
       */
      markdownParams?: BatchUnifiedScrapeData.MarkdownParams;

      /**
       * Maximum age of a cached result, in milliseconds. `0` always fetches fresh.
       * Defaults to 3 days (259200000 ms). Maximum: 1 year (31536000000 ms).
       */
      maxAgeMs?: number;

      /**
       * Custom rules or a prebuilt parser for the `parsed` output. Required when
       * `formats.parse` is `true`, and allowed only then.
       */
      parseParams?: BatchUnifiedScrapeData.CustomParser | BatchUnifiedScrapeData.PrebuiltParser;

      /**
       * Options for the `product` output. Requires `formats.product: true`.
       */
      productParams?: BatchUnifiedScrapeData.ProductParams;

      /**
       * Options for the `screenshot` output. Requires `formats.screenshot: true`.
       */
      screenshotParams?: BatchUnifiedScrapeData.ScreenshotParams;

      /**
       * Browser and content settings shared by all outputs.
       */
      sharedParams?: BatchUnifiedScrapeData.SharedParams;

      /**
       * Labels for this request. Filter usage and request logs by them in the dashboard
       * or with `GET /org/logs`.
       */
      tags?: Array<string>;

      /**
       * Time limit for each page, with the same behavior and defaults as in
       * `POST /web/scrape`.
       */
      timeoutOpts?: BatchUnifiedScrapeData.TimeoutOpts;

      /**
       * Zero data retention is not available for batches, because batches store their
       * results. Sending `enabled` returns `ZDR_NOT_SUPPORTED`.
       */
      zdr?: 'disabled';
    }

    export namespace BatchUnifiedScrapeData {
      /**
       * Outputs to return. Set at least one to `true`.
       */
      export interface Formats {
        /**
         * Return the original HTTP response body.
         */
        bytes?: boolean;

        /**
         * Return Markdown excerpts relevant to `highlightsParams.query`.
         */
        highlights?: boolean;

        /**
         * Return the rendered HTML.
         */
        html?: boolean;

        /**
         * Return the images found on the page.
         */
        images?: boolean;

        /**
         * Return an object matching `jsonParams.schema`, extracted from the page text and
         * embedded data such as JSON-LD, meta tags, and framework state.
         */
        json?: boolean;

        /**
         * Return the page content, or a video transcript, as Markdown.
         */
        markdown?: boolean;

        /**
         * Return fields extracted with custom rules or a prebuilt parser, as `parsed`.
         */
        parse?: boolean;

        /**
         * Return product details such as name, price, and availability.
         */
        product?: boolean;

        /**
         * Return a screenshot of the page.
         */
        screenshot?: boolean;
      }

      /**
       * A page to scrape, with optional `itemId` and `meta` to match it to its result.
       */
      export interface URL {
        /**
         * URL of the page.
         */
        url: string;

        /**
         * Your ID for this page, returned with its result. The same URL can use different
         * IDs.
         */
        itemId?: string;

        /**
         * Custom JSON returned unchanged with this page's result.
         */
        meta?: { [key: string]: unknown };
      }

      /**
       * Query for the `highlights` output. Required when `formats.highlights` is `true`,
       * and allowed only then.
       */
      export interface HighlightsParams {
        /**
         * Question or topic to find relevant passages for.
         */
        query: string;

        /**
         * Maximum combined length of the returned passages, in characters.
         */
        maxCharacters?: number;
      }

      /**
       * Options for the `images` output. Requires `formats.images: true`.
       */
      export interface ImageParams {
        /**
         * Set to `visual` to drop visually duplicate images, keeping the largest copy.
         */
        dedupe?: 'none' | 'visual';

        /**
         * Extra data to add to each image: `dimensions` adds `width` and `height`,
         * `classification` adds `classification`, and `file` adds a hosted `fileUrl`.
         */
        enrich?: Array<'dimensions' | 'classification' | 'file'>;
      }

      /**
       * Schema and instructions for the `json` output. Required when `formats.json` is
       * `true`, and allowed only then.
       */
      export interface JsonParams {
        /**
         * JSON Schema for the object to extract, not an example object. Must describe a
         * top-level object, up to 50 KB. Make fields optional or nullable when the page
         * may not state them.
         */
        schema: { [key: string]: unknown };

        /**
         * Extra guidance, such as which facts to prefer or how to read a field.
         */
        instructions?: string;
      }

      /**
       * Options for the `markdown` output. Requires `formats.markdown: true`.
       */
      export interface MarkdownParams {
        /**
         * Include image references in the Markdown (`html-conversion` only).
         */
        includeImages?: boolean;

        /**
         * Keep link URLs in the Markdown (`html-conversion` only).
         */
        includeLinks?: boolean;

        /**
         * How to write base64 images when `includeImages` is `true`: `placeholder`
         * shortens the data, `preserve` keeps it in full (`html-conversion` only).
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
         * Output field names mapped to a CSS selector (such as `h1` or `a@href`) or a rule
         * object. Up to 100 fields, nested up to 5 levels.
         */
        rules: { [key: string]: string | CustomParser.UnionMember1 };

        /**
         * Extract fields with custom CSS rules. The default when `type` is omitted.
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
           * What to return: `text`, `html`, an attribute such as `@href`, or nested field
           * rules. Defaults to `text`.
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
         * Prebuilt parser to run. Each one accepts specific URLs and returns its result in
         * `parsed.data`. `emails`, `phone-numbers`, and `links` read the rendered page and
         * respect content filters; the others read their source directly, independently of
         * content filters and other outputs.
         *
         * - `google-maps`: Google Maps place, search, and internal data URLs. Returns
         *   businesses in `data.results`; a search URL returns up to 200 places. Results
         *   use the country set in the URL, or the US when none is set, and come back with
         *   English labels.
         * - `google-maps-reviews`: Google Maps place, search, and `?cid=` URLs, plus
         *   `search.google.com/local/reviews` URLs, so the `google_maps_url` and
         *   `google_reviews_url` fields of `google-maps` results work as input. Returns
         *   the reviews of the place in `data.reviews` (`rating`, `date`, `isoDate`,
         *   `snippet`, `translatedSnippet`, `likes`, `user`, `media`, `response`, `link`,
         *   `id`, `language`, guided ratings in `details`, and `user.isLocalGuide`), plus
         *   the place `featureId`, `cid`, and `sort` in `data`. `sort` and `limit` set the
         *   order and count; `oldest` is exact. An unknown place returns no reviews.
         * - `google-play`: Play Store app details URLs
         *   (`play.google.com/store/apps/details?id=…`). Returns one app in `data`:
         *   details, developer contact, ratings, price, permissions, data safety, the
         *   storefront country the record describes, and `is_available` (whether the app
         *   is offered there). Ratings are counted per storefront, so `rating`,
         *   `rating_count`, and `rating_histogram` are `null` where nobody rated the app.
         *   The language and storefront country set in the URL apply (default English and
         *   the US); without a storefront country, an app not offered in the US is read
         *   from the country of its developer.
         * - `google-play-reviews`: Same URLs as `google-play`. Returns up to the 200
         *   newest reviews in the language set in the URL, with developer replies, in
         *   `data.reviews`; an app with fewer such reviews returns them all.
         * - `app-store`: App Store app URLs (`apps.apple.com/us/app/…/id…`). Returns one
         *   app in `data`: details, developer, ratings, price, version, and screenshots.
         *   The country in the path sets the storefront (default `us`).
         * - `app-store-reviews`: Same URLs as `app-store`. Returns up to the 500 newest
         *   reviews in `data.reviews`.
         * - `g2-reviews`: G2 product URLs (`g2.com/products/…`), following renamed
         *   products. Returns the 25 most recently published reviews in `data.reviews`
         *   (rating, title, likes, dislikes, `problems_solved`, reviewer role, company
         *   size, and industry), plus `data.product`. Keeps star-rating filters from the
         *   URL (`filters[nps_score][]=1` to `5`) and ignores other filters, sort orders,
         *   and pages.
         * - `instagram-profile`: Public profile URLs (`instagram.com/{username}`). Returns
         *   one profile in `data`: bio, links, follower and post counts, category,
         *   business address, `similar_accounts`, and `latest_posts` (up to the 12 posts
         *   at the top of the profile, newest first). Instagram lists pinned posts first,
         *   so posts with `is_pinned: true` can be older. When Instagram shows only a
         *   rounded post count (such as 32K), `post_count` is that rounded number and
         *   `is_post_count_rounded` is `true`.
         * - `instagram-post`: Post and reel URLs (`/p/…`, `/reel/…`). Returns one post in
         *   `data`: caption, hashtags, mentions, like, comment, and view counts
         *   (`like_count` and `view_count` are `null` when the owner hides them), media
         *   URLs, tagged users, collaborators, location, and about the top 14 comments in
         *   `data.comments`.
         * - `instagram-feed`: Hashtag and keyword URLs (`/explore/tags/…`, `/popular/…`)
         *   return the top posts; location URLs (`/explore/locations/{id}/…`) return
         *   recent posts. Posts are in `data.posts`; keyword posts carry only the
         *   shortcode, owner, thumbnail, and views, plus the caption when Instagram shows
         *   it. All three Instagram parsers read public data without signing in, so
         *   private accounts return no posts and follower lists are unavailable.
         * - `tiktok-profile`: Public profile URLs (`tiktok.com/@{username}`). Returns one
         *   profile in `data`: nickname, bio, bio link, follower, following, like, and
         *   video counts, verified, private, and business flags, and business category.
         *   Does not list videos.
         * - `tiktok-video`: Video and photo post URLs (`/@{username}/video/{id}`,
         *   `/@{username}/photo/{id}`). Returns one post in `data`: caption, hashtags,
         *   mentions, author, view, like, comment, share, save, and repost counts,
         *   duration, thumbnail, a `video_url` that downloads without cookies,
         *   `image_urls` for photo posts, music, location, and ad, paid-partnership, and
         *   AI-generated flags.
         * - `tiktok-feed`: Returns videos in the `tiktok-video` shape in `data.videos`:
         *   the latest 15 from a profile URL, the top 30 from a hashtag URL
         *   (`/tag/{name}`), or the top 12 from a search URL (`/search?q={query}`).
         * - `tiktok-comments`: Video and photo post URLs. Returns the first 20 comments in
         *   `data.comments`: text, `posted_at`, like and reply counts, whether the author
         *   liked it, and the commenter.
         * - `tiktok-followers`, `tiktok-following`: Profile URLs. Return up to 30 accounts
         *   in `data.users`, in the `tiktok-profile` shape.
         * - `tiktok-user-search`: User search URLs (`/search/user?q={query}`). Returns the
         *   top 10 accounts in `data.users`: `id`, `username`, `nickname`, `biography`,
         *   `avatar_url`, `sec_uid`, `follower_count`, `like_count`, and `is_verified`.
         *   The TikTok parsers accept `tiktok.com`, `www.tiktok.com`, and `m.tiktok.com`
         *   URLs, not short links (`vm.tiktok.com`, `vt.tiktok.com`, `tiktok.com/t/…`).
         * - `reddit-post`: Post URLs (`reddit.com/r/{subreddit}/comments/{id}`,
         *   `reddit.com/comments/{id}`, `redd.it/{id}`). Returns the post in `data.post`:
         *   title, body as Markdown, type (`text`, `link`, `image`, `gallery`, or
         *   `video`), `link_url`, subreddit, author, flairs, score, `upvote_ratio`,
         *   comment and crosspost counts, NSFW, spoiler, locked, stickied, and archived
         *   flags, images (every gallery image in order), and video (an MP4 `url` plus an
         *   `hls_url` that carries the audio). `data.comments` holds the comment tree;
         *   each comment has `id`, `author`, `body` (Markdown), `score`, `posted_at`,
         *   `depth`, `parent_id`, `url`, `is_submitter`, `is_deleted`, and its `replies`.
         *   `limit` caps the total number of comments (default 100), filled shallowest
         *   first so whole conversations are kept, and `data.has_more_comments` says
         *   whether the thread has more. The `sort` in the URL (`best`, `top`, `new`,
         *   `controversial`, `old`, `qa`) orders the comments.
         * - `reddit-search`: Search URLs (`reddit.com/search?q={query}`, or
         *   `reddit.com/r/{subreddit}/search?q={query}` to search one subreddit). With
         *   `type=link` or no `type`, returns posts in the `reddit-post` shape in
         *   `data.posts`, ordered by the `sort` in the URL (`relevance`, `hot`, `top`,
         *   `new`, `comments`) within its `t` time range (`hour`, `day`, `week`, `month`,
         *   `year`, `all`). `type=sr` returns communities in `data.communities` (name,
         *   title, description, sidebar, `subscriber_count`, `created_at`, type, NSFW and
         *   quarantine flags, language, category, icon and banner URLs, and allowed post
         *   types). `type=user` returns accounts in `data.users` (username,
         *   `display_name`, bio, `created_at`, post and comment karma, avatar and banner
         *   URLs, and verified, employee, moderator, premium, and NSFW flags). `limit`
         *   caps the number of results (default 100), in the order Reddit returns them,
         *   and `data.has_more` says whether Reddit has more.
         * - `reddit-subreddit`: Subreddit URLs (`reddit.com/r/{subreddit}`, optionally
         *   followed by `/hot`, `/new`, `/top`, `/rising`, or `/controversial`, with `t`
         *   setting the time range of `top` and `controversial`, default `day`). Returns
         *   `data.subreddit` in the community shape of `reddit-search`, `data.rules`
         *   (`name`, `description`, `applies_to`, `violation_reason`, `created_at`), and
         *   `data.posts` in the `reddit-post` shape, ordered like the tab (default `hot`)
         *   with stickied posts flagged. `r/all` and `r/popular` return posts with `null`
         *   `subreddit` and `rules`. `limit` caps the posts (default 100) and
         *   `data.has_more` says whether Reddit has more. Private and quarantined
         *   subreddits return `WEBSITE_ACCESS_ERROR`.
         * - `reddit-user`: Profile URLs (`reddit.com/user/{username}` or
         *   `reddit.com/u/{username}`, optionally followed by `/overview`, `/submitted`,
         *   or `/comments`, with `sort` set to `new`, `hot`, `top`, or `controversial` and
         *   `t` setting the time range of `top` and `controversial`, default `all`).
         *   Returns `data.user` (`id`, `username`, `display_name`, bio, `created_at`,
         *   total, post, comment, awardee, and awarder karma, avatar and banner URLs, and
         *   verified, suspended, employee, moderator, premium, and NSFW flags),
         *   `data.trophies` (`name`, `description`, `icon_url`, `granted_at`, `url`),
         *   `data.moderated_communities` (`name`, `title`, `url`, `subscriber_count`,
         *   `icon_url`, `is_nsfw`), `data.posts` in the `reddit-post` shape, and
         *   `data.comments`, each with `id`, `author`, `body` (Markdown), `score`,
         *   `posted_at`, `edited_at`, `url`, `subreddit`, `parent_id` (`null` for a
         *   top-level comment), `is_submitter`, `is_stickied`, `distinguished`,
         *   `award_count`, and the post it was left on (`id`, `title`, `url`, `author`,
         *   `is_nsfw`). The overview tab returns both posts and comments; `submitted`
         *   returns `null` comments and `comments` returns `null` posts. `limit` caps
         *   posts and comments together (default 100) and `data.has_more` says whether
         *   Reddit has more. Users who hide their activity return empty lists, and
         *   suspended accounts return their profile with `null` posts and comments.
         * - `yelp-search`: Yelp search URLs with `find_desc` and `find_loc`; `start` sets
         *   the result offset. Returns up to 20 ranked organic businesses in
         *   `data.businesses`, with `total` and `pagination`.
         * - `yelp-reviews`: Yelp business URLs (`yelp.com/biz/{alias}`); optional `start`
         *   sets the offset. Returns up to 20 of the latest public reviews, always newest
         *   first, in `data.reviews`, with business details and `pagination.next_offset`.
         *   Each review has rating, full text, `updated_at`, and author (`id` from the
         *   reviewer profile URL, `url` linking to that profile, `name`, `location`, and
         *   `review_count`); owner replies and photos are not included. Unsupported sort
         *   and review filters are rejected; tracking parameters are ignored.
         * - `tripadvisor-reviews`: Tripadvisor hotel, restaurant, and attraction review
         *   URLs (`tripadvisor.com/Hotel_Review-g{geo}-d{id}-Reviews-….html`, on any
         *   Tripadvisor country domain); `-or{N}-` in the path sets the offset. Returns 20
         *   reviews in `data.reviews` in the order Tripadvisor shows them, with
         *   `data.location` (`id`, `name`, `type`, `url`, `review_count`) and
         *   `pagination.next_offset`. Each review has `id`, `url`, `title`, full text,
         *   `rating`, `language`, `published_at`, `visit_month`, `helpful_votes`,
         *   `subratings`, `photo_urls`, `owner_response` (`text`, `published_at`,
         *   `author_name`), and `author` (`id`, `username`, `name`, `url`,
         *   `contribution_count`). An unknown location returns no reviews.
         * - `car-rental-availability`: avis.com and budget.com vehicle-availability search
         *   URLs. Returns every vehicle with pay-now and pay-later prices in
         *   `data.vehicles`.
         * - `car-rental-locations`: avis.com and budget.com `/locations?keyword=` URLs.
         *   Returns rental branches with codes, addresses, coordinates, and hours in
         *   `data.locations`.
         * - `emails`: Any page. Returns its email addresses in `data.emails`
         *   (`[{ email }]`), read from `mailto:` links, Cloudflare-protected addresses,
         *   and visible text.
         * - `phone-numbers`: Any page. Returns its valid phone numbers in E.164 format in
         *   `data.phone_numbers` (`[{ phone }]`), read from `tel:` links and visible text.
         *   Numbers without a country code are read for the country of the site TLD (US by
         *   default).
         * - `links`: Any page. Returns its unique HTTP and HTTPS links as absolute URLs in
         *   `data.links` (`[{ url, text }]`). `text` falls back to `aria-label` or image
         *   alt text and is `null` when a link has none.
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
          | 'reddit-post'
          | 'reddit-search'
          | 'reddit-subreddit'
          | 'reddit-user'
          | 'yelp-search'
          | 'yelp-reviews'
          | 'tripadvisor-reviews'
          | 'car-rental-availability'
          | 'car-rental-locations'
          | 'emails'
          | 'phone-numbers'
          | 'links';

        /**
         * Use a prebuilt parser instead of custom rules.
         */
        type: 'prebuilt';

        /**
         * Maximum number of reviews (`google-maps-reviews`, default 100), comments
         * (`reddit-post`, default 100), or results (`reddit-search`, `reddit-subreddit`,
         * and `reddit-user`, default 100) to return. Only these parsers accept it.
         */
        limit?: number;

        /**
         * Order of `data.reviews` for `google-maps-reviews`. `newest`, `relevant`,
         * `highest`, and `lowest` use the same orders as Google Maps; `oldest` returns the
         * earliest reviews first.
         */
        sort?: 'newest' | 'oldest' | 'relevant' | 'highest' | 'lowest';
      }

      /**
       * Options for the `product` output. Requires `formats.product: true`.
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
       * Options for the `screenshot` output. Requires `formats.screenshot: true`.
       */
      export interface ScreenshotParams {
        /**
         * What to capture: `viewport`, `fullPage`, one element, or a rectangle. Up to 40
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
         * Rectangle to capture, in pixels from the document origin.
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
         * Browser steps to run in order before capture. Requires a paid plan. Skips the
         * cache.
         */
        actions?: Array<
          SharedParams.Perform | SharedParams.Scroll | SharedParams.Wait | SharedParams.WaitFor
        >;

        /**
         * Country to fetch from, as an ISO 3166-1 alpha-2 code such as `US`.
         * Case-insensitive.
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
         * Which iframes to inline in HTML and text outputs. Screenshots always show
         * visible frames. `auto` inlines only iframes that hold page content, such as
         * same-site documents, framesets, job boards, forms, and embedded documents, and
         * skips ads and widgets. `true` inlines every iframe; `false` inlines none.
         */
        includeFrames?: boolean | 'auto';

        /**
         * Keep only elements matching these CSS selectors.
         */
        includeSelectors?: Array<string>;

        /**
         * Keep only the main content, without navigation, headers, footers, or sidebars.
         * Does not affect `screenshot`, `bytes`, or `product`.
         */
        mainContentOnly?: boolean;

        /**
         * Options for parsing documents such as PDFs.
         */
        parsers?: SharedParams.Parsers;

        /**
         * Scrape as a signed-in user. Create a profile with `type: "new"` and your
         * credentials, then reuse it with `type: "existing"`. Requires a paid plan and an
         * HTTPS URL. Profiles keep their session between requests, skip the cache, and
         * cannot be combined with ZDR, custom headers, `formats.bytes`, or prebuilt
         * parsers other than `emails`, `phone-numbers`, and `links`.
         */
        profile?: SharedParams.Existing | SharedParams.New;

        /**
         * Wait for CSS animations to finish before capture. Defaults to `true` when
         * `formats.screenshot` is `true`.
         */
        settleAnimations?: boolean;

        /**
         * Emulate a light or dark color scheme.
         */
        theme?: 'light' | 'dark';

        /**
         * Browser viewport in pixels. Defaults to 1920 × 1080. If you pass `viewport`, a
         * missing `width` defaults to 1440 and a missing `height` to 900.
         */
        viewport?: SharedParams.Viewport;

        /**
         * Time to wait after actions, in milliseconds, or a CSS selector to wait for.
         * Defaults to 500 ms, or 2000 ms when `includeFrames` is `true` or the URL ends in
         * `.xml`.
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
           * Follow a plain-language instruction.
           */
          type: 'perform';
        }

        export interface Scroll {
          /**
           * Scroll the page or a container.
           */
          type: 'scroll';

          /**
           * Distance per scroll step: a number of pixels, one `viewport`, or `max` to reach
           * the end.
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
           * CSS selector of the container to scroll. Omit to scroll the page.
           */
          selector?: string;
        }

        export interface Wait {
          /**
           * How long to pause before the next action, in milliseconds.
           */
          milliseconds: number;

          /**
           * Pause for a fixed time.
           */
          type: 'wait';
        }

        export interface WaitFor {
          /**
           * CSS selector to wait for before continuing.
           */
          selector: string;

          /**
           * Wait for an element matching `selector`.
           */
          type: 'waitFor';
        }

        /**
         * Options for parsing documents such as PDFs.
         */
        export interface Parsers {
          /**
           * Page range, OCR, and page markers for PDFs.
           */
          pdf?: Parsers.Pdf;
        }

        export namespace Parsers {
          /**
           * Page range, OCR, and page markers for PDFs.
           */
          export interface Pdf {
            /**
             * Last page to parse. Defaults to the last page. Must be at least `startPage`.
             */
            endPage?: number;

            /**
             * Start each PDF page in the Markdown with a `<!-- page N -->` line, where `N` is
             * the original 1-based page number. These responses are never served from cache.
             */
            includeNumberedPages?: boolean;

            /**
             * Set to `auto` to read scanned pages with OCR. Adds 1 credit per page read.
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
           * ID of the browser profile, from `profile.id` in an earlier scrape response.
           */
          profileId: string;

          /**
           * Reuse a saved browser profile.
           */
          type: 'existing';
        }

        export interface New {
          /**
           * Username or email address for the website.
           */
          identifier: string;

          /**
           * Password for the website. Used to sign in and never stored.
           */
          password: string;

          /**
           * Sign in and save a new browser profile.
           */
          type: 'new';

          /**
           * Label for the profile, shown by `GET /org/browser/profiles`.
           */
          description?: string;
        }

        /**
         * Browser viewport in pixels. Defaults to 1920 × 1080. If you pass `viewport`, a
         * missing `width` defaults to 1440 and a missing `height` to 900.
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
       * Time limit for each page, with the same behavior and defaults as in
       * `POST /web/scrape`.
       */
      export interface TimeoutOpts {
        /**
         * Deadline in milliseconds.
         */
        milliseconds: number;

        /**
         * `fail` returns 408 at the deadline. `return-partial` returns the results
         * collected so far and marks the response as partial. `return-partial` requires at
         * least 5000 ms. On `POST /web/scrape`, an output that is not ready in time fails
         * with `REQUEST_TIMEOUT` inside a 200 response under either behavior; 408 means
         * the whole request could not respond by the deadline.
         */
        behavior?: 'fail' | 'return-partial';
      }
    }

    /**
     * @deprecated Scrape the listed pages as Markdown.
     */
    export interface Markdown {
      /**
       * Return page content as Markdown.
       */
      format: 'markdown';

      /**
       * Pages to scrape, up to 100,000.
       */
      urls: Array<Markdown.URL>;

      /**
       * Options for Markdown output.
       */
      options?: Markdown.Options;
    }

    export namespace Markdown {
      /**
       * A page to scrape, with optional `itemId` and `meta` to match it to its result.
       */
      export interface URL {
        /**
         * URL of the page.
         */
        url: string;

        /**
         * Your ID for this page, returned with its result. The same URL can use different
         * IDs.
         */
        itemId?: string;

        /**
         * Custom JSON returned unchanged with this page's result.
         */
        meta?: { [key: string]: unknown };
      }

      /**
       * Options for Markdown output.
       */
      export interface Options {
        /**
         * Country to fetch from, as an ISO 3166-1 alpha-2 code.
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
         * Whether to parse PDFs and which pages to read.
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
         * Whether to parse PDFs and which pages to read.
         */
        export interface Pdf {
          /**
           * Last page to parse. Defaults to the last page. Must be at least `start`.
           */
          end?: number;

          /**
           * Read scanned PDF pages with OCR. Pages that already have text are kept as is.
           */
          ocr?: boolean;

          /**
           * Parse PDF URLs. When false, PDFs fail with `PDF_SKIPPED`.
           */
          shouldParse?: boolean;

          /**
           * First page to parse, starting at 1.
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
       * Pages to scrape, up to 100,000.
       */
      urls: Array<HTML.URL>;

      /**
       * Options for HTML output.
       */
      options?: HTML.Options;
    }

    export namespace HTML {
      /**
       * A page to scrape, with optional `itemId` and `meta` to match it to its result.
       */
      export interface URL {
        /**
         * URL of the page.
         */
        url: string;

        /**
         * Your ID for this page, returned with its result. The same URL can use different
         * IDs.
         */
        itemId?: string;

        /**
         * Custom JSON returned unchanged with this page's result.
         */
        meta?: { [key: string]: unknown };
      }

      /**
       * Options for HTML output.
       */
      export interface Options {
        /**
         * Country to fetch from, as an ISO 3166-1 alpha-2 code.
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
         * Whether to parse PDFs and which pages to read.
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
         * Whether to parse PDFs and which pages to read.
         */
        export interface Pdf {
          /**
           * Last page to parse. Defaults to the last page. Must be at least `start`.
           */
          end?: number;

          /**
           * Read scanned PDF pages with OCR. Pages that already have text are kept as is.
           */
          ocr?: boolean;

          /**
           * Parse PDF URLs. When false, PDFs fail with `PDF_SKIPPED`.
           */
          shouldParse?: boolean;

          /**
           * First page to parse, starting at 1.
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
     * Where to find pages, with the formats and options to apply to each page.
     */
    data: Crawl.BatchUnifiedCrawlData | Crawl.Markdown | Crawl.HTML;

    /**
     * Discover and scrape pages from `data.source`.
     */
    mode: 'crawl';
  }

  export namespace Crawl {
    /**
     * The same formats and options as `POST /web/scrape`, with `source` in place of
     * `url`. Options apply to every page.
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
       * Query for the `highlights` output. Required when `formats.highlights` is `true`,
       * and allowed only then.
       */
      highlightsParams?: BatchUnifiedCrawlData.HighlightsParams;

      /**
       * Options for the `images` output. Requires `formats.images: true`.
       */
      imageParams?: BatchUnifiedCrawlData.ImageParams;

      /**
       * Schema and instructions for the `json` output. Required when `formats.json` is
       * `true`, and allowed only then.
       */
      jsonParams?: BatchUnifiedCrawlData.JsonParams;

      /**
       * Options for the `markdown` output. Requires `formats.markdown: true`.
       */
      markdownParams?: BatchUnifiedCrawlData.MarkdownParams;

      /**
       * Maximum age of a cached result, in milliseconds. `0` always fetches fresh.
       * Defaults to 3 days (259200000 ms). Maximum: 1 year (31536000000 ms).
       */
      maxAgeMs?: number;

      /**
       * Custom rules or a prebuilt parser for the `parsed` output. Required when
       * `formats.parse` is `true`, and allowed only then.
       */
      parseParams?: BatchUnifiedCrawlData.CustomParser | BatchUnifiedCrawlData.PrebuiltParser;

      /**
       * Options for the `product` output. Requires `formats.product: true`.
       */
      productParams?: BatchUnifiedCrawlData.ProductParams;

      /**
       * Options for the `screenshot` output. Requires `formats.screenshot: true`.
       */
      screenshotParams?: BatchUnifiedCrawlData.ScreenshotParams;

      /**
       * Browser and content settings shared by all outputs.
       */
      sharedParams?: BatchUnifiedCrawlData.SharedParams;

      /**
       * Labels for this request. Filter usage and request logs by them in the dashboard
       * or with `GET /org/logs`.
       */
      tags?: Array<string>;

      /**
       * Time limit for each page, with the same behavior and defaults as in
       * `POST /web/scrape`.
       */
      timeoutOpts?: BatchUnifiedCrawlData.TimeoutOpts;

      /**
       * Zero data retention is not available for batches, because batches store their
       * results. Sending `enabled` returns `ZDR_NOT_SUPPORTED`.
       */
      zdr?: 'disabled';
    }

    export namespace BatchUnifiedCrawlData {
      /**
       * Outputs to return. Set at least one to `true`.
       */
      export interface Formats {
        /**
         * Return the original HTTP response body.
         */
        bytes?: boolean;

        /**
         * Return Markdown excerpts relevant to `highlightsParams.query`.
         */
        highlights?: boolean;

        /**
         * Return the rendered HTML.
         */
        html?: boolean;

        /**
         * Return the images found on the page.
         */
        images?: boolean;

        /**
         * Return an object matching `jsonParams.schema`, extracted from the page text and
         * embedded data such as JSON-LD, meta tags, and framework state.
         */
        json?: boolean;

        /**
         * Return the page content, or a video transcript, as Markdown.
         */
        markdown?: boolean;

        /**
         * Return fields extracted with custom rules or a prebuilt parser, as `parsed`.
         */
        parse?: boolean;

        /**
         * Return product details such as name, price, and availability.
         */
        product?: boolean;

        /**
         * Return a screenshot of the page.
         */
        screenshot?: boolean;
      }

      /**
       * Discover pages by following links from one URL.
       */
      export interface StartURL {
        /**
         * Follow links from one URL.
         */
        type: 'start_url';

        /**
         * Page where crawling begins. A URL without a scheme is treated as `https://`.
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
           * Pages to skip entirely, even when they match `follow` or `scrape`.
           */
          exclude?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;

          /**
           * Links to follow from each page; every followed page is checked for links again.
           * Follows all links when omitted.
           */
          follow?: Array<
            Controls.CrawlRegexMatcher | Controls.CrawlPaginationMatcher | Controls.CrawlProductMatcher
          >;

          /**
           * Follow links to subdomains.
           */
          followSubdomains?: boolean;

          /**
           * Only follow pages in these languages, or pass `same_as_start_url` to match the
           * start page. Follows all languages when omitted.
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
           * Maximum link depth, where the start page is depth `0`. No limit when omitted.
           */
          maxDepth?: number;

          /**
           * Maximum number of pages to fetch, up to 100,000. Credits are reserved for this
           * many pages and the unused part is refunded.
           */
          maxUrls?: number;

          /**
           * Pages to return in the results. Returns every fetched page when omitted.
           */
          scrape?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;
        }

        export namespace Controls {
          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Further pages of a paginated list, such as page 2 of a catalog.
           */
          export interface CrawlPaginationMatcher {
            /**
             * Match the further pages of a paginated list.
             */
            kind: 'pagination';
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }
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
         * Limits and filters for the sitemap URLs. Links on sitemap pages are never
         * followed.
         */
        controls?: Sitemap.Controls;
      }

      export namespace Sitemap {
        /**
         * Limits and filters for the sitemap URLs. Links on sitemap pages are never
         * followed.
         */
        export interface Controls {
          /**
           * Sitemap pages to skip, even when they match `scrape`.
           */
          exclude?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;

          /**
           * Path fragments that exclude a sitemap URL. Applies in addition to `scrape` and
           * `exclude`; pass `[]` to keep every listed URL.
           */
          excludePaths?: Array<string>;

          /**
           * Maximum number of pages to fetch, up to 100,000. Credits are reserved for this
           * many pages and the unused part is refunded.
           */
          maxUrls?: number;

          /**
           * Sitemap pages to return in the results. Returns every listed page when omitted.
           */
          scrape?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;
        }

        export namespace Controls {
          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }
        }
      }

      /**
       * Query for the `highlights` output. Required when `formats.highlights` is `true`,
       * and allowed only then.
       */
      export interface HighlightsParams {
        /**
         * Question or topic to find relevant passages for.
         */
        query: string;

        /**
         * Maximum combined length of the returned passages, in characters.
         */
        maxCharacters?: number;
      }

      /**
       * Options for the `images` output. Requires `formats.images: true`.
       */
      export interface ImageParams {
        /**
         * Set to `visual` to drop visually duplicate images, keeping the largest copy.
         */
        dedupe?: 'none' | 'visual';

        /**
         * Extra data to add to each image: `dimensions` adds `width` and `height`,
         * `classification` adds `classification`, and `file` adds a hosted `fileUrl`.
         */
        enrich?: Array<'dimensions' | 'classification' | 'file'>;
      }

      /**
       * Schema and instructions for the `json` output. Required when `formats.json` is
       * `true`, and allowed only then.
       */
      export interface JsonParams {
        /**
         * JSON Schema for the object to extract, not an example object. Must describe a
         * top-level object, up to 50 KB. Make fields optional or nullable when the page
         * may not state them.
         */
        schema: { [key: string]: unknown };

        /**
         * Extra guidance, such as which facts to prefer or how to read a field.
         */
        instructions?: string;
      }

      /**
       * Options for the `markdown` output. Requires `formats.markdown: true`.
       */
      export interface MarkdownParams {
        /**
         * Include image references in the Markdown (`html-conversion` only).
         */
        includeImages?: boolean;

        /**
         * Keep link URLs in the Markdown (`html-conversion` only).
         */
        includeLinks?: boolean;

        /**
         * How to write base64 images when `includeImages` is `true`: `placeholder`
         * shortens the data, `preserve` keeps it in full (`html-conversion` only).
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
         * Output field names mapped to a CSS selector (such as `h1` or `a@href`) or a rule
         * object. Up to 100 fields, nested up to 5 levels.
         */
        rules: { [key: string]: string | CustomParser.UnionMember1 };

        /**
         * Extract fields with custom CSS rules. The default when `type` is omitted.
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
           * What to return: `text`, `html`, an attribute such as `@href`, or nested field
           * rules. Defaults to `text`.
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
         * Prebuilt parser to run. Each one accepts specific URLs and returns its result in
         * `parsed.data`. `emails`, `phone-numbers`, and `links` read the rendered page and
         * respect content filters; the others read their source directly, independently of
         * content filters and other outputs.
         *
         * - `google-maps`: Google Maps place, search, and internal data URLs. Returns
         *   businesses in `data.results`; a search URL returns up to 200 places. Results
         *   use the country set in the URL, or the US when none is set, and come back with
         *   English labels.
         * - `google-maps-reviews`: Google Maps place, search, and `?cid=` URLs, plus
         *   `search.google.com/local/reviews` URLs, so the `google_maps_url` and
         *   `google_reviews_url` fields of `google-maps` results work as input. Returns
         *   the reviews of the place in `data.reviews` (`rating`, `date`, `isoDate`,
         *   `snippet`, `translatedSnippet`, `likes`, `user`, `media`, `response`, `link`,
         *   `id`, `language`, guided ratings in `details`, and `user.isLocalGuide`), plus
         *   the place `featureId`, `cid`, and `sort` in `data`. `sort` and `limit` set the
         *   order and count; `oldest` is exact. An unknown place returns no reviews.
         * - `google-play`: Play Store app details URLs
         *   (`play.google.com/store/apps/details?id=…`). Returns one app in `data`:
         *   details, developer contact, ratings, price, permissions, data safety, the
         *   storefront country the record describes, and `is_available` (whether the app
         *   is offered there). Ratings are counted per storefront, so `rating`,
         *   `rating_count`, and `rating_histogram` are `null` where nobody rated the app.
         *   The language and storefront country set in the URL apply (default English and
         *   the US); without a storefront country, an app not offered in the US is read
         *   from the country of its developer.
         * - `google-play-reviews`: Same URLs as `google-play`. Returns up to the 200
         *   newest reviews in the language set in the URL, with developer replies, in
         *   `data.reviews`; an app with fewer such reviews returns them all.
         * - `app-store`: App Store app URLs (`apps.apple.com/us/app/…/id…`). Returns one
         *   app in `data`: details, developer, ratings, price, version, and screenshots.
         *   The country in the path sets the storefront (default `us`).
         * - `app-store-reviews`: Same URLs as `app-store`. Returns up to the 500 newest
         *   reviews in `data.reviews`.
         * - `g2-reviews`: G2 product URLs (`g2.com/products/…`), following renamed
         *   products. Returns the 25 most recently published reviews in `data.reviews`
         *   (rating, title, likes, dislikes, `problems_solved`, reviewer role, company
         *   size, and industry), plus `data.product`. Keeps star-rating filters from the
         *   URL (`filters[nps_score][]=1` to `5`) and ignores other filters, sort orders,
         *   and pages.
         * - `instagram-profile`: Public profile URLs (`instagram.com/{username}`). Returns
         *   one profile in `data`: bio, links, follower and post counts, category,
         *   business address, `similar_accounts`, and `latest_posts` (up to the 12 posts
         *   at the top of the profile, newest first). Instagram lists pinned posts first,
         *   so posts with `is_pinned: true` can be older. When Instagram shows only a
         *   rounded post count (such as 32K), `post_count` is that rounded number and
         *   `is_post_count_rounded` is `true`.
         * - `instagram-post`: Post and reel URLs (`/p/…`, `/reel/…`). Returns one post in
         *   `data`: caption, hashtags, mentions, like, comment, and view counts
         *   (`like_count` and `view_count` are `null` when the owner hides them), media
         *   URLs, tagged users, collaborators, location, and about the top 14 comments in
         *   `data.comments`.
         * - `instagram-feed`: Hashtag and keyword URLs (`/explore/tags/…`, `/popular/…`)
         *   return the top posts; location URLs (`/explore/locations/{id}/…`) return
         *   recent posts. Posts are in `data.posts`; keyword posts carry only the
         *   shortcode, owner, thumbnail, and views, plus the caption when Instagram shows
         *   it. All three Instagram parsers read public data without signing in, so
         *   private accounts return no posts and follower lists are unavailable.
         * - `tiktok-profile`: Public profile URLs (`tiktok.com/@{username}`). Returns one
         *   profile in `data`: nickname, bio, bio link, follower, following, like, and
         *   video counts, verified, private, and business flags, and business category.
         *   Does not list videos.
         * - `tiktok-video`: Video and photo post URLs (`/@{username}/video/{id}`,
         *   `/@{username}/photo/{id}`). Returns one post in `data`: caption, hashtags,
         *   mentions, author, view, like, comment, share, save, and repost counts,
         *   duration, thumbnail, a `video_url` that downloads without cookies,
         *   `image_urls` for photo posts, music, location, and ad, paid-partnership, and
         *   AI-generated flags.
         * - `tiktok-feed`: Returns videos in the `tiktok-video` shape in `data.videos`:
         *   the latest 15 from a profile URL, the top 30 from a hashtag URL
         *   (`/tag/{name}`), or the top 12 from a search URL (`/search?q={query}`).
         * - `tiktok-comments`: Video and photo post URLs. Returns the first 20 comments in
         *   `data.comments`: text, `posted_at`, like and reply counts, whether the author
         *   liked it, and the commenter.
         * - `tiktok-followers`, `tiktok-following`: Profile URLs. Return up to 30 accounts
         *   in `data.users`, in the `tiktok-profile` shape.
         * - `tiktok-user-search`: User search URLs (`/search/user?q={query}`). Returns the
         *   top 10 accounts in `data.users`: `id`, `username`, `nickname`, `biography`,
         *   `avatar_url`, `sec_uid`, `follower_count`, `like_count`, and `is_verified`.
         *   The TikTok parsers accept `tiktok.com`, `www.tiktok.com`, and `m.tiktok.com`
         *   URLs, not short links (`vm.tiktok.com`, `vt.tiktok.com`, `tiktok.com/t/…`).
         * - `reddit-post`: Post URLs (`reddit.com/r/{subreddit}/comments/{id}`,
         *   `reddit.com/comments/{id}`, `redd.it/{id}`). Returns the post in `data.post`:
         *   title, body as Markdown, type (`text`, `link`, `image`, `gallery`, or
         *   `video`), `link_url`, subreddit, author, flairs, score, `upvote_ratio`,
         *   comment and crosspost counts, NSFW, spoiler, locked, stickied, and archived
         *   flags, images (every gallery image in order), and video (an MP4 `url` plus an
         *   `hls_url` that carries the audio). `data.comments` holds the comment tree;
         *   each comment has `id`, `author`, `body` (Markdown), `score`, `posted_at`,
         *   `depth`, `parent_id`, `url`, `is_submitter`, `is_deleted`, and its `replies`.
         *   `limit` caps the total number of comments (default 100), filled shallowest
         *   first so whole conversations are kept, and `data.has_more_comments` says
         *   whether the thread has more. The `sort` in the URL (`best`, `top`, `new`,
         *   `controversial`, `old`, `qa`) orders the comments.
         * - `reddit-search`: Search URLs (`reddit.com/search?q={query}`, or
         *   `reddit.com/r/{subreddit}/search?q={query}` to search one subreddit). With
         *   `type=link` or no `type`, returns posts in the `reddit-post` shape in
         *   `data.posts`, ordered by the `sort` in the URL (`relevance`, `hot`, `top`,
         *   `new`, `comments`) within its `t` time range (`hour`, `day`, `week`, `month`,
         *   `year`, `all`). `type=sr` returns communities in `data.communities` (name,
         *   title, description, sidebar, `subscriber_count`, `created_at`, type, NSFW and
         *   quarantine flags, language, category, icon and banner URLs, and allowed post
         *   types). `type=user` returns accounts in `data.users` (username,
         *   `display_name`, bio, `created_at`, post and comment karma, avatar and banner
         *   URLs, and verified, employee, moderator, premium, and NSFW flags). `limit`
         *   caps the number of results (default 100), in the order Reddit returns them,
         *   and `data.has_more` says whether Reddit has more.
         * - `reddit-subreddit`: Subreddit URLs (`reddit.com/r/{subreddit}`, optionally
         *   followed by `/hot`, `/new`, `/top`, `/rising`, or `/controversial`, with `t`
         *   setting the time range of `top` and `controversial`, default `day`). Returns
         *   `data.subreddit` in the community shape of `reddit-search`, `data.rules`
         *   (`name`, `description`, `applies_to`, `violation_reason`, `created_at`), and
         *   `data.posts` in the `reddit-post` shape, ordered like the tab (default `hot`)
         *   with stickied posts flagged. `r/all` and `r/popular` return posts with `null`
         *   `subreddit` and `rules`. `limit` caps the posts (default 100) and
         *   `data.has_more` says whether Reddit has more. Private and quarantined
         *   subreddits return `WEBSITE_ACCESS_ERROR`.
         * - `reddit-user`: Profile URLs (`reddit.com/user/{username}` or
         *   `reddit.com/u/{username}`, optionally followed by `/overview`, `/submitted`,
         *   or `/comments`, with `sort` set to `new`, `hot`, `top`, or `controversial` and
         *   `t` setting the time range of `top` and `controversial`, default `all`).
         *   Returns `data.user` (`id`, `username`, `display_name`, bio, `created_at`,
         *   total, post, comment, awardee, and awarder karma, avatar and banner URLs, and
         *   verified, suspended, employee, moderator, premium, and NSFW flags),
         *   `data.trophies` (`name`, `description`, `icon_url`, `granted_at`, `url`),
         *   `data.moderated_communities` (`name`, `title`, `url`, `subscriber_count`,
         *   `icon_url`, `is_nsfw`), `data.posts` in the `reddit-post` shape, and
         *   `data.comments`, each with `id`, `author`, `body` (Markdown), `score`,
         *   `posted_at`, `edited_at`, `url`, `subreddit`, `parent_id` (`null` for a
         *   top-level comment), `is_submitter`, `is_stickied`, `distinguished`,
         *   `award_count`, and the post it was left on (`id`, `title`, `url`, `author`,
         *   `is_nsfw`). The overview tab returns both posts and comments; `submitted`
         *   returns `null` comments and `comments` returns `null` posts. `limit` caps
         *   posts and comments together (default 100) and `data.has_more` says whether
         *   Reddit has more. Users who hide their activity return empty lists, and
         *   suspended accounts return their profile with `null` posts and comments.
         * - `yelp-search`: Yelp search URLs with `find_desc` and `find_loc`; `start` sets
         *   the result offset. Returns up to 20 ranked organic businesses in
         *   `data.businesses`, with `total` and `pagination`.
         * - `yelp-reviews`: Yelp business URLs (`yelp.com/biz/{alias}`); optional `start`
         *   sets the offset. Returns up to 20 of the latest public reviews, always newest
         *   first, in `data.reviews`, with business details and `pagination.next_offset`.
         *   Each review has rating, full text, `updated_at`, and author (`id` from the
         *   reviewer profile URL, `url` linking to that profile, `name`, `location`, and
         *   `review_count`); owner replies and photos are not included. Unsupported sort
         *   and review filters are rejected; tracking parameters are ignored.
         * - `tripadvisor-reviews`: Tripadvisor hotel, restaurant, and attraction review
         *   URLs (`tripadvisor.com/Hotel_Review-g{geo}-d{id}-Reviews-….html`, on any
         *   Tripadvisor country domain); `-or{N}-` in the path sets the offset. Returns 20
         *   reviews in `data.reviews` in the order Tripadvisor shows them, with
         *   `data.location` (`id`, `name`, `type`, `url`, `review_count`) and
         *   `pagination.next_offset`. Each review has `id`, `url`, `title`, full text,
         *   `rating`, `language`, `published_at`, `visit_month`, `helpful_votes`,
         *   `subratings`, `photo_urls`, `owner_response` (`text`, `published_at`,
         *   `author_name`), and `author` (`id`, `username`, `name`, `url`,
         *   `contribution_count`). An unknown location returns no reviews.
         * - `car-rental-availability`: avis.com and budget.com vehicle-availability search
         *   URLs. Returns every vehicle with pay-now and pay-later prices in
         *   `data.vehicles`.
         * - `car-rental-locations`: avis.com and budget.com `/locations?keyword=` URLs.
         *   Returns rental branches with codes, addresses, coordinates, and hours in
         *   `data.locations`.
         * - `emails`: Any page. Returns its email addresses in `data.emails`
         *   (`[{ email }]`), read from `mailto:` links, Cloudflare-protected addresses,
         *   and visible text.
         * - `phone-numbers`: Any page. Returns its valid phone numbers in E.164 format in
         *   `data.phone_numbers` (`[{ phone }]`), read from `tel:` links and visible text.
         *   Numbers without a country code are read for the country of the site TLD (US by
         *   default).
         * - `links`: Any page. Returns its unique HTTP and HTTPS links as absolute URLs in
         *   `data.links` (`[{ url, text }]`). `text` falls back to `aria-label` or image
         *   alt text and is `null` when a link has none.
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
          | 'reddit-post'
          | 'reddit-search'
          | 'reddit-subreddit'
          | 'reddit-user'
          | 'yelp-search'
          | 'yelp-reviews'
          | 'tripadvisor-reviews'
          | 'car-rental-availability'
          | 'car-rental-locations'
          | 'emails'
          | 'phone-numbers'
          | 'links';

        /**
         * Use a prebuilt parser instead of custom rules.
         */
        type: 'prebuilt';

        /**
         * Maximum number of reviews (`google-maps-reviews`, default 100), comments
         * (`reddit-post`, default 100), or results (`reddit-search`, `reddit-subreddit`,
         * and `reddit-user`, default 100) to return. Only these parsers accept it.
         */
        limit?: number;

        /**
         * Order of `data.reviews` for `google-maps-reviews`. `newest`, `relevant`,
         * `highest`, and `lowest` use the same orders as Google Maps; `oldest` returns the
         * earliest reviews first.
         */
        sort?: 'newest' | 'oldest' | 'relevant' | 'highest' | 'lowest';
      }

      /**
       * Options for the `product` output. Requires `formats.product: true`.
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
       * Options for the `screenshot` output. Requires `formats.screenshot: true`.
       */
      export interface ScreenshotParams {
        /**
         * What to capture: `viewport`, `fullPage`, one element, or a rectangle. Up to 40
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
         * Rectangle to capture, in pixels from the document origin.
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
         * Browser steps to run in order before capture. Requires a paid plan. Skips the
         * cache.
         */
        actions?: Array<
          SharedParams.Perform | SharedParams.Scroll | SharedParams.Wait | SharedParams.WaitFor
        >;

        /**
         * Country to fetch from, as an ISO 3166-1 alpha-2 code such as `US`.
         * Case-insensitive.
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
         * Which iframes to inline in HTML and text outputs. Screenshots always show
         * visible frames. `auto` inlines only iframes that hold page content, such as
         * same-site documents, framesets, job boards, forms, and embedded documents, and
         * skips ads and widgets. `true` inlines every iframe; `false` inlines none.
         */
        includeFrames?: boolean | 'auto';

        /**
         * Keep only elements matching these CSS selectors.
         */
        includeSelectors?: Array<string>;

        /**
         * Keep only the main content, without navigation, headers, footers, or sidebars.
         * Does not affect `screenshot`, `bytes`, or `product`.
         */
        mainContentOnly?: boolean;

        /**
         * Options for parsing documents such as PDFs.
         */
        parsers?: SharedParams.Parsers;

        /**
         * Scrape as a signed-in user. Create a profile with `type: "new"` and your
         * credentials, then reuse it with `type: "existing"`. Requires a paid plan and an
         * HTTPS URL. Profiles keep their session between requests, skip the cache, and
         * cannot be combined with ZDR, custom headers, `formats.bytes`, or prebuilt
         * parsers other than `emails`, `phone-numbers`, and `links`.
         */
        profile?: SharedParams.Existing | SharedParams.New;

        /**
         * Wait for CSS animations to finish before capture. Defaults to `true` when
         * `formats.screenshot` is `true`.
         */
        settleAnimations?: boolean;

        /**
         * Emulate a light or dark color scheme.
         */
        theme?: 'light' | 'dark';

        /**
         * Browser viewport in pixels. Defaults to 1920 × 1080. If you pass `viewport`, a
         * missing `width` defaults to 1440 and a missing `height` to 900.
         */
        viewport?: SharedParams.Viewport;

        /**
         * Time to wait after actions, in milliseconds, or a CSS selector to wait for.
         * Defaults to 500 ms, or 2000 ms when `includeFrames` is `true` or the URL ends in
         * `.xml`.
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
           * Follow a plain-language instruction.
           */
          type: 'perform';
        }

        export interface Scroll {
          /**
           * Scroll the page or a container.
           */
          type: 'scroll';

          /**
           * Distance per scroll step: a number of pixels, one `viewport`, or `max` to reach
           * the end.
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
           * CSS selector of the container to scroll. Omit to scroll the page.
           */
          selector?: string;
        }

        export interface Wait {
          /**
           * How long to pause before the next action, in milliseconds.
           */
          milliseconds: number;

          /**
           * Pause for a fixed time.
           */
          type: 'wait';
        }

        export interface WaitFor {
          /**
           * CSS selector to wait for before continuing.
           */
          selector: string;

          /**
           * Wait for an element matching `selector`.
           */
          type: 'waitFor';
        }

        /**
         * Options for parsing documents such as PDFs.
         */
        export interface Parsers {
          /**
           * Page range, OCR, and page markers for PDFs.
           */
          pdf?: Parsers.Pdf;
        }

        export namespace Parsers {
          /**
           * Page range, OCR, and page markers for PDFs.
           */
          export interface Pdf {
            /**
             * Last page to parse. Defaults to the last page. Must be at least `startPage`.
             */
            endPage?: number;

            /**
             * Start each PDF page in the Markdown with a `<!-- page N -->` line, where `N` is
             * the original 1-based page number. These responses are never served from cache.
             */
            includeNumberedPages?: boolean;

            /**
             * Set to `auto` to read scanned pages with OCR. Adds 1 credit per page read.
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
           * ID of the browser profile, from `profile.id` in an earlier scrape response.
           */
          profileId: string;

          /**
           * Reuse a saved browser profile.
           */
          type: 'existing';
        }

        export interface New {
          /**
           * Username or email address for the website.
           */
          identifier: string;

          /**
           * Password for the website. Used to sign in and never stored.
           */
          password: string;

          /**
           * Sign in and save a new browser profile.
           */
          type: 'new';

          /**
           * Label for the profile, shown by `GET /org/browser/profiles`.
           */
          description?: string;
        }

        /**
         * Browser viewport in pixels. Defaults to 1920 × 1080. If you pass `viewport`, a
         * missing `width` defaults to 1440 and a missing `height` to 900.
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
       * Time limit for each page, with the same behavior and defaults as in
       * `POST /web/scrape`.
       */
      export interface TimeoutOpts {
        /**
         * Deadline in milliseconds.
         */
        milliseconds: number;

        /**
         * `fail` returns 408 at the deadline. `return-partial` returns the results
         * collected so far and marks the response as partial. `return-partial` requires at
         * least 5000 ms. On `POST /web/scrape`, an output that is not ready in time fails
         * with `REQUEST_TIMEOUT` inside a 200 response under either behavior; 408 means
         * the whole request could not respond by the deadline.
         */
        behavior?: 'fail' | 'return-partial';
      }
    }

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
         * Follow links from one URL.
         */
        type: 'start_url';

        /**
         * Page where crawling begins. A URL without a scheme is treated as `https://`.
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
           * Pages to skip entirely, even when they match `follow` or `scrape`.
           */
          exclude?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;

          /**
           * Links to follow from each page; every followed page is checked for links again.
           * Follows all links when omitted.
           */
          follow?: Array<
            Controls.CrawlRegexMatcher | Controls.CrawlPaginationMatcher | Controls.CrawlProductMatcher
          >;

          /**
           * Follow links to subdomains.
           */
          followSubdomains?: boolean;

          /**
           * Only follow pages in these languages, or pass `same_as_start_url` to match the
           * start page. Follows all languages when omitted.
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
           * Maximum link depth, where the start page is depth `0`. No limit when omitted.
           */
          maxDepth?: number;

          /**
           * Maximum number of pages to fetch, up to 100,000. Credits are reserved for this
           * many pages and the unused part is refunded.
           */
          maxUrls?: number;

          /**
           * Pages to return in the results. Returns every fetched page when omitted.
           */
          scrape?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;
        }

        export namespace Controls {
          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Further pages of a paginated list, such as page 2 of a catalog.
           */
          export interface CrawlPaginationMatcher {
            /**
             * Match the further pages of a paginated list.
             */
            kind: 'pagination';
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }
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
         * Limits and filters for the sitemap URLs. Links on sitemap pages are never
         * followed.
         */
        controls?: Sitemap.Controls;
      }

      export namespace Sitemap {
        /**
         * Limits and filters for the sitemap URLs. Links on sitemap pages are never
         * followed.
         */
        export interface Controls {
          /**
           * Sitemap pages to skip, even when they match `scrape`.
           */
          exclude?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;

          /**
           * Path fragments that exclude a sitemap URL. Applies in addition to `scrape` and
           * `exclude`; pass `[]` to keep every listed URL.
           */
          excludePaths?: Array<string>;

          /**
           * Maximum number of pages to fetch, up to 100,000. Credits are reserved for this
           * many pages and the unused part is refunded.
           */
          maxUrls?: number;

          /**
           * Sitemap pages to return in the results. Returns every listed page when omitted.
           */
          scrape?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;
        }

        export namespace Controls {
          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }
        }
      }

      /**
       * Options for Markdown output.
       */
      export interface Options {
        /**
         * Country to fetch from, as an ISO 3166-1 alpha-2 code.
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
         * Whether to parse PDFs and which pages to read.
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
         * Whether to parse PDFs and which pages to read.
         */
        export interface Pdf {
          /**
           * Last page to parse. Defaults to the last page. Must be at least `start`.
           */
          end?: number;

          /**
           * Read scanned PDF pages with OCR. Pages that already have text are kept as is.
           */
          ocr?: boolean;

          /**
           * Parse PDF URLs. When false, PDFs fail with `PDF_SKIPPED`.
           */
          shouldParse?: boolean;

          /**
           * First page to parse, starting at 1.
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
         * Follow links from one URL.
         */
        type: 'start_url';

        /**
         * Page where crawling begins. A URL without a scheme is treated as `https://`.
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
           * Pages to skip entirely, even when they match `follow` or `scrape`.
           */
          exclude?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;

          /**
           * Links to follow from each page; every followed page is checked for links again.
           * Follows all links when omitted.
           */
          follow?: Array<
            Controls.CrawlRegexMatcher | Controls.CrawlPaginationMatcher | Controls.CrawlProductMatcher
          >;

          /**
           * Follow links to subdomains.
           */
          followSubdomains?: boolean;

          /**
           * Only follow pages in these languages, or pass `same_as_start_url` to match the
           * start page. Follows all languages when omitted.
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
           * Maximum link depth, where the start page is depth `0`. No limit when omitted.
           */
          maxDepth?: number;

          /**
           * Maximum number of pages to fetch, up to 100,000. Credits are reserved for this
           * many pages and the unused part is refunded.
           */
          maxUrls?: number;

          /**
           * Pages to return in the results. Returns every fetched page when omitted.
           */
          scrape?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;
        }

        export namespace Controls {
          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Further pages of a paginated list, such as page 2 of a catalog.
           */
          export interface CrawlPaginationMatcher {
            /**
             * Match the further pages of a paginated list.
             */
            kind: 'pagination';
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }
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
         * Limits and filters for the sitemap URLs. Links on sitemap pages are never
         * followed.
         */
        controls?: Sitemap.Controls;
      }

      export namespace Sitemap {
        /**
         * Limits and filters for the sitemap URLs. Links on sitemap pages are never
         * followed.
         */
        export interface Controls {
          /**
           * Sitemap pages to skip, even when they match `scrape`.
           */
          exclude?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;

          /**
           * Path fragments that exclude a sitemap URL. Applies in addition to `scrape` and
           * `exclude`; pass `[]` to keep every listed URL.
           */
          excludePaths?: Array<string>;

          /**
           * Maximum number of pages to fetch, up to 100,000. Credits are reserved for this
           * many pages and the unused part is refunded.
           */
          maxUrls?: number;

          /**
           * Sitemap pages to return in the results. Returns every listed page when omitted.
           */
          scrape?: Array<Controls.CrawlRegexMatcher | Controls.CrawlProductMatcher>;
        }

        export namespace Controls {
          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }

          /**
           * Pages whose URL matches a regex pattern.
           */
          export interface CrawlRegexMatcher {
            /**
             * Match pages by URL pattern.
             */
            kind: 'regex';

            /**
             * Regular expression matched against the page URL.
             */
            pattern: string;
          }

          /**
           * Product detail pages.
           */
          export interface CrawlProductMatcher {
            /**
             * Match product detail pages.
             */
            kind: 'product';
          }
        }
      }

      /**
       * Options for HTML output.
       */
      export interface Options {
        /**
         * Country to fetch from, as an ISO 3166-1 alpha-2 code.
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
         * Whether to parse PDFs and which pages to read.
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
         * Whether to parse PDFs and which pages to read.
         */
        export interface Pdf {
          /**
           * Last page to parse. Defaults to the last page. Must be at least `start`.
           */
          end?: number;

          /**
           * Read scanned PDF pages with OCR. Pages that already have text are kept as is.
           */
          ocr?: boolean;

          /**
           * Parse PDF URLs. When false, PDFs fail with `PDF_SKIPPED`.
           */
          shouldParse?: boolean;

          /**
           * First page to parse, starting at 1.
           */
          start?: number;
        }
      }
    }
  }

  /**
   * Webhook to notify when the batch finishes. Omit `retry` for a single attempt, or
   * pass `retry: {}` for the default retry schedule.
   */
  export interface Webhook {
    /**
     * Public HTTP or HTTPS URL that receives the `batch.completed`, `batch.failed`, or
     * `batch.cancelled` event.
     */
    url: string;

    /**
     * Automatic retry settings. Pass `{}` for the default schedule.
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
