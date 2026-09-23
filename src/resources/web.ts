// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Web extends APIResource {
  /**
   * Researches the live web and returns a sourced answer in your requested JSON
   * shape. Select fast for a smaller research budget at 10 credits or ultra for
   * deeper reasoning at 100 credits. Defaults to ultra. Fast research is limited to
   * 30 seconds and ultra to 50 seconds; timeoutOpts.milliseconds can shorten either
   * deadline.
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
   * Extract a comprehensive design system from a website including colors,
   * typography, spacing, shadows, and UI components.
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
   * Discovers URLs using the same sitemap crawl, filters, and limits as
   * /web/scrape/sitemap. Each URL includes its available title, description,
   * keywords, and language. URLs without stored enrichment are returned immediately
   * with only the URL and queued for background HTML scraping, so later requests can
   * include their metadata. Responses are never cached as a whole; every request
   * reads the current per-URL enrichment. Zero data retention and credential-bearing
   * discovery requests return URLs without reading or storing shared enrichment or
   * queuing background scrapes. Costs 1 credit, or 2 credits with search.
   *
   * @example
   * ```ts
   * const response = await client.web.mapUrls({
   *   domain: 'xxx',
   * });
   * ```
   */
  mapUrls(query: WebMapURLsParams, options?: RequestOptions): APIPromise<WebMapURLsResponse> {
    return this._client.get('/web/urls', { query, ...options });
  }

  /**
   * Reuse cached outputs independently and capture missing formats in one page
   * visit. Each cache key includes only the settings that affect that output. HTML
   * is shared with Markdown, parsed fields, product data, highlights, and JSON
   * extraction. Cached outputs can come from different visits within maxAgeMs; use 0
   * for a fresh capture. HTML-only requests use the existing fast acquisition path.
   * Highlights return the plain-text passages most relevant to
   * highlightsParams.query. One credit per request, including cache hits and missing
   * pages, or two with browser actions; highlights add 3 credits when passages are
   * returned; JSON extraction adds four credits and runs an LLM over the page
   * Markdown on every request that has text to extract; PDF OCR adds one credit per
   * recovered page on fresh extraction; the product output adds one credit, plus six
   * more when the specialized model is used. Original response bytes and screenshots
   * are limited to 20 MiB each, screenshots to 40 megapixels, and the combined
   * browser capture to 60 MiB.
   *
   * @example
   * ```ts
   * const response = await client.web.scrape({
   *   formats: { html: true },
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
   * Search the web and optionally scrape each result to Markdown in one round-trip.
   *
   * @example
   * ```ts
   * const response = await client.web.search({ query: 'x' });
   * ```
   */
  search(body: WebSearchParams, options?: RequestOptions): APIPromise<WebSearchResponse> {
    return this._client.post('/web/search', { body, ...options });
  }

  /**
   * Performs a crawl starting from a given URL, extracts page content as Markdown,
   * and returns results for all crawled pages.
   *
   * @example
   * ```ts
   * const response = await client.web.webCrawlMd({
   *   url: 'https://example.com',
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
   * URLs that supplied search results or readable page content, in first-seen order.
   * Unreadable pages are excluded.
   */
  sources: Array<string>;

  /**
   * Credit usage, included whenever a valid API key is provided.
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
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
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
   * Credit usage, included whenever a valid API key is provided.
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

export interface WebExtractStyleguideResponse {
  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: WebExtractStyleguideResponse.CacheMetadata;

  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
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
   * How complete the returned content is. `loaded` means the page finished the waits
   * the request asked for. `still-loading` only occurs with
   * timeoutOpts.behavior=return-partial: the timeoutOpts.milliseconds deadline was
   * reached first, so the content reflects the DOM at that moment and late-rendering
   * parts may be missing. Partial results are billed at the base request cost.
   */
  finalDOMState?: 'loaded' | 'still-loading';

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: WebExtractStyleguideResponse.KeyMetadata;

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;

  /**
   * Comprehensive styleguide data extracted from the website
   */
  styleguide?: WebExtractStyleguideResponse.Styleguide;
}

