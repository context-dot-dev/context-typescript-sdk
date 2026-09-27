// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MonitorsAPI from './monitors';
import * as WebhooksAPI from './webhooks/webhooks';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Watch websites for exact or meaningful changes.
 */
export class Monitors extends APIResource {
  /**
   * Watch a page, URL inventory, or extracted website data on a schedule. A run
   * starts immediately to capture the baseline.
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
   * Retrieve a monitor’s configuration and current state.
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
   * Update a monitor. Changing its target or change detection replaces the baseline
   * and queues a new baseline run.
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
   * List your monitors with optional search and filters.
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
   * Delete a monitor and stop future runs and webhook retries.
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
   * Return usage per monitor, highest first, for up to the 10,000 most recent runs
   * in the requested window.
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
   * Retrieve your organization’s monitor allowance and usage.
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
   * List full change records across your monitors, newest first.
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
   * List runs across your monitors, newest first.
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
   * List full change records for a monitor, newest first.
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
   * List a monitor’s runs, newest first.
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
   * Retrieve a detected change, including its diff and available evidence.
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
   * Retrieve the status, timing, and results of one monitor run.
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
   * Generate and return a new signing secret. It takes effect immediately for all
   * subsequent delivery attempts.
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
   * Queue a run without changing the regular schedule. Paused monitors return 409.
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
  attempted_at: string;

  error: WebhookDelivery.Error | null;

  /**
   * The event this delivery carried. Deliveries recorded before event selection
   * existed report change.detected.
   */
  event: 'change.detected' | 'run.completed';

  /**
   * Identifier sent in the X-Context-Id header.
   */
  event_id: string;

  /**
   * The endpoint's final HTTP response status, or null when no response was
   * received.
   */
  http_status: number | null;

  /**
   * Outcome of the delivery attempt. Any 2xx response counts as delivered.
   */
  status: 'delivered' | 'rejected' | 'failed' | 'skipped_unsafe_url';

  /**
   * Delivery ID for status checks and retries, when available.
   */
  delivery_id?: string;
}

export namespace WebhookDelivery {
  export interface Error {
    code: string;

    message: string;
  }
}

export interface MonitorCreateResponse {
  id: string;

  /**
   * How changes are judged. Defaults to `semantic` for extract targets and page
   * targets with `instructions`, otherwise `exact`.
   */
  change_detection:
    | MonitorCreateResponse.MonitorsExactChangeDetection
    | MonitorCreateResponse.MonitorsSemanticChangeDetection;

  created_at: string;

  /**
   * ID of the baseline run queued at creation; null if it will start on the next
   * scheduled tick.
   */
  initial_run_id: string | null;

  /**
   * Always `web`. Optional.
   */
  mode: 'web';

  name: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Current state. Failed monitors keep running; paused monitors must be resumed
   * with `status: "active"`.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * What to watch: a page, a sitemap, or data extracted from a site.
   */
  target:
    | MonitorCreateResponse.MonitorsPageTarget
    | MonitorCreateResponse.MonitorsSitemapTarget
    | MonitorCreateResponse.MonitorsExtractTarget;

  updated_at: string;

  /**
   * Comparison baseline, included on Retrieve. Null until capture completes or after
   * target changes.
   */
  baseline?:
    | MonitorCreateResponse.MonitorsPageBaseline
    | MonitorCreateResponse.MonitorsSitemapBaseline
    | MonitorCreateResponse.MonitorsExtractBaseline
    | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorCreateResponse.KeyMetadata;

  last_change_at?: string | null;

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  last_error?: MonitorCreateResponse.LastError | null;

  last_run_at?: string | null;

  /**
   * When the next scheduled run is due; null while paused.
   */
  next_run_at?: string | null;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule?: MonitorCreateResponse.Schedule;

  /**
   * Labels for filtering monitors, their changes, and their usage.
   */
  tags?: Array<string>;

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  webhook?: MonitorCreateResponse.Webhook | null;

  /**
   * Present while webhook deliveries are failing consecutively; null when deliveries
   * are healthy or no webhook is configured. Cleared on the next successful delivery
   * and when the webhook URL changes.
   */
  webhook_failure?: MonitorCreateResponse.WebhookFailure | null;
}

export namespace MonitorCreateResponse {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text or sitemap URLs.
     */
    type: 'exact';
  }

  /**
   * Detect meaningful content changes using the target’s instructions and optional
   * schema.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to judge changes against the target instructions.
     */
    type: 'semantic';

    /**
     * Minimum confidence required to report a meaningful change, from 0 to 1.
     */
    confidence_threshold?: number;
  }

  /**
   * Watch a single web page. Exact detection reports visible-text diffs; semantic
   * detection judges confirmed stable diffs against `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) page URL to monitor.
     */
    url: string;

    /**
     * Remove matching regions after inclusions. Changes create a new baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * Monitor these CSS-selected regions. Empty or omitted uses main content. Changes
     * create a new baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language goal describing which page changes matter. When provided without
     * change_detection, semantic detection is inferred.
     */
    instructions?: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a site’s URL inventory for confirmed additions and removals.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude (max 50).
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include (max 50).
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Track relevant pages selected by `schema` and `instructions`; refresh the page
   * set periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    /**
     * Allow page discovery on subdomains of the target site.
     */
    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for page selection and the baseline snapshot. Changes return diffs
     * and evidence.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Current baseline of a `page` monitor: the visible page text as last observed.
   */
  export interface MonitorsPageBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The page's visible text as last observed.
     */
    text: string;
  }

  /**
   * Current baseline of a `sitemap` monitor: the normalized URL set as last
   * observed.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * The sitemap URLs as last observed (sorted, normalized).
     */
    urls: Array<string>;
  }

  /**
   * Current baseline of an `extract` monitor: the pages it tracks and the structured
   * data as last extracted.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Latest structured snapshot matching the extraction schema, refreshed at most
     * daily; `null` before capture.
     */
    data: unknown;

    /**
     * The page URLs the monitor tracks and analyzes for changes.
     */
    urls_analyzed: Array<string>;
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

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  export interface LastError {
    code: string;

    message: string;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit used with `frequency` to set the run interval.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack URLs get formatted
     * messages.
     */
    url: string;

    /**
     * Events to deliver. Defaults to `change.detected`; `run.completed` also includes
     * unchanged runs.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Webhook retry settings. Use {} for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;

    /**
     * API-generated signing secret. Visible only with full access or `monitors:write`
     * permission.
     */
    secret?: string;
  }

  /**
   * Present while webhook deliveries are failing consecutively; null when deliveries
   * are healthy or no webhook is configured. Cleared on the next successful delivery
   * and when the webhook URL changes.
   */
  export interface WebhookFailure {
    /**
     * Number of consecutive delivery attempts that did not succeed.
     */
    consecutive_failures: number;

    last_failed_at: string;

    /**
     * Human-readable description of the most recent failure.
     */
    last_message: string;

    /**
     * Outcome of the most recent failed delivery. rejected means a non-2xx response;
     * failed means no HTTP response was received; skipped_unsafe_url means the URL
     * failed the public-endpoint safety check.
     */
    last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
  }
}

