// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MonitorsAPI from './monitors';
import * as WebhooksAPI from './webhooks/webhooks';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Watch websites on a schedule for exact or meaningful changes.
 */
export class Monitors extends APIResource {
  /**
   * Watch a web page, a sitemap, data extracted from a site, or web search results
   * on a schedule, and get a webhook when something changes. Creating a monitor
   * queues its baseline run right away.
   *
   * @example
   * ```ts
   * const monitor = await client.monitors.create({
   *   name: 'Acme pricing page',
   *   target: { type: 'page', url: 'https://acme.com/pricing' },
   *   change_detection: { type: 'exact' },
   *   mode: 'web',
   *   schedule: {
   *     type: 'interval',
   *     frequency: 6,
   *     unit: 'hours',
   *   },
   *   webhook: { url: 'https://example.com/webhook' },
   * });
   * ```
   */
  create(body: MonitorCreateParams, options?: RequestOptions): APIPromise<MonitorCreateResponse> {
    return this._client.post('/monitors', { body, ...options });
  }

  /**
   * Retrieve a monitor's configuration, status, and current baseline.
   *
   * @example
   * ```ts
   * const monitor = await client.monitors.retrieve('mon_123');
   * ```
   */
  retrieve(monitorID: string, options?: RequestOptions): APIPromise<MonitorRetrieveResponse> {
    return this._client.get(path`/monitors/${monitorID}`, options);
  }

  /**
   * Change a monitor's settings, or pause and resume it. Changing the target or
   * change detection replaces the baseline and queues a new baseline run.
   *
   * @example
   * ```ts
   * const monitor = await client.monitors.update('mon_123', {
   *   name: 'Acme pricing monitor',
   *   schedule: {
   *     type: 'interval',
   *     frequency: 1,
   *     unit: 'hours',
   *   },
   *   status: 'active',
   *   webhook: { url: 'https://example.com/webhook' },
   * });
   * ```
   */
  update(
    monitorID: string,
    body: MonitorUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MonitorUpdateResponse> {
    return this._client.patch(path`/monitors/${monitorID}`, { body, ...options });
  }

  /**
   * List your monitors, newest first. Search by name, URL, or instructions, and
   * filter by status, target type, detection type, or tags.
   *
   * @example
   * ```ts
   * const monitors = await client.monitors.list();
   * ```
   */
  list(
    query: MonitorListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListResponse> {
    return this._client.get('/monitors', { query, ...options });
  }

  /**
   * Delete a monitor along with its runs, changes, and baseline. Future runs and
   * pending webhook retries stop.
   *
   * @example
   * ```ts
   * const monitor = await client.monitors.delete('mon_123');
   * ```
   */
  delete(monitorID: string, options?: RequestOptions): APIPromise<MonitorDeleteResponse> {
    return this._client.delete(path`/monitors/${monitorID}`, options);
  }

  /**
   * List credits charged per monitor, highest first, from up to the 10,000 most
   * recent runs in the time window. Pass `tag` to report on one group of monitors,
   * such as a single customer's.
   *
   * @example
   * ```ts
   * const response = await client.monitors.getCreditUsage();
   * ```
   */
  getCreditUsage(
    query: MonitorGetCreditUsageParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorGetCreditUsageResponse> {
    return this._client.get('/monitors/credit-usage', { query, ...options });
  }

  /**
   * Retrieve how many monitors your organization has and how many your plan allows.
   *
   * @example
   * ```ts
   * const response = await client.monitors.getLimits();
   * ```
   */
  getLimits(options?: RequestOptions): APIPromise<MonitorGetLimitsResponse> {
    return this._client.get('/monitors/limits', options);
  }

  /**
   * List detected changes across all your monitors, newest first. Filter by monitor,
   * target type, detection type, tag, or time range.
   *
   * @example
   * ```ts
   * const response = await client.monitors.listAccountChanges();
   * ```
   */
  listAccountChanges(
    query: MonitorListAccountChangesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListAccountChangesResponse> {
    return this._client.get('/monitors/changes', { query, ...options });
  }

  /**
   * List runs across all your monitors, newest first.
   *
   * @example
   * ```ts
   * const response = await client.monitors.listAccountRuns();
   * ```
   */
  listAccountRuns(
    query: MonitorListAccountRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListAccountRunsResponse> {
    return this._client.get('/monitors/runs', { query, ...options });
  }

  /**
   * List a monitor's detected changes, newest first. Each change includes its full
   * diff and evidence.
   *
   * @example
   * ```ts
   * const response = await client.monitors.listChanges(
   *   'mon_123',
   * );
   * ```
   */
  listChanges(
    monitorID: string,
    query: MonitorListChangesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListChangesResponse> {
    return this._client.get(path`/monitors/${monitorID}/changes`, { query, ...options });
  }

  /**
   * List a monitor's runs, newest first.
   *
   * @example
   * ```ts
   * const response = await client.monitors.listRuns('mon_123');
   * ```
   */
  listRuns(
    monitorID: string,
    query: MonitorListRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListRunsResponse> {
    return this._client.get(path`/monitors/${monitorID}/runs`, { query, ...options });
  }

  /**
   * Retrieve a detected change with its summary, diff, URLs, and evidence.
   *
   * @example
   * ```ts
   * const response = await client.monitors.retrieveChange(
   *   'chg_123',
   * );
   * ```
   */
  retrieveChange(changeID: string, options?: RequestOptions): APIPromise<MonitorRetrieveChangeResponse> {
    return this._client.get(path`/monitors/changes/${changeID}`, options);
  }

  /**
   * Retrieve a run's status, timing, credit charge, and webhook deliveries. If the
   * run found a change, `change_id` points to it.
   *
   * @example
   * ```ts
   * const response = await client.monitors.retrieveRun(
   *   'run_123',
   *   { monitor_id: 'mon_123' },
   * );
   * ```
   */
  retrieveRun(
    runID: string,
    params: MonitorRetrieveRunParams,
    options?: RequestOptions,
  ): APIPromise<MonitorRetrieveRunResponse> {
    const { monitor_id } = params;
    return this._client.get(path`/monitors/${monitor_id}/runs/${runID}`, options);
  }

  /**
   * Replace the monitor's webhook signing secret. The new secret signs every
   * delivery attempt from now on, including retries.
   *
   * @example
   * ```ts
   * const response = await client.monitors.rotateWebhookSecret(
   *   'mon_123',
   * );
   * ```
   */
  rotateWebhookSecret(
    monitorID: string,
    options?: RequestOptions,
  ): APIPromise<MonitorRotateWebhookSecretResponse> {
    return this._client.post(path`/monitors/${monitorID}/webhook/rotate-secret`, options);
  }

  /**
   * Queue a run now without changing the monitor's schedule. Returns the run ID to
   * poll. Paused monitors return `409`.
   *
   * @example
   * ```ts
   * const response = await client.monitors.run('mon_123');
   * ```
   */
  run(monitorID: string, options?: RequestOptions): APIPromise<MonitorRunResponse> {
    return this._client.post(path`/monitors/${monitorID}/run`, options);
  }
}

export interface WebhookDelivery {
  /**
   * When the delivery was attempted.
   */
  attempted_at: string;

  error: WebhookDelivery.Error | null;

  /**
   * Event this delivery carried.
   */
  event: 'change.detected' | 'run.completed';

  /**
   * Event ID, sent in the `X-Context-Id` header.
   */
  event_id: string;

  /**
   * Final HTTP status from your endpoint. `null` when no response was received.
   */
  http_status: number | null;

  /**
   * Outcome of the delivery: `delivered` (2xx response), `rejected` (non-2xx
   * response), `failed` (no response), or `skipped_unsafe_url` (the URL isn't a safe
   * public endpoint).
   */
  status: 'delivered' | 'rejected' | 'failed' | 'skipped_unsafe_url';

  /**
   * ID for looking up or retrying this delivery, when available.
   */
  delivery_id?: string;
}

export namespace WebhookDelivery {
  export interface Error {
    /**
     * Machine-readable error code, such as `fetch_failed`.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
  }
}

export interface MonitorCreateResponse {
  /**
   * Unique ID of the monitor.
   */
  id: string;

  /**
   * How changes are judged. Defaults to `semantic` for extract and search targets
   * and for page targets with `instructions`; otherwise `exact`. Sitemap targets
   * support only `exact`, and extract targets only `semantic`.
   */
  change_detection:
    | MonitorCreateResponse.MonitorsExactChangeDetection
    | MonitorCreateResponse.MonitorsSemanticChangeDetection;

  /**
   * When the monitor was created.
   */
  created_at: string;

  /**
   * ID of the baseline run queued at creation. `null` if the baseline runs at the
   * next scheduled time instead.
   */
  initial_run_id: string | null;

  /**
   * Monitor category. Always `web`.
   */
  mode: 'web';

  /**
   * Display name of the monitor.
   */
  name: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * `active` monitors run on schedule. `failed` monitors keep running after a failed
   * run and return to `active` on the next success. `paused` monitors don't run
   * until you set `status` to `active`; Context.dev also pauses monitors after
   * repeated failures or credit shortfalls.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * What to watch: a page, a sitemap, data extracted from a site, or web search
   * results.
   */
  target:
    | MonitorCreateResponse.MonitorsPageTarget
    | MonitorCreateResponse.MonitorsSitemapTarget
    | MonitorCreateResponse.MonitorsExtractTarget
    | MonitorCreateResponse.MonitorsSearchTarget;

  /**
   * When the monitor was last updated.
   */
  updated_at: string;

  /**
   * What the next run compares against. Returned only by
   * `GET /monitors/{monitor_id}`; `null` until the first capture finishes or after
   * the target changes.
   */
  baseline?:
    | MonitorCreateResponse.MonitorsPageBaseline
    | MonitorCreateResponse.MonitorsSitemapBaseline
    | MonitorCreateResponse.MonitorsExtractBaseline
    | MonitorCreateResponse.MonitorsSearchBaseline
    | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorCreateResponse.KeyMetadata;

  /**
   * When the monitor last detected a change. `null` until it detects one.
   */
  last_change_at?: string | null;

  /**
   * Error from the most recent failed run. `null` when the last run succeeded.
   */
  last_error?: MonitorCreateResponse.LastError | null;

  /**
   * When the most recent run ended. `null` until the first run ends.
   */
  last_run_at?: string | null;

  /**
   * When the next scheduled run is due. `null` while paused.
   */
  next_run_at?: string | null;

  /**
   * Access policy IDs applied to every run.
   */
  policies?: Array<string>;

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  schedule?: MonitorCreateResponse.Schedule;

  /**
   * Labels for grouping monitors. Filter monitors, changes, and credit usage by tag.
   */
  tags?: Array<string>;

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  webhook?: MonitorCreateResponse.Webhook | null;

  /**
   * Details of failing webhook deliveries. `null` when deliveries succeed or no
   * webhook is configured; cleared by the next successful delivery or a new webhook
   * URL.
   */
  webhook_failure?: MonitorCreateResponse.WebhookFailure | null;
}

export namespace MonitorCreateResponse {
  /**
   * Report every change: visible-text diffs for pages, added or removed URLs for
   * sitemaps, and every new result for searches.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text, sitemap URLs, or search results.
     */
    type: 'exact';
  }

  /**
   * Report only changes that matter, judged against the target's `instructions` and,
   * for extract targets, its `schema`.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to report only changes that match the target's `instructions`.
     */
    type: 'semantic';

    /**
     * Minimum confidence a change needs to be reported. Higher values mean fewer, more
     * certain alerts.
     */
    confidence_threshold?: number;
  }

  /**
   * Watch one web page. `exact` detection reports any change to the visible text;
   * `semantic` detection reports only confirmed changes that match `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) URL of the page to watch.
     */
    url: string;

    /**
     * Browser actions to run in order after the page loads and before each capture.
     * Requires a paid plan. Changing it resets the baseline.
     */
    actions?: Array<
      | MonitorsPageTarget.WebScrapeWaitAction
      | MonitorsPageTarget.WebScrapePerformAction
      | MonitorsPageTarget.WebScrapeScrollAction
    > | null;

    /**
     * CSS selectors for regions to ignore, applied after `include_selectors`. Changing
     * it resets the baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * CSS selectors for the regions to watch. Omit or leave empty to watch the main
     * content. Changing it resets the baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language description of the changes that matter. Requires `semantic`
     * detection, which is selected when `change_detection` is omitted.
     */
    instructions?: string;

    /**
     * Collapse whitespace before comparing text, so spacing-only edits are not
     * reported.
     */
    normalize_whitespace?: boolean;
  }

  export namespace MonitorsPageTarget {
    /**
     * Pause for a fixed time before the next action.
     */
    export interface WebScrapeWaitAction {
      /**
       * Use `wait` to pause for a fixed duration.
       */
      do: 'wait';

      /**
       * Time to pause in milliseconds before the next action.
       */
      timeMs: number;
    }

    /**
     * Perform one browser instruction written in plain language.
     */
    export interface WebScrapePerformAction {
      /**
       * One browser instruction, such as clicking a button or entering text.
       */
      action: string;

      /**
       * Use `perform` for a plain-language browser instruction.
       */
      do: 'perform';
    }

    /**
     * Scroll the page or a scrollable container. Waits for new content to settle after
     * each scroll.
     */
    export interface WebScrapeScrollAction {
      /**
       * Use `scroll` to move through the page or a container.
       */
      do: 'scroll';

      /**
       * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
       */
      amount?: number | 'viewport' | 'max';

      /**
       * Scroll the first container matching this CSS selector. Omit to scroll the page.
       */
      container?: string;

      /**
       * Direction to scroll.
       */
      direction?: 'up' | 'down' | 'left' | 'right';

      /**
       * Maximum number of scroll steps. Stops early when the page stops changing.
       */
      maxScrolls?: number;
    }
  }

  /**
   * Watch a sitemap and report URLs that are added or removed.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Public HTTP(S) URL of the sitemap to watch.
     */
    url: string;

    /**
     * Path patterns of URLs to ignore, such as `/legal/*`.
     */
    exclude?: Array<string>;

    /**
     * Path patterns of URLs to track, such as `/blog/*`.
     */
    include?: Array<string>;

    /**
     * Maximum number of URLs to track.
     */
    max_urls?: number;
  }

  /**
   * Extract structured data from the most relevant pages of a site and report
   * meaningful changes. Pages are chosen from `schema` and `instructions`, and the
   * page set is refreshed periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Plain-language description of the pages and facts to track and the changes to
     * report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Public HTTP(S) URL where page discovery starts, usually the site home page.
     */
    url: string;

    /**
     * Also discover pages on subdomains of the site.
     */
    follow_subdomains?: boolean;

    /**
     * Maximum link depth from `url`. `0` tracks only the starting page.
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for the data to extract, up to 20,000 characters; it also guides
     * which pages are tracked. Defaults to a `summary` string and a `key_points` list.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Search the web on every run and report results not seen before, listed in the
   * change's `matched_urls` and `evidence`. `semantic` detection reports only
   * results about a new development that matches `instructions`; `exact` detection
   * reports every new result.
   */
  export interface MonitorsSearchTarget {
    /**
     * Web search query to run on every check. Supports `site:`, `-site:`, and quoted
     * phrases.
     */
    query: string;

    /**
     * Use `search` to watch the web for new results about a topic.
     */
    type: 'search';

    /**
     * Plain-language description of the new results that matter. Defaults to `query`.
     * Not allowed with `exact` detection.
     */
    instructions?: string;
  }

  /**
   * Baseline for a `page` target: the page's visible text from the last capture.
   */
  export interface MonitorsPageBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Visible page text from the last capture.
     */
    text: string;
  }

  /**
   * Baseline for a `sitemap` target: the normalized set of URLs from the last
   * capture.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * Normalized sitemap URLs from the last capture, sorted.
     */
    urls: Array<string>;
  }

  /**
   * Baseline for an `extract` target: the tracked pages and the data last extracted
   * from them.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Latest extracted data, matching the target's `schema`. Refreshed at most once a
     * day; `null` before the first capture.
     */
    data: unknown;

    /**
     * Pages the monitor tracks for changes.
     */
    urls_analyzed: Array<string>;
  }

  /**
   * Baseline for a `search` target: the results from the last capture.
   */
  export interface MonitorsSearchBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Search results from the last capture.
     */
    results: Array<MonitorsSearchBaseline.Result>;
  }