export namespace WebExtractStyleguideResponse {
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
           * Sampled minimum width of the button box (typically px)
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
           * Sampled minimum width of the button box (typically px)
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
           * Sampled minimum width of the button box (typically px)
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
           * Primary face (first family in the computed stack)
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
           * Primary face (first family in the computed stack)
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
           * Primary face (first family in the computed stack)
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
           * Primary face (first family in the computed stack)
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
         * Primary face (first family in the computed stack)
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
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  success: true;

  urls: Array<WebMapURLsResponse.URL>;

  /**
   * Credit usage, included whenever a valid API key is provided.
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

export interface WebScrapeResponse {
  /**
   * Original HTTP response body. Waiting, actions, and content filters never change
   * it.
   */
  bytes: WebScrapeResponse.Bytes;

  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: WebScrapeResponse.CacheMetadata;

  /**
   * Relevant passages for your question or topic.
   */
  highlights: WebScrapeResponse.Highlights;

  /**
   * Rendered HTML after content filters.
   */
  html: WebScrapeResponse.HTML;

  /**
   * Images after content filters. Empty when none are found.
   */
  images: WebScrapeResponse.Images;

  /**
   * Page data extracted using your schema.
   */
  json: WebScrapeResponse.Json;

  /**
   * Markdown after content filters.
   */
  markdown: WebScrapeResponse.Markdown;

  /**
   * Page details, when available.
   */
  metadata: WebScrapeResponse.Metadata;

  /**
   * Fields produced by parseParams.rules, after shared content filters.
   */
  parsed: WebScrapeResponse.Parsed;

  /**
   * Product details found on the page.
   */
  product: WebScrapeResponse.Product;

  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  /**
   * An image data URL. Use directly as an image src.
   */
  screenshot: WebScrapeResponse.Screenshot;

  /**
   * Final URL after redirects and browser actions.
   */
  url: string;

  /**
   * Present when return-partial captures a page that is still loading, returns
   * images before image processing finishes, or cuts product AI extraction short.
   * Also present if the optional product AI fallback fails. Partial responses are
   * not cached.
   */
  isPartial?: true;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: WebScrapeResponse.KeyMetadata;
}

export namespace WebScrapeResponse {
  /**
   * Original HTTP response body. Waiting, actions, and content filters never change
   * it.
   */
  export interface Bytes {
    data: Bytes.Data | null;

    requested: boolean;
  }

  export namespace Bytes {
    export interface Data {
      /**
       * Original response body as base64, after HTTP decompression. Maximum decoded
       * size: 20 MiB.
       */
      base64: string;

      contentType: string;
    }
  }

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
   * Relevant passages for your question or topic.
   */
  export interface Highlights {
    data: Array<string> | null;

    requested: boolean;
  }

  /**
   * Rendered HTML after content filters.
   */
  export interface HTML {
    data: string | null;

    requested: boolean;
  }

  /**
   * Images after content filters. Empty when none are found.
   */
  export interface Images {
    data: Array<Images.Data> | null;

    requested: boolean;
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
       * Hosted copy when file enrichment is requested and zdr is disabled. Valid for 24
       * hours from the original capture.
       */
      fileUrl?: string;

      height?: number;