export interface MonitorRetrieveResponse {
  id: string;

  /**
   * How changes are judged. Defaults to `semantic` for extract targets and page
   * targets with `instructions`, otherwise `exact`.
   */
  change_detection:
    | MonitorRetrieveResponse.MonitorsExactChangeDetection
    | MonitorRetrieveResponse.MonitorsSemanticChangeDetection;

  created_at: string;

  /**
   * Always `web`. Optional.
   */
  mode: 'web';

  name: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Current state. Failed monitors keep running; paused monitors must be resumed
   * with `status: "active"`.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * What to watch: a page, a sitemap, or data extracted from a site.
   */
  target:
    | MonitorRetrieveResponse.MonitorsPageTarget
    | MonitorRetrieveResponse.MonitorsSitemapTarget
    | MonitorRetrieveResponse.MonitorsExtractTarget;

  updated_at: string;

  /**
   * Comparison baseline, included on Retrieve. Null until capture completes or after
   * target changes.
   */
  baseline?:
    | MonitorRetrieveResponse.MonitorsPageBaseline
    | MonitorRetrieveResponse.MonitorsSitemapBaseline
    | MonitorRetrieveResponse.MonitorsExtractBaseline
    | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRetrieveResponse.KeyMetadata;

  last_change_at?: string | null;

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  last_error?: MonitorRetrieveResponse.LastError | null;

  last_run_at?: string | null;

  /**
   * When the next scheduled run is due; null while paused.
   */
  next_run_at?: string | null;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule?: MonitorRetrieveResponse.Schedule;

  /**
   * Labels for filtering monitors, their changes, and their usage.
   */
  tags?: Array<string>;

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  webhook?: MonitorRetrieveResponse.Webhook | null;

  /**
   * Present while webhook deliveries are failing consecutively; null when deliveries
   * are healthy or no webhook is configured. Cleared on the next successful delivery
   * and when the webhook URL changes.
   */
  webhook_failure?: MonitorRetrieveResponse.WebhookFailure | null;
}

export namespace MonitorRetrieveResponse {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text or sitemap URLs.
     */
    type: 'exact';
  }

  /**
   * Detect meaningful content changes using the target’s instructions and optional
   * schema.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to judge changes against the target instructions.
     */
    type: 'semantic';

    /**
     * Minimum confidence required to report a meaningful change, from 0 to 1.
     */
    confidence_threshold?: number;
  }

  /**
   * Watch a single web page. Exact detection reports visible-text diffs; semantic
   * detection judges confirmed stable diffs against `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) page URL to monitor.
     */
    url: string;

    /**
     * Remove matching regions after inclusions. Changes create a new baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * Monitor these CSS-selected regions. Empty or omitted uses main content. Changes
     * create a new baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language goal describing which page changes matter. When provided without
     * change_detection, semantic detection is inferred.
     */
    instructions?: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a site’s URL inventory for confirmed additions and removals.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude (max 50).
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include (max 50).
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Track relevant pages selected by `schema` and `instructions`; refresh the page
   * set periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    /**
     * Allow page discovery on subdomains of the target site.
     */
    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for page selection and the baseline snapshot. Changes return diffs
     * and evidence.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Current baseline of a `page` monitor: the visible page text as last observed.
   */
  export interface MonitorsPageBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The page's visible text as last observed.
     */
    text: string;
  }

  /**
   * Current baseline of a `sitemap` monitor: the normalized URL set as last
   * observed.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * The sitemap URLs as last observed (sorted, normalized).
     */
    urls: Array<string>;
  }

  /**
   * Current baseline of an `extract` monitor: the pages it tracks and the structured
   * data as last extracted.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Latest structured snapshot matching the extraction schema, refreshed at most
     * daily; `null` before capture.
     */
    data: unknown;

    /**
     * The page URLs the monitor tracks and analyzes for changes.
     */
    urls_analyzed: Array<string>;
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

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  export interface LastError {
    code: string;

    message: string;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit used with `frequency` to set the run interval.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack URLs get formatted
     * messages.
     */
    url: string;

    /**
     * Events to deliver. Defaults to `change.detected`; `run.completed` also includes
     * unchanged runs.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Webhook retry settings. Use {} for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;

    /**
     * API-generated signing secret. Visible only with full access or `monitors:write`
     * permission.
     */
    secret?: string;
  }

  /**
   * Present while webhook deliveries are failing consecutively; null when deliveries
   * are healthy or no webhook is configured. Cleared on the next successful delivery
   * and when the webhook URL changes.
   */
  export interface WebhookFailure {
    /**
     * Number of consecutive delivery attempts that did not succeed.
     */
    consecutive_failures: number;

    last_failed_at: string;

    /**
     * Human-readable description of the most recent failure.
     */
    last_message: string;

    /**
     * Outcome of the most recent failed delivery. rejected means a non-2xx response;
     * failed means no HTTP response was received; skipped_unsafe_url means the URL
     * failed the public-endpoint safety check.
     */
    last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
  }
}

export interface MonitorUpdateResponse {
  id: string;

  /**
   * How changes are judged. Defaults to `semantic` for extract targets and page
   * targets with `instructions`, otherwise `exact`.
   */
  change_detection:
    | MonitorUpdateResponse.MonitorsExactChangeDetection
    | MonitorUpdateResponse.MonitorsSemanticChangeDetection;

  created_at: string;

  /**
   * Always `web`. Optional.
   */
  mode: 'web';

