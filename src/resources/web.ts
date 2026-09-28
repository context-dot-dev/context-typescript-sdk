// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Web extends APIResource {
  /**
   * Research the web and return a sourced answer in your JSON shape. Choose `fast`
   * for a short task or `ultra` for deeper research.
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
   * Analyze a company's landing page and web search evidence to return direct
   * competitors for the same product or market.
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
   * Extract colors, typography, spacing, and component styles from a website.
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
   * Discover a site's URLs, with page titles, descriptions, keywords, and language
   * when available. Metadata can be missing on newly discovered URLs.
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
   * Scrape anything from a URL on the internet. Returns the outputs you enable in
   * formats. Handles PDFs, DOCX, PPT, XLSX, and 40 other file formats.
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
   * Capture a screenshot of a website.
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
   * Search the web and optionally return page content with each result.
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
   * Crawl a website and return page content as Markdown. Use a batch for crawls
   * beyond 500 pages.
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
   * The answer, in the shape requested by json_format.
   */
  json_content: { [key: string]: unknown };

  /**
   * Public evidence URLs from searches, pages, or company/profile records, in
   * first-seen order. A listed URL may identify a record without its page being
   * read.
   */
  sources: Array<string>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebAnswersResponse.KeyMetadata;

  /**
   * True when the request deadline ended research and the answer uses the evidence
   * collected so far.
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface WebExtractCompetitorsResponse {
  /**
   * Direct competitors ordered by relevance and confidence.
   */
  competitors: Array<WebExtractCompetitorsResponse.Competitor>;

  /**
   * Normalized input domain.
   */
  domain: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Status of the response.
   */
  status: 'ok';

  /**
   * Target company profile inferred from the landing page.
   */
  target: WebExtractCompetitorsResponse.Target;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebExtractCompetitorsResponse.KeyMetadata;

  /**
   * True when the timeout ended processing and this response contains only usable
   * results completed so far. Unfinished results are omitted.
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
     * Short description of the competitor.
     */
    description: string;

    /**
     * Competitor's normalized official domain.
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
     * Competitor website URL.
     */
    url: string;
  }

  /**
   * Target company profile inferred from the landing page.
   */
  export interface Target {
    /**
     * Company or product name inferred from the landing page.
     */
    companyName: string;

    /**
     * Specific operating field, product category, or market.
     */
    field: string;

    /**
     * One-sentence description of what the target company sells and who it serves.
     */
    fieldDescription: string;

    /**
     * Resolved URL used for the landing page analysis.
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
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface WebExtractStyleguideResponse {
  /**
   * Whether this response came from cache.
   */
  cache_metadata: WebExtractStyleguideResponse.CacheMetadata;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * HTTP status code
   */
  code?: number;

  /**
   * The normalized domain that was processed
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
   * Comprehensive styleguide data extracted from the website
   */
  styleguide?: WebExtractStyleguideResponse.Styleguide;
}

export namespace WebExtractStyleguideResponse {
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
   * Comprehensive styleguide data extracted from the website
   */
  export interface Styleguide {
    /**
     * Primary colors used on the website
     */
    colors: Styleguide.Colors;

    /**
     * UI component styles
     */
    components: Styleguide.Components;

    /**
     * Spacing system used on the website
     */
    elementSpacing: Styleguide.ElementSpacing;

    /**
     * Font assets keyed by family name as it appears in fontFamily/fontFallbacks
     * (non-generic names only). Clients match typography.fontFamily / fontWeight or
     * button styles to pick a file URL from files.
     */
    fontLinks: { [key: string]: Styleguide.FontLinks };

    /**
     * The primary color mode of the website design
     */
    mode: 'light' | 'dark';

    /**
     * Shadow styles used on the website
     */
    shadows: Styleguide.Shadows;

    /**
     * Typography styles used on the website
     */
    typography: Styleguide.Typography;
  }

  export namespace Styleguide {
    /**
     * Primary colors used on the website
     */
    export interface Colors {
      /**
       * Accent color (hex format)
       */
      accent: string;

      /**
       * Background color (hex format)
       */
      background: string;

      /**
       * Text color (hex format)
       */
      text: string;
    }

    /**
     * UI component styles
     */
    export interface Components {
      /**
       * Button component styles
       */
      button: Components.Button;

      /**
       * Card component style
       */
      card?: Components.Card;
    }