      width?: number;
    }
  }

  /**
   * Page data extracted using your schema.
   */
  export interface Json {
    data: { [key: string]: unknown } | null;

    requested: boolean;
  }

  /**
   * Markdown after content filters.
   */
  export interface Markdown {
    data: string | null;

    requested: boolean;
  }

  /**
   * Page details, when available.
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

  /**
   * Fields produced by parseParams.rules, after shared content filters.
   */
  export interface Parsed {
    data: { [key: string]: unknown } | null;

    requested: boolean;
  }

  /**
   * Product details found on the page.
   */
  export interface Product {
    data: Product.Data | null;

    requested: boolean;
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
   * An image data URL. Use directly as an image src.
   */
  export interface Screenshot {
    data: string | null;

    requested: boolean;
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

export interface WebScreenshotResponse {
  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: WebScreenshotResponse.CacheMetadata;

  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
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
   * How complete the returned content is. `loaded` means the page finished the waits
   * the request asked for. `still-loading` only occurs with
   * timeoutOpts.behavior=return-partial: the timeoutOpts.milliseconds deadline was
   * reached first, so the content reflects the DOM at that moment and late-rendering
   * parts may be missing. Partial results are billed at the base request cost.
   */
  finalDOMState?: 'loaded' | 'still-loading';

  /**
   * Height in pixels of the returned screenshot image
   */
  height?: number;

  /**
   * Credit usage, included whenever a valid API key is provided.
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
   * Status of the response, e.g., 'ok'
   */
  status?: string;

  /**
   * Width in pixels of the returned screenshot image
   */
  width?: number;
}

export namespace WebScreenshotResponse {
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

export interface WebSearchResponse {
  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: WebSearchResponse.CacheMetadata;

  /**
   * Echo of the original query (useful when fanout was enabled).
   */
  query: string;

  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  results: Array<WebSearchResponse.Result>;

  /**
   * Credit usage, included whenever a valid API key is provided.
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
       * How complete the returned content is. `loaded` means the page finished the waits
       * the request asked for. `still-loading` only occurs with
       * timeoutOpts.behavior=return-partial: the timeoutOpts.milliseconds deadline was
       * reached first, so the content reflects the DOM at that moment and late-rendering
       * parts may be missing. Partial results are billed at the base request cost.
       */
      finalDOMState?: 'loaded' | 'still-loading';
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

export interface WebWebCrawlMdResponse {
  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: WebWebCrawlMdResponse.CacheMetadata;

  metadata: WebWebCrawlMdResponse.Metadata;

  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  results: Array<WebWebCrawlMdResponse.Result>;

  /**
   * Credit usage, included whenever a valid API key is provided.
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

export interface WebAnswersParams {
  /**
   * What to research and answer, in plain language. Naming a domain in the task (for
   * example "pricing on context.dev") makes the agent read that site before it
   * searches.
   */
  task: string;

  /**
   * An example object with placeholder values (for example {"pricing_page_url": "",
   * "plans": [{"name": "", "price": 0}]}). Object keys and value types are
   * preserved; unknown values may be null. Empty arrays accept any JSON items.
   * Defaults to {"result": ""}. Maximum 8 levels, 500 values, and 16000 characters.
   */
  json_format?: { [key: string]: unknown };

  /**
   * Research level: fast uses a smaller model and research budget for 10 credits;
   * ultra uses deeper reasoning and research for 100 credits. Defaults to ultra.
   * Only successful requests consume credits.
   */
  mode?: 'fast' | 'ultra';

  /**
   * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  timeoutOpts?: WebAnswersParams.TimeoutOpts;

  /**
   * Set to enabled to bypass shared caches and omit request and response content
   * from retained usage logs. Asset uploads are skipped, so hosted image URLs are
   * omitted. Requires zero data retention to be enabled for your organization
   * (contact support@context.dev), otherwise the request fails with ZDR_NOT_ENABLED.
   * Successful ZDR responses include X-Context-ZDR: true.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebAnswersParams {
  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
     * credits. "return-partial" returns usable results collected so far; if none are
     * available, the request still fails without charging credits. Partial results are
     * not cached as complete results.
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
   * Comma-separated tags for tracking request usage. Up to 20 tags, each 1-50
   * characters.
   */
  tags?: Array<string>;

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  timeoutOpts?: WebExtractCompetitorsParams.TimeoutOpts;

  /**
   * Set to enabled to bypass shared caches and omit request and response content
   * from retained usage logs. Asset uploads are skipped, so hosted image URLs are
   * omitted. Requires zero data retention to be enabled for your organization
   * (contact support@context.dev), otherwise the request fails with ZDR_NOT_ENABLED.
   * Successful ZDR responses include X-Context-ZDR: true.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebExtractCompetitorsParams {
  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
     * credits. "return-partial" returns usable results collected so far; if none are
     * available, the request still fails without charging credits. Partial results are
     * not cached as complete results.
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
   * A specific URL to fetch the styleguide from directly, bypassing domain
   * resolution (e.g., 'https://example.com/design-system'). When provided, the
   * styleguide is extracted from this exact URL. You must provide either 'domain' or
   * 'directUrl', but not both.
   */
  directUrl?: string;

  /**
   * Domain name to extract styleguide from (e.g., 'example.com', 'google.com'). The
   * domain will be automatically normalized and validated. You must provide either
   * 'domain' or 'directUrl', but not both.
   */
  domain?: string;

  /**
   * Maximum age in milliseconds for cached brand data before the API performs a hard
   * refresh. Defaults to 3 months (7776000000 ms). Set to 0 to always perform a hard
   * refresh. Negative values are clamped to 0; values above 1 year (31536000000 ms)
   * are clamped to 1 year.
   */
  maxAgeMs?: number | null;

  /**
   * Comma-separated tags for tracking request usage. Up to 20 tags, each 1-50
   * characters.
   */
  tags?: Array<string>;

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  timeoutOpts?: WebExtractStyleguideParams.TimeoutOpts;

  /**
   * Set to enabled to bypass shared caches and omit request and response content
   * from retained usage logs. Asset uploads are skipped, so hosted image URLs are
   * omitted. Requires zero data retention to be enabled for your organization
   * (contact support@context.dev), otherwise the request fails with ZDR_NOT_ENABLED.
   * Successful ZDR responses include X-Context-ZDR: true.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebExtractStyleguideParams {
  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
     * credits. "return-partial" returns usable results collected so far; if none are
     * available, the request still fails without charging credits. Partial results are
     * not cached as complete results. "return-partial" requires milliseconds of at
     * least 5000.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebMapURLsParams {
  /**
   * Domain to build a sitemap for
   */
  domain: string;

  /**
   * Optional outbound HTTP headers forwarded only to the target URL, sent as
   * deep-object query params such as headers[X-Custom]=value. When provided, caching
   * is bypassed: the result is neither read from nor written to cache.
   */
  headers?: { [key: string]: string };

  /**
   * When true, discover and include public pages and sitemaps on subdomains of the
   * requested domain. Defaults to false.
   */
  includeSubdomains?: boolean;

  /**
   * Maximum number of links to return from the sitemap crawl. Defaults to 10,000.
   * Minimum is 1, maximum is 100,000.
   */
  maxLinks?: number;

  /**
   * Optional search phrase. When provided, the crawled sitemap is filtered to the
   * pages whose URLs are about that phrase, most relevant first, and the request
   * costs 2 credits instead of 1.
   */
  search?: string;

  /**
   * Optional explicit sitemap URL. When provided, exactly this sitemap is crawled
   * instead of discovering the domain's sitemaps.
   */
  sitemapUrl?: string;

  /**
   * Comma-separated tags for tracking request usage. Up to 20 tags, each 1-50
   * characters.
   */
  tags?: Array<string>;

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  timeoutOpts?: WebMapURLsParams.TimeoutOpts;

  /**
   * Optional RE2-compatible regex pattern. Only URLs matching this pattern are
   * returned and counted against maxLinks.
   */
  urlRegex?: string;

  /**
   * Set to enabled to bypass shared caches and omit request and response content
   * from retained usage logs. Asset uploads are skipped, so hosted image URLs are
   * omitted. Requires zero data retention to be enabled for your organization
   * (contact support@context.dev), otherwise the request fails with ZDR_NOT_ENABLED.
   * Successful ZDR responses include X-Context-ZDR: true.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebMapURLsParams {
  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
     * credits. "return-partial" returns usable results collected so far; if none are
     * available, the request still fails without charging credits. Partial results are
     * not cached as complete results.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebScrapeParams {
  /**
   * Outputs to return. Enable at least one; omitted formats are false.
   */
  formats: WebScrapeParams.Formats;

  /**
   * The URL to scrape.
   */
  url: string;

  /**
   * Highlight options. Requires formats.highlights: true.
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
   * Markdown options. Requires formats.markdown: true.
   */
  markdownParams?: WebScrapeParams.MarkdownParams;

  /**
   * Maximum age of each cached output. Defaults to 1 day; 0 fetches fresh and
   * updates the requested outputs. Compatible outputs are shared with the individual
   * scrape endpoints. Image results with hosted files refresh after 23 hours; other
   * outputs retain their own freshness.
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
   * Shared browser and content settings. Content filters leave screenshots and
   * original bytes unchanged.
   */
  sharedParams?: WebScrapeParams.SharedParams;

  /**
   * Labels for tracking request usage. Not retained when zdr is enabled.
   */
  tags?: Array<string>;

  /**
   * Total deadline, including navigation, actions, waiting, and all outputs.
   * Defaults to 60000 milliseconds with behavior fail. Use return-partial to capture
   * the current page state and return captured images if image processing cannot
   * finish before the deadline; these responses set isPartial and are not cached.
   * Every requested format must still be available. Fixed waits must fit before a
   * response reserve of up to 5000 milliseconds (at most one quarter of the timeout)
   * when using return-partial.
   */
  timeoutOpts?: WebScrapeParams.TimeoutOpts;

  /**
   * Zero data retention. Bypasses caches and uploads; excludes request/response
   * content and tags from logs. Must be enabled for your organization.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebScrapeParams {
  /**
   * Outputs to return. Enable at least one; omitted formats are false.
   */
  export interface Formats {
    /**
     * The original HTTP response body.
     */
    bytes?: boolean;

    /**
     * Relevant passages for your question or topic. Adds 3 credits.
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
     * Page data extracted using your schema. Adds 4 credits.
     */
    json?: boolean;

    /**
     * Page content as Markdown.
     */
    markdown?: boolean;

    /**
     * Fields selected by parseParams.rules.
     */
    parse?: boolean;

    /**
     * Product details such as name, price, and availability. Adds 1 credit.
     */
    product?: boolean;

    /**
     * An inline image of the page.
     */
    screenshot?: boolean;
  }

  /**
   * Highlight options. Requires formats.highlights: true.
   */
  export interface HighlightsParams {
    /**
     * The question or topic to find passages for.
     */
    query: string;

    /**
     * Maximum combined length of the returned passages, in characters.
     */
    maxCharacters?: number;
  }

  /**
   * Image options. Requires formats.images: true.
   */
  export interface ImageParams {
    /**
     * For visual duplicates, keep the largest image.
     */
    dedupe?: 'none' | 'visual';

    /**
     * Add dimensions, a visual category, or a hosted file URL. Each image has a
     * maximum processing time of 30000 milliseconds, bounded by the remaining request
     * deadline.
     */
    enrich?: Array<'dimensions' | 'classification' | 'file'>;
  }

  /**
   * Required when formats.json is true.
   */
  export interface JsonParams {
    /**
     * JSON Schema for the returned object. Must describe a top-level object; at most
     * 50 KB serialized. Optional fields the page does not state are omitted, or null
     * when their type allows null, while required non-nullable fields always receive a
     * best-effort value, so prefer nullable or optional fields for data a page may
     * omit. Zod users can pass the output of z.toJSONSchema().
     */
    schema: { [key: string]: unknown };

    /**
     * Optional guidance on which facts to prioritize or how to interpret schema
     * fields.
     */
    instructions?: string;
  }

  /**
   * Markdown options. Requires formats.markdown: true.
   */
  export interface MarkdownParams {
    includeImages?: boolean;

    includeLinks?: boolean;

    /**
     * Base64 images use placeholders by default. Requires includeImages: true.
     */
    inlineImages?: 'placeholder' | 'preserve';
  }

  /**
   * Required when formats.parse is true.
   */
  export interface ParseParams {
    /**
     * Map field names to CSS selectors or rules. Missing items return null; missing
     * lists return [].
     */
    rules: { [key: string]: string | ParseParams.UnionMember1 };
  }

  export namespace ParseParams {
    export interface UnionMember1 {
      selector: string;

      output?: 'text' | 'html' | string | unknown;

      type?: 'item' | 'list';
    }
  }

  /**
   * Product options. Requires formats.product: true.
   */
  export interface ProductParams {
    /**
     * Extract the product with a specialized model when the page has no structured
     * product data. Adds six credits when the model returns a verdict. If the fallback
     * fails, returns a partial response with the deterministic result and no fallback
     * charge. Request deadlines and client disconnects still apply.
     */
    useAIFallback?: boolean;
  }

  /**
   * Screenshot options. Requires formats.screenshot: true.
   */
  export interface ScreenshotParams {
    /**
     * Viewport, full page, one visible element, or a rectangle. Maximum 40 megapixels.
     */
    area?: 'viewport' | 'fullPage' | ScreenshotParams.Element | ScreenshotParams.Rectangle;

    format?: 'png' | 'jpeg' | 'webp';
  }

  export namespace ScreenshotParams {
    export interface Element {
      /**
       * Must match one visible element.
       */
      selector: string;
    }

    /**
     * Pixels from the document origin.
     */
    export interface Rectangle {
      height: number;

      width: number;

      x: number;

      y: number;
    }
  }

  /**
   * Shared browser and content settings. Content filters leave screenshots and
   * original bytes unchanged.
   */
  export interface SharedParams {
    /**
     * Run in order before capture. A failed action fails the request. Bypasses
     * caching.
     */
    actions?: Array<SharedParams.Perform | SharedParams.Scroll | SharedParams.Wait | SharedParams.WaitFor>;

    /**
     * Supported two-letter country code, case-insensitive. Applies to every output,
     * including image downloads.
     */
    country?: string;

    /**
     * Dismiss cookie banners by accepting cookies before actions.
     */
    dismissCookies?: boolean;

    /**
     * Dismiss other popups before actions.
     */
    dismissPopups?: boolean;

    /**
     * Remove matching content. Exclusions win.
     */
    excludeSelectors?: Array<string>;

    /**
     * Headers for the target origin. Requests with custom headers bypass caching.
     */
    headers?: { [key: string]: string };

    /**
     * Include iframe content in extraction. Screenshots show visible frames
     * regardless.
     */
    includeFrames?: boolean;

    /**
     * Keep matching content after mainContentOnly.
     */
    includeSelectors?: Array<string>;

    /**
     * Keep only main content in HTML, Markdown, images, and parsed fields.
     */
    mainContentOnly?: boolean;

    /**
     * Document parsing options.
     */
    parsers?: SharedParams.Parsers;

    /**
     * Settle animations before capture. Defaults to true with screenshots, otherwise
     * false.
     */
    settleAnimations?: boolean;

    /**
     * Override the browser color scheme.
     */
    theme?: 'light' | 'dark';

    /**
     * Browser dimensions in pixels.
     */
    viewport?: SharedParams.Viewport;

    /**
     * After actions, wait this many milliseconds or until a CSS selector is visible.
     * Defaults to 500 ms, or 2000 ms with frames or an XML URL. Set 0 to skip.
     */
    waitFor?: number | string;
  }

  export namespace SharedParams {
    export interface Perform {
      action: string;

      type: 'perform';
    }

    export interface Scroll {
      type: 'scroll';

      amount?: number | 'viewport' | 'max';

      direction?: 'down' | 'up' | 'left' | 'right';

      maxScrolls?: number;

      /**
       * Scroll this container. Omit to scroll the page.
       */
      selector?: string;
    }

    export interface Wait {
      milliseconds: number;

      type: 'wait';
    }

    export interface WaitFor {
      selector: string;

      type: 'waitFor';
    }

    /**
     * Document parsing options.
     */
    export interface Parsers {
      /**
       * PDF text options for HTML, Markdown, and parsed fields.
       */
      pdf?: Parsers.Pdf;
    }

    export namespace Parsers {
      /**
       * PDF text options for HTML, Markdown, and parsed fields.
       */
      export interface Pdf {
        /**
         * Last page to parse. Must be at least startPage.
         */
        endPage?: number;

        /**
         * Read text from scanned pages.
         */
        ocr?: 'off' | 'auto';

        /**
         * First page to parse, starting at 1.
         */
        startPage?: number;
      }
    }

    /**
     * Browser dimensions in pixels.
     */
    export interface Viewport {
      height?: number;

      width?: number;
    }
  }

  /**
   * Total deadline, including navigation, actions, waiting, and all outputs.
   * Defaults to 60000 milliseconds with behavior fail. Use return-partial to capture
   * the current page state and return captured images if image processing cannot
   * finish before the deadline; these responses set isPartial and are not cached.
   * Every requested format must still be available. Fixed waits must fit before a
   * response reserve of up to 5000 milliseconds (at most one quarter of the timeout)
   * when using return-partial.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
     * credits. "return-partial" returns usable results collected so far; if none are
     * available, the request still fails without charging credits. Partial results are
     * not cached as complete results. "return-partial" requires milliseconds of at
     * least 5000.
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
   * Comma-separated tags for tracking request usage. Up to 20 tags, each 1-50
   * characters.
   */
  tags?: Array<string>;

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
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
   * Set to enabled to bypass shared caches and omit request and response content
   * from retained usage logs. Asset uploads are skipped, so hosted image URLs are
   * omitted. Requires zero data retention to be enabled for your organization
   * (contact support@context.dev), otherwise the request fails with ZDR_NOT_ENABLED.
   * Successful ZDR responses include X-Context-ZDR: true.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebScreenshotParams {
  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
     * credits. "return-partial" returns usable results collected so far; if none are
     * available, the request still fails without charging credits. Partial results are
     * not cached as complete results. "return-partial" requires milliseconds of at
     * least 5000.
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
   * Expand the query into multiple parallel variants for broader recall.
   */
  queryFanout?: boolean;

  /**
   * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  timeoutOpts?: WebSearchParams.TimeoutOpts;

  /**
   * Set to enabled to bypass shared caches and omit request and response content
   * from retained usage logs. Asset uploads are skipped, so hosted image URLs are
   * omitted. Requires zero data retention to be enabled for your organization
   * (contact support@context.dev), otherwise the request fails with ZDR_NOT_ENABLED.
   * Successful ZDR responses include X-Context-ZDR: true.
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
     * Optional request deadline and behavior on timeout. For GET requests, use
     * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
     * timeoutOpts object.
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
     * Optional request deadline and behavior on timeout. For GET requests, use
     * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
     * timeoutOpts object.
     */
    export interface TimeoutOpts {
      /**
       * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
       */
      milliseconds: number;

      /**
       * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
       * credits. "return-partial" returns usable results collected so far; if none are
       * available, the request still fails without charging credits. Partial results are
       * not cached as complete results. "return-partial" requires milliseconds of at
       * least 5000.
       */
      behavior?: 'fail' | 'return-partial';
    }
  }

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
     * credits. "return-partial" returns usable results collected so far; if none are
     * available, the request still fails without charging credits. Partial results are
     * not cached as complete results.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface WebWebCrawlMdParams {
  /**
   * The starting URL for the crawl (must include http:// or https:// protocol)
   */
  url: string;

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
   * CSS selectors to remove before each crawled page is converted to Markdown.
   * Applied after includeSelectors. Exclusion takes precedence: an element matching
   * both is removed. Examples: "nav", "footer", ".ad-banner", "[aria-hidden=true]".
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
   * CSS selectors. When provided, only matching HTML subtrees (and their
   * descendants) are kept before each crawled page is converted to Markdown. When
   * omitted, the entire document is kept. Examples: "article.main", "#content",
   * "[role=main]".
   */
  includeSelectors?: Array<string>;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number;

  /**
   * Maximum link depth from the starting URL (0 = only the starting page)
   */
  maxDepth?: number;

  /**
   * Maximum number of pages to crawl. Hard cap: 500.
   */
  maxPages?: number;

  /**
   * PDF parsing controls. Use start/end to limit text extraction and embedded-image
   * detection/OCR to an inclusive 1-based page range.
   */
  pdf?: WebWebCrawlMdParams.Pdf;

  /**
   * When true, waits briefly for CSS and transition animations to settle before
   * extracting each crawled page. Defaults to false. This adds a bit of latency in
   * exchange for more stable output on animated pages.
   */
  settleAnimations?: boolean;

  /**
   * Truncate base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

  /**
   * Soft time budget for the crawl in milliseconds. After each scrape, the crawler
   * checks the elapsed time and, if exceeded, returns the pages collected so far
   * instead of continuing. Min: 10000 (10s). Max: 110000 (110s). Default: 80000
   * (80s).
   */
  stopAfterMs?: number;

  /**
   * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
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
   * Set to enabled to bypass shared caches and omit request and response content
   * from retained usage logs. Requires zero data retention to be enabled for your
   * organization (contact support@context.dev), otherwise the request fails with
   * ZDR_NOT_ENABLED. Successful ZDR responses include X-Context-ZDR: true.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace WebWebCrawlMdParams {
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
     * of the base request cost.
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
   * Optional request deadline and behavior on timeout. For GET requests, use
   * timeoutOpts[milliseconds]=30000&timeoutOpts[behavior]=fail or a JSON-encoded
   * timeoutOpts object.
   */
  export interface TimeoutOpts {
    /**
     * Request deadline in milliseconds. Maximum: 300000 (5 minutes).
     */
    milliseconds: number;

    /**
     * What to do at the deadline. "fail" returns 408 REQUEST_TIMEOUT without charging
     * credits. "return-partial" returns usable results collected so far; if none are
     * available, the request still fails without charging credits. Partial results are
     * not cached as complete results.
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