  name: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Current state. Failed monitors keep running; paused monitors must be resumed
   * with `status: "active"`.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * What to watch: a page, a sitemap, or data extracted from a site.
   */
  target:
    | MonitorUpdateResponse.MonitorsPageTarget
    | MonitorUpdateResponse.MonitorsSitemapTarget
    | MonitorUpdateResponse.MonitorsExtractTarget;

  updated_at: string;

  /**
   * Comparison baseline, included on Retrieve. Null until capture completes or after
   * target changes.
   */
  baseline?:
    | MonitorUpdateResponse.MonitorsPageBaseline
    | MonitorUpdateResponse.MonitorsSitemapBaseline
    | MonitorUpdateResponse.MonitorsExtractBaseline
    | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorUpdateResponse.KeyMetadata;

  last_change_at?: string | null;

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  last_error?: MonitorUpdateResponse.LastError | null;

  last_run_at?: string | null;

  /**
   * When the next scheduled run is due; null while paused.
   */
  next_run_at?: string | null;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule?: MonitorUpdateResponse.Schedule;

  /**
   * Labels for filtering monitors, their changes, and their usage.
   */
  tags?: Array<string>;

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  webhook?: MonitorUpdateResponse.Webhook | null;

  /**
   * Present while webhook deliveries are failing consecutively; null when deliveries
   * are healthy or no webhook is configured. Cleared on the next successful delivery
   * and when the webhook URL changes.
   */
  webhook_failure?: MonitorUpdateResponse.WebhookFailure | null;
}

export namespace MonitorUpdateResponse {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text or sitemap URLs.
     */
    type: 'exact';
  }

  /**
   * Detect meaningful content changes using the target’s instructions and optional
   * schema.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to judge changes against the target instructions.
     */
    type: 'semantic';

    /**
     * Minimum confidence required to report a meaningful change, from 0 to 1.
     */
    confidence_threshold?: number;
  }

  /**
   * Watch a single web page. Exact detection reports visible-text diffs; semantic
   * detection judges confirmed stable diffs against `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) page URL to monitor.
     */
    url: string;

    /**
     * Remove matching regions after inclusions. Changes create a new baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * Monitor these CSS-selected regions. Empty or omitted uses main content. Changes
     * create a new baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language goal describing which page changes matter. When provided without
     * change_detection, semantic detection is inferred.
     */
    instructions?: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a site’s URL inventory for confirmed additions and removals.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude (max 50).
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include (max 50).
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Track relevant pages selected by `schema` and `instructions`; refresh the page
   * set periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    /**
     * Allow page discovery on subdomains of the target site.
     */
    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for page selection and the baseline snapshot. Changes return diffs
     * and evidence.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Current baseline of a `page` monitor: the visible page text as last observed.
   */
  export interface MonitorsPageBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The page's visible text as last observed.
     */
    text: string;
  }

  /**
   * Current baseline of a `sitemap` monitor: the normalized URL set as last
   * observed.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * The sitemap URLs as last observed (sorted, normalized).
     */
    urls: Array<string>;
  }

  /**
   * Current baseline of an `extract` monitor: the pages it tracks and the structured
   * data as last extracted.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Latest structured snapshot matching the extraction schema, refreshed at most
     * daily; `null` before capture.
     */
    data: unknown;

    /**
     * The page URLs the monitor tracks and analyzes for changes.
     */
    urls_analyzed: Array<string>;
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

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  export interface LastError {
    code: string;

    message: string;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit used with `frequency` to set the run interval.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack URLs get formatted
     * messages.
     */
    url: string;

    /**
     * Events to deliver. Defaults to `change.detected`; `run.completed` also includes
     * unchanged runs.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Webhook retry settings. Use {} for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;

    /**
     * API-generated signing secret. Visible only with full access or `monitors:write`
     * permission.
     */
    secret?: string;
  }

  /**
   * Present while webhook deliveries are failing consecutively; null when deliveries
   * are healthy or no webhook is configured. Cleared on the next successful delivery
   * and when the webhook URL changes.
   */
  export interface WebhookFailure {
    /**
     * Number of consecutive delivery attempts that did not succeed.
     */
    consecutive_failures: number;

    last_failed_at: string;

    /**
     * Human-readable description of the most recent failure.
     */
    last_message: string;

    /**
     * Outcome of the most recent failed delivery. rejected means a non-2xx response;
     * failed means no HTTP response was received; skipped_unsafe_url means the URL
     * failed the public-endpoint safety check.
     */
    last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
  }
}

export interface MonitorListResponse {
  data: Array<MonitorListResponse.Data>;

  has_more: boolean;

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
   * A web monitor. `mode` is the constant `web`; behavior is described by `target`
   * (page/sitemap/extract) and `change_detection` (exact/semantic).
   */
  export interface Data {
    id: string;

    /**
     * How changes are judged. Defaults to `semantic` for extract targets and page
     * targets with `instructions`, otherwise `exact`.
     */
    change_detection: Data.MonitorsExactChangeDetection | Data.MonitorsSemanticChangeDetection;

    created_at: string;

    /**
     * Always `web`. Optional.
     */
    mode: 'web';

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: Data.Schedule;

    /**
     * Current state. Failed monitors keep running; paused monitors must be resumed
     * with `status: "active"`.
     */
    status: 'active' | 'paused' | 'failed';

    /**
     * What to watch: a page, a sitemap, or data extracted from a site.
     */
    target: Data.MonitorsPageTarget | Data.MonitorsSitemapTarget | Data.MonitorsExtractTarget;

    updated_at: string;

    /**
     * Comparison baseline, included on Retrieve. Null until capture completes or after
     * target changes.
     */
    baseline?: Data.MonitorsPageBaseline | Data.MonitorsSitemapBaseline | Data.MonitorsExtractBaseline | null;

    last_change_at?: string | null;

    /**
     * Error from the most recent failed run; null when the last run succeeded.
     */
    last_error?: Data.LastError | null;

    last_run_at?: string | null;

    /**
     * When the next scheduled run is due; null while paused.
     */
    next_run_at?: string | null;

    /**
     * Labels for filtering monitors, their changes, and their usage.
     */
    tags?: Array<string>;

    /**
     * Webhook destination and delivery settings. Null means no webhook is configured.
     */
    webhook?: Data.Webhook | null;