    export namespace Components {
      /**
       * Button component styles
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
           * Border color as CSS hex (#RRGGBB or #RRGGBBAA when computed border-color has
           * alpha)
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed box-shadow (comma-separated layers when present)
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declaration block for this component style
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Sampled minimum height of the button box (typically px)
           */
          minHeight: string;

          /**
           * Minimum width (usually px).
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full ordered font list from computed font-family
           */
          fontFallbacks?: Array<string>;

          /**
           * Primary button typeface (first in fontFallbacks)
           */
          fontFamily?: string;

          /**
           * Hex color of the underline when it differs from the text color
           */
          textDecorationColor?: string;
        }

        export interface Primary {
          backgroundColor: string;

          /**
           * Border color as CSS hex (#RRGGBB or #RRGGBBAA when computed border-color has
           * alpha)
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed box-shadow (comma-separated layers when present)
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declaration block for this component style
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Sampled minimum height of the button box (typically px)
           */
          minHeight: string;

          /**
           * Minimum width (usually px).
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full ordered font list from computed font-family
           */
          fontFallbacks?: Array<string>;

          /**
           * Primary button typeface (first in fontFallbacks)
           */
          fontFamily?: string;

          /**
           * Hex color of the underline when it differs from the text color
           */
          textDecorationColor?: string;
        }

        export interface Secondary {
          backgroundColor: string;

          /**
           * Border color as CSS hex (#RRGGBB or #RRGGBBAA when computed border-color has
           * alpha)
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed box-shadow (comma-separated layers when present)
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declaration block for this component style
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Sampled minimum height of the button box (typically px)
           */
          minHeight: string;

          /**
           * Minimum width (usually px).
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full ordered font list from computed font-family
           */
          fontFallbacks?: Array<string>;

          /**
           * Primary button typeface (first in fontFallbacks)
           */
          fontFamily?: string;

          /**
           * Hex color of the underline when it differs from the text color
           */
          textDecorationColor?: string;
        }
      }

      /**
       * Card component style
       */
      export interface Card {
        backgroundColor: string;

        /**
         * Border color as CSS hex (#RRGGBB or #RRGGBBAA when computed border-color has
         * alpha)
         */
        borderColor: string;

        borderRadius: string;

        borderStyle: string;

        borderWidth: string;

        boxShadow: string;

        /**
         * Ready-to-use CSS declaration block for this component style
         */
        css: string;

        padding: string;

