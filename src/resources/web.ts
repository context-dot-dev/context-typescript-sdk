// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Web extends APIResource {
  /**
   * Research a task across the live web and Context.dev's company and people data,
   * and get the answer in the JSON shape you provide, with the URLs it used. `fast`
   * (10 credits) suits short lookups; `ultra` (100 credits, the default) reads more
   * sources for deeper research.
   *
   * @example
   * ```ts
   * const response = await client.web.answers({
   *   task: 'Find the pricing page URL and plan names for context.dev.',
   *   json_format: {
   *     pricing_page_url: '',
   *     plans: [{ name: '' }],
   *   },
   *   mode: 'fast',
   * });
   * ```
   */
  answers(body: WebAnswersParams, options?: RequestOptions): APIPromise<WebAnswersResponse> {
    return this._client.post('/web/answers', { body, ...options });
  }

  /**
   * Find a company's direct competitors from its website and web search results.
   * Each competitor comes with a confidence level and the search results behind it.
   *
   * @example
   * ```ts
   * const response = await client.web.extractCompetitors({
   *   domain: 'xxx',
   * });
   * ```
   */
  extractCompetitors(
    query: WebExtractCompetitorsParams,
    options?: RequestOptions,
  ): APIPromise<WebExtractCompetitorsResponse> {
    return this._client.get('/web/competitors', { query, ...options });
  }

  /**
   * Extract a website's design system: colors, typography, spacing, shadows, button
   * and card styles, and downloadable font files. Every component style includes
   * ready-to-use CSS.
   *
   * @example
   * ```ts
   * const response = await client.web.extractStyleguide();
   * ```
   */
  extractStyleguide(
    query: WebExtractStyleguideParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebExtractStyleguideResponse> {
    return this._client.get('/web/styleguide', { query, ...options });
  }

  /**
   * Map up to 100,000 URLs on a domain, with titles, descriptions, keywords, and
   * language when available. Filter with regex patterns, or rank by topic with
   * `search` for 1 extra credit. Newly discovered URLs can lack metadata.
   *
   * @example
   * ```ts
   * const response = await client.web.mapUrls({
   *   domain: 'stripe.com',
   * });
   * ```
   */
  mapUrls(query: WebMapURLsParams, options?: RequestOptions): APIPromise<WebMapURLsResponse> {
    return this._client.get('/web/urls', { query, ...options });
  }

  /**
   * Turn any URL into Markdown, HTML, a screenshot, images, raw bytes, parsed
   * fields, product data, highlights, or schema-matched JSON in one request. Choose
   * the outputs in `formats`; each one succeeds or fails on its own. Handles PDF,
   * Word, Excel, PowerPoint, and 40 other file formats.
   *
   * @example
   * ```ts
   * const response = await client.web.scrape({
   *   formats: { markdown: true },
   *   url: 'https://example.com',
   * });
   * ```
   */
  scrape(body: WebScrapeParams, options?: RequestOptions): APIPromise<WebScrapeResponse> {
    return this._client.post('/web/scrape', { body, ...options });
  }

  /**
   * Capture a screenshot of a website's home page, a page type such as pricing, or
   * an exact URL. Returns the visible viewport, a scroll slice, or the full page.
   *
   * @example
   * ```ts
   * const response = await client.web.screenshot();
   * ```
   */
  screenshot(
    query: WebScreenshotParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebScreenshotResponse> {
    return this._client.get('/web/screenshot', { query, ...options });
  }

  /**
   * Search the web and get ranked results, with optional page Markdown or
   * query-relevant passages for each one. Supports search operators and filters for
   * domain, freshness, country, and language.
   *
   * @example
   * ```ts
   * const response = await client.web.search({
   *   query: 'Stripe API authentication',
   *   numResults: 10,
   * });
   * ```
   */
  search(body: WebSearchParams, options?: RequestOptions): APIPromise<WebSearchResponse> {
    return this._client.post('/web/search', { body, ...options });
  }

  /**
   * Crawl up to 500 pages from a start URL and get each page back as Markdown with
   * metadata. Control scope with depth limits, regex patterns, and subdomain rules.
   * For larger crawls, use a batch.
   *
   * @example
   * ```ts
   * const response = await client.web.webCrawlMd({
   *   url: 'https://example.com',
   *   maxPages: 10,
   * });
   * ```
   */
  webCrawlMd(body: WebWebCrawlMdParams, options?: RequestOptions): APIPromise<WebWebCrawlMdResponse> {
    return this._client.post('/web/crawl', { body, ...options });
  }
}

export interface WebAnswersResponse {
  /**
   * The answer, in the shape of `json_format`.
   */
  json_content: { [key: string]: unknown };

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * URLs of the pages and company or profile records read for the answer, followed
   * by URLs cited in `json_content`.
   */
  sources: Array<string>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebAnswersResponse.KeyMetadata;

  /**
   * `true` when the answer is incomplete because the deadline ended research or a
   * requested list item has no researched values.
   */
  partial?: boolean;
}

export namespace WebAnswersResponse {
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

export interface WebExtractCompetitorsResponse {
  /**
   * Direct competitors, ordered by relevance and confidence.
   */
  competitors: Array<WebExtractCompetitorsResponse.Competitor>;

  /**
   * Normalized domain from the request.
   */
  domain: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Always `ok` on success.
   */
  status: 'ok';

  /**
   * Profile of the requested company, inferred from its website.
   */
  target: WebExtractCompetitorsResponse.Target;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebExtractCompetitorsResponse.KeyMetadata;

  /**
   * `true` when the deadline passed with `timeoutOpts.behavior` set to
   * `return-partial`. Only results finished in time are included.
   */
  partial?: boolean;
}

export namespace WebExtractCompetitorsResponse {
  export interface Competitor {
    /**
     * Confidence that this company is a direct competitor.
     */
    confidence: 'high' | 'medium';

    /**
     * Short description of what the competitor offers.
     */
    description: string;

    /**
     * Competitor's official domain, normalized.
     */
    domain: string;

    /**
     * Competitor company or product name.
     */
    name: string;

    /**
     * Search result URLs used as evidence for this competitor.
     */
    sourceUrls: Array<string>;

    /**
     * Competitor's website URL.
     */
    url: string;
  }

  /**
   * Profile of the requested company, inferred from its website.
   */
  export interface Target {
    /**
     * Company or product name, inferred from its website.
     */
    companyName: string;

    /**
     * Product category or market the company operates in.
     */
    field: string;

    /**
     * One-sentence summary of what the company sells and who it serves.
     */
    fieldDescription: string;

    /**
     * Website URL that was analyzed.
     */
    websiteUrl: string;
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

export interface WebExtractStyleguideResponse {
  /**
   * Cache status of this response.
   */
  cache_metadata: WebExtractStyleguideResponse.CacheMetadata;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * HTTP status code, repeated in the body.
   */
  code?: number;

  /**
   * Normalized domain that was analyzed.
   */
  domain?: string;

  /**
   * `loaded`, or `still-loading` when capture ended before the page finished
   * loading.
   */
  finalDOMState?: 'loaded' | 'still-loading';

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebExtractStyleguideResponse.KeyMetadata;

  /**
   * Always `ok` on success.
   */
  status?: string;

  /**
   * Design tokens and component styles extracted from the website.
   */
  styleguide?: WebExtractStyleguideResponse.Styleguide;
}

export namespace WebExtractStyleguideResponse {
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
   * Design tokens and component styles extracted from the website.
   */
  export interface Styleguide {
    /**
     * Core colors used on the website.
     */
    colors: Styleguide.Colors;

    /**
     * Styles for buttons and cards.
     */
    components: Styleguide.Components;

    /**
     * Spacing scale used on the website, from `xs` to `xl`.
     */
    elementSpacing: Styleguide.ElementSpacing;

    /**
     * Font files keyed by family name, as it appears in `fontFamily` and
     * `fontFallbacks`. Generic families are left out. Match style and weight against
     * `faces` to pick a file.
     */
    fontLinks: { [key: string]: Styleguide.FontLinks };

    /**
     * Whether the site's design is mainly light or dark.
     */
    mode: 'light' | 'dark';

    /**
     * Box shadow scale used on the website, from `sm` to `xl`, plus `inner`.
     */
    shadows: Styleguide.Shadows;

    /**
     * Text styles for headings and body text.
     */
    typography: Styleguide.Typography;
  }

  export namespace Styleguide {
    /**
     * Core colors used on the website.
     */
    export interface Colors {
      /**
       * Accent color, in hex.
       */
      accent: string;

      /**
       * Background color, in hex.
       */
      background: string;

      /**
       * Text color, in hex.
       */
      text: string;
    }

    /**
     * Styles for buttons and cards.
     */
    export interface Components {
      /**
       * Primary, secondary, and link button styles.
       */
      button: Components.Button;

      /**
       * Card style.
       */
      card?: Components.Card;
    }

    export namespace Components {
      /**
       * Primary, secondary, and link button styles.
       */
      export interface Button {
        link?: Button.Link;

        primary?: Button.Primary;

        secondary?: Button.Secondary;
      }

      export namespace Button {
        export interface Link {
          backgroundColor: string;

          /**
           * Border color in hex: `#RRGGBB`, or `#RRGGBBAA` when the border is translucent.
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed `box-shadow`, with layers separated by commas.
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declarations for this style.
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Minimum height as a CSS length, usually in pixels.
           */
          minHeight: string;

          /**
           * Minimum width as a CSS length, usually in pixels.
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full font stack from the computed `font-family`, in order.
           */
          fontFallbacks?: Array<string>;

          /**
           * Button typeface, the first entry in `fontFallbacks`.
           */
          fontFamily?: string;

          /**
           * Underline color in hex, when it differs from the text color.
           */
          textDecorationColor?: string;
        }

        export interface Primary {
          backgroundColor: string;

          /**
           * Border color in hex: `#RRGGBB`, or `#RRGGBBAA` when the border is translucent.
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed `box-shadow`, with layers separated by commas.
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declarations for this style.
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Minimum height as a CSS length, usually in pixels.
           */
          minHeight: string;

          /**
           * Minimum width as a CSS length, usually in pixels.
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full font stack from the computed `font-family`, in order.
           */
          fontFallbacks?: Array<string>;

          /**
           * Button typeface, the first entry in `fontFallbacks`.
           */
          fontFamily?: string;

          /**
           * Underline color in hex, when it differs from the text color.
           */
          textDecorationColor?: string;
        }

        export interface Secondary {
          backgroundColor: string;

          /**
           * Border color in hex: `#RRGGBB`, or `#RRGGBBAA` when the border is translucent.
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed `box-shadow`, with layers separated by commas.
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declarations for this style.
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Minimum height as a CSS length, usually in pixels.
           */
          minHeight: string;

          /**
           * Minimum width as a CSS length, usually in pixels.
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full font stack from the computed `font-family`, in order.
           */
          fontFallbacks?: Array<string>;

          /**
           * Button typeface, the first entry in `fontFallbacks`.
           */
          fontFamily?: string;

          /**
           * Underline color in hex, when it differs from the text color.
           */
          textDecorationColor?: string;
        }
      }

      /**
       * Card style.
       */
      export interface Card {
        backgroundColor: string;

        /**
         * Border color in hex: `#RRGGBB`, or `#RRGGBBAA` when the border is translucent.
         */
        borderColor: string;

        borderRadius: string;

        borderStyle: string;

        borderWidth: string;

        boxShadow: string;

        /**
         * Ready-to-use CSS declarations for this style.
         */
        css: string;

        padding: string;

        textColor: string;
      }
    }

    /**
     * Spacing scale used on the website, from `xs` to `xl`.
     */
    export interface ElementSpacing {
      lg: string;

      md: string;

      sm: string;

      xl: string;

      xs: string;
    }

    export interface FontLinks {
      /**
       * `google` for Google Fonts, `custom` for any other font source.
       */
      type: 'google' | 'custom';

      /**
       * Google Fonts category, such as `sans-serif`, `serif`, `monospace`, `display`, or
       * `handwriting`. Omitted for custom fonts when unknown.
       */
      category?: string;

      /**
       * Human-readable family name: the `fontLinks` key for custom fonts, or the
       * official Google Fonts name for Google fonts.
       */
      displayName?: string;

      /**
       * Font faces found for this family, one per style, weight, and Unicode subset.
       */
      faces?: Array<FontLinks.Face>;

      /**
       * @deprecated Deprecated upright font lookup keyed by weight string. A variable
       * font can map several standard weight keys to the same URL; faces retains its
       * actual weight range.
       */
      files?: { [key: string]: string };
    }

    export namespace FontLinks {
      export interface Face {
        /**
         * CSS `font-style` descriptor: `normal`, `italic`, or `oblique`, with an optional
         * angle or angle range such as `oblique 10deg 20deg`.
         */
        style: string;

        /**
         * URL of the font file, or an inline data URL.
         */
        url: string;

        /**
         * CSS `font-weight` descriptor. A variable font can have a range such as
         * `300 500`, which covers every weight in between with one file.
         */
        weight: string;

        /**
         * CSS `unicode-range` descriptor.
         */
        unicodeRange?: string;

        /**
         * CSS `font-width` or `font-stretch` descriptor.
         */
        width?: string;
      }
    }

    /**
     * Box shadow scale used on the website, from `sm` to `xl`, plus `inner`.
     */
    export interface Shadows {
      inner: string;

      lg: string;

      md: string;

      sm: string;

      xl: string;
    }

    /**
     * Text styles for headings and body text.
     */
    export interface Typography {
      /**
       * Styles for `h1` through `h4` headings.
       */
      headings: Typography.Headings;

      p?: Typography.P;
    }

    export namespace Typography {
      /**
       * Styles for `h1` through `h4` headings.
       */
      export interface Headings {
        h1?: Headings.H1;

        h2?: Headings.H2;

        h3?: Headings.H3;

        h4?: Headings.H4;
      }

      export namespace Headings {
        export interface H1 {
          /**
           * Full font stack from the computed `font-family`, in order.
           */
          fontFallbacks: Array<string>;

          /**
           * First font in the stack.
           */
          fontFamily: string;

          fontSize: string;

          fontWeight: number;

          letterSpacing: string;

          lineHeight: string;
        }

        export interface H2 {
          /**
           * Full font stack from the computed `font-family`, in order.
           */
          fontFallbacks: Array<string>;

          /**
           * First font in the stack.
           */
          fontFamily: string;

          fontSize: string;

          fontWeight: number;

          letterSpacing: string;

          lineHeight: string;
        }

        export interface H3 {
          /**
           * Full font stack from the computed `font-family`, in order.
           */
          fontFallbacks: Array<string>;

          /**
           * First font in the stack.
           */
          fontFamily: string;

          fontSize: string;

          fontWeight: number;

          letterSpacing: string;

          lineHeight: string;
        }

        export interface H4 {
          /**
           * Full font stack from the computed `font-family`, in order.
           */
          fontFallbacks: Array<string>;

          /**
           * First font in the stack.
           */
          fontFamily: string;

          fontSize: string;

          fontWeight: number;

          letterSpacing: string;

          lineHeight: string;
        }
      }

      export interface P {
        /**
         * Full font stack from the computed `font-family`, in order.
         */
        fontFallbacks: Array<string>;

        /**
         * First font in the stack.
         */
        fontFamily: string;

        fontSize: string;

        fontWeight: number;

        letterSpacing: string;

        lineHeight: string;
      }
    }
  }
}

export interface WebMapURLsResponse {
  /**
   * Normalized domain that was mapped.
   */
  domain: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Always `true` on success.
   */
  success: true;

  /**
   * URLs found on the domain, with page metadata when available.
   */
  urls: Array<WebMapURLsResponse.URL>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebMapURLsResponse.KeyMetadata;

  /**
   * `true` when the deadline passed with `timeoutOpts.behavior` set to
   * `return-partial`. Only results finished in time are included.
   */
  partial?: boolean;
}

export namespace WebMapURLsResponse {
  export interface URL {
    /**
     * Page URL.
     */
    url: string;

    /**
     * Page description, when available.
     */
    description?: string;

    /**
     * Keywords from the page's `keywords` meta tag.
     */
    keywords?: Array<string>;

    /**
     * Page language, when available.
     */
    language?: string;

    /**
     * Page title, when available.
     */
    title?: string;
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

export interface WebScrapeResponse {
  /**
   * The original HTTP response body, unchanged by waits, actions, and filters.
   */
  bytes: WebScrapeResponse.Bytes;

  /**
   * Cache status of this response.
   */
  cache_metadata: WebScrapeResponse.CacheMetadata;

  /**
   * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
   * omitted text.
   */
  highlights: WebScrapeResponse.Highlights;

  /**
   * Rendered HTML of the page, after content filters.
   */
  html: WebScrapeResponse.HTML;

  /**
   * Images found on the page, after content filters. `[]` when there are none.
   */
  images: WebScrapeResponse.Images;

  /**
   * Object matching `jsonParams.schema`.
   */
  json: WebScrapeResponse.Json;

  /**
   * Page content as Markdown, after content filters.
   */
  markdown: WebScrapeResponse.Markdown;

  /**
   * Page metadata. Fields are omitted when not found.
   */
  metadata: WebScrapeResponse.Metadata;

  /**
   * Fields extracted by `parseParams`. Custom rules return each field after content
   * filters, with `null` when nothing matches (`[]` for `list` rules). Prebuilt
   * parsers return the record or lists described under `parseParams.parser`.
   */
  parsed: WebScrapeResponse.Parsed;

  /**
   * Product details found on the page.
   */
  product: WebScrapeResponse.Product;

  /**
   * Browser profile used for this scrape. `null` when no profile was requested.
   */
  profile: WebScrapeResponse.Profile | null;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Screenshot as a base64 image data URL.
   */
  screenshot: WebScrapeResponse.Screenshot;

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
  key_metadata?: WebScrapeResponse.KeyMetadata;
}

export namespace WebScrapeResponse {
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

export interface WebScreenshotResponse {
  /**
   * Cache status of this response.
   */
  cache_metadata: WebScreenshotResponse.CacheMetadata;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * HTTP status code, repeated in the body.
   */
  code?: number;

  /**
   * Normalized domain that was captured.
   */
  domain?: string;

  /**
   * `loaded`, or `still-loading` when capture ended before the page finished
   * loading.
   */
  finalDOMState?: 'loaded' | 'still-loading';

  /**
   * Height of the returned image, in pixels.
   */
  height?: number;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebScreenshotResponse.KeyMetadata;

  /**
   * URL of the screenshot image. A data URL instead when `zdr` is `enabled` or
   * `headers` are sent.
   */
  screenshot?: string;

  /**
   * Whether the image covers the viewport or the full page.
   */
  screenshotType?: 'viewport' | 'fullPage';

  /**
   * Always `ok` on success.
   */
  status?: string;

  /**
   * Width of the returned image, in pixels.
   */
  width?: number;
}

export namespace WebScreenshotResponse {
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

export interface WebSearchResponse {
  /**
   * Cache status of this response.
   */
  cache_metadata: WebSearchResponse.CacheMetadata;

  /**
   * The query you sent.
   */
  query: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  results: Array<WebSearchResponse.Result>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebSearchResponse.KeyMetadata;

  /**
   * `true` when the deadline passed with `timeoutOpts.behavior` set to
   * `return-partial`. Only results finished in time are included. Partial results
   * are not cached.
   */
  partial?: boolean;
}

export namespace WebSearchResponse {
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

  export interface Result {
    /**
     * Snippet from the page. Empty string when no snippet is available.
     */
    description: string;

    /**
     * Highlights status and passages for this result.
     */
    highlights: Result.Highlights;

    /**
     * Markdown scrape status and content for this result.
     */
    markdown: Result.Markdown;

    /**
     * How relevant the result is to the query.
     */
    relevance: 'high' | 'medium' | 'low';

    /**
     * Page title.
     */
    title: string;

    /**
     * Canonical result URL.
     */
    url: string;
  }

  export namespace Result {
    /**
     * Highlights status and passages for this result.
     */
    export interface Highlights {
      /**
       * Highlights outcome for this result. Check it before reading `highlights`.
       */
      code:
        | 'SUCCESS'
        | 'NOT_REQUESTED'
        | 'TIMEOUT'
        | 'CONTENT_TOO_LARGE'
        | 'WEBSITE_ACCESS_ERROR'
        | 'WEBSITE_BLOCKED'
        | 'WEBSITE_NOT_FOUND'
        | 'ERROR';

      /**
       * Passages relevant to the query, in page order. `null` unless
       * `highlightsOptions.enabled` is `true` and the page was read.
       */
      highlights: Array<string> | null;

      /**
       * Why this output is missing. Present only when `code` is a failure.
       */
      message?: string;
    }

    /**
     * Markdown scrape status and content for this result.
     */
    export interface Markdown {
      /**
       * Scrape outcome for this result. Check it before reading `markdown`.
       */
      code:
        | 'SUCCESS'
        | 'NOT_REQUESTED'
        | 'TIMEOUT'
        | 'CONTENT_TOO_LARGE'
        | 'WEBSITE_ACCESS_ERROR'
        | 'WEBSITE_BLOCKED'
        | 'WEBSITE_NOT_FOUND'
        | 'ERROR';

      /**
       * Page content as GitHub-flavored Markdown. `null` unless
       * `markdownOptions.enabled` is `true` and the scrape succeeded.
       */
      markdown: string | null;

      /**
       * `loaded`, or `still-loading` when capture ended before the page finished
       * loading.
       */
      finalDOMState?: 'loaded' | 'still-loading';

      /**
       * Why this output is missing. Present only when `code` is a failure.
       */
      message?: string;
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

export interface WebWebCrawlMdResponse {
  /**
   * Cache status of this response.
   */
  cache_metadata: WebWebCrawlMdResponse.CacheMetadata;

  metadata: WebWebCrawlMdResponse.Metadata;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  results: Array<WebWebCrawlMdResponse.Result>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebWebCrawlMdResponse.KeyMetadata;

  /**
   * `true` when the deadline passed with `timeoutOpts.behavior` set to
   * `return-partial`. Only results finished in time are included. Partial results
   * are not cached.
   */
  partial?: boolean;
}

export namespace WebWebCrawlMdResponse {
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

  export interface Metadata {
    /**
     * Deepest link depth reached.
     */
    maxCrawlDepth: number;

    /**
     * Number of pages that failed.
     */
    numFailed: number;

    /**
     * Number of URLs skipped: PDFs when `pdf.shouldParse` is `false`, URLs that do not
     * match `urlRegex`, and URLs that match `excludeUrlRegex`.
     */
    numSkipped: number;

    /**
     * Number of pages crawled successfully.
     */
    numSucceeded: number;

    /**
     * Number of URLs crawled.
     */
    numUrls: number;
  }

  export interface Result {
    /**
     * Page content as Markdown. Empty string when the page failed.
     */
    markdown: string;

    metadata: Result.Metadata;
  }

  export namespace Result {
    export interface Metadata {
      /**
       * Link depth from the start URL. `0` is the start URL, `1` is one link away.
       */
      crawlDepth: number;

      /**
       * URL that was scraped, after redirects. Same as `sourceUrl` when unknown.
       */
      finalUrl: string;

      /**
       * URL that was requested, before redirects.
       */
      sourceUrl: string;

      /**
       * HTTP status code of the page. `0` when the page could not be retrieved.
       */
      statusCode: number;

      /**
       * Whether the page was fetched and parsed.
       */
      success: boolean;

      /**
       * Page title. Empty string when unavailable.
       */
      title: string;

      /**
       * URL fetched for this page.
       */
      url: string;

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
       * Why the page failed. Present only when `success` is `false`: `WEBSITE_BLOCKED`
       * (the site served an anti-bot challenge or access wall), `WEBSITE_ACCESS_ERROR`
       * (the page could not be retrieved or had no usable content), `NOT_FOUND`,
       * `UNSUPPORTED_CONTENT`, `NO_PUBLISHED_MARKDOWN`, or `INTERNAL_ERROR`.
       */
      error_code?: string;

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

export interface WebAnswersParams {
  /**
   * What to research, in plain language, up to 2000 characters. Include domains or
   * URLs to focus the research.
   */
  task: string;

  /**
   * Limit which sites the research can search, read, and cite.
   */
  controls?: WebAnswersParams.Controls;

  /**
   * Example of the answer object to return, not a JSON Schema. Up to 8 levels deep,
   * 500 values, and 16,000 characters. Values that cannot be found come back as
   * `null`. Defaults to `{ "result": "" }`.
   */
  json_format?: { [key: string]: unknown };

  /**
   * `fast` prioritizes speed and adds extra verification for people and companies;
   * `ultra` searches and reads more sources for deeper research. Defaults to
   * `ultra`.
   */
  mode?: 'fast' | 'ultra';

  /**
   * Access policy IDs to apply; each URL must pass all of them. Requires access
   * policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebAnswersParams.TimeoutOpts;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebAnswersParams {
  /**
   * Limit which sites the research can search, read, and cite.
   */
  export interface Controls {
    /**
     * Never search, read, or cite these sites, sections, or pages. Same format as
     * `sources`.
     */
    excludeSources?: Array<string>;

    /**
     * Only search, read, and cite these sites, sections, or pages. Each entry is a URL
     * prefix: `example.com` covers the site and its subdomains, `example.com/docs`
     * covers that section, and `example.com/docs/setup.html` is one page.
     */
    sources?: Array<string>;
  }

  /**
   * Request deadline and what to return when it passes.
   */
  export interface TimeoutOpts {
    /**
     * Deadline in milliseconds.
     */
    milliseconds: number;

    /**
     * `fail` returns 408 at the deadline. `return-partial` returns the results
     * collected so far and marks the response as partial.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebExtractCompetitorsParams {
  /**
   * Company domain, such as `stripe.com`. Full URLs are reduced to their domain.
   */
  domain: string;

  /**
   * Exact number of direct competitors to return.
   */
  numCompetitors?: number;

  /**
   * Comma-separated labels for this request, such as `production,team-alpha`. Filter
   * usage and request logs by them.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebExtractCompetitorsParams.TimeoutOpts;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebExtractCompetitorsParams {
  /**
   * Request deadline and what to return when it passes.
   */
  export interface TimeoutOpts {
    /**
     * Deadline in milliseconds.
     */
    milliseconds: number;

    /**
     * `fail` returns 408 at the deadline. `return-partial` returns the results
     * collected so far and marks the response as partial.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebExtractStyleguideParams {
  /**
   * Emulate a light or dark color scheme. Each scheme is cached separately.
   */
  colorScheme?: 'light' | 'dark';

  /**
   * Exact page URL to analyze. Provide either `domain` or `directUrl`, not both.
   */
  directUrl?: string;

  /**
   * Domain to analyze, such as `stripe.com`. Provide either `domain` or `directUrl`,
   * not both.
   */
  domain?: string;

  /**
   * Maximum age of a cached result, in milliseconds. `0` always fetches fresh.
   * Defaults to 90 days (7776000000 ms). Values above 1 year (31536000000 ms) are
   * capped at 1 year.
   */
  maxAgeMs?: number | null;

  /**
   * Comma-separated access policy IDs to apply; each URL must pass all of them.
   * Requires access policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Comma-separated labels for this request, such as `production,team-alpha`. Filter
   * usage and request logs by them.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebExtractStyleguideParams.TimeoutOpts;

  /**
   * `enabled` turns off request logs and traces and keeps request and response
   * content out of usage logs. Brand data and hosted assets may still be stored.
   * Returns 403 `ZDR_NOT_ENABLED` unless your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebExtractStyleguideParams {
  /**
   * Request deadline and what to return when it passes.
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

export interface WebMapURLsParams {
  /**
   * Domain to map, such as `stripe.com`.
   */
  domain: string;

  /**
   * Leave out URLs matching this regex, even when they match `urlRegex`.
   */
  excludeUrlRegex?: string;

  /**
   * HTTP headers to send to the target site. Requests with headers skip the cache.
   */
  headers?: { [key: string]: string };

  /**
   * Include URLs on subdomains.
   */
  includeSubdomains?: boolean;

  /**
   * Maximum number of URLs to return.
   */
  maxLinks?: number;

  /**
   * Comma-separated access policy IDs to apply; each URL must pass all of them.
   * Requires access policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Filter URLs by a topic or phrase, most relevant first.
   */
  search?: string;

  /**
   * Fetch this sitemap instead of discovering sitemaps. Must belong to the domain or
   * a subdomain.
   */
  sitemapUrl?: string;

  /**
   * Comma-separated labels for this request, such as `production,team-alpha`. Filter
   * usage and request logs by them.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebMapURLsParams.TimeoutOpts;

  /**
   * Only return URLs matching this regex. Only matches count toward `maxLinks`.
   */
  urlRegex?: string;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebMapURLsParams {
  /**
   * Request deadline and what to return when it passes.
   */
  export interface TimeoutOpts {
    /**
     * Deadline in milliseconds.
     */
    milliseconds: number;

    /**
     * `fail` returns 408 at the deadline. `return-partial` returns the results
     * collected so far and marks the response as partial.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebScrapeParams {
  /**
   * Outputs to return. Set at least one to `true`.
   */
  formats: WebScrapeParams.Formats;

  /**
   * Public HTTP or HTTPS URL to scrape.
   */
  url: string;

  /**
   * Query for the `highlights` output. Required when `formats.highlights` is `true`,
   * and allowed only then.
   */
  highlightsParams?: WebScrapeParams.HighlightsParams;

  /**
   * Options for the `images` output. Requires `formats.images: true`.
   */
  imageParams?: WebScrapeParams.ImageParams;

  /**
   * Schema and instructions for the `json` output. Required when `formats.json` is
   * `true`, and allowed only then.
   */
  jsonParams?: WebScrapeParams.JsonParams;

  /**
   * Options for the `markdown` output. Requires `formats.markdown: true`.
   */
  markdownParams?: WebScrapeParams.MarkdownParams;

  /**
   * Maximum age of a cached result, in milliseconds. `0` always fetches fresh.
   * Defaults to 3 days (259200000 ms). Maximum: 1 year (31536000000 ms).
   */
  maxAgeMs?: number;

  /**
   * Custom rules or a prebuilt parser for the `parsed` output. Required when
   * `formats.parse` is `true`, and allowed only then.
   */
  parseParams?: WebScrapeParams.CustomParser | WebScrapeParams.PrebuiltParser;

  /**
   * Access policy IDs to apply; each URL must pass all of them. Requires access
   * policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Options for the `product` output. Requires `formats.product: true`.
   */
  productParams?: WebScrapeParams.ProductParams;

  /**
   * Options for the `screenshot` output. Requires `formats.screenshot: true`.
   */
  screenshotParams?: WebScrapeParams.ScreenshotParams;

  /**
   * Browser and content settings shared by all outputs.
   */
  sharedParams?: WebScrapeParams.SharedParams;

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebScrapeParams.TimeoutOpts;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebScrapeParams {
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
    actions?: Array<SharedParams.Perform | SharedParams.Scroll | SharedParams.Wait | SharedParams.WaitFor>;

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
   * Request deadline and what to return when it passes.
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

export interface WebScreenshotParams {
  /**
   * Dismiss cookie banners and close other popups and overlays before capture.
   */
  clearPopups?: boolean;

  /**
   * Emulate a light or dark color scheme.
   */
  colorScheme?: 'light' | 'dark';

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
   * Exact URL to capture, such as `https://example.com/pricing`. Provide either
   * `domain` or `directUrl`, not both.
   */
  directUrl?: string;

  /**
   * Domain to capture, such as `stripe.com`. Provide either `domain` or `directUrl`,
   * not both.
   */
  domain?: string;

  /**
   * Capture the full scrollable page instead of only the viewport.
   */
  fullScreenshot?: 'true' | 'false';

  /**
   * Dismiss cookie consent banners before capture.
   */
  handleCookiePopup?: boolean;

  /**
   * HTTP headers to send to the target origin, such as
   * `headers[Authorization]=Bearer token`. Requests with headers skip the cache and
   * return the image as a data URL.
   */
  headers?: { [key: string]: string };

  /**
   * Maximum age of a cached result, in milliseconds. `0` always fetches fresh.
   * Defaults to 1 day (86400000 ms). Maximum: 30 days (2592000000 ms).
   */
  maxAgeMs?: number | null;

  /**
   * Capture this type of page instead of the home page. Context.dev finds it among
   * the domain's links, in 30 languages. Only with `domain`.
   */
  page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact';

  /**
   * Return the viewport-sized slice of the full page that starts this many pixels
   * from the top. Step by the viewport height, such as `0`, `1080`, `2160`, to walk
   * a long page. The last slice can be shorter. Overrides `fullScreenshot`.
   */
  scrollOffset?: number | null;

  /**
   * Comma-separated labels for this request, such as `production,team-alpha`. Filter
   * usage and request logs by them.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebScreenshotParams.TimeoutOpts;

  /**
   * Browser viewport size in pixels.
   */
  viewport?: WebScreenshotParams.Viewport;

  /**
   * Time to wait after the page loads before capturing, in milliseconds. `0` waits
   * 500 ms. `timeoutOpts.milliseconds` must be at least `waitForMs` plus 10000 ms,
   * or the request fails with `TIMEOUT_TOO_SHORT_FOR_WAIT`.
   */
  waitForMs?: number | null;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebScreenshotParams {
  /**
   * Request deadline and what to return when it passes.
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

  /**
   * Browser viewport size in pixels.
   */
  export interface Viewport {
    /**
     * Viewport height in pixels.
     */
    height?: number;

    /**
     * Viewport width in pixels.
     */
    width?: number;
  }
}

export interface WebSearchParams {
  /**
   * Search query. Accepts natural language and search operators such as `site:`,
   * `-site:`, `inurl:`, `intitle:`, quoted phrases, and `OR`.
   */
  query: string;

  /**
   * Localize results to this country, as an ISO 3166-1 alpha-2 code such as `us` or
   * `de`.
   */
  country?:
    | 'af'
    | 'al'
    | 'dz'
    | 'as'
    | 'ad'
    | 'ao'
    | 'ai'
    | 'aq'
    | 'ag'
    | 'ar'
    | 'am'
    | 'aw'
    | 'au'
    | 'at'
    | 'az'
    | 'bs'
    | 'bh'
    | 'bd'
    | 'bb'
    | 'by'
    | 'be'
    | 'bz'
    | 'bj'
    | 'bm'
    | 'bt'
    | 'bo'
    | 'ba'
    | 'bw'
    | 'bv'
    | 'br'
    | 'io'
    | 'bn'
    | 'bg'
    | 'bf'
    | 'bi'
    | 'kh'
    | 'cm'
    | 'ca'
    | 'cv'
    | 'ky'
    | 'cf'
    | 'td'
    | 'cl'
    | 'cn'
    | 'cx'
    | 'cc'
    | 'co'
    | 'km'
    | 'cg'
    | 'cd'
    | 'ck'
    | 'cr'
    | 'ci'
    | 'hr'
    | 'cu'
    | 'cy'
    | 'cz'
    | 'dk'
    | 'dj'
    | 'dm'
    | 'do'
    | 'ec'
    | 'eg'
    | 'sv'
    | 'gq'
    | 'er'
    | 'ee'
    | 'et'
    | 'fk'
    | 'fo'
    | 'fj'
    | 'fi'
    | 'fr'
    | 'gf'
    | 'pf'
    | 'tf'
    | 'ga'
    | 'gm'
    | 'ge'
    | 'de'
    | 'gh'
    | 'gi'
    | 'gr'
    | 'gl'
    | 'gd'
    | 'gp'
    | 'gu'
    | 'gt'
    | 'gn'
    | 'gw'
    | 'gy'
    | 'ht'
    | 'hm'
    | 'va'
    | 'hn'
    | 'hk'
    | 'hu'
    | 'is'
    | 'in'
    | 'id'
    | 'ir'
    | 'iq'
    | 'ie'
    | 'il'
    | 'it'
    | 'jm'
    | 'jp'
    | 'jo'
    | 'kz'
    | 'ke'
    | 'ki'
    | 'kp'
    | 'kr'
    | 'kw'
    | 'kg'
    | 'la'
    | 'lv'
    | 'lb'
    | 'ls'
    | 'lr'
    | 'ly'
    | 'li'
    | 'lt'
    | 'lu'
    | 'mo'
    | 'mk'
    | 'mg'
    | 'mw'
    | 'my'
    | 'mv'
    | 'ml'
    | 'mt'
    | 'mh'
    | 'mq'
    | 'mr'
    | 'mu'
    | 'yt'
    | 'mx'
    | 'fm'
    | 'md'
    | 'mc'
    | 'mn'
    | 'ms'
    | 'ma'
    | 'mz'
    | 'mm'
    | 'na'
    | 'nr'
    | 'np'
    | 'nl'
    | 'an'
    | 'nc'
    | 'nz'
    | 'ni'
    | 'ne'
    | 'ng'
    | 'nu'
    | 'nf'
    | 'mp'
    | 'no'
    | 'om'
    | 'pk'
    | 'pw'
    | 'ps'
    | 'pa'
    | 'pg'
    | 'py'
    | 'pe'
    | 'ph'
    | 'pn'
    | 'pl'
    | 'pt'
    | 'pr'
    | 'qa'
    | 're'
    | 'ro'
    | 'ru'
    | 'rw'
    | 'sh'
    | 'kn'
    | 'lc'
    | 'pm'
    | 'vc'
    | 'ws'
    | 'sm'
    | 'st'
    | 'sa'
    | 'sn'
    | 'rs'
    | 'sc'
    | 'sl'
    | 'sg'
    | 'sk'
    | 'si'
    | 'sb'
    | 'so'
    | 'za'
    | 'gs'
    | 'es'
    | 'lk'
    | 'sd'
    | 'sr'
    | 'sj'
    | 'sz'
    | 'se'
    | 'ch'
    | 'sy'
    | 'tw'
    | 'tj'
    | 'tz'
    | 'th'
    | 'tl'
    | 'tg'
    | 'tk'
    | 'to'
    | 'tt'
    | 'tn'
    | 'tr'
    | 'tm'
    | 'tc'
    | 'tv'
    | 'ug'
    | 'ua'
    | 'ae'
    | 'gb'
    | 'us'
    | 'um'
    | 'uy'
    | 'uz'
    | 'vu'
    | 've'
    | 'vn'
    | 'vg'
    | 'vi'
    | 'wf'
    | 'eh'
    | 'ye'
    | 'zm'
    | 'zw';

  /**
   * Maximum length of each result's `description`, in characters.
   */
  descriptionMaxCharacters?: number | null;

  /**
   * Leave out results from these domains, such as `pinterest.com`.
   */
  excludeDomains?: Array<string>;

  /**
   * Restrict results to content published within this window.
   */
  freshness?: 'last_24_hours' | 'last_week' | 'last_month' | 'last_year';

  /**
   * Return passages from each result page that are relevant to the query. Pages are
   * read with the `markdownOptions` settings.
   */
  highlightsOptions?: WebSearchParams.HighlightsOptions | null;

  /**
   * Only return results from these domains, such as `arxiv.org`.
   */
  includeDomains?: Array<string>;

  /**
   * Languages to return results in, as BCP 47 codes such as `en` or `de`, or `all`
   * for any language.
   */
  languages?:
    | 'all'
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
   * Scrape each result page to Markdown. Set `enabled` to `true` to turn it on.
   */
  markdownOptions?: WebSearchParams.MarkdownOptions | null;

  /**
   * Number of results to return.
   */
  numResults?: number;

  /**
   * Access policy IDs to apply; each URL must pass all of them. Requires access
   * policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebSearchParams.TimeoutOpts;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebSearchParams {
  /**
   * Return passages from each result page that are relevant to the query. Pages are
   * read with the `markdownOptions` settings.
   */
  export interface HighlightsOptions {
    /**
     * Return relevant passages for each result. Adds 1 credit per 10 results.
     */
    enabled?: boolean;

    /**
     * Maximum combined length of passages per result, in characters.
     */
    maxCharacters?: number;
  }

  /**
   * Scrape each result page to Markdown. Set `enabled` to `true` to turn it on.
   */
  export interface MarkdownOptions {
    /**
     * Scrape each result page to Markdown. Adds 1 credit per result that returns
     * Markdown.
     */
    enabled?: boolean;

    /**
     * Which iframe contents to include in the Markdown. `auto` inlines only iframes
     * that hold page content, such as same-site documents, framesets, job boards,
     * forms, and embedded documents, and skips ads and widgets. `true` inlines every
     * iframe; `false` inlines none.
     */
    includeFrames?: boolean | 'auto';

    /**
     * Include image references in the Markdown.
     */
    includeImages?: boolean;

    /**
     * Keep link URLs in the Markdown.
     */
    includeLinks?: boolean;

    /**
     * Maximum age of a cached result, in milliseconds. `0` always fetches fresh.
     * Defaults to 180 days (15552000000 ms) with Markdown, or 365 days (31536000000
     * ms) with highlights only.
     */
    maxAgeMs?: number | null;

    /**
     * Whether to parse PDFs and which pages to read.
     */
    pdf?: MarkdownOptions.Pdf;

    /**
     * Shorten inline base64 image data.
     */
    shortenBase64Images?: boolean;

    /**
     * Request deadline and what to return when it passes.
     */
    timeoutOpts?: MarkdownOptions.TimeoutOpts;

    /**
     * Keep only the main content, without navigation, headers, footers, or sidebars.
     */
    useMainContentOnly?: boolean;

    /**
     * Time to wait after each result page loads before reading it, in milliseconds.
     * `0` waits 500 ms. Helps with JavaScript-heavy pages.
     */
    waitForMs?: number | null;
  }

  export namespace MarkdownOptions {
    /**
     * Whether to parse PDFs and which pages to read.
     */
    export interface Pdf {
      /**
       * Last page to parse. Defaults to the last page. Must be at least `start`.
       */
      end?: number;

      /**
       * Parse PDF results. When `false`, PDF results fail with `WEBSITE_ACCESS_ERROR`.
       */
      shouldParse?: boolean;

      /**
       * First page to parse, starting at 1.
       */
      start?: number;
    }

    /**
     * Request deadline and what to return when it passes.
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
   * Request deadline and what to return when it passes.
   */
  export interface TimeoutOpts {
    /**
     * Deadline in milliseconds.
     */
    milliseconds: number;

    /**
     * `fail` returns 408 at the deadline. `return-partial` returns the results
     * collected so far and marks the response as partial.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebWebCrawlMdParams {
  /**
   * Start URL, including `http://` or `https://`.
   */
  url: string;

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
   * Remove elements matching these CSS selectors. Overrides `includeSelectors`.
   */
  excludeSelectors?: Array<string> | null;

  /**
   * Never follow or scrape URLs matching this regex, even when they match
   * `urlRegex`. The start URL is always scraped.
   */
  excludeUrlRegex?: string;

  /**
   * Follow links to subdomains of the start URL's domain, such as `docs.example.com`
   * from `example.com`. `www` and the apex domain always count as the same site.
   */
  followSubdomains?: boolean;

  /**
   * Which iframe contents to include in each page's Markdown. `auto` inlines only
   * iframes that hold page content, such as same-site documents, framesets, job
   * boards, forms, and embedded documents, and skips ads and widgets. `true` inlines
   * every iframe; `false` inlines none.
   */
  includeFrames?: boolean | 'auto';

  /**
   * Include image references in the Markdown (`html-conversion` only).
   */
  includeImages?: boolean;

  /**
   * Keep link URLs in the Markdown (`html-conversion` only).
   */
  includeLinks?: boolean;

  /**
   * Keep only elements matching these CSS selectors.
   */
  includeSelectors?: Array<string> | null;

  /**
   * Maximum age of a cached result, in milliseconds. `0` always fetches fresh.
   * Defaults to 1 day (86400000 ms). Maximum: 30 days (2592000000 ms).
   */
  maxAgeMs?: number | null;

  /**
   * Maximum link depth from the start URL. `0` crawls only the start URL. Omit for
   * no depth limit.
   */
  maxDepth?: number;

  /**
   * Maximum number of pages to crawl.
   */
  maxPages?: number;

  /**
   * Whether to parse PDFs and which pages to read.
   */
  pdf?: WebWebCrawlMdParams.Pdf;

  /**
   * Access policy IDs to apply; each URL must pass all of them. Requires access
   * policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * Wait briefly for CSS animations and transitions to settle before reading each
   * page.
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
   * Soft time budget for the crawl, in milliseconds. When it runs out, the crawl
   * returns the pages collected so far. Larger values are capped at 110 seconds.
   */
  stopAfterMs?: number;

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebWebCrawlMdParams.TimeoutOpts;

  /**
   * Only follow and scrape URLs matching this regex. A prefix pattern of the form
   * `^<start URL>` also follows a redirect of the start page.
   */
  urlRegex?: string;

  /**
   * Keep only the main content, without navigation, headers, footers, or sidebars.
   */
  useMainContentOnly?: boolean;

  /**
   * Time to wait after each page loads before reading it, in milliseconds. `0` waits
   * 500 ms. `timeoutOpts.milliseconds` must be at least `waitForMs` plus 10000 ms,
   * or the request fails with `TIMEOUT_TOO_SHORT_FOR_WAIT`.
   */
  waitForMs?: number | null;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebWebCrawlMdParams {
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
     * Parse PDF pages. When `false`, PDFs are left out of the results and not counted
     * as failures.
     */
    shouldParse?: boolean;

    /**
     * First page to parse, starting at 1.
     */
    start?: number;
  }

  /**
   * Request deadline and what to return when it passes.
   */
  export interface TimeoutOpts {
    /**
     * Deadline in milliseconds.
     */
    milliseconds: number;

    /**
     * `fail` returns 408 at the deadline. `return-partial` returns the results
     * collected so far and marks the response as partial.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export declare namespace Web {
  export {
    type WebAnswersResponse as WebAnswersResponse,
    type WebExtractCompetitorsResponse as WebExtractCompetitorsResponse,
    type WebExtractStyleguideResponse as WebExtractStyleguideResponse,
    type WebMapURLsResponse as WebMapURLsResponse,
    type WebScrapeResponse as WebScrapeResponse,
    type WebScreenshotResponse as WebScreenshotResponse,
    type WebSearchResponse as WebSearchResponse,
    type WebWebCrawlMdResponse as WebWebCrawlMdResponse,
    type WebAnswersParams as WebAnswersParams,
    type WebExtractCompetitorsParams as WebExtractCompetitorsParams,
    type WebExtractStyleguideParams as WebExtractStyleguideParams,
    type WebMapURLsParams as WebMapURLsParams,
    type WebScrapeParams as WebScrapeParams,
    type WebScreenshotParams as WebScreenshotParams,
    type WebSearchParams as WebSearchParams,
    type WebWebCrawlMdParams as WebWebCrawlMdParams,
  };
}