  export namespace MonitorsSearchBaseline {
    export interface Result {
      /**
       * Result snippet.
       */
      description: string;

      /**
       * When the result was published. `null` when unknown.
       */
      published_at: string | null;

      /**
       * Title of the result.
       */
      title: string;

      /**
       * URL of the result.
       */
      url: string;
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

  /**
   * Error from the most recent failed run. `null` when the last run succeeded.
   */
  export interface LastError {
    /**
     * Machine-readable error code, such as `fetch_failed`.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
  }

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of `unit` periods between runs. The interval must be between 10 minutes
     * and 1 year, so at least `10` with `minutes` and at most `365` with `days`.
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit for `frequency`.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack webhook URLs get
     * formatted messages.
     */
    url: string;

    /**
     * Events to send. Defaults to `change.detected`. Add `run.completed` to get a
     * delivery after every completed run, including runs with no change.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Automatic retry settings. Pass `{}` for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;

    /**
     * Signing secret for verifying deliveries, generated by Context.dev. Returned only
     * to API keys with full access or the `monitors:write` permission.
     */
    secret?: string;
  }

  /**
   * Details of failing webhook deliveries. `null` when deliveries succeed or no
   * webhook is configured; cleared by the next successful delivery or a new webhook
   * URL.
   */
  export interface WebhookFailure {
    /**
     * Number of failed delivery attempts in a row.
     */
    consecutive_failures: number;

    /**
     * When the most recent delivery failed.
     */
    last_failed_at: string;

    /**
     * Human-readable explanation of the most recent failure.
     */
    last_message: string;

    /**
     * Outcome of the most recent failed delivery: `rejected` (non-2xx response),
     * `failed` (no response), or `skipped_unsafe_url` (the URL isn't a safe public
     * endpoint).
     */
    last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
  }
}

export interface MonitorRetrieveResponse {
  /**
   * Unique ID of the monitor.
   */
  id: string;

  /**
   * How changes are judged. Defaults to `semantic` for extract and search targets
   * and for page targets with `instructions`; otherwise `exact`. Sitemap targets
   * support only `exact`, and extract targets only `semantic`.
   */
  change_detection:
    | MonitorRetrieveResponse.MonitorsExactChangeDetection
    | MonitorRetrieveResponse.MonitorsSemanticChangeDetection;

  /**
   * When the monitor was created.
   */
  created_at: string;

  /**
   * Monitor category. Always `web`.
   */
  mode: 'web';

  /**
   * Display name of the monitor.
   */
  name: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * `active` monitors run on schedule. `failed` monitors keep running after a failed
   * run and return to `active` on the next success. `paused` monitors don't run
   * until you set `status` to `active`; Context.dev also pauses monitors after
   * repeated failures or credit shortfalls.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * What to watch: a page, a sitemap, data extracted from a site, or web search
   * results.
   */
  target:
    | MonitorRetrieveResponse.MonitorsPageTarget
    | MonitorRetrieveResponse.MonitorsSitemapTarget
    | MonitorRetrieveResponse.MonitorsExtractTarget
    | MonitorRetrieveResponse.MonitorsSearchTarget;

  /**
   * When the monitor was last updated.
   */
  updated_at: string;

  /**
   * What the next run compares against. Returned only by
   * `GET /monitors/{monitor_id}`; `null` until the first capture finishes or after
   * the target changes.
   */
  baseline?:
    | MonitorRetrieveResponse.MonitorsPageBaseline
    | MonitorRetrieveResponse.MonitorsSitemapBaseline
    | MonitorRetrieveResponse.MonitorsExtractBaseline
    | MonitorRetrieveResponse.MonitorsSearchBaseline
    | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRetrieveResponse.KeyMetadata;

  /**
   * When the monitor last detected a change. `null` until it detects one.
   */
  last_change_at?: string | null;

  /**
   * Error from the most recent failed run. `null` when the last run succeeded.
   */
  last_error?: MonitorRetrieveResponse.LastError | null;

  /**
   * When the most recent run ended. `null` until the first run ends.
   */
  last_run_at?: string | null;

  /**
   * When the next scheduled run is due. `null` while paused.
   */
  next_run_at?: string | null;

  /**
   * Access policy IDs applied to every run.
   */
  policies?: Array<string>;

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  schedule?: MonitorRetrieveResponse.Schedule;

  /**
   * Labels for grouping monitors. Filter monitors, changes, and credit usage by tag.
   */
  tags?: Array<string>;

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  webhook?: MonitorRetrieveResponse.Webhook | null;

  /**
   * Details of failing webhook deliveries. `null` when deliveries succeed or no
   * webhook is configured; cleared by the next successful delivery or a new webhook
   * URL.
   */
  webhook_failure?: MonitorRetrieveResponse.WebhookFailure | null;
}

export namespace MonitorRetrieveResponse {
  /**
   * Report every change: visible-text diffs for pages, added or removed URLs for
   * sitemaps, and every new result for searches.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text, sitemap URLs, or search results.
     */
    type: 'exact';
  }

  /**
   * Report only changes that matter, judged against the target's `instructions` and,
   * for extract targets, its `schema`.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to report only changes that match the target's `instructions`.
     */
    type: 'semantic';

    /**
     * Minimum confidence a change needs to be reported. Higher values mean fewer, more
     * certain alerts.
     */
    confidence_threshold?: number;
  }

  /**
   * Watch one web page. `exact` detection reports any change to the visible text;
   * `semantic` detection reports only confirmed changes that match `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) URL of the page to watch.
     */
    url: string;

    /**
     * Browser actions to run in order after the page loads and before each capture.
     * Requires a paid plan. Changing it resets the baseline.
     */
    actions?: Array<
      | MonitorsPageTarget.WebScrapeWaitAction
      | MonitorsPageTarget.WebScrapePerformAction
      | MonitorsPageTarget.WebScrapeScrollAction
    > | null;

    /**
     * CSS selectors for regions to ignore, applied after `include_selectors`. Changing
     * it resets the baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * CSS selectors for the regions to watch. Omit or leave empty to watch the main
     * content. Changing it resets the baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language description of the changes that matter. Requires `semantic`
     * detection, which is selected when `change_detection` is omitted.
     */
    instructions?: string;