    /**
     * Present while webhook deliveries are failing consecutively; null when deliveries
     * are healthy or no webhook is configured. Cleared on the next successful delivery
     * and when the webhook URL changes.
     */
    webhook_failure?: Data.WebhookFailure | null;
  }

  export namespace Data {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface MonitorsExactChangeDetection {
      /**
       * Use `exact` to compare visible text or sitemap URLs.
       */
      type: 'exact';
    }

    /**
     * Detect meaningful content changes using the target’s instructions and optional
     * schema.
     */
    export interface MonitorsSemanticChangeDetection {
      /**
       * Use `semantic` to judge changes against the target instructions.
       */
      type: 'semantic';

      /**
       * Minimum confidence required to report a meaningful change, from 0 to 1.
       */
      confidence_threshold?: number;
    }

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    export interface Schedule {
      /**
       * Number of units between runs. The resulting interval (frequency × unit) must be
       * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
       * maximum 365 when unit is days).
       */
      frequency: number;

      /**
       * Use `interval` to run on a repeating schedule.
       */
      type: 'interval';

      /**
       * Time unit used with `frequency` to set the run interval.
       */
      unit: 'minutes' | 'hours' | 'days';
    }

    /**
     * Watch a single web page. Exact detection reports visible-text diffs; semantic
     * detection judges confirmed stable diffs against `instructions`.
     */
    export interface MonitorsPageTarget {
      /**
       * Use `page` to watch one web page.
       */
      type: 'page';

      /**
       * Public HTTP(S) page URL to monitor.
       */
      url: string;

      /**
       * Remove matching regions after inclusions. Changes create a new baseline.
       */
      exclude_selectors?: Array<string>;

      /**
       * Monitor these CSS-selected regions. Empty or omitted uses main content. Changes
       * create a new baseline.
       */
      include_selectors?: Array<string>;

      /**
       * Plain-language goal describing which page changes matter. When provided without
       * change_detection, semantic detection is inferred.
       */
      instructions?: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
    }

    /**
     * Watch a site’s URL inventory for confirmed additions and removals.
     */
    export interface MonitorsSitemapTarget {
      /**
       * Use `sitemap` to watch a site for added or removed URLs.
       */
      type: 'sitemap';

      /**
       * Sitemap URL to monitor.
       */
      url: string;

      /**
       * URL path patterns to exclude (max 50).
       */
      exclude?: Array<string>;

      /**
       * URL path patterns to include (max 50).
       */
      include?: Array<string>;

      /**
       * Maximum number of sitemap URLs to track (capped at 10,000).
       */
      max_urls?: number;
    }

    /**
     * Track relevant pages selected by `schema` and `instructions`; refresh the page
     * set periodically.
     */
    export interface MonitorsExtractTarget {
      /**
       * Natural-language instructions guiding which pages and facts to track and which
       * changes to report.
       */
      instructions: string;

      /**
       * Use `extract` to watch structured data across selected pages.
       */
      type: 'extract';

      /**
       * Root URL to extract structured data from.
       */
      url: string;

      /**
       * Allow page discovery on subdomains of the target site.
       */
      follow_subdomains?: boolean;

      /**
       * Optional maximum link depth from the starting URL (0 = only the starting page).
       */
      max_depth?: number;

      /**
       * Maximum number of pages to track.
       */
      max_pages?: number;

      /**
       * JSON Schema for page selection and the baseline snapshot. Changes return diffs
       * and evidence.
       */
      schema?: { [key: string]: unknown };
    }

    /**
     * Current baseline of a `page` monitor: the visible page text as last observed.
     */
    export interface MonitorsPageBaseline {
      /**
       * When this baseline was last captured or replaced.
       */
      captured_at: string;

      /**
       * The page's visible text as last observed.
       */
      text: string;
    }

    /**
     * Current baseline of a `sitemap` monitor: the normalized URL set as last
     * observed.
     */
    export interface MonitorsSitemapBaseline {
      /**
       * When this baseline was last captured or replaced.
       */
      captured_at: string;

      /**
       * Number of URLs in the baseline.
       */
      url_count: number;

      /**
       * The sitemap URLs as last observed (sorted, normalized).
       */
      urls: Array<string>;
    }

    /**
     * Current baseline of an `extract` monitor: the pages it tracks and the structured
     * data as last extracted.
     */
    export interface MonitorsExtractBaseline {
      /**
       * When this baseline was last captured or replaced.
       */
      captured_at: string;

      /**
       * Latest structured snapshot matching the extraction schema, refreshed at most
       * daily; `null` before capture.
       */
      data: unknown;

      /**
       * The page URLs the monitor tracks and analyzes for changes.
       */
      urls_analyzed: Array<string>;
    }

    /**
     * Error from the most recent failed run; null when the last run succeeded.
     */
    export interface LastError {
      code: string;

      message: string;
    }

    /**
     * Webhook destination and delivery settings. Null means no webhook is configured.
     */
    export interface Webhook {
      /**
       * Public HTTP(S) URL that receives events. Slack and GovSlack URLs get formatted
       * messages.
       */
      url: string;

      /**
       * Events to deliver. Defaults to `change.detected`; `run.completed` also includes
       * unchanged runs.
       */
      events?: Array<'change.detected' | 'run.completed'>;

      /**
       * Webhook retry settings. Use {} for the default schedule.
       */
      retry?: WebhooksAPI.RetryConfig;

      /**
       * API-generated signing secret. Visible only with full access or `monitors:write`
       * permission.
       */
      secret?: string;
    }

    /**
     * Present while webhook deliveries are failing consecutively; null when deliveries
     * are healthy or no webhook is configured. Cleared on the next successful delivery
     * and when the webhook URL changes.
     */
    export interface WebhookFailure {
      /**
       * Number of consecutive delivery attempts that did not succeed.
       */
      consecutive_failures: number;

      last_failed_at: string;

      /**
       * Human-readable description of the most recent failure.
       */
      last_message: string;

      /**
       * Outcome of the most recent failed delivery. rejected means a non-2xx response;
       * failed means no HTTP response was received; skipped_unsafe_url means the URL
       * failed the public-endpoint safety check.
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorDeleteResponse {
  id: string;

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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorGetCreditUsageResponse {
  data: Array<MonitorGetCreditUsageResponse.Data>;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Sum of credits across all monitors in the window.
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
     * Credits charged to this monitor over the window.
     */
    credits: number;