        textColor: string;
      }
    }

    /**
     * Spacing system used on the website
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
       * Upright font files keyed by weight string (e.g. "400" for regular, "500",
       * "700"). Values are absolute URLs.
       */
      files: { [key: string]: string };

      type: 'google' | 'custom';

      /**
       * Google Fonts category when type is google (e.g. sans-serif, serif, monospace,
       * display, handwriting). Omitted for custom fonts when unknown.
       */
      category?: string;

      /**
       * Present when type is custom: human-readable name derived from the fontLinks key
       * (strip build/hash suffixes, split camelCase / PascalCase, normalize separators).
       * Google entries omit this.
       */
      displayName?: string;
    }

    /**
     * Shadow styles used on the website
     */
    export interface Shadows {
      inner: string;

      lg: string;

      md: string;

      sm: string;

      xl: string;
    }

    /**
     * Typography styles used on the website
     */
    export interface Typography {
      /**
       * Heading styles
       */
      headings: Typography.Headings;

      p?: Typography.P;
    }

    export namespace Typography {
      /**
       * Heading styles
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
           * Full ordered font list from resolved computed font-family
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
           * Full ordered font list from resolved computed font-family
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
           * Full ordered font list from resolved computed font-family
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
           * Full ordered font list from resolved computed font-family
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
         * Full ordered font list from resolved computed font-family
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
  domain: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  success: true;

  urls: Array<WebMapURLsResponse.URL>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebMapURLsResponse.KeyMetadata;

  partial?: boolean;
}

export namespace WebMapURLsResponse {
  export interface URL {
    url: string;

    description?: string;

    keywords?: Array<string>;

    language?: string;

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
     * Credits remaining for your organization.
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
   * Whether this response came from cache.
   */
  cache_metadata: WebScrapeResponse.CacheMetadata;

  /**
   * Relevant Markdown excerpts in page order. `[Heading]` adds context; `…` marks
   * omitted text.
   */
  highlights: WebScrapeResponse.Highlights;

  /**
   * Rendered HTML after content filters.
   */
  html: WebScrapeResponse.HTML;

  /**
   * Images after content filters. `[]` when none are found.
   */
  images: WebScrapeResponse.Images;

  /**
   * Object matching `jsonParams.schema`.
   */
  json: WebScrapeResponse.Json;

  /**
   * Markdown after content filters.
   */
  markdown: WebScrapeResponse.Markdown;

  /**
   * Page metadata. Fields are omitted when not found.
   */
  metadata: WebScrapeResponse.Metadata;

  /**
   * Fields from `parseParams.rules`, after content filters. Unmatched fields are
   * `null` (`[]` for lists).
   */
  parsed: WebScrapeResponse.Parsed;

  /**
   * Product details found on the page.
   */
  product: WebScrapeResponse.Product;

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
   * True when at least one requested output succeeds but the response has failed or
   * incomplete outputs. Absent when all requested outputs fail.
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
       * Body as base64, after HTTP decompression. Up to 20 MiB decoded.
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
   * Fields from `parseParams.rules`, after content filters. Unmatched fields are
   * `null` (`[]` for lists).
   */
  export interface Parsed {
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

export interface WebScreenshotResponse {
  /**
   * Whether this response came from cache.
   */
  cache_metadata: WebScreenshotResponse.CacheMetadata;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * HTTP status code
   */
  code?: number;

  /**
   * The normalized domain that was processed
   */
  domain?: string;

  /**
   * `loaded`, or `still-loading` when capture ended before the page finished
   * loading.
   */
  finalDOMState?: 'loaded' | 'still-loading';

  /**
   * Height in pixels of the returned screenshot image
   */
  height?: number;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: WebScreenshotResponse.KeyMetadata;

  /**
   * Public image URL for standard requests, or an in-memory data URL when ZDR or
   * non-empty custom headers are supplied.
   */
  screenshot?: string;

  /**
   * Type of screenshot that was captured
   */
  screenshotType?: 'viewport' | 'fullPage';

  /**
   * Always `ok` on success.
   */
  status?: string;

  /**
   * Width in pixels of the returned screenshot image
   */
  width?: number;
}

export namespace WebScreenshotResponse {
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

export interface WebSearchResponse {
  /**
   * Whether this response came from cache.
   */
  cache_metadata: WebSearchResponse.CacheMetadata;

  /**
   * Echo of the original query (useful when fanout was enabled).
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
   * True when timeoutOpts.behavior=return-partial returned the usable results
   * collected before the deadline. Partial collections are not cached as complete
   * results.
   */
  partial?: boolean;
}

export namespace WebSearchResponse {
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

  export interface Result {
    /**
     * Snippet excerpt from the page. Empty string when the search provider does not
     * supply a snippet.
     */
    description: string;

    /**
     * Markdown scrape status and content for this result.
     */
    markdown: Result.Markdown;

    /**
     * Relevance to the original query.
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
     * Markdown scrape status and content for this result.
     */
    export interface Markdown {
      /**
       * Per-result scrape outcome. Inspect this before reading `markdown`.
       */
      code: 'SUCCESS' | 'NOT_REQUESTED' | 'TIMEOUT' | 'CONTENT_TOO_LARGE' | 'WEBSITE_ACCESS_ERROR' | 'ERROR';

      /**
       * GFM Markdown of the page. Null unless markdownOptions.enabled is true and
       * scraping succeeded.
       */
      markdown: string | null;

      /**
       * `loaded`, or `still-loading` when capture ended before the page finished
       * loading.
       */
      finalDOMState?: 'loaded' | 'still-loading';
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

export interface WebWebCrawlMdResponse {
  /**
   * Whether this response came from cache.
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
   * True when timeoutOpts.behavior=return-partial returned the usable results
   * collected before the deadline. Partial collections are not cached as complete
   * results.
   */
  partial?: boolean;
}

export namespace WebWebCrawlMdResponse {
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

  export interface Metadata {
    /**
     * Maximum crawl depth reached during the crawl
     */
    maxCrawlDepth: number;

    /**
     * Number of pages that failed to crawl
     */
    numFailed: number;

    /**
     * Number of URLs skipped (PDFs when pdf.shouldParse=false, or URLs not matching
     * urlRegex)
     */
    numSkipped: number;

    /**
     * Number of pages successfully crawled
     */
    numSucceeded: number;

    /**
     * Total number of URLs crawled
     */
    numUrls: number;
  }

  export interface Result {
    /**
     * Extracted page content as Markdown (empty string on failure)
     */
    markdown: string;

    metadata: Result.Metadata;
  }

  export namespace Result {
    export interface Metadata {
      /**
       * Depth relative to the start URL. 0 = start URL, 1 = one link away.
       */
      crawlDepth: number;

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
       * HTTP status code of the response
       */
      statusCode: number;

      /**
       * true if the page was fetched and parsed successfully
       */
      success: boolean;

      /**
       * Best page title extracted from the page (empty string if unavailable).
       */
      title: string;

      /**
       * The crawl URL fetched for this page.
       */
      url: string;

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

export interface WebAnswersParams {
  /**
   * Research task. The agent selects company/profile lookups, web searches, or page
   * reads. Include domains or URLs to focus the research.
   */
  task: string;

  /**
   * Example answer object, not JSON Schema. Up to 8 levels, 500 values, and 16000
   * characters; unknowns may be null.
   */
  json_format?: { [key: string]: unknown };

  /**
   * `fast` prioritizes speed, with extra verification for people and companies;
   * `ultra` supports deeper research (default).
   */
  mode?: 'fast' | 'ultra';

  /**
   * Labels for filtering usage in the dashboard.
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
   * Request deadline and what to return when it passes.
   */
  export interface TimeoutOpts {
    /**
     * Deadline in milliseconds.
     */
    milliseconds: number;

    /**
     * "fail" returns 408 at the deadline. "return-partial" returns available results;
     * inspect the response’s partial flag.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebExtractCompetitorsParams {
  /**
   * Company domain to analyze, such as `stripe.com`. Full http(s) URLs are accepted
   * and normalized to their domain.
   */
  domain: string;

  /**
   * Exact number of direct competitors to return. Defaults to 5.
   */
  numCompetitors?: number;

  /**
   * Comma-separated labels for filtering usage, e.g. `production,team-alpha`.
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
     * "fail" returns 408 at the deadline. "return-partial" returns available results;
     * inspect the response’s partial flag.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebExtractStyleguideParams {
  /**
   * Optional browser color scheme to emulate for websites that respond to
   * prefers-color-scheme. This value is part of the styleguide cache key.
   */
  colorScheme?: 'light' | 'dark';

  /**
   * Exact URL to inspect. Provide either `domain` or `directUrl`, not both.
   */
  directUrl?: string;

  /**
   * Domain name to extract styleguide from (e.g., 'example.com', 'google.com'). The
   * domain will be automatically normalized and validated. You must provide either
   * 'domain' or 'directUrl', but not both.
   */
  domain?: string;

  /**
   * Maximum age of cached brand data in ms. Defaults to 3 months; clamped to 0–1
   * year. `0` refreshes.
   */
  maxAgeMs?: number | null;

  /**
   * Comma-separated labels for filtering usage, e.g. `production,team-alpha`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebExtractStyleguideParams.TimeoutOpts;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
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
     * "fail" returns 408 at the deadline. "return-partial" returns available results;
     * inspect the response’s partial flag. "return-partial" requires at least 5000 ms.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebMapURLsParams {
  /**
   * Domain to map, e.g. `stripe.com`.
   */
  domain: string;

  /**
   * HTTP headers for the target origin. Non-empty headers bypass caching.
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
   * Filter URLs by a topic or phrase, most relevant first.
   */
  search?: string;

  /**
   * Fetch this sitemap instead of discovering sitemaps. Must belong to the domain or
   * a subdomain.
   */
  sitemapUrl?: string;

  /**
   * Comma-separated labels for filtering usage, e.g. `production,team-alpha`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebMapURLsParams.TimeoutOpts;

  /**
   * Optional RE2-compatible regex pattern. Only URLs matching this pattern are
   * returned and counted against maxLinks.
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
     * "fail" returns 408 at the deadline. "return-partial" returns available results;
     * inspect the response’s partial flag.
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
   * Required when `formats.highlights` is `true`.
   */
  highlightsParams?: WebScrapeParams.HighlightsParams;

  /**
   * Image options. Requires formats.images: true.
   */
  imageParams?: WebScrapeParams.ImageParams;

  /**
   * Required when formats.json is true.
   */
  jsonParams?: WebScrapeParams.JsonParams;

  /**
   * Markdown options. Requires `formats.markdown`.
   */
  markdownParams?: WebScrapeParams.MarkdownParams;

  /**
   * Maximum age of a cached output, in milliseconds. `0` fetches fresh. Defaults to
   * 3 days (259200000 ms). Maximum: 1 year (31536000000 ms).
   */
  maxAgeMs?: number;

  /**
   * Required when formats.parse is true.
   */
  parseParams?: WebScrapeParams.ParseParams;

  /**
   * Product options. Requires formats.product: true.
   */
  productParams?: WebScrapeParams.ProductParams;

  /**
   * Screenshot options. Requires formats.screenshot: true.
   */
  screenshotParams?: WebScrapeParams.ScreenshotParams;

  /**
   * Browser and content settings shared by all outputs.
   */
  sharedParams?: WebScrapeParams.SharedParams;

  /**
   * Labels for tracking request usage. Not retained when zdr is enabled.
   */
  tags?: Array<string>;

  /**
   * Deadline for the whole request. Defaults to 60000 ms with `fail`. Fixed waits
   * must end before it.
   */
  timeoutOpts?: WebScrapeParams.TimeoutOpts;

  /**
   * `enabled` turns on zero data retention. Your organization must have ZDR enabled.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebScrapeParams {
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
     * Fields extracted with `parseParams.rules`, returned as `parsed`.
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
   * Required when `formats.highlights` is `true`.
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
   * Required when formats.json is true.
   */
  export interface JsonParams {
    /**
     * JSON Schema for a top-level object, up to 50 KB. Use optional or nullable fields
     * for missing facts.
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
     * Include images in the Markdown using image syntax with URLs and alt text.
     */
    includeImages?: boolean;

    /**
     * Keep link URLs in the Markdown. Set false to return link text without URLs.
     */
    includeLinks?: boolean;

    /**
     * How base64 images appear: `placeholder` (default) or `preserve`. Requires
     * `includeImages`.
     */
    inlineImages?: 'placeholder' | 'preserve';
  }

  /**
   * Required when formats.parse is true.
   */
  export interface ParseParams {
    /**
     * Field names mapped to CSS selectors (`h1`, `a@href`) or rule objects. Max 100
     * fields, 5 levels.
     */
    rules: { [key: string]: string | ParseParams.UnionMember1 };
  }

  export namespace ParseParams {
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

  /**
   * Product options. Requires formats.product: true.
   */
  export interface ProductParams {
    /**
     * Use an AI model when the page has no structured product data.
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
    actions?: Array<SharedParams.Perform | SharedParams.Scroll | SharedParams.Wait | SharedParams.WaitFor>;

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
         * Set `auto` to read scanned pages with OCR.
         */
        ocr?: 'off' | 'auto';

        /**
         * First page to parse, starting at 1.
         */
        startPage?: number;
      }
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
   * Deadline for the whole request. Defaults to 60000 ms with `fail`. Fixed waits
   * must end before it.
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

export interface WebScreenshotParams {
  /**
   * Optional parameter for comprehensive popup cleanup. If 'true', the browser
   * dismisses detected cookie/consent UI and clears other detected obstructive
   * popups and overlays before capture. If 'false' or not provided, this parameter
   * requests no cleanup; handleCookiePopup can still request cookie/consent handling
   * independently.
   */
  clearPopups?: boolean;

  /**
   * Optional parameter to choose the site's visual theme in the screenshot. Use
   * 'light' or 'dark' when the site offers both appearances.
   */
  colorScheme?: 'light' | 'dark';

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
   * A specific URL to screenshot directly, bypassing domain resolution (e.g.,
   * 'https://example.com/pricing'). When provided, the screenshot is taken of this
   * exact URL. You must provide either 'domain' or 'directUrl', but not both.
   */
  directUrl?: string;

  /**
   * Domain name to take screenshot of (e.g., 'example.com', 'google.com'). The
   * domain will be automatically normalized and validated. You must provide either
   * 'domain' or 'directUrl', but not both.
   */
  domain?: string;

  /**
   * Optional parameter to determine screenshot type. If 'true', takes a full page
   * screenshot capturing all content. If 'false' or not provided, takes a viewport
   * screenshot (standard browser view).
   */
  fullScreenshot?: 'true' | 'false';

  /**
   * Optional parameter to control cookie/consent popup handling. If 'true', we
   * dismiss cookie banner before capture. If 'false' or not provided, captures the
   * page without that step.
   */
  handleCookiePopup?: boolean;

  /**
   * Optional outbound HTTP headers, using the same JSON object or deep-object query
   * format as other scrape endpoints (for example headers[Authorization]=Bearer
   * token). Headers are scoped to the target origin during capture. For domain/page
   * requests, discovery receives no custom headers and only pages on the resolved
   * origin are eligible. Non-empty headers bypass screenshot caching and return an
   * in-memory data URL; no screenshot is uploaded. Empty objects behave like omitted
   * headers.
   */
  headers?: { [key: string]: string };

  /**
   * Return a cached screenshot if a prior screenshot for the same parameters exists
   * and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always capture fresh.
   */
  maxAgeMs?: number | null;

  /**
   * Optional parameter to specify which page type to screenshot. If provided, the
   * system will scrape the domain's links and use heuristics to find the most
   * appropriate URL for the specified page type (30 supported languages). If not
   * provided, screenshots the main domain landing page. Only applicable when using
   * 'domain', not 'directUrl'.
   */
  page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact';

  /**
   * Optional vertical scroll offset in pixels for capturing a long page in
   * viewport-sized chunks. When provided, the full page is captured once and the
   * returned image is the viewport-sized slice that begins at this Y offset (e.g.
   * request scrollOffset=0, then 1080, then 2160 to walk a 1920x1080 landing page
   * top to bottom). The final slice may be shorter than the viewport height. Takes
   * precedence over fullScreenshot. Max: 100000.
   */
  scrollOffset?: number | null;

  /**
   * Comma-separated labels for filtering usage, e.g. `production,team-alpha`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebScreenshotParams.TimeoutOpts;

  /**
   * Optional browser viewport dimensions for the screenshot. Defaults to 1920x1080.
   */
  viewport?: WebScreenshotParams.Viewport;

  /**
   * Optional browser wait time in milliseconds after initial page load before taking
   * the screenshot. Min: 0. Max: 30000 (30 seconds). Defaults to 3000 ms when
   * omitted. When combined with timeoutOpts, timeoutOpts.milliseconds must be at
   * least waitForMs + 10000 ms; a shorter deadline is rejected with 400
   * TIMEOUT_TOO_SHORT_FOR_WAIT.
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
     * "fail" returns 408 at the deadline. "return-partial" returns available results;
     * inspect the response’s partial flag. "return-partial" requires at least 5000 ms.
     */
    behavior?: 'fail' | 'return-partial';
  }

  /**
   * Optional browser viewport dimensions for the screenshot. Defaults to 1920x1080.
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
   * Search query. Accepts natural language as well as Google-style search operators
   * such as `site:`, `-site:`, `inurl:`, `intitle:`, quoted phrases, and `OR`.
   */
  query: string;

  /**
   * Two-letter ISO 3166-1 alpha-2 country code to localize results to a specific
   * country (maps to Google's `gl` parameter). Example: "us", "gb", "de".
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
   * Blocklist — drop results from these domains. Example: ["pinterest.com",
   * "reddit.com"].
   */
  excludeDomains?: Array<string>;

  /**
   * Restrict results to content published within this window.
   */
  freshness?: 'last_24_hours' | 'last_week' | 'last_month' | 'last_year';

  /**
   * Allowlist — only return results from these domains. Example: ["arxiv.org",
   * "github.com"].
   */
  includeDomains?: Array<string>;

  /**
   * Inline Markdown scraping for each result. Set `enabled: true` to activate.
   */
  markdownOptions?: WebSearchParams.MarkdownOptions;

  /**
   * Number of results to request and return (10–100). Defaults to 10.
   */
  numResults?: number;

  /**
   * Currently has no effect.
   */
  queryFanout?: boolean;

  /**
   * Labels for filtering usage in the dashboard.
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
   * Inline Markdown scraping for each result. Set `enabled: true` to activate.
   */
  export interface MarkdownOptions {
    /**
     * Scrape each result to Markdown. Off by default to keep search cheap and fast.
     */
    enabled?: boolean;

    /**
     * Render iframe contents into the Markdown.
     */
    includeFrames?: boolean;

    /**
     * Emit image references in the Markdown.
     */
    includeImages?: boolean;

    /**
     * Keep hyperlinks in the Markdown.
     */
    includeLinks?: boolean;

    /**
     * Cache TTL in ms for scraped Markdown keyed by URL + options. Default 1 day, max
     * 30 days. Set to 0 to force a fresh scrape.
     */
    maxAgeMs?: number;

    /**
     * PDF handling. Use start/end to bound text extraction and OCR to a page range.
     */
    pdf?: MarkdownOptions.Pdf;

    /**
     * Truncate inline base64 image payloads to keep responses small.
     */
    shortenBase64Images?: boolean;

    /**
     * Request deadline and what to return when it passes.
     */
    timeoutOpts?: MarkdownOptions.TimeoutOpts;

    /**
     * Strip nav, header, footer, and sidebar — keep only the primary article content.
     */
    useMainContentOnly?: boolean;

    /**
     * Extra wait after page load before rendering, in ms (0–30000). Useful for
     * JS-heavy pages.
     */
    waitForMs?: number;
  }

  export namespace MarkdownOptions {
    /**
     * PDF handling. Use start/end to bound text extraction and OCR to a page range.
     */
    export interface Pdf {
      /**
       * Last PDF page to parse (1-based, inclusive). Defaults to the final page. Must
       * be >= start.
       */
      end?: number;

      /**
       * Parse PDF URLs. When false, PDF results are skipped with WEBSITE_ACCESS_ERROR.
       */
      shouldParse?: boolean;

      /**
       * First PDF page to parse (1-based, inclusive). Defaults to page 1.
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
       * "fail" returns 408 at the deadline. "return-partial" returns available results;
       * inspect the response’s partial flag. "return-partial" requires at least 5000 ms.
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
     * "fail" returns 408 at the deadline. "return-partial" returns available results;
     * inspect the response’s partial flag.
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
   * Remove matching elements after inclusions. Exclusions take precedence.
   */
  excludeSelectors?: Array<string>;

  /**
   * When true, follow links on subdomains of the starting URL's domain (e.g.
   * docs.example.com when starting from example.com). www and apex are always
   * treated as equivalent.
   */
  followSubdomains?: boolean;

  /**
   * When true, the contents of iframes are rendered to Markdown for each crawled
   * page.
   */
  includeFrames?: boolean;

  /**
   * Include image references in the Markdown output
   */
  includeImages?: boolean;

  /**
   * Preserve hyperlinks in the Markdown output
   */
  includeLinks?: boolean;

  /**
   * Keep matching HTML subtrees before converting each page to Markdown.
   */
  includeSelectors?: Array<string>;

  /**
   * Maximum cache age in milliseconds. Defaults to 1 day; `0` fetches fresh.
   */
  maxAgeMs?: number;

  /**
   * Maximum link depth from the starting URL (0 = only the starting page)
   */
  maxDepth?: number;

  /**
   * Maximum pages to crawl.
   */
  maxPages?: number;

  /**
   * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
   */
  pdf?: WebWebCrawlMdParams.Pdf;

  /**
   * Wait briefly for CSS animations and transitions to settle before reading each
   * page.
   */
  settleAnimations?: boolean;

  /**
   * Truncate base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

  /**
   * Soft crawl deadline in milliseconds. Returns pages collected before the next
   * deadline check.
   */
  stopAfterMs?: number;

  /**
   * Labels for filtering usage in the dashboard.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: WebWebCrawlMdParams.TimeoutOpts;

  /**
   * Regex pattern. Only URLs matching this pattern will be followed and scraped. An
   * automatic prefix scope in the form ^<starting URL> follows a redirect of the
   * starting page.
   */
  urlRegex?: string;

  /**
   * Extract only the main content, stripping headers, footers, sidebars, and
   * navigation
   */
  useMainContentOnly?: boolean;

  /**
   * Browser wait time in milliseconds after initial page load for each crawled page.
   * Defaults to 3500 (3.5 seconds). Min: 0. Max: 30000 (30 seconds).
   */
  waitForMs?: number;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebWebCrawlMdParams {
  /**
   * PDF handling. `start`/`end` limit parsing to an inclusive, 1-based page range.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

    /**
     * Read scanned PDF pages with OCR; preserve pages that already contain text.
     */
    ocr?: boolean;

    /**
     * When true, PDF pages are fetched and parsed. When false, PDF pages are skipped
     * entirely (not included in results and not counted as failures).
     */
    shouldParse?: boolean;

    /**
     * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
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
     * "fail" returns 408 at the deadline. "return-partial" returns available results;
     * inspect the response’s partial flag.
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