    /**
     * Collapse whitespace before comparing text, so spacing-only edits are not
     * reported.
     */
    normalize_whitespace?: boolean;
  }

  export namespace MonitorsPageTarget {
    /**
     * Pause for a fixed time before the next action.
     */
    export interface WebScrapeWaitAction {
      /**
       * Use `wait` to pause for a fixed duration.
       */
      do: 'wait';

      /**
       * Time to pause in milliseconds before the next action.
       */
      timeMs: number;
    }

    /**
     * Perform one browser instruction written in plain language.
     */
    export interface WebScrapePerformAction {
      /**
       * One browser instruction, such as clicking a button or entering text.
       */
      action: string;

      /**
       * Use `perform` for a plain-language browser instruction.
       */
      do: 'perform';
    }

    /**
     * Scroll the page or a scrollable container. Waits for new content to settle after
     * each scroll.
     */
    export interface WebScrapeScrollAction {
      /**
       * Use `scroll` to move through the page or a container.
       */
      do: 'scroll';

      /**
       * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
       */
      amount?: number | 'viewport' | 'max';

      /**
       * Scroll the first container matching this CSS selector. Omit to scroll the page.
       */
      container?: string;

      /**
       * Direction to scroll.
       */
      direction?: 'up' | 'down' | 'left' | 'right';

      /**
       * Maximum number of scroll steps. Stops early when the page stops changing.
       */
      maxScrolls?: number;
    }
  }

  /**
   * Watch a sitemap and report URLs that are added or removed.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Public HTTP(S) URL of the sitemap to watch.
     */
    url: string;

    /**
     * Path patterns of URLs to ignore, such as `/legal/*`.
     */
    exclude?: Array<string>;

    /**
     * Path patterns of URLs to track, such as `/blog/*`.
     */
    include?: Array<string>;

    /**
     * Maximum number of URLs to track.
     */
    max_urls?: number;
  }

  /**
   * Extract structured data from the most relevant pages of a site and report
   * meaningful changes. Pages are chosen from `schema` and `instructions`, and the
   * page set is refreshed periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Plain-language description of the pages and facts to track and the changes to
     * report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Public HTTP(S) URL where page discovery starts, usually the site home page.
     */
    url: string;

    /**
     * Also discover pages on subdomains of the site.
     */
    follow_subdomains?: boolean;

    /**
     * Maximum link depth from `url`. `0` tracks only the starting page.
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for the data to extract, up to 20,000 characters; it also guides
     * which pages are tracked. Defaults to a `summary` string and a `key_points` list.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Search the web on every run and report results not seen before, listed in the
   * change's `matched_urls` and `evidence`. `semantic` detection reports only
   * results about a new development that matches `instructions`; `exact` detection
   * reports every new result.
   */
  export interface MonitorsSearchTarget {
    /**
     * Web search query to run on every check. Supports `site:`, `-site:`, and quoted
     * phrases.
     */
    query: string;

    /**
     * Use `search` to watch the web for new results about a topic.
     */
    type: 'search';

    /**
     * Plain-language description of the new results that matter. Defaults to `query`.
     * Not allowed with `exact` detection.
     */
    instructions?: string;
  }

  /**
   * Baseline for a `page` target: the page's visible text from the last capture.
   */
  export interface MonitorsPageBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Visible page text from the last capture.
     */
    text: string;
  }

  /**
   * Baseline for a `sitemap` target: the normalized set of URLs from the last
   * capture.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * Normalized sitemap URLs from the last capture, sorted.
     */
    urls: Array<string>;
  }

  /**
   * Baseline for an `extract` target: the tracked pages and the data last extracted
   * from them.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Latest extracted data, matching the target's `schema`. Refreshed at most once a
     * day; `null` before the first capture.
     */
    data: unknown;

    /**
     * Pages the monitor tracks for changes.
     */
    urls_analyzed: Array<string>;
  }

  /**
   * Baseline for a `search` target: the results from the last capture.
   */
  export interface MonitorsSearchBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Search results from the last capture.
     */
    results: Array<MonitorsSearchBaseline.Result>;
  }

  export namespace MonitorsSearchBaseline {
    export interface Result {
      /**
       * Result snippet.
       */
      description: string;

      /**
       * When the result was published. `null` when unknown.
       */
      published_at: string | null;

      /**
       * Title of the result.
       */
      title: string;

      /**
       * URL of the result.
       */
      url: string;
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

  /**
   * Error from the most recent failed run. `null` when the last run succeeded.
   */
  export interface LastError {
    /**
     * Machine-readable error code, such as `fetch_failed`.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
  }

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of `unit` periods between runs. The interval must be between 10 minutes
     * and 1 year, so at least `10` with `minutes` and at most `365` with `days`.
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit for `frequency`.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack webhook URLs get
     * formatted messages.
     */
    url: string;

    /**
     * Events to send. Defaults to `change.detected`. Add `run.completed` to get a
     * delivery after every completed run, including runs with no change.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Automatic retry settings. Pass `{}` for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;

    /**
     * Signing secret for verifying deliveries, generated by Context.dev. Returned only
     * to API keys with full access or the `monitors:write` permission.
     */
    secret?: string;
  }

  /**
   * Details of failing webhook deliveries. `null` when deliveries succeed or no
   * webhook is configured; cleared by the next successful delivery or a new webhook
   * URL.
   */
  export interface WebhookFailure {
    /**
     * Number of failed delivery attempts in a row.
     */
    consecutive_failures: number;

    /**
     * When the most recent delivery failed.
     */
    last_failed_at: string;

    /**
     * Human-readable explanation of the most recent failure.
     */
    last_message: string;

    /**
     * Outcome of the most recent failed delivery: `rejected` (non-2xx response),
     * `failed` (no response), or `skipped_unsafe_url` (the URL isn't a safe public
     * endpoint).
     */
    last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
  }
}

export interface MonitorUpdateResponse {
  /**
   * Unique ID of the monitor.
   */
  id: string;

  /**
   * How changes are judged. Defaults to `semantic` for extract and search targets
   * and for page targets with `instructions`; otherwise `exact`. Sitemap targets
   * support only `exact`, and extract targets only `semantic`.
   */
  change_detection:
    | MonitorUpdateResponse.MonitorsExactChangeDetection
    | MonitorUpdateResponse.MonitorsSemanticChangeDetection;

  /**
   * When the monitor was created.
   */
  created_at: string;

  /**
   * Monitor category. Always `web`.
   */
  mode: 'web';

  /**
   * Display name of the monitor.
   */
  name: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * `active` monitors run on schedule. `failed` monitors keep running after a failed
   * run and return to `active` on the next success. `paused` monitors don't run
   * until you set `status` to `active`; Context.dev also pauses monitors after
   * repeated failures or credit shortfalls.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * What to watch: a page, a sitemap, data extracted from a site, or web search
   * results.
   */
  target:
    | MonitorUpdateResponse.MonitorsPageTarget
    | MonitorUpdateResponse.MonitorsSitemapTarget
    | MonitorUpdateResponse.MonitorsExtractTarget
    | MonitorUpdateResponse.MonitorsSearchTarget;

  /**
   * When the monitor was last updated.
   */
  updated_at: string;

  /**
   * What the next run compares against. Returned only by
   * `GET /monitors/{monitor_id}`; `null` until the first capture finishes or after
   * the target changes.
   */
  baseline?:
    | MonitorUpdateResponse.MonitorsPageBaseline
    | MonitorUpdateResponse.MonitorsSitemapBaseline
    | MonitorUpdateResponse.MonitorsExtractBaseline
    | MonitorUpdateResponse.MonitorsSearchBaseline
    | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorUpdateResponse.KeyMetadata;

  /**
   * When the monitor last detected a change. `null` until it detects one.
   */
  last_change_at?: string | null;

  /**
   * Error from the most recent failed run. `null` when the last run succeeded.
   */
  last_error?: MonitorUpdateResponse.LastError | null;

  /**
   * When the most recent run ended. `null` until the first run ends.
   */
  last_run_at?: string | null;

  /**
   * When the next scheduled run is due. `null` while paused.
   */
  next_run_at?: string | null;

  /**
   * Access policy IDs applied to every run.
   */
  policies?: Array<string>;

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  schedule?: MonitorUpdateResponse.Schedule;

  /**
   * Labels for grouping monitors. Filter monitors, changes, and credit usage by tag.
   */
  tags?: Array<string>;

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  webhook?: MonitorUpdateResponse.Webhook | null;

  /**
   * Details of failing webhook deliveries. `null` when deliveries succeed or no
   * webhook is configured; cleared by the next successful delivery or a new webhook
   * URL.
   */
  webhook_failure?: MonitorUpdateResponse.WebhookFailure | null;
}

export namespace MonitorUpdateResponse {
  /**
   * Report every change: visible-text diffs for pages, added or removed URLs for
   * sitemaps, and every new result for searches.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text, sitemap URLs, or search results.
     */
    type: 'exact';
  }

  /**
   * Report only changes that matter, judged against the target's `instructions` and,
   * for extract targets, its `schema`.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to report only changes that match the target's `instructions`.
     */
    type: 'semantic';

    /**
     * Minimum confidence a change needs to be reported. Higher values mean fewer, more
     * certain alerts.
     */
    confidence_threshold?: number;
  }

  /**
   * Watch one web page. `exact` detection reports any change to the visible text;
   * `semantic` detection reports only confirmed changes that match `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) URL of the page to watch.
     */
    url: string;

    /**
     * Browser actions to run in order after the page loads and before each capture.
     * Requires a paid plan. Changing it resets the baseline.
     */
    actions?: Array<
      | MonitorsPageTarget.WebScrapeWaitAction
      | MonitorsPageTarget.WebScrapePerformAction
      | MonitorsPageTarget.WebScrapeScrollAction
    > | null;

    /**
     * CSS selectors for regions to ignore, applied after `include_selectors`. Changing
     * it resets the baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * CSS selectors for the regions to watch. Omit or leave empty to watch the main
     * content. Changing it resets the baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language description of the changes that matter. Requires `semantic`
     * detection, which is selected when `change_detection` is omitted.
     */
    instructions?: string;

    /**
     * Collapse whitespace before comparing text, so spacing-only edits are not
     * reported.
     */
    normalize_whitespace?: boolean;
  }

  export namespace MonitorsPageTarget {
    /**
     * Pause for a fixed time before the next action.
     */
    export interface WebScrapeWaitAction {
      /**
       * Use `wait` to pause for a fixed duration.
       */
      do: 'wait';

      /**
       * Time to pause in milliseconds before the next action.
       */
      timeMs: number;
    }

    /**
     * Perform one browser instruction written in plain language.
     */
    export interface WebScrapePerformAction {
      /**
       * One browser instruction, such as clicking a button or entering text.
       */
      action: string;

      /**
       * Use `perform` for a plain-language browser instruction.
       */
      do: 'perform';
    }

    /**
     * Scroll the page or a scrollable container. Waits for new content to settle after
     * each scroll.
     */
    export interface WebScrapeScrollAction {
      /**
       * Use `scroll` to move through the page or a container.
       */
      do: 'scroll';

      /**
       * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
       */
      amount?: number | 'viewport' | 'max';

      /**
       * Scroll the first container matching this CSS selector. Omit to scroll the page.
       */
      container?: string;

      /**
       * Direction to scroll.
       */
      direction?: 'up' | 'down' | 'left' | 'right';

      /**
       * Maximum number of scroll steps. Stops early when the page stops changing.
       */
      maxScrolls?: number;
    }
  }

  /**
   * Watch a sitemap and report URLs that are added or removed.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Public HTTP(S) URL of the sitemap to watch.
     */
    url: string;

    /**
     * Path patterns of URLs to ignore, such as `/legal/*`.
     */
    exclude?: Array<string>;

    /**
     * Path patterns of URLs to track, such as `/blog/*`.
     */
    include?: Array<string>;

    /**
     * Maximum number of URLs to track.
     */
    max_urls?: number;
  }

  /**
   * Extract structured data from the most relevant pages of a site and report
   * meaningful changes. Pages are chosen from `schema` and `instructions`, and the
   * page set is refreshed periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Plain-language description of the pages and facts to track and the changes to
     * report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Public HTTP(S) URL where page discovery starts, usually the site home page.
     */
    url: string;

    /**
     * Also discover pages on subdomains of the site.
     */
    follow_subdomains?: boolean;

    /**
     * Maximum link depth from `url`. `0` tracks only the starting page.
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for the data to extract, up to 20,000 characters; it also guides
     * which pages are tracked. Defaults to a `summary` string and a `key_points` list.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Search the web on every run and report results not seen before, listed in the
   * change's `matched_urls` and `evidence`. `semantic` detection reports only
   * results about a new development that matches `instructions`; `exact` detection
   * reports every new result.
   */
  export interface MonitorsSearchTarget {
    /**
     * Web search query to run on every check. Supports `site:`, `-site:`, and quoted
     * phrases.
     */
    query: string;

    /**
     * Use `search` to watch the web for new results about a topic.
     */
    type: 'search';

    /**
     * Plain-language description of the new results that matter. Defaults to `query`.
     * Not allowed with `exact` detection.
     */
    instructions?: string;
  }

  /**
   * Baseline for a `page` target: the page's visible text from the last capture.
   */
  export interface MonitorsPageBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Visible page text from the last capture.
     */
    text: string;
  }

  /**
   * Baseline for a `sitemap` target: the normalized set of URLs from the last
   * capture.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * Normalized sitemap URLs from the last capture, sorted.
     */
    urls: Array<string>;
  }

  /**
   * Baseline for an `extract` target: the tracked pages and the data last extracted
   * from them.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Latest extracted data, matching the target's `schema`. Refreshed at most once a
     * day; `null` before the first capture.
     */
    data: unknown;

    /**
     * Pages the monitor tracks for changes.
     */
    urls_analyzed: Array<string>;
  }

  /**
   * Baseline for a `search` target: the results from the last capture.
   */
  export interface MonitorsSearchBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Search results from the last capture.
     */
    results: Array<MonitorsSearchBaseline.Result>;
  }

  export namespace MonitorsSearchBaseline {
    export interface Result {
      /**
       * Result snippet.
       */
      description: string;

      /**
       * When the result was published. `null` when unknown.
       */
      published_at: string | null;

      /**
       * Title of the result.
       */
      title: string;

      /**
       * URL of the result.
       */
      url: string;
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

  /**
   * Error from the most recent failed run. `null` when the last run succeeded.
   */
  export interface LastError {
    /**
     * Machine-readable error code, such as `fetch_failed`.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
  }

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of `unit` periods between runs. The interval must be between 10 minutes
     * and 1 year, so at least `10` with `minutes` and at most `365` with `days`.
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit for `frequency`.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack webhook URLs get
     * formatted messages.
     */
    url: string;

    /**
     * Events to send. Defaults to `change.detected`. Add `run.completed` to get a
     * delivery after every completed run, including runs with no change.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Automatic retry settings. Pass `{}` for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;

    /**
     * Signing secret for verifying deliveries, generated by Context.dev. Returned only
     * to API keys with full access or the `monitors:write` permission.
     */
    secret?: string;
  }

  /**
   * Details of failing webhook deliveries. `null` when deliveries succeed or no
   * webhook is configured; cleared by the next successful delivery or a new webhook
   * URL.
   */
  export interface WebhookFailure {
    /**
     * Number of failed delivery attempts in a row.
     */
    consecutive_failures: number;

    /**
     * When the most recent delivery failed.
     */
    last_failed_at: string;

    /**
     * Human-readable explanation of the most recent failure.
     */
    last_message: string;

    /**
     * Outcome of the most recent failed delivery: `rejected` (non-2xx response),
     * `failed` (no response), or `skipped_unsafe_url` (the URL isn't a safe public
     * endpoint).
     */
    last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
  }
}

export interface MonitorListResponse {
  /**
   * Monitors on this page.
   */
  data: Array<MonitorListResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

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
  key_metadata?: MonitorListResponse.KeyMetadata;
}

export namespace MonitorListResponse {
  /**
   * A monitor checks a web page, sitemap, site data, or web search on a schedule and
   * records each change it detects. `target` sets what to watch, `change_detection`
   * how changes are judged, and `schedule` how often it runs.
   */
  export interface Data {
    /**
     * Unique ID of the monitor.
     */
    id: string;

    /**
     * How changes are judged. Defaults to `semantic` for extract and search targets
     * and for page targets with `instructions`; otherwise `exact`. Sitemap targets
     * support only `exact`, and extract targets only `semantic`.
     */
    change_detection: Data.MonitorsExactChangeDetection | Data.MonitorsSemanticChangeDetection;

    /**
     * When the monitor was created.
     */
    created_at: string;

    /**
     * Monitor category. Always `web`.
     */
    mode: 'web';

    /**
     * Display name of the monitor.
     */
    name: string;

    /**
     * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
     * interval must be between 10 minutes and 1 year.
     */
    schedule: Data.Schedule;

    /**
     * `active` monitors run on schedule. `failed` monitors keep running after a failed
     * run and return to `active` on the next success. `paused` monitors don't run
     * until you set `status` to `active`; Context.dev also pauses monitors after
     * repeated failures or credit shortfalls.
     */
    status: 'active' | 'paused' | 'failed';

    /**
     * What to watch: a page, a sitemap, data extracted from a site, or web search
     * results.
     */
    target:
      | Data.MonitorsPageTarget
      | Data.MonitorsSitemapTarget
      | Data.MonitorsExtractTarget
      | Data.MonitorsSearchTarget;

    /**
     * When the monitor was last updated.
     */
    updated_at: string;

    /**
     * What the next run compares against. Returned only by
     * `GET /monitors/{monitor_id}`; `null` until the first capture finishes or after
     * the target changes.
     */
    baseline?:
      | Data.MonitorsPageBaseline
      | Data.MonitorsSitemapBaseline
      | Data.MonitorsExtractBaseline
      | Data.MonitorsSearchBaseline
      | null;

    /**
     * When the monitor last detected a change. `null` until it detects one.
     */
    last_change_at?: string | null;

    /**
     * Error from the most recent failed run. `null` when the last run succeeded.
     */
    last_error?: Data.LastError | null;

    /**
     * When the most recent run ended. `null` until the first run ends.
     */
    last_run_at?: string | null;

    /**
     * When the next scheduled run is due. `null` while paused.
     */
    next_run_at?: string | null;

    /**
     * Access policy IDs applied to every run.
     */
    policies?: Array<string>;

    /**
     * Labels for grouping monitors. Filter monitors, changes, and credit usage by tag.
     */
    tags?: Array<string>;

    /**
     * Webhook that receives monitor events. `null` when no webhook is configured.
     */
    webhook?: Data.Webhook | null;

    /**
     * Details of failing webhook deliveries. `null` when deliveries succeed or no
     * webhook is configured; cleared by the next successful delivery or a new webhook
     * URL.
     */
    webhook_failure?: Data.WebhookFailure | null;
  }

  export namespace Data {
    /**
     * Report every change: visible-text diffs for pages, added or removed URLs for
     * sitemaps, and every new result for searches.
     */
    export interface MonitorsExactChangeDetection {
      /**
       * Use `exact` to compare visible text, sitemap URLs, or search results.
       */
      type: 'exact';
    }

    /**
     * Report only changes that matter, judged against the target's `instructions` and,
     * for extract targets, its `schema`.
     */
    export interface MonitorsSemanticChangeDetection {
      /**
       * Use `semantic` to report only changes that match the target's `instructions`.
       */
      type: 'semantic';

      /**
       * Minimum confidence a change needs to be reported. Higher values mean fewer, more
       * certain alerts.
       */
      confidence_threshold?: number;
    }

    /**
     * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
     * interval must be between 10 minutes and 1 year.
     */
    export interface Schedule {
      /**
       * Number of `unit` periods between runs. The interval must be between 10 minutes
       * and 1 year, so at least `10` with `minutes` and at most `365` with `days`.
       */
      frequency: number;

      /**
       * Use `interval` to run on a repeating schedule.
       */
      type: 'interval';

      /**
       * Time unit for `frequency`.
       */
      unit: 'minutes' | 'hours' | 'days';
    }

    /**
     * Watch one web page. `exact` detection reports any change to the visible text;
     * `semantic` detection reports only confirmed changes that match `instructions`.
     */
    export interface MonitorsPageTarget {
      /**
       * Use `page` to watch one web page.
       */
      type: 'page';

      /**
       * Public HTTP(S) URL of the page to watch.
       */
      url: string;

      /**
       * Browser actions to run in order after the page loads and before each capture.
       * Requires a paid plan. Changing it resets the baseline.
       */
      actions?: Array<
        | MonitorsPageTarget.WebScrapeWaitAction
        | MonitorsPageTarget.WebScrapePerformAction
        | MonitorsPageTarget.WebScrapeScrollAction
      > | null;

      /**
       * CSS selectors for regions to ignore, applied after `include_selectors`. Changing
       * it resets the baseline.
       */
      exclude_selectors?: Array<string>;

      /**
       * CSS selectors for the regions to watch. Omit or leave empty to watch the main
       * content. Changing it resets the baseline.
       */
      include_selectors?: Array<string>;

      /**
       * Plain-language description of the changes that matter. Requires `semantic`
       * detection, which is selected when `change_detection` is omitted.
       */
      instructions?: string;

      /**
       * Collapse whitespace before comparing text, so spacing-only edits are not
       * reported.
       */
      normalize_whitespace?: boolean;
    }

    export namespace MonitorsPageTarget {
      /**
       * Pause for a fixed time before the next action.
       */
      export interface WebScrapeWaitAction {
        /**
         * Use `wait` to pause for a fixed duration.
         */
        do: 'wait';

        /**
         * Time to pause in milliseconds before the next action.
         */
        timeMs: number;
      }

      /**
       * Perform one browser instruction written in plain language.
       */
      export interface WebScrapePerformAction {
        /**
         * One browser instruction, such as clicking a button or entering text.
         */
        action: string;

        /**
         * Use `perform` for a plain-language browser instruction.
         */
        do: 'perform';
      }

      /**
       * Scroll the page or a scrollable container. Waits for new content to settle after
       * each scroll.
       */
      export interface WebScrapeScrollAction {
        /**
         * Use `scroll` to move through the page or a container.
         */
        do: 'scroll';

        /**
         * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
         */
        amount?: number | 'viewport' | 'max';

        /**
         * Scroll the first container matching this CSS selector. Omit to scroll the page.
         */
        container?: string;

        /**
         * Direction to scroll.
         */
        direction?: 'up' | 'down' | 'left' | 'right';

        /**
         * Maximum number of scroll steps. Stops early when the page stops changing.
         */
        maxScrolls?: number;
      }
    }

    /**
     * Watch a sitemap and report URLs that are added or removed.
     */
    export interface MonitorsSitemapTarget {
      /**
       * Use `sitemap` to watch a site for added or removed URLs.
       */
      type: 'sitemap';

      /**
       * Public HTTP(S) URL of the sitemap to watch.
       */
      url: string;

      /**
       * Path patterns of URLs to ignore, such as `/legal/*`.
       */
      exclude?: Array<string>;

      /**
       * Path patterns of URLs to track, such as `/blog/*`.
       */
      include?: Array<string>;

      /**
       * Maximum number of URLs to track.
       */
      max_urls?: number;
    }

    /**
     * Extract structured data from the most relevant pages of a site and report
     * meaningful changes. Pages are chosen from `schema` and `instructions`, and the
     * page set is refreshed periodically.
     */
    export interface MonitorsExtractTarget {
      /**
       * Plain-language description of the pages and facts to track and the changes to
       * report.
       */
      instructions: string;

      /**
       * Use `extract` to watch structured data across selected pages.
       */
      type: 'extract';

      /**
       * Public HTTP(S) URL where page discovery starts, usually the site home page.
       */
      url: string;

      /**
       * Also discover pages on subdomains of the site.
       */
      follow_subdomains?: boolean;

      /**
       * Maximum link depth from `url`. `0` tracks only the starting page.
       */
      max_depth?: number;

      /**
       * Maximum number of pages to track.
       */
      max_pages?: number;

      /**
       * JSON Schema for the data to extract, up to 20,000 characters; it also guides
       * which pages are tracked. Defaults to a `summary` string and a `key_points` list.
       */
      schema?: { [key: string]: unknown };
    }

    /**
     * Search the web on every run and report results not seen before, listed in the
     * change's `matched_urls` and `evidence`. `semantic` detection reports only
     * results about a new development that matches `instructions`; `exact` detection
     * reports every new result.
     */
    export interface MonitorsSearchTarget {
      /**
       * Web search query to run on every check. Supports `site:`, `-site:`, and quoted
       * phrases.
       */
      query: string;

      /**
       * Use `search` to watch the web for new results about a topic.
       */
      type: 'search';

      /**
       * Plain-language description of the new results that matter. Defaults to `query`.
       * Not allowed with `exact` detection.
       */
      instructions?: string;
    }

    /**
     * Baseline for a `page` target: the page's visible text from the last capture.
     */
    export interface MonitorsPageBaseline {
      /**
       * When the baseline was last captured or updated.
       */
      captured_at: string;

      /**
       * Visible page text from the last capture.
       */
      text: string;
    }

    /**
     * Baseline for a `sitemap` target: the normalized set of URLs from the last
     * capture.
     */
    export interface MonitorsSitemapBaseline {
      /**
       * When the baseline was last captured or updated.
       */
      captured_at: string;

      /**
       * Number of URLs in the baseline.
       */
      url_count: number;

      /**
       * Normalized sitemap URLs from the last capture, sorted.
       */
      urls: Array<string>;
    }

    /**
     * Baseline for an `extract` target: the tracked pages and the data last extracted
     * from them.
     */
    export interface MonitorsExtractBaseline {
      /**
       * When the baseline was last captured or updated.
       */
      captured_at: string;

      /**
       * Latest extracted data, matching the target's `schema`. Refreshed at most once a
       * day; `null` before the first capture.
       */
      data: unknown;

      /**
       * Pages the monitor tracks for changes.
       */
      urls_analyzed: Array<string>;
    }

    /**
     * Baseline for a `search` target: the results from the last capture.
     */
    export interface MonitorsSearchBaseline {
      /**
       * When the baseline was last captured or updated.
       */
      captured_at: string;

      /**
       * Search results from the last capture.
       */
      results: Array<MonitorsSearchBaseline.Result>;
    }

    export namespace MonitorsSearchBaseline {
      export interface Result {
        /**
         * Result snippet.
         */
        description: string;

        /**
         * When the result was published. `null` when unknown.
         */
        published_at: string | null;

        /**
         * Title of the result.
         */
        title: string;

        /**
         * URL of the result.
         */
        url: string;
      }
    }

    /**
     * Error from the most recent failed run. `null` when the last run succeeded.
     */
    export interface LastError {
      /**
       * Machine-readable error code, such as `fetch_failed`.
       */
      code: string;

      /**
       * Human-readable explanation of the error.
       */
      message: string;
    }

    /**
     * Webhook that receives monitor events. `null` when no webhook is configured.
     */
    export interface Webhook {
      /**
       * Public HTTP(S) URL that receives events. Slack and GovSlack webhook URLs get
       * formatted messages.
       */
      url: string;

      /**
       * Events to send. Defaults to `change.detected`. Add `run.completed` to get a
       * delivery after every completed run, including runs with no change.
       */
      events?: Array<'change.detected' | 'run.completed'>;

      /**
       * Automatic retry settings. Pass `{}` for the default schedule.
       */
      retry?: WebhooksAPI.RetryConfig;

      /**
       * Signing secret for verifying deliveries, generated by Context.dev. Returned only
       * to API keys with full access or the `monitors:write` permission.
       */
      secret?: string;
    }

    /**
     * Details of failing webhook deliveries. `null` when deliveries succeed or no
     * webhook is configured; cleared by the next successful delivery or a new webhook
     * URL.
     */
    export interface WebhookFailure {
      /**
       * Number of failed delivery attempts in a row.
       */
      consecutive_failures: number;

      /**
       * When the most recent delivery failed.
       */
      last_failed_at: string;

      /**
       * Human-readable explanation of the most recent failure.
       */
      last_message: string;

      /**
       * Outcome of the most recent failed delivery: `rejected` (non-2xx response),
       * `failed` (no response), or `skipped_unsafe_url` (the URL isn't a safe public
       * endpoint).
       */
      last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
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

export interface MonitorDeleteResponse {
  /**
   * ID of the deleted monitor.
   */
  id: string;

  /**
   * Whether the monitor was deleted.
   */
  deleted: boolean;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorDeleteResponse.KeyMetadata;
}

export namespace MonitorDeleteResponse {
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

export interface MonitorGetCreditUsageResponse {
  /**
   * Usage per monitor, highest first.
   */
  data: Array<MonitorGetCreditUsageResponse.Data>;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Total credits across the monitors in `data`.
   */
  total_credits: number;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorGetCreditUsageResponse.KeyMetadata;
}

export namespace MonitorGetCreditUsageResponse {
  export interface Data {
    /**
     * Credits charged to the monitor in the window.
     */
    credits: number;

    /**
     * ID of the monitor.
     */
    monitor_id: string;

    /**
     * Name of the monitor, or its ID if the monitor was deleted.
     */
    name: string;

    /**
     * Number of billed runs in the window.
     */
    runs: number;
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

export interface MonitorGetLimitsResponse {
  /**
   * Maximum number of monitors your organization can have, from your plan or a
   * custom limit.
   */
  monitors_limit: number;

  /**
   * Number of monitors your organization has.
   */
  monitors_used: number;

  /**
   * Your plan tier. `free` is Free, `starter` is Developer, `pro` is Pro or Growth,
   * and `scale` is Scale or Enterprise.
   */
  plan: 'free' | 'starter' | 'pro' | 'scale';

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorGetLimitsResponse.KeyMetadata;
}

export namespace MonitorGetLimitsResponse {
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

export interface MonitorListAccountChangesResponse {
  /**
   * Changes on this page.
   */
  data: Array<MonitorListAccountChangesResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

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
  key_metadata?: MonitorListAccountChangesResponse.KeyMetadata;
}

export namespace MonitorListAccountChangesResponse {
  /**
   * A change detected by a monitor run, with a summary and, depending on the target,
   * a text diff, added or removed URLs, matched results, and evidence.
   */
  export interface Data {
    /**
     * Unique ID of the change.
     */
    id: string;

    /**
     * Change detection type the monitor uses.
     */
    change_detection_type: 'exact' | 'semantic';

    /**
     * When the change was detected.
     */
    detected_at: string;

    /**
     * Monitor category. Always `web`.
     */
    mode: 'web';

    /**
     * ID of the monitor that detected the change.
     */
    monitor_id: string;

    /**
     * ID of the run that detected the change.
     */
    run_id: string;

    /**
     * Plain-language summary of what changed.
     */
    summary: string;

    /**
     * Tags the monitor had when the change was detected.
     */
    tags: Array<string>;

    /**
     * Type of target the monitor watches.
     */
    target_type: 'page' | 'sitemap' | 'extract' | 'search';

    /**
     * Short headline for the change.
     */
    title: string;

    /**
     * Monitored URL. For search targets, the first new result.
     */
    url: string;

    /**
     * Total number of URLs added.
     */
    added_url_count?: number;

    /**
     * URLs added to the sitemap, up to 500. `added_url_count` has the full count.
     */
    added_urls?: Array<string>;

    /**
     * Excerpt of the page text after the change. Page targets only.
     */
    after_text_excerpt?: string;

    /**
     * Excerpt of the page text before the change. Page targets only.
     */
    before_text_excerpt?: string;

    /**
     * Confidence that the change matters, from 0 to 1. Set by `semantic` detection
     * only.
     */
    confidence?: number;

    /**
     * Text diff of the change, for page and extract targets. Extract diffs have one
     * section per changed page.
     */
    diff?: string;

    /**
     * Before and after excerpts that support the change.
     */
    evidence?: Array<Data.Evidence>;

    /**
     * How important the change is. Set by `semantic` detection only.
     */
    importance?: 'low' | 'medium' | 'high';

    /**
     * Total number of matched URLs.
     */
    matched_url_count?: number;

    /**
     * URLs where the change was found: the changed pages for page and extract targets,
     * or the new results for search targets. Up to 500; `matched_url_count` has the
     * full count.
     */
    matched_urls?: Array<string>;

    /**
     * Total number of URLs removed.
     */
    removed_url_count?: number;

    /**
     * URLs removed from the sitemap, or pages no longer found for extract targets, up
     * to 500. `removed_url_count` has the full count.
     */
    removed_urls?: Array<string>;
  }

  export namespace Data {
    /**
     * Before and after excerpts that support a change.
     */
    export interface Evidence {
      /**
       * Content after the change.
       */
      after: string;

      /**
       * Content before the change. Empty for new search results.
       */
      before: string;

      /**
       * Page the evidence comes from. Omitted when the evidence covers the whole target.
       */
      url?: string;
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

export interface MonitorListAccountRunsResponse {
  /**
   * Runs on this page.
   */
  data: Array<MonitorListAccountRunsResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

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
  key_metadata?: MonitorListAccountRunsResponse.KeyMetadata;
}

export namespace MonitorListAccountRunsResponse {
  export interface Data {
    /**
     * Unique ID of the run.
     */
    id: string;

    /**
     * `true` when this run captured the monitor's baseline instead of checking for
     * changes.
     */
    baseline_created: boolean;

    /**
     * Whether the run detected a change.
     */
    change_detected: boolean;

    /**
     * Change detection type the monitor uses.
     */
    change_detection_type: 'exact' | 'semantic';

    /**
     * Credits charged for this run. `0` for skipped and failed runs.
     */
    credits_charged: number;

    /**
     * ID of the monitor this run belongs to.
     */
    monitor_id: string;

    /**
     * `baseline` runs capture a fresh baseline after creation or a target or detection
     * change. `scheduled` runs, including on-demand ones, check for changes.
     */
    run_type: 'baseline' | 'scheduled';

    /**
     * Run status. `skipped` runs never executed; `skip_reason` says why.
     */
    status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

    /**
     * Type of target the monitor watches.
     */
    target_type: 'page' | 'sitemap' | 'extract' | 'search';

    /**
     * ID of the change this run detected. `null` when it found none.
     */
    change_id?: string | null;

    /**
     * When the run ended. `null` until it ends.
     */
    completed_at?: string | null;

    error?: Data.Error | null;

    /**
     * Why the run was skipped; `superseded` means a concurrent run took its place or
     * the monitor was deleted. `null` unless `status` is `skipped`.
     */
    skip_reason?: 'insufficient_credits' | 'monitor_paused' | 'superseded' | null;

    /**
     * When the run started. `null` until it starts.
     */
    started_at?: string | null;

    /**
     * Webhook deliveries for this run, one per subscribed event that fired. Omitted
     * when no delivery was attempted.
     */
    webhook_deliveries?: Array<MonitorsAPI.WebhookDelivery>;

    /**
     * @deprecated Deprecated. Use `webhook_deliveries` for all attempts.
     */
    webhook_delivery?: MonitorsAPI.WebhookDelivery;

    /**
     * IDs of the webhook deliveries sent for this run.
     */
    webhook_delivery_ids?: Array<string>;
  }

  export namespace Data {
    export interface Error {
      /**
       * Machine-readable error code, such as `fetch_failed`.
       */
      code: string;

      /**
       * Human-readable explanation of the error.
       */
      message: string;
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

export interface MonitorListChangesResponse {
  /**
   * Changes on this page.
   */
  data: Array<MonitorListChangesResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

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
  key_metadata?: MonitorListChangesResponse.KeyMetadata;
}

export namespace MonitorListChangesResponse {
  /**
   * A change detected by a monitor run, with a summary and, depending on the target,
   * a text diff, added or removed URLs, matched results, and evidence.
   */
  export interface Data {
    /**
     * Unique ID of the change.
     */
    id: string;

    /**
     * Change detection type the monitor uses.
     */
    change_detection_type: 'exact' | 'semantic';

    /**
     * When the change was detected.
     */
    detected_at: string;

    /**
     * Monitor category. Always `web`.
     */
    mode: 'web';

    /**
     * ID of the monitor that detected the change.
     */
    monitor_id: string;

    /**
     * ID of the run that detected the change.
     */
    run_id: string;

    /**
     * Plain-language summary of what changed.
     */
    summary: string;

    /**
     * Tags the monitor had when the change was detected.
     */
    tags: Array<string>;

    /**
     * Type of target the monitor watches.
     */
    target_type: 'page' | 'sitemap' | 'extract' | 'search';

    /**
     * Short headline for the change.
     */
    title: string;

    /**
     * Monitored URL. For search targets, the first new result.
     */
    url: string;

    /**
     * Total number of URLs added.
     */
    added_url_count?: number;

    /**
     * URLs added to the sitemap, up to 500. `added_url_count` has the full count.
     */
    added_urls?: Array<string>;

    /**
     * Excerpt of the page text after the change. Page targets only.
     */
    after_text_excerpt?: string;

    /**
     * Excerpt of the page text before the change. Page targets only.
     */
    before_text_excerpt?: string;

    /**
     * Confidence that the change matters, from 0 to 1. Set by `semantic` detection
     * only.
     */
    confidence?: number;

    /**
     * Text diff of the change, for page and extract targets. Extract diffs have one
     * section per changed page.
     */
    diff?: string;

    /**
     * Before and after excerpts that support the change.
     */
    evidence?: Array<Data.Evidence>;

    /**
     * How important the change is. Set by `semantic` detection only.
     */
    importance?: 'low' | 'medium' | 'high';

    /**
     * Total number of matched URLs.
     */
    matched_url_count?: number;

    /**
     * URLs where the change was found: the changed pages for page and extract targets,
     * or the new results for search targets. Up to 500; `matched_url_count` has the
     * full count.
     */
    matched_urls?: Array<string>;

    /**
     * Total number of URLs removed.
     */
    removed_url_count?: number;

    /**
     * URLs removed from the sitemap, or pages no longer found for extract targets, up
     * to 500. `removed_url_count` has the full count.
     */
    removed_urls?: Array<string>;
  }

  export namespace Data {
    /**
     * Before and after excerpts that support a change.
     */
    export interface Evidence {
      /**
       * Content after the change.
       */
      after: string;

      /**
       * Content before the change. Empty for new search results.
       */
      before: string;

      /**
       * Page the evidence comes from. Omitted when the evidence covers the whole target.
       */
      url?: string;
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

export interface MonitorListRunsResponse {
  /**
   * Runs on this page.
   */
  data: Array<MonitorListRunsResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

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
  key_metadata?: MonitorListRunsResponse.KeyMetadata;
}

export namespace MonitorListRunsResponse {
  export interface Data {
    /**
     * Unique ID of the run.
     */
    id: string;

    /**
     * `true` when this run captured the monitor's baseline instead of checking for
     * changes.
     */
    baseline_created: boolean;

    /**
     * Whether the run detected a change.
     */
    change_detected: boolean;

    /**
     * Change detection type the monitor uses.
     */
    change_detection_type: 'exact' | 'semantic';

    /**
     * Credits charged for this run. `0` for skipped and failed runs.
     */
    credits_charged: number;

    /**
     * ID of the monitor this run belongs to.
     */
    monitor_id: string;

    /**
     * `baseline` runs capture a fresh baseline after creation or a target or detection
     * change. `scheduled` runs, including on-demand ones, check for changes.
     */
    run_type: 'baseline' | 'scheduled';

    /**
     * Run status. `skipped` runs never executed; `skip_reason` says why.
     */
    status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

    /**
     * Type of target the monitor watches.
     */
    target_type: 'page' | 'sitemap' | 'extract' | 'search';

    /**
     * ID of the change this run detected. `null` when it found none.
     */
    change_id?: string | null;

    /**
     * When the run ended. `null` until it ends.
     */
    completed_at?: string | null;

    error?: Data.Error | null;

    /**
     * Why the run was skipped; `superseded` means a concurrent run took its place or
     * the monitor was deleted. `null` unless `status` is `skipped`.
     */
    skip_reason?: 'insufficient_credits' | 'monitor_paused' | 'superseded' | null;

    /**
     * When the run started. `null` until it starts.
     */
    started_at?: string | null;

    /**
     * Webhook deliveries for this run, one per subscribed event that fired. Omitted
     * when no delivery was attempted.
     */
    webhook_deliveries?: Array<MonitorsAPI.WebhookDelivery>;

    /**
     * @deprecated Deprecated. Use `webhook_deliveries` for all attempts.
     */
    webhook_delivery?: MonitorsAPI.WebhookDelivery;

    /**
     * IDs of the webhook deliveries sent for this run.
     */
    webhook_delivery_ids?: Array<string>;
  }

  export namespace Data {
    export interface Error {
      /**
       * Machine-readable error code, such as `fetch_failed`.
       */
      code: string;

      /**
       * Human-readable explanation of the error.
       */
      message: string;
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

export interface MonitorRetrieveChangeResponse {
  /**
   * Unique ID of the change.
   */
  id: string;

  /**
   * Change detection type the monitor uses.
   */
  change_detection_type: 'exact' | 'semantic';

  /**
   * When the change was detected.
   */
  detected_at: string;

  /**
   * Monitor category. Always `web`.
   */
  mode: 'web';

  /**
   * ID of the monitor that detected the change.
   */
  monitor_id: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * ID of the run that detected the change.
   */
  run_id: string;

  /**
   * Plain-language summary of what changed.
   */
  summary: string;

  /**
   * Tags the monitor had when the change was detected.
   */
  tags: Array<string>;

  /**
   * Type of target the monitor watches.
   */
  target_type: 'page' | 'sitemap' | 'extract' | 'search';

  /**
   * Short headline for the change.
   */
  title: string;

  /**
   * Monitored URL. For search targets, the first new result.
   */
  url: string;

  /**
   * Total number of URLs added.
   */
  added_url_count?: number;

  /**
   * URLs added to the sitemap, up to 500. `added_url_count` has the full count.
   */
  added_urls?: Array<string>;

  /**
   * Excerpt of the page text after the change. Page targets only.
   */
  after_text_excerpt?: string;

  /**
   * Excerpt of the page text before the change. Page targets only.
   */
  before_text_excerpt?: string;

  /**
   * Confidence that the change matters, from 0 to 1. Set by `semantic` detection
   * only.
   */
  confidence?: number;

  /**
   * Text diff of the change, for page and extract targets. Extract diffs have one
   * section per changed page.
   */
  diff?: string;

  /**
   * Before and after excerpts that support the change.
   */
  evidence?: Array<MonitorRetrieveChangeResponse.Evidence>;

  /**
   * How important the change is. Set by `semantic` detection only.
   */
  importance?: 'low' | 'medium' | 'high';

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRetrieveChangeResponse.KeyMetadata;

  /**
   * Total number of matched URLs.
   */
  matched_url_count?: number;

  /**
   * URLs where the change was found: the changed pages for page and extract targets,
   * or the new results for search targets. Up to 500; `matched_url_count` has the
   * full count.
   */
  matched_urls?: Array<string>;

  /**
   * Total number of URLs removed.
   */
  removed_url_count?: number;

  /**
   * URLs removed from the sitemap, or pages no longer found for extract targets, up
   * to 500. `removed_url_count` has the full count.
   */
  removed_urls?: Array<string>;
}

export namespace MonitorRetrieveChangeResponse {
  /**
   * Before and after excerpts that support a change.
   */
  export interface Evidence {
    /**
     * Content after the change.
     */
    after: string;

    /**
     * Content before the change. Empty for new search results.
     */
    before: string;

    /**
     * Page the evidence comes from. Omitted when the evidence covers the whole target.
     */
    url?: string;
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

export interface MonitorRetrieveRunResponse {
  /**
   * Unique ID of the run.
   */
  id: string;

  /**
   * `true` when this run captured the monitor's baseline instead of checking for
   * changes.
   */
  baseline_created: boolean;

  /**
   * Whether the run detected a change.
   */
  change_detected: boolean;

  /**
   * Change detection type the monitor uses.
   */
  change_detection_type: 'exact' | 'semantic';

  /**
   * Credits charged for this run. `0` for skipped and failed runs.
   */
  credits_charged: number;

  /**
   * ID of the monitor this run belongs to.
   */
  monitor_id: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * `baseline` runs capture a fresh baseline after creation or a target or detection
   * change. `scheduled` runs, including on-demand ones, check for changes.
   */
  run_type: 'baseline' | 'scheduled';

  /**
   * Run status. `skipped` runs never executed; `skip_reason` says why.
   */
  status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

  /**
   * Type of target the monitor watches.
   */
  target_type: 'page' | 'sitemap' | 'extract' | 'search';

  /**
   * ID of the change this run detected. `null` when it found none.
   */
  change_id?: string | null;

  /**
   * When the run ended. `null` until it ends.
   */
  completed_at?: string | null;

  error?: MonitorRetrieveRunResponse.Error | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRetrieveRunResponse.KeyMetadata;

  /**
   * Why the run was skipped; `superseded` means a concurrent run took its place or
   * the monitor was deleted. `null` unless `status` is `skipped`.
   */
  skip_reason?: 'insufficient_credits' | 'monitor_paused' | 'superseded' | null;

  /**
   * When the run started. `null` until it starts.
   */
  started_at?: string | null;

  /**
   * Webhook deliveries for this run, one per subscribed event that fired. Omitted
   * when no delivery was attempted.
   */
  webhook_deliveries?: Array<WebhookDelivery>;

  /**
   * @deprecated Deprecated. Use `webhook_deliveries` for all attempts.
   */
  webhook_delivery?: WebhookDelivery;

  /**
   * IDs of the webhook deliveries sent for this run.
   */
  webhook_delivery_ids?: Array<string>;
}

export namespace MonitorRetrieveRunResponse {
  export interface Error {
    /**
     * Machine-readable error code, such as `fetch_failed`.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
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

export interface MonitorRotateWebhookSecretResponse {
  /**
   * Unique ID of the monitor.
   */
  id: string;

  /**
   * How changes are judged. Defaults to `semantic` for extract and search targets
   * and for page targets with `instructions`; otherwise `exact`. Sitemap targets
   * support only `exact`, and extract targets only `semantic`.
   */
  change_detection:
    | MonitorRotateWebhookSecretResponse.MonitorsExactChangeDetection
    | MonitorRotateWebhookSecretResponse.MonitorsSemanticChangeDetection;

  /**
   * When the monitor was created.
   */
  created_at: string;

  /**
   * Monitor category. Always `web`.
   */
  mode: 'web';

  /**
   * Display name of the monitor.
   */
  name: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * `active` monitors run on schedule. `failed` monitors keep running after a failed
   * run and return to `active` on the next success. `paused` monitors don't run
   * until you set `status` to `active`; Context.dev also pauses monitors after
   * repeated failures or credit shortfalls.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * What to watch: a page, a sitemap, data extracted from a site, or web search
   * results.
   */
  target:
    | MonitorRotateWebhookSecretResponse.MonitorsPageTarget
    | MonitorRotateWebhookSecretResponse.MonitorsSitemapTarget
    | MonitorRotateWebhookSecretResponse.MonitorsExtractTarget
    | MonitorRotateWebhookSecretResponse.MonitorsSearchTarget;

  /**
   * When the monitor was last updated.
   */
  updated_at: string;

  /**
   * What the next run compares against. Returned only by
   * `GET /monitors/{monitor_id}`; `null` until the first capture finishes or after
   * the target changes.
   */
  baseline?:
    | MonitorRotateWebhookSecretResponse.MonitorsPageBaseline
    | MonitorRotateWebhookSecretResponse.MonitorsSitemapBaseline
    | MonitorRotateWebhookSecretResponse.MonitorsExtractBaseline
    | MonitorRotateWebhookSecretResponse.MonitorsSearchBaseline
    | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRotateWebhookSecretResponse.KeyMetadata;

  /**
   * When the monitor last detected a change. `null` until it detects one.
   */
  last_change_at?: string | null;

  /**
   * Error from the most recent failed run. `null` when the last run succeeded.
   */
  last_error?: MonitorRotateWebhookSecretResponse.LastError | null;

  /**
   * When the most recent run ended. `null` until the first run ends.
   */
  last_run_at?: string | null;

  /**
   * When the next scheduled run is due. `null` while paused.
   */
  next_run_at?: string | null;

  /**
   * Access policy IDs applied to every run.
   */
  policies?: Array<string>;

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  schedule?: MonitorRotateWebhookSecretResponse.Schedule;

  /**
   * Labels for grouping monitors. Filter monitors, changes, and credit usage by tag.
   */
  tags?: Array<string>;

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  webhook?: MonitorRotateWebhookSecretResponse.Webhook | null;

  /**
   * Details of failing webhook deliveries. `null` when deliveries succeed or no
   * webhook is configured; cleared by the next successful delivery or a new webhook
   * URL.
   */
  webhook_failure?: MonitorRotateWebhookSecretResponse.WebhookFailure | null;
}

export namespace MonitorRotateWebhookSecretResponse {
  /**
   * Report every change: visible-text diffs for pages, added or removed URLs for
   * sitemaps, and every new result for searches.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text, sitemap URLs, or search results.
     */
    type: 'exact';
  }

  /**
   * Report only changes that matter, judged against the target's `instructions` and,
   * for extract targets, its `schema`.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to report only changes that match the target's `instructions`.
     */
    type: 'semantic';

    /**
     * Minimum confidence a change needs to be reported. Higher values mean fewer, more
     * certain alerts.
     */
    confidence_threshold?: number;
  }

  /**
   * Watch one web page. `exact` detection reports any change to the visible text;
   * `semantic` detection reports only confirmed changes that match `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) URL of the page to watch.
     */
    url: string;

    /**
     * Browser actions to run in order after the page loads and before each capture.
     * Requires a paid plan. Changing it resets the baseline.
     */
    actions?: Array<
      | MonitorsPageTarget.WebScrapeWaitAction
      | MonitorsPageTarget.WebScrapePerformAction
      | MonitorsPageTarget.WebScrapeScrollAction
    > | null;

    /**
     * CSS selectors for regions to ignore, applied after `include_selectors`. Changing
     * it resets the baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * CSS selectors for the regions to watch. Omit or leave empty to watch the main
     * content. Changing it resets the baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language description of the changes that matter. Requires `semantic`
     * detection, which is selected when `change_detection` is omitted.
     */
    instructions?: string;

    /**
     * Collapse whitespace before comparing text, so spacing-only edits are not
     * reported.
     */
    normalize_whitespace?: boolean;
  }

  export namespace MonitorsPageTarget {
    /**
     * Pause for a fixed time before the next action.
     */
    export interface WebScrapeWaitAction {
      /**
       * Use `wait` to pause for a fixed duration.
       */
      do: 'wait';

      /**
       * Time to pause in milliseconds before the next action.
       */
      timeMs: number;
    }

    /**
     * Perform one browser instruction written in plain language.
     */
    export interface WebScrapePerformAction {
      /**
       * One browser instruction, such as clicking a button or entering text.
       */
      action: string;

      /**
       * Use `perform` for a plain-language browser instruction.
       */
      do: 'perform';
    }

    /**
     * Scroll the page or a scrollable container. Waits for new content to settle after
     * each scroll.
     */
    export interface WebScrapeScrollAction {
      /**
       * Use `scroll` to move through the page or a container.
       */
      do: 'scroll';

      /**
       * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
       */
      amount?: number | 'viewport' | 'max';

      /**
       * Scroll the first container matching this CSS selector. Omit to scroll the page.
       */
      container?: string;

      /**
       * Direction to scroll.
       */
      direction?: 'up' | 'down' | 'left' | 'right';

      /**
       * Maximum number of scroll steps. Stops early when the page stops changing.
       */
      maxScrolls?: number;
    }
  }

  /**
   * Watch a sitemap and report URLs that are added or removed.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Public HTTP(S) URL of the sitemap to watch.
     */
    url: string;

    /**
     * Path patterns of URLs to ignore, such as `/legal/*`.
     */
    exclude?: Array<string>;

    /**
     * Path patterns of URLs to track, such as `/blog/*`.
     */
    include?: Array<string>;

    /**
     * Maximum number of URLs to track.
     */
    max_urls?: number;
  }

  /**
   * Extract structured data from the most relevant pages of a site and report
   * meaningful changes. Pages are chosen from `schema` and `instructions`, and the
   * page set is refreshed periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Plain-language description of the pages and facts to track and the changes to
     * report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Public HTTP(S) URL where page discovery starts, usually the site home page.
     */
    url: string;

    /**
     * Also discover pages on subdomains of the site.
     */
    follow_subdomains?: boolean;

    /**
     * Maximum link depth from `url`. `0` tracks only the starting page.
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for the data to extract, up to 20,000 characters; it also guides
     * which pages are tracked. Defaults to a `summary` string and a `key_points` list.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Search the web on every run and report results not seen before, listed in the
   * change's `matched_urls` and `evidence`. `semantic` detection reports only
   * results about a new development that matches `instructions`; `exact` detection
   * reports every new result.
   */
  export interface MonitorsSearchTarget {
    /**
     * Web search query to run on every check. Supports `site:`, `-site:`, and quoted
     * phrases.
     */
    query: string;

    /**
     * Use `search` to watch the web for new results about a topic.
     */
    type: 'search';

    /**
     * Plain-language description of the new results that matter. Defaults to `query`.
     * Not allowed with `exact` detection.
     */
    instructions?: string;
  }

  /**
   * Baseline for a `page` target: the page's visible text from the last capture.
   */
  export interface MonitorsPageBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Visible page text from the last capture.
     */
    text: string;
  }

  /**
   * Baseline for a `sitemap` target: the normalized set of URLs from the last
   * capture.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * Normalized sitemap URLs from the last capture, sorted.
     */
    urls: Array<string>;
  }

  /**
   * Baseline for an `extract` target: the tracked pages and the data last extracted
   * from them.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Latest extracted data, matching the target's `schema`. Refreshed at most once a
     * day; `null` before the first capture.
     */
    data: unknown;

    /**
     * Pages the monitor tracks for changes.
     */
    urls_analyzed: Array<string>;
  }

  /**
   * Baseline for a `search` target: the results from the last capture.
   */
  export interface MonitorsSearchBaseline {
    /**
     * When the baseline was last captured or updated.
     */
    captured_at: string;

    /**
     * Search results from the last capture.
     */
    results: Array<MonitorsSearchBaseline.Result>;
  }

  export namespace MonitorsSearchBaseline {
    export interface Result {
      /**
       * Result snippet.
       */
      description: string;

      /**
       * When the result was published. `null` when unknown.
       */
      published_at: string | null;

      /**
       * Title of the result.
       */
      title: string;

      /**
       * URL of the result.
       */
      url: string;
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

  /**
   * Error from the most recent failed run. `null` when the last run succeeded.
   */
  export interface LastError {
    /**
     * Machine-readable error code, such as `fetch_failed`.
     */
    code: string;

    /**
     * Human-readable explanation of the error.
     */
    message: string;
  }

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of `unit` periods between runs. The interval must be between 10 minutes
     * and 1 year, so at least `10` with `minutes` and at most `365` with `days`.
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit for `frequency`.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack webhook URLs get
     * formatted messages.
     */
    url: string;

    /**
     * Events to send. Defaults to `change.detected`. Add `run.completed` to get a
     * delivery after every completed run, including runs with no change.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Automatic retry settings. Pass `{}` for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;

    /**
     * Signing secret for verifying deliveries, generated by Context.dev. Returned only
     * to API keys with full access or the `monitors:write` permission.
     */
    secret?: string;
  }

  /**
   * Details of failing webhook deliveries. `null` when deliveries succeed or no
   * webhook is configured; cleared by the next successful delivery or a new webhook
   * URL.
   */
  export interface WebhookFailure {
    /**
     * Number of failed delivery attempts in a row.
     */
    consecutive_failures: number;

    /**
     * When the most recent delivery failed.
     */
    last_failed_at: string;

    /**
     * Human-readable explanation of the most recent failure.
     */
    last_message: string;

    /**
     * Outcome of the most recent failed delivery: `rejected` (non-2xx response),
     * `failed` (no response), or `skipped_unsafe_url` (the URL isn't a safe public
     * endpoint).
     */
    last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
  }
}

export interface MonitorRunResponse {
  /**
   * ID of the monitor.
   */
  monitor_id: string;

  /**
   * Whether the run was queued.
   */
  queued: boolean;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * ID of the queued run. Poll it with `GET /monitors/{monitor_id}/runs/{run_id}`.
   */
  run_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRunResponse.KeyMetadata;
}

export namespace MonitorRunResponse {
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

export interface MonitorCreateParams {
  /**
   * Display name for the monitor.
   */
  name: string;

  /**
   * What to watch: a page, a sitemap, data extracted from a site, or web search
   * results.
   */
  target:
    | MonitorCreateParams.MonitorsPageTarget
    | MonitorCreateParams.MonitorsSitemapTarget
    | MonitorCreateParams.MonitorsExtractTarget
    | MonitorCreateParams.MonitorsSearchTarget;

  /**
   * How changes are judged. Defaults to `semantic` for extract and search targets
   * and for page targets with `instructions`; otherwise `exact`. Sitemap targets
   * support only `exact`, and extract targets only `semantic`.
   */
  change_detection?:
    | MonitorCreateParams.MonitorsExactChangeDetection
    | MonitorCreateParams.MonitorsSemanticChangeDetection;

  /**
   * Monitor category. Always `web`.
   */
  mode?: 'web';

  /**
   * Access policy IDs to apply to every run. Requires access policies enabled for
   * your organization; otherwise returns `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  schedule?: MonitorCreateParams.Schedule;

  /**
   * Labels for grouping monitors. Filter monitors, changes, and credit usage by tag.
   */
  tags?: Array<string>;

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  webhook?: MonitorCreateParams.Webhook | null;
}

export namespace MonitorCreateParams {
  /**
   * Watch one web page. `exact` detection reports any change to the visible text;
   * `semantic` detection reports only confirmed changes that match `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) URL of the page to watch.
     */
    url: string;

    /**
     * Browser actions to run in order after the page loads and before each capture.
     * Requires a paid plan. Changing it resets the baseline.
     */
    actions?: Array<
      | MonitorsPageTarget.WebScrapeWaitAction
      | MonitorsPageTarget.WebScrapePerformAction
      | MonitorsPageTarget.WebScrapeScrollAction
    > | null;

    /**
     * CSS selectors for regions to ignore, applied after `include_selectors`. Changing
     * it resets the baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * CSS selectors for the regions to watch. Omit or leave empty to watch the main
     * content. Changing it resets the baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language description of the changes that matter. Requires `semantic`
     * detection, which is selected when `change_detection` is omitted.
     */
    instructions?: string;

    /**
     * Collapse whitespace before comparing text, so spacing-only edits are not
     * reported.
     */
    normalize_whitespace?: boolean;
  }

  export namespace MonitorsPageTarget {
    /**
     * Pause for a fixed time before the next action.
     */
    export interface WebScrapeWaitAction {
      /**
       * Use `wait` to pause for a fixed duration.
       */
      do: 'wait';

      /**
       * Time to pause in milliseconds before the next action.
       */
      timeMs: number;
    }

    /**
     * Perform one browser instruction written in plain language.
     */
    export interface WebScrapePerformAction {
      /**
       * One browser instruction, such as clicking a button or entering text.
       */
      action: string;

      /**
       * Use `perform` for a plain-language browser instruction.
       */
      do: 'perform';
    }

    /**
     * Scroll the page or a scrollable container. Waits for new content to settle after
     * each scroll.
     */
    export interface WebScrapeScrollAction {
      /**
       * Use `scroll` to move through the page or a container.
       */
      do: 'scroll';

      /**
       * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
       */
      amount?: number | 'viewport' | 'max';

      /**
       * Scroll the first container matching this CSS selector. Omit to scroll the page.
       */
      container?: string;

      /**
       * Direction to scroll.
       */
      direction?: 'up' | 'down' | 'left' | 'right';

      /**
       * Maximum number of scroll steps. Stops early when the page stops changing.
       */
      maxScrolls?: number;
    }
  }

  /**
   * Watch a sitemap and report URLs that are added or removed.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Public HTTP(S) URL of the sitemap to watch.
     */
    url: string;

    /**
     * Path patterns of URLs to ignore, such as `/legal/*`.
     */
    exclude?: Array<string>;

    /**
     * Path patterns of URLs to track, such as `/blog/*`.
     */
    include?: Array<string>;

    /**
     * Maximum number of URLs to track.
     */
    max_urls?: number;
  }

  /**
   * Extract structured data from the most relevant pages of a site and report
   * meaningful changes. Pages are chosen from `schema` and `instructions`, and the
   * page set is refreshed periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Plain-language description of the pages and facts to track and the changes to
     * report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Public HTTP(S) URL where page discovery starts, usually the site home page.
     */
    url: string;

    /**
     * Also discover pages on subdomains of the site.
     */
    follow_subdomains?: boolean;

    /**
     * Maximum link depth from `url`. `0` tracks only the starting page.
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for the data to extract, up to 20,000 characters; it also guides
     * which pages are tracked. Defaults to a `summary` string and a `key_points` list.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Search the web on every run and report results not seen before, listed in the
   * change's `matched_urls` and `evidence`. `semantic` detection reports only
   * results about a new development that matches `instructions`; `exact` detection
   * reports every new result.
   */
  export interface MonitorsSearchTarget {
    /**
     * Web search query to run on every check. Supports `site:`, `-site:`, and quoted
     * phrases.
     */
    query: string;

    /**
     * Use `search` to watch the web for new results about a topic.
     */
    type: 'search';

    /**
     * Plain-language description of the new results that matter. Defaults to `query`.
     * Not allowed with `exact` detection.
     */
    instructions?: string;
  }

  /**
   * Report every change: visible-text diffs for pages, added or removed URLs for
   * sitemaps, and every new result for searches.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text, sitemap URLs, or search results.
     */
    type: 'exact';
  }

  /**
   * Report only changes that matter, judged against the target's `instructions` and,
   * for extract targets, its `schema`.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to report only changes that match the target's `instructions`.
     */
    type: 'semantic';

    /**
     * Minimum confidence a change needs to be reported. Higher values mean fewer, more
     * certain alerts.
     */
    confidence_threshold?: number;
  }

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of `unit` periods between runs. The interval must be between 10 minutes
     * and 1 year, so at least `10` with `minutes` and at most `365` with `days`.
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit for `frequency`.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook that receives monitor events. `null` when no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack webhook URLs get
     * formatted messages.
     */
    url: string;

    /**
     * Events to send. Defaults to `change.detected`. Add `run.completed` to get a
     * delivery after every completed run, including runs with no change.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Automatic retry settings. Pass `{}` for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;
  }
}

export interface MonitorUpdateParams {
  /**
   * How changes are judged. Defaults to `semantic` for extract and search targets
   * and for page targets with `instructions`; otherwise `exact`. Sitemap targets
   * support only `exact`, and extract targets only `semantic`.
   */
  change_detection?:
    | MonitorUpdateParams.MonitorsExactChangeDetection
    | MonitorUpdateParams.MonitorsSemanticChangeDetection;

  /**
   * Display name for the monitor.
   */
  name?: string;

  /**
   * Access policy IDs to apply to every run, or an empty list to remove them.
   * Requires access policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  schedule?: MonitorUpdateParams.Schedule;

  /**
   * Set `paused` to stop scheduled runs or `active` to resume them. A resumed
   * monitor runs promptly instead of waiting a full interval.
   */
  status?: 'active' | 'paused';

  /**
   * Labels for grouping monitors. Filter monitors, changes, and credit usage by tag.
   */
  tags?: Array<string>;

  /**
   * What to watch: a page, a sitemap, data extracted from a site, or web search
   * results.
   */
  target?:
    | MonitorUpdateParams.MonitorsPageTarget
    | MonitorUpdateParams.MonitorsSitemapTarget
    | MonitorUpdateParams.MonitorsExtractTarget
    | MonitorUpdateParams.MonitorsSearchTarget;

  /**
   * Set to `null` to remove the webhook. Changing `url` generates a new secret.
   */
  webhook?: MonitorUpdateParams.Webhook | null;
}

export namespace MonitorUpdateParams {
  /**
   * Report every change: visible-text diffs for pages, added or removed URLs for
   * sitemaps, and every new result for searches.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text, sitemap URLs, or search results.
     */
    type: 'exact';
  }

  /**
   * Report only changes that matter, judged against the target's `instructions` and,
   * for extract targets, its `schema`.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to report only changes that match the target's `instructions`.
     */
    type: 'semantic';

    /**
     * Minimum confidence a change needs to be reported. Higher values mean fewer, more
     * certain alerts.
     */
    confidence_threshold?: number;
  }

  /**
   * Run the monitor at a fixed interval, such as every 6 hours or every 2 days. The
   * interval must be between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of `unit` periods between runs. The interval must be between 10 minutes
     * and 1 year, so at least `10` with `minutes` and at most `365` with `days`.
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit for `frequency`.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Watch one web page. `exact` detection reports any change to the visible text;
   * `semantic` detection reports only confirmed changes that match `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) URL of the page to watch.
     */
    url: string;

    /**
     * Browser actions to run in order after the page loads and before each capture.
     * Requires a paid plan. Changing it resets the baseline.
     */
    actions?: Array<
      | MonitorsPageTarget.WebScrapeWaitAction
      | MonitorsPageTarget.WebScrapePerformAction
      | MonitorsPageTarget.WebScrapeScrollAction
    > | null;

    /**
     * CSS selectors for regions to ignore, applied after `include_selectors`. Changing
     * it resets the baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * CSS selectors for the regions to watch. Omit or leave empty to watch the main
     * content. Changing it resets the baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language description of the changes that matter. Requires `semantic`
     * detection, which is selected when `change_detection` is omitted.
     */
    instructions?: string;

    /**
     * Collapse whitespace before comparing text, so spacing-only edits are not
     * reported.
     */
    normalize_whitespace?: boolean;
  }

  export namespace MonitorsPageTarget {
    /**
     * Pause for a fixed time before the next action.
     */
    export interface WebScrapeWaitAction {
      /**
       * Use `wait` to pause for a fixed duration.
       */
      do: 'wait';

      /**
       * Time to pause in milliseconds before the next action.
       */
      timeMs: number;
    }

    /**
     * Perform one browser instruction written in plain language.
     */
    export interface WebScrapePerformAction {
      /**
       * One browser instruction, such as clicking a button or entering text.
       */
      action: string;

      /**
       * Use `perform` for a plain-language browser instruction.
       */
      do: 'perform';
    }

    /**
     * Scroll the page or a scrollable container. Waits for new content to settle after
     * each scroll.
     */
    export interface WebScrapeScrollAction {
      /**
       * Use `scroll` to move through the page or a container.
       */
      do: 'scroll';

      /**
       * Distance per scroll: pixels, one `viewport`, or `max` to reach the end.
       */
      amount?: number | 'viewport' | 'max';

      /**
       * Scroll the first container matching this CSS selector. Omit to scroll the page.
       */
      container?: string;

      /**
       * Direction to scroll.
       */
      direction?: 'up' | 'down' | 'left' | 'right';

      /**
       * Maximum number of scroll steps. Stops early when the page stops changing.
       */
      maxScrolls?: number;
    }
  }

  /**
   * Watch a sitemap and report URLs that are added or removed.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Public HTTP(S) URL of the sitemap to watch.
     */
    url: string;

    /**
     * Path patterns of URLs to ignore, such as `/legal/*`.
     */
    exclude?: Array<string>;

    /**
     * Path patterns of URLs to track, such as `/blog/*`.
     */
    include?: Array<string>;

    /**
     * Maximum number of URLs to track.
     */
    max_urls?: number;
  }

  /**
   * Extract structured data from the most relevant pages of a site and report
   * meaningful changes. Pages are chosen from `schema` and `instructions`, and the
   * page set is refreshed periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Plain-language description of the pages and facts to track and the changes to
     * report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Public HTTP(S) URL where page discovery starts, usually the site home page.
     */
    url: string;

    /**
     * Also discover pages on subdomains of the site.
     */
    follow_subdomains?: boolean;

    /**
     * Maximum link depth from `url`. `0` tracks only the starting page.
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for the data to extract, up to 20,000 characters; it also guides
     * which pages are tracked. Defaults to a `summary` string and a `key_points` list.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Search the web on every run and report results not seen before, listed in the
   * change's `matched_urls` and `evidence`. `semantic` detection reports only
   * results about a new development that matches `instructions`; `exact` detection
   * reports every new result.
   */
  export interface MonitorsSearchTarget {
    /**
     * Web search query to run on every check. Supports `site:`, `-site:`, and quoted
     * phrases.
     */
    query: string;

    /**
     * Use `search` to watch the web for new results about a topic.
     */
    type: 'search';

    /**
     * Plain-language description of the new results that matter. Defaults to `query`.
     * Not allowed with `exact` detection.
     */
    instructions?: string;
  }

  /**
   * Set to `null` to remove the webhook. Changing `url` generates a new secret.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack webhook URLs get
     * formatted messages.
     */
    url: string;

    /**
     * Events to send. Defaults to `change.detected`. Add `run.completed` to get a
     * delivery after every completed run, including runs with no change.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Automatic retry settings. Pass `{}` for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;
  }
}

export interface MonitorListParams {
  /**
   * Filter by change detection type.
   */
  change_detection_type?: 'exact' | 'semantic';

  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of monitors to return per page. Defaults to 25.
   */
  limit?: number;

  /**
   * Text to search for in the fields listed in `search_by`.
   */
  q?: string;

  /**
   * Comma-separated fields to search with `q`. Defaults to all fields. For search
   * targets, `url` matches the target's `query`.
   */
  search_by?: Array<'name' | 'url' | 'instructions' | 'tags'> | null;

  /**
   * How `q` matches. `prefix` matches the start of words and tolerates one typo, for
   * search as you type; `exact` matches whole words only. Defaults to `prefix`.
   */
  search_type?: 'exact' | 'prefix';

  /**
   * Filter by monitor status.
   */
  status?: 'active' | 'paused' | 'failed';

  /**
   * Comma-separated tags. Returns monitors that have any of them.
   */
  tags?: Array<string> | null;

  /**
   * Filter by target type.
   */
  target_type?: 'page' | 'sitemap' | 'extract' | 'search';
}

export interface MonitorGetCreditUsageParams {
  /**
   * Count only runs created at or after this time.
   */
  since?: string;

  /**
   * Return usage only for monitors that currently have this tag. Deleted monitors
   * are excluded.
   */
  tag?: string;

  /**
   * Count only runs created at or before this time.
   */
  until?: string;
}

export interface MonitorListAccountChangesParams {
  /**
   * Filter by change detection type.
   */
  change_detection_type?: 'exact' | 'semantic';

  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of changes to return per page. Defaults to 25.
   */
  limit?: number;

  /**
   * Return only changes from this monitor.
   */
  monitor_id?: string;

  /**
   * Return only changes detected at or after this time.
   */
  since?: string;

  /**
   * Return only changes that have this tag.
   */
  tag?: string;

  /**
   * Filter by target type.
   */
  target_type?: 'page' | 'sitemap' | 'extract' | 'search';

  /**
   * Return only changes detected at or before this time.
   */
  until?: string;
}

export interface MonitorListAccountRunsParams {
  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of runs to return per page. Defaults to 25.
   */
  limit?: number;

  /**
   * Filter by run status.
   */
  status?: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';
}

export interface MonitorListChangesParams {
  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of changes to return per page. Defaults to 25.
   */
  limit?: number;

  /**
   * Return only changes detected at or after this time.
   */
  since?: string;

  /**
   * Return only changes that have this tag.
   */
  tag?: string;

  /**
   * Return only changes detected at or before this time.
   */
  until?: string;
}

export interface MonitorListRunsParams {
  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of runs to return per page. Defaults to 25.
   */
  limit?: number;

  /**
   * Filter by run status.
   */
  status?: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';
}

export interface MonitorRetrieveRunParams {
  /**
   * ID of the monitor.
   */
  monitor_id: string;
}

export declare namespace Monitors {
  export {
    type WebhookDelivery as WebhookDelivery,
    type MonitorCreateResponse as MonitorCreateResponse,
    type MonitorRetrieveResponse as MonitorRetrieveResponse,
    type MonitorUpdateResponse as MonitorUpdateResponse,
    type MonitorListResponse as MonitorListResponse,
    type MonitorDeleteResponse as MonitorDeleteResponse,
    type MonitorGetCreditUsageResponse as MonitorGetCreditUsageResponse,
    type MonitorGetLimitsResponse as MonitorGetLimitsResponse,
    type MonitorListAccountChangesResponse as MonitorListAccountChangesResponse,
    type MonitorListAccountRunsResponse as MonitorListAccountRunsResponse,
    type MonitorListChangesResponse as MonitorListChangesResponse,
    type MonitorListRunsResponse as MonitorListRunsResponse,
    type MonitorRetrieveChangeResponse as MonitorRetrieveChangeResponse,
    type MonitorRetrieveRunResponse as MonitorRetrieveRunResponse,
    type MonitorRotateWebhookSecretResponse as MonitorRotateWebhookSecretResponse,
    type MonitorRunResponse as MonitorRunResponse,
    type MonitorCreateParams as MonitorCreateParams,
    type MonitorUpdateParams as MonitorUpdateParams,
    type MonitorListParams as MonitorListParams,
    type MonitorGetCreditUsageParams as MonitorGetCreditUsageParams,
    type MonitorListAccountChangesParams as MonitorListAccountChangesParams,
    type MonitorListAccountRunsParams as MonitorListAccountRunsParams,
    type MonitorListChangesParams as MonitorListChangesParams,
    type MonitorListRunsParams as MonitorListRunsParams,
    type MonitorRetrieveRunParams as MonitorRetrieveRunParams,
  };
}