    monitor_id: string;

    /**
     * Monitor name (falls back to the id when the monitor was deleted).
     */
    name: string;

    /**
     * Number of billed runs over the window.
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorGetLimitsResponse {
  /**
   * Most monitors you can have: your plan's allowance or a custom limit.
   */
  monitors_limit: number;

  /**
   * Number of monitors the account currently has.
   */
  monitors_used: number;

  /**
   * `starter` means Developer; `pro` means Pro or Growth; `scale` means Scale or
   * Enterprise.
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorListAccountChangesResponse {
  data: Array<MonitorListAccountChangesResponse.Data>;

  has_more: boolean;

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
   * Detected change, including applicable diffs, URLs, and supporting evidence.
   */
  export interface Data {
    id: string;

    change_detection_type: 'exact' | 'semantic';

    detected_at: string;

    /**
     * Always `web`. Optional.
     */
    mode: 'web';

    monitor_id: string;

    /**
     * The run that detected this change.
     */
    run_id: string;

    summary: string;

    /**
     * Labels for filtering monitors, their changes, and their usage.
     */
    tags: Array<string>;

    target_type: 'page' | 'sitemap' | 'extract';

    title: string;

    url: string;

    added_url_count?: number;

    /**
     * At most 500 URLs are included; the corresponding count field is always exact.
     */
    added_urls?: Array<string>;

    after_text_excerpt?: string;

    before_text_excerpt?: string;

    confidence?: number;

    /**
     * Text diff between the previous and current page baseline (page targets).
     */
    diff?: string;

    evidence?: Array<Data.Evidence>;

    importance?: 'low' | 'medium' | 'high';

    matched_url_count?: number;

    /**
     * At most 500 URLs are included; the corresponding count field is always exact.
     */
    matched_urls?: Array<string>;

    removed_url_count?: number;

    /**
     * At most 500 URLs are included; the corresponding count field is always exact.
     */
    removed_urls?: Array<string>;
  }

  export namespace Data {
    export interface Evidence {
      /**
       * Snapshot of the content after the change.
       */
      after: string;

      /**
       * Snapshot of the content before the change.
       */
      before: string;

      /**
       * Optional URL the evidence relates to. Absent for whole-target diffs.
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorListAccountRunsResponse {
  data: Array<MonitorListAccountRunsResponse.Data>;

  has_more: boolean;

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
    id: string;

    /**
     * True when this run established the monitor's initial baseline; baseline runs
     * perform no change detection.
     */
    baseline_created: boolean;

    change_detected: boolean;

    change_detection_type: 'exact' | 'semantic';

    /**
     * Credits charged for this run (0 for skipped/failed runs).
     */
    credits_charged: number;

    monitor_id: string;

    /**
     * A baseline run follows creation or a target or detection change.
     */
    run_type: 'baseline' | 'scheduled';

    /**
     * Lifecycle status of a run. `skipped` runs never executed — see `skip_reason`
     * (insufficient credits, monitor paused, or superseded by a concurrent run).
     */
    status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

    target_type: 'page' | 'sitemap' | 'extract';

    change_id?: string | null;

    completed_at?: string | null;

    error?: Data.Error | null;

    /**
     * Why a skipped run never executed; null unless status is `skipped`.
     */
    skip_reason?: 'insufficient_credits' | 'monitor_paused' | 'superseded' | null;

    started_at?: string | null;

    /**
     * All webhook deliveries attempted by this run — one per subscribed event that
     * fired. Omitted when no webhook was attempted, including runs created before
     * event selection was added.
     */
    webhook_deliveries?: Array<MonitorsAPI.WebhookDelivery>;

    /**
     * @deprecated Deprecated. Use `webhook_deliveries` for all attempts.
     */
    webhook_delivery?: MonitorsAPI.WebhookDelivery;

    /**
     * Webhook delivery IDs for this run.
     */
    webhook_delivery_ids?: Array<string>;
  }

  export namespace Data {
    export interface Error {
      code: string;

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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorListChangesResponse {
  data: Array<MonitorListChangesResponse.Data>;

  has_more: boolean;

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
   * Detected change, including applicable diffs, URLs, and supporting evidence.
   */
  export interface Data {
    id: string;

    change_detection_type: 'exact' | 'semantic';

    detected_at: string;

    /**
     * Always `web`. Optional.
     */
    mode: 'web';

    monitor_id: string;

    /**
     * The run that detected this change.
     */
    run_id: string;

    summary: string;

    /**
     * Labels for filtering monitors, their changes, and their usage.
     */
    tags: Array<string>;

    target_type: 'page' | 'sitemap' | 'extract';

    title: string;

    url: string;

    added_url_count?: number;

    /**
     * At most 500 URLs are included; the corresponding count field is always exact.
     */
    added_urls?: Array<string>;

    after_text_excerpt?: string;

    before_text_excerpt?: string;

    confidence?: number;

    /**
     * Text diff between the previous and current page baseline (page targets).
     */
    diff?: string;

    evidence?: Array<Data.Evidence>;

    importance?: 'low' | 'medium' | 'high';

    matched_url_count?: number;

    /**
     * At most 500 URLs are included; the corresponding count field is always exact.
     */
    matched_urls?: Array<string>;

    removed_url_count?: number;

    /**
     * At most 500 URLs are included; the corresponding count field is always exact.
     */
    removed_urls?: Array<string>;
  }

  export namespace Data {
    export interface Evidence {
      /**
       * Snapshot of the content after the change.
       */
      after: string;

      /**
       * Snapshot of the content before the change.
       */
      before: string;

      /**
       * Optional URL the evidence relates to. Absent for whole-target diffs.
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorListRunsResponse {
  data: Array<MonitorListRunsResponse.Data>;

  has_more: boolean;

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
    id: string;

    /**
     * True when this run established the monitor's initial baseline; baseline runs
     * perform no change detection.
     */
    baseline_created: boolean;

    change_detected: boolean;

    change_detection_type: 'exact' | 'semantic';

    /**
     * Credits charged for this run (0 for skipped/failed runs).
     */
    credits_charged: number;

    monitor_id: string;

    /**
     * A baseline run follows creation or a target or detection change.
     */
    run_type: 'baseline' | 'scheduled';

    /**
     * Lifecycle status of a run. `skipped` runs never executed — see `skip_reason`
     * (insufficient credits, monitor paused, or superseded by a concurrent run).
     */
    status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

    target_type: 'page' | 'sitemap' | 'extract';

    change_id?: string | null;

    completed_at?: string | null;

    error?: Data.Error | null;

    /**
     * Why a skipped run never executed; null unless status is `skipped`.
     */
    skip_reason?: 'insufficient_credits' | 'monitor_paused' | 'superseded' | null;

    started_at?: string | null;

    /**
     * All webhook deliveries attempted by this run — one per subscribed event that
     * fired. Omitted when no webhook was attempted, including runs created before
     * event selection was added.
     */
    webhook_deliveries?: Array<MonitorsAPI.WebhookDelivery>;

    /**
     * @deprecated Deprecated. Use `webhook_deliveries` for all attempts.
     */
    webhook_delivery?: MonitorsAPI.WebhookDelivery;

    /**
     * Webhook delivery IDs for this run.
     */
    webhook_delivery_ids?: Array<string>;
  }

  export namespace Data {
    export interface Error {
      code: string;

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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorRetrieveChangeResponse {
  id: string;

  change_detection_type: 'exact' | 'semantic';

  detected_at: string;

  /**
   * Always `web`. Optional.
   */
  mode: 'web';

  monitor_id: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * The run that detected this change.
   */
  run_id: string;

  summary: string;

  /**
   * Labels for filtering monitors, their changes, and their usage.
   */
  tags: Array<string>;

  target_type: 'page' | 'sitemap' | 'extract';

  title: string;

  url: string;

  added_url_count?: number;

  /**
   * At most 500 URLs are included; the corresponding count field is always exact.
   */
  added_urls?: Array<string>;

  after_text_excerpt?: string;

  before_text_excerpt?: string;

  confidence?: number;

  /**
   * Text diff between the previous and current page baseline (page targets).
   */
  diff?: string;

  evidence?: Array<MonitorRetrieveChangeResponse.Evidence>;

  importance?: 'low' | 'medium' | 'high';

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRetrieveChangeResponse.KeyMetadata;

  matched_url_count?: number;

  /**
   * At most 500 URLs are included; the corresponding count field is always exact.
   */
  matched_urls?: Array<string>;

  removed_url_count?: number;

  /**
   * At most 500 URLs are included; the corresponding count field is always exact.
   */
  removed_urls?: Array<string>;
}

export namespace MonitorRetrieveChangeResponse {
  export interface Evidence {
    /**
     * Snapshot of the content after the change.
     */
    after: string;

    /**
     * Snapshot of the content before the change.
     */
    before: string;

    /**
     * Optional URL the evidence relates to. Absent for whole-target diffs.
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorRetrieveRunResponse {
  id: string;

  /**
   * True when this run established the monitor's initial baseline; baseline runs
   * perform no change detection.
   */
  baseline_created: boolean;

  change_detected: boolean;

  change_detection_type: 'exact' | 'semantic';

  /**
   * Credits charged for this run (0 for skipped/failed runs).
   */
  credits_charged: number;

  monitor_id: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * A baseline run follows creation or a target or detection change.
   */
  run_type: 'baseline' | 'scheduled';

  /**
   * Lifecycle status of a run. `skipped` runs never executed — see `skip_reason`
   * (insufficient credits, monitor paused, or superseded by a concurrent run).
   */
  status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

  target_type: 'page' | 'sitemap' | 'extract';

  change_id?: string | null;

  completed_at?: string | null;

  error?: MonitorRetrieveRunResponse.Error | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRetrieveRunResponse.KeyMetadata;

  /**
   * Why a skipped run never executed; null unless status is `skipped`.
   */
  skip_reason?: 'insufficient_credits' | 'monitor_paused' | 'superseded' | null;

  started_at?: string | null;

  /**
   * All webhook deliveries attempted by this run — one per subscribed event that
   * fired. Omitted when no webhook was attempted, including runs created before
   * event selection was added.
   */
  webhook_deliveries?: Array<WebhookDelivery>;

  /**
   * @deprecated Deprecated. Use `webhook_deliveries` for all attempts.
   */
  webhook_delivery?: WebhookDelivery;

  /**
   * Webhook delivery IDs for this run.
   */
  webhook_delivery_ids?: Array<string>;
}

export namespace MonitorRetrieveRunResponse {
  export interface Error {
    code: string;

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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface MonitorRotateWebhookSecretResponse {
  id: string;

  /**
   * How changes are judged. Defaults to `semantic` for extract targets and page
   * targets with `instructions`, otherwise `exact`.
   */
  change_detection:
    | MonitorRotateWebhookSecretResponse.MonitorsExactChangeDetection
    | MonitorRotateWebhookSecretResponse.MonitorsSemanticChangeDetection;

  created_at: string;

  /**
   * Always `web`. Optional.
   */
  mode: 'web';

  name: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Current state. Failed monitors keep running; paused monitors must be resumed
   * with `status: "active"`.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * What to watch: a page, a sitemap, or data extracted from a site.
   */
  target:
    | MonitorRotateWebhookSecretResponse.MonitorsPageTarget
    | MonitorRotateWebhookSecretResponse.MonitorsSitemapTarget
    | MonitorRotateWebhookSecretResponse.MonitorsExtractTarget;

  updated_at: string;

  /**
   * Comparison baseline, included on Retrieve. Null until capture completes or after
   * target changes.
   */
  baseline?:
    | MonitorRotateWebhookSecretResponse.MonitorsPageBaseline
    | MonitorRotateWebhookSecretResponse.MonitorsSitemapBaseline
    | MonitorRotateWebhookSecretResponse.MonitorsExtractBaseline
    | null;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: MonitorRotateWebhookSecretResponse.KeyMetadata;

  last_change_at?: string | null;

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  last_error?: MonitorRotateWebhookSecretResponse.LastError | null;

  last_run_at?: string | null;

  /**
   * When the next scheduled run is due; null while paused.
   */
  next_run_at?: string | null;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule?: MonitorRotateWebhookSecretResponse.Schedule;

  /**
   * Labels for filtering monitors, their changes, and their usage.
   */
  tags?: Array<string>;

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  webhook?: MonitorRotateWebhookSecretResponse.Webhook | null;

  /**
   * Present while webhook deliveries are failing consecutively; null when deliveries
   * are healthy or no webhook is configured. Cleared on the next successful delivery
   * and when the webhook URL changes.
   */
  webhook_failure?: MonitorRotateWebhookSecretResponse.WebhookFailure | null;
}

export namespace MonitorRotateWebhookSecretResponse {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text or sitemap URLs.
     */
    type: 'exact';
  }

  /**
   * Detect meaningful content changes using the target’s instructions and optional
   * schema.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to judge changes against the target instructions.
     */
    type: 'semantic';

    /**
     * Minimum confidence required to report a meaningful change, from 0 to 1.
     */
    confidence_threshold?: number;
  }

  /**
   * Watch a single web page. Exact detection reports visible-text diffs; semantic
   * detection judges confirmed stable diffs against `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) page URL to monitor.
     */
    url: string;

    /**
     * Remove matching regions after inclusions. Changes create a new baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * Monitor these CSS-selected regions. Empty or omitted uses main content. Changes
     * create a new baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language goal describing which page changes matter. When provided without
     * change_detection, semantic detection is inferred.
     */
    instructions?: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a site’s URL inventory for confirmed additions and removals.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude (max 50).
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include (max 50).
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Track relevant pages selected by `schema` and `instructions`; refresh the page
   * set periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    /**
     * Allow page discovery on subdomains of the target site.
     */
    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for page selection and the baseline snapshot. Changes return diffs
     * and evidence.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Current baseline of a `page` monitor: the visible page text as last observed.
   */
  export interface MonitorsPageBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The page's visible text as last observed.
     */
    text: string;
  }

  /**
   * Current baseline of a `sitemap` monitor: the normalized URL set as last
   * observed.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * The sitemap URLs as last observed (sorted, normalized).
     */
    urls: Array<string>;
  }

  /**
   * Current baseline of an `extract` monitor: the pages it tracks and the structured
   * data as last extracted.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Latest structured snapshot matching the extraction schema, refreshed at most
     * daily; `null` before capture.
     */
    data: unknown;

    /**
     * The page URLs the monitor tracks and analyzes for changes.
     */
    urls_analyzed: Array<string>;
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

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  export interface LastError {
    code: string;

    message: string;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit used with `frequency` to set the run interval.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack URLs get formatted
     * messages.
     */
    url: string;

    /**
     * Events to deliver. Defaults to `change.detected`; `run.completed` also includes
     * unchanged runs.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Webhook retry settings. Use {} for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;

    /**
     * API-generated signing secret. Visible only with full access or `monitors:write`
     * permission.
     */
    secret?: string;
  }

  /**
   * Present while webhook deliveries are failing consecutively; null when deliveries
   * are healthy or no webhook is configured. Cleared on the next successful delivery
   * and when the webhook URL changes.
   */
  export interface WebhookFailure {
    /**
     * Number of consecutive delivery attempts that did not succeed.
     */
    consecutive_failures: number;

    last_failed_at: string;

    /**
     * Human-readable description of the most recent failure.
     */
    last_message: string;

    /**
     * Outcome of the most recent failed delivery. rejected means a non-2xx response;
     * failed means no HTTP response was received; skipped_unsafe_url means the URL
     * failed the public-endpoint safety check.
     */
    last_status: 'rejected' | 'failed' | 'skipped_unsafe_url';
  }
}

export interface MonitorRunResponse {
  monitor_id: string;

  queued: boolean;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * ID of the queued run; pass it to Retrieve a monitor run.
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
     * Credits remaining for your organization.
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
   * What to watch: a page, a sitemap, or data extracted from a site.
   */
  target:
    | MonitorCreateParams.MonitorsPageTarget
    | MonitorCreateParams.MonitorsSitemapTarget
    | MonitorCreateParams.MonitorsExtractTarget;

  /**
   * How changes are judged. Defaults to `semantic` for extract targets and page
   * targets with `instructions`, otherwise `exact`.
   */
  change_detection?:
    | MonitorCreateParams.MonitorsExactChangeDetection
    | MonitorCreateParams.MonitorsSemanticChangeDetection;

  /**
   * Always `web`. Optional.
   */
  mode?: 'web';

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule?: MonitorCreateParams.Schedule;

  /**
   * Labels for filtering monitors, their changes, and their usage.
   */
  tags?: Array<string>;

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  webhook?: MonitorCreateParams.Webhook | null;
}

export namespace MonitorCreateParams {
  /**
   * Watch a single web page. Exact detection reports visible-text diffs; semantic
   * detection judges confirmed stable diffs against `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) page URL to monitor.
     */
    url: string;

    /**
     * Remove matching regions after inclusions. Changes create a new baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * Monitor these CSS-selected regions. Empty or omitted uses main content. Changes
     * create a new baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language goal describing which page changes matter. When provided without
     * change_detection, semantic detection is inferred.
     */
    instructions?: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a site’s URL inventory for confirmed additions and removals.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude (max 50).
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include (max 50).
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Track relevant pages selected by `schema` and `instructions`; refresh the page
   * set periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    /**
     * Allow page discovery on subdomains of the target site.
     */
    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for page selection and the baseline snapshot. Changes return diffs
     * and evidence.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text or sitemap URLs.
     */
    type: 'exact';
  }

  /**
   * Detect meaningful content changes using the target’s instructions and optional
   * schema.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to judge changes against the target instructions.
     */
    type: 'semantic';

    /**
     * Minimum confidence required to report a meaningful change, from 0 to 1.
     */
    confidence_threshold?: number;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit used with `frequency` to set the run interval.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Webhook destination and delivery settings. Null means no webhook is configured.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack URLs get formatted
     * messages.
     */
    url: string;

    /**
     * Events to deliver. Defaults to `change.detected`; `run.completed` also includes
     * unchanged runs.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Webhook retry settings. Use {} for the default schedule.
     */
    retry?: WebhooksAPI.RetryConfig;
  }
}

export interface MonitorUpdateParams {
  /**
   * How changes are judged. Defaults to `semantic` for extract targets and page
   * targets with `instructions`, otherwise `exact`.
   */
  change_detection?:
    | MonitorUpdateParams.MonitorsExactChangeDetection
    | MonitorUpdateParams.MonitorsSemanticChangeDetection;

  /**
   * Display name for the monitor.
   */
  name?: string;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule?: MonitorUpdateParams.Schedule;

  /**
   * Set `paused` to stop scheduled runs or `active` to resume them.
   */
  status?: 'active' | 'paused';

  /**
   * Labels for filtering monitors, their changes, and their usage.
   */
  tags?: Array<string>;

  /**
   * What to watch: a page, a sitemap, or data extracted from a site.
   */
  target?:
    | MonitorUpdateParams.MonitorsPageTarget
    | MonitorUpdateParams.MonitorsSitemapTarget
    | MonitorUpdateParams.MonitorsExtractTarget;

  /**
   * Set to null to remove the webhook. Changing `url` issues a new secret.
   */
  webhook?: MonitorUpdateParams.Webhook | null;
}

export namespace MonitorUpdateParams {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    /**
     * Use `exact` to compare visible text or sitemap URLs.
     */
    type: 'exact';
  }

  /**
   * Detect meaningful content changes using the target’s instructions and optional
   * schema.
   */
  export interface MonitorsSemanticChangeDetection {
    /**
     * Use `semantic` to judge changes against the target instructions.
     */
    type: 'semantic';

    /**
     * Minimum confidence required to report a meaningful change, from 0 to 1.
     */
    confidence_threshold?: number;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    /**
     * Use `interval` to run on a repeating schedule.
     */
    type: 'interval';

    /**
     * Time unit used with `frequency` to set the run interval.
     */
    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Watch a single web page. Exact detection reports visible-text diffs; semantic
   * detection judges confirmed stable diffs against `instructions`.
   */
  export interface MonitorsPageTarget {
    /**
     * Use `page` to watch one web page.
     */
    type: 'page';

    /**
     * Public HTTP(S) page URL to monitor.
     */
    url: string;

    /**
     * Remove matching regions after inclusions. Changes create a new baseline.
     */
    exclude_selectors?: Array<string>;

    /**
     * Monitor these CSS-selected regions. Empty or omitted uses main content. Changes
     * create a new baseline.
     */
    include_selectors?: Array<string>;

    /**
     * Plain-language goal describing which page changes matter. When provided without
     * change_detection, semantic detection is inferred.
     */
    instructions?: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a site’s URL inventory for confirmed additions and removals.
   */
  export interface MonitorsSitemapTarget {
    /**
     * Use `sitemap` to watch a site for added or removed URLs.
     */
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude (max 50).
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include (max 50).
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Track relevant pages selected by `schema` and `instructions`; refresh the page
   * set periodically.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    /**
     * Use `extract` to watch structured data across selected pages.
     */
    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    /**
     * Allow page discovery on subdomains of the target site.
     */
    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema for page selection and the baseline snapshot. Changes return diffs
     * and evidence.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Set to null to remove the webhook. Changing `url` issues a new secret.
   */
  export interface Webhook {
    /**
     * Public HTTP(S) URL that receives events. Slack and GovSlack URLs get formatted
     * messages.
     */
    url: string;

    /**
     * Events to deliver. Defaults to `change.detected`; `run.completed` also includes
     * unchanged runs.
     */
    events?: Array<'change.detected' | 'run.completed'>;

    /**
     * Webhook retry settings. Use {} for the default schedule.
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
   * Opaque pagination cursor from a previous response.
   */
  cursor?: string;

  /**
   * Maximum number of items to return per page (1-100). Defaults to 25.
   */
  limit?: number;

  /**
   * Free-text search term, matched against the fields named in `search_by`.
   */
  q?: string;

  /**
   * Fields to search with `q`. Defaults to all fields; page and extract targets can
   * have instructions.
   */
  search_by?: Array<'name' | 'url' | 'instructions' | 'tags'> | null;

  /**
   * `prefix` for as-you-type prefix matching (default), `exact` for full-token
   * matching.
   */
  search_type?: 'exact' | 'prefix';

  /**
   * Filter monitors by lifecycle status.
   */
  status?: 'active' | 'paused' | 'failed';

  /**
   * Filter to items that have this tag.
   */
  tag?: string;

  /**
   * Comma-separated list of tags to filter by (matches monitors having any of them).
   */
  tags?: Array<string> | null;

  /**
   * Filter by target type.
   */
  target_type?: 'page' | 'sitemap' | 'extract';
}

export interface MonitorGetCreditUsageParams {
  /**
   * Only include items at or after this ISO 8601 timestamp.
   */
  since?: string;

  /**
   * Only include items before this ISO 8601 timestamp.
   */
  until?: string;
}

export interface MonitorListAccountChangesParams {
  /**
   * Filter by change detection type.
   */
  change_detection_type?: 'exact' | 'semantic';

  /**
   * Opaque pagination cursor from a previous response.
   */
  cursor?: string;

  /**
   * Maximum number of items to return per page (1-100). Defaults to 25.
   */
  limit?: number;

  /**
   * Filter changes to a single monitor.
   */
  monitor_id?: string;

  /**
   * Only include items at or after this ISO 8601 timestamp.
   */
  since?: string;

  /**
   * Filter to items that have this tag.
   */
  tag?: string;

  /**
   * Filter by target type.
   */
  target_type?: 'page' | 'sitemap' | 'extract';

  /**
   * Only include items before this ISO 8601 timestamp.
   */
  until?: string;
}

export interface MonitorListAccountRunsParams {
  /**
   * Opaque pagination cursor from a previous response.
   */
  cursor?: string;

  /**
   * Maximum number of items to return per page (1-100). Defaults to 25.
   */
  limit?: number;

  /**
   * Filter runs by lifecycle status.
   */
  status?: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';
}

export interface MonitorListChangesParams {
  /**
   * Opaque pagination cursor from a previous response.
   */
  cursor?: string;

  /**
   * Maximum number of items to return per page (1-100). Defaults to 25.
   */
  limit?: number;

  /**
   * Only include items at or after this ISO 8601 timestamp.
   */
  since?: string;

  /**
   * Filter to items that have this tag.
   */
  tag?: string;

  /**
   * Only include items before this ISO 8601 timestamp.
   */
  until?: string;
}

export interface MonitorListRunsParams {
  /**
   * Opaque pagination cursor from a previous response.
   */
  cursor?: string;

  /**
   * Maximum number of items to return per page (1-100). Defaults to 25.
   */
  limit?: number;

  /**
   * Filter runs by lifecycle status.
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
