// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Search live first-party RSS and free historical news data by company identity.
 */
export class News extends APIResource {
  /**
   * Searches live and historical company news for one company, identified in
   * searchBy by name, domain, ticker (optionally disambiguated by exchange), or
   * ISIN. Results can be filtered by publisher domain, publisher country, article
   * language, article type, and published-at date, and include stable story IDs,
   * source metadata, verified entity relevance, and cursor pagination.
   *
   * @example
   * ```ts
   * const response = await client.news.search({
   *   searchBy: {
   *     entity: { name: 'xx', type: 'name' },
   *     type: 'entity',
   *   },
   * });
   * ```
   */
  search(body: NewsSearchParams, options?: RequestOptions): APIPromise<NewsSearchResponse> {
    return this._client.post('/news/search', { body, ...options });
  }
}

export interface NewsSearchResponse {
  /**
   * Articles matching the search, in the requested order.
   */
  data: Array<NewsSearchResponse.Data>;

  /**
   * True when more results are available beyond this page.
   */
  has_more: boolean;

  /**
   * Summary information about this response.
   */
  meta: NewsSearchResponse.Meta;

  /**
   * Pass as cursor in the next request to fetch the following page. Null when there
   * are no more results.
   */
  next_cursor: string | null;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: NewsSearchResponse.KeyMetadata;
}

export namespace NewsSearchResponse {
  export interface Data {
    /**
     * Stable unique identifier for this article. Use it to deduplicate or reference an
     * article across requests.
     */
    id: string;

    /**
     * Bylined authors. Empty when no byline is available.
     */
    authors: Array<string>;

    /**
     * Short summary or excerpt of the article, when the publisher provides one.
     */
    description: string | null;

    /**
     * Lead image for the article, when one is available.
     */
    image_url: string | null;

    /**
     * Language the article is written in, as a lowercase ISO 639-1 code such as en.
     * Null when unknown.
     */
    language: string | null;

    /**
     * How the article relates to the company you searched for.
     */
    match: Data.Match;

    /**
     * When the article was published, as an ISO 8601 timestamp. Null when the
     * publisher does not state a reliable date.
     */
    published_at: string | null;

    /**
     * The publication that published the article.
     */
    source: Data.Source;

    /**
     * Shared by articles covering the same story on the same day. Use it to group or
     * collapse syndicated copies of one announcement across outlets.
     */
    story_id: string;

    /**
     * Article headline.
     */
    title: string;

    /**
     * Kind of coverage. Use it to separate independent reporting (editorial) from
     * company-issued content (press_release, regulatory_filing, advisory).
     */
    type: 'editorial' | 'press_release' | 'regulatory_filing' | 'advisory';

    /**
     * Link to the article on the publisher site.
     */
    url: string;
  }

  export namespace Data {
    /**
     * How the article relates to the company you searched for.
     */
    export interface Match {
      /**
       * How confident the match is, from 0 to 1. Null when a score is unavailable.
       */
      confidence: number | null;

      /**
       * primary when the article is mainly about the company, secondary when the company
       * is mentioned but is not the main subject.
       */
      level: 'primary' | 'secondary';
    }

    /**
     * The publication that published the article.
     */
    export interface Source {
      /**
       * True when Context observed this article in the publisher-owned feed.
       */
      direct: boolean;

      /**
       * Website domain of the publication.
       */
      domain: string;

      /**
       * Name of the publication, such as Reuters.
       */
      name: string;
    }
  }

  /**
   * Summary information about this response.
   */
  export interface Meta {
    /**
     * Number of articles in this page.
     */
    count: number;
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

export interface NewsSearchParams {
  /**
   * What to search for.
   */
  searchBy: NewsSearchParams.SearchBy;

  /**
   * Opaque next_cursor from the previous response, or null for the first page.
   */
  cursor?: string | null;

  /**
   * Optional result filters.
   */
  filterBy?: NewsSearchParams.FilterBy;

  /**
   * Maximum results to return. Defaults to 10.
   */
  limit?: number;

  /**
   * Result ordering. Defaults to newest.
   */
  sortBy?: NewsSearchParams.SortBy;

  /**
   * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
   */
  tags?: Array<string>;
}

export namespace NewsSearchParams {
  /**
   * What to search for.
   */
  export interface SearchBy {
    /**
     * The company to search news for, identified by name, domain, ticker, or ISIN.
     */
    entity:
      | SearchBy.NewsSearchEntityByName
      | SearchBy.NewsSearchEntityByDomain
      | SearchBy.NewsSearchEntityByTicker
      | SearchBy.NewsSearchEntityByIsin;

    /**
     * How to search. Only entity search is supported.
     */
    type: 'entity';
  }

  export namespace SearchBy {
    /**
     * Identify the company by name.
     */
    export interface NewsSearchEntityByName {
      /**
       * Company name.
       */
      name: string;

      type: 'name';
    }

    /**
     * Identify the company by website domain.
     */
    export interface NewsSearchEntityByDomain {
      /**
       * Company website domain, such as apple.com.
       */
      domain: string;

      type: 'domain';
    }

    /**
     * Identify the company by stock ticker, optionally scoped to an exchange.
     */
    export interface NewsSearchEntityByTicker {
      /**
       * Public-company ticker.
       */
      ticker: string;

      type: 'ticker';

      /**
       * Stock exchange the ticker trades on, used to disambiguate tickers listed on
       * multiple exchanges.
       */
      exchange?:
        | 'AMEX'
        | 'AMS'
        | 'AQS'
        | 'ASX'
        | 'ATH'
        | 'BER'
        | 'BME'
        | 'BRU'
        | 'BSE'
        | 'BUD'
        | 'BUE'
        | 'BVC'
        | 'CBOE'
        | 'CNQ'
        | 'CPH'
        | 'DFM'
        | 'DOH'
        | 'DUB'
        | 'DUS'
        | 'DXE'
        | 'EGX'
        | 'FSX'
        | 'HAM'
        | 'HEL'
        | 'HKSE'
        | 'HOSE'
        | 'ICE'
        | 'IOB'
        | 'IST'
        | 'JKT'
        | 'JNB'
        | 'JPX'
        | 'KLS'
        | 'KOE'
        | 'KSC'
        | 'KUW'
        | 'LIS'
        | 'LSE'
        | 'MCX'
        | 'MEX'
        | 'MIL'
        | 'MUN'
        | 'NASDAQ'
        | 'NEO'
        | 'NSE'
        | 'NYSE'
        | 'NZE'
        | 'OSL'
        | 'OTC'
        | 'PAR'
        | 'PNK'
        | 'PRA'
        | 'RIS'
        | 'SAO'
        | 'SAU'
        | 'SES'
        | 'SET'
        | 'SGO'
        | 'SHH'
        | 'SHZ'
        | 'SIX'
        | 'STO'
        | 'STU'
        | 'TAI'
        | 'TAL'
        | 'TLV'
        | 'TSX'
        | 'TSXV'
        | 'TWO'
        | 'VIE'
        | 'WSE'
        | 'XETRA';
    }

    /**
     * Identify the company by International Securities Identification Number.
     */
    export interface NewsSearchEntityByIsin {
      /**
       * International Securities Identification Number.
       */
      isin: string;

      type: 'isin';
    }
  }

  /**
   * Optional result filters.
   */
  export interface FilterBy {
    /**
     * Article languages to include. Up to 3.
     */
    articleLanguage?: Array<
      'ar' | 'de' | 'en' | 'es' | 'fr' | 'hi' | 'it' | 'ja' | 'ko' | 'nl' | 'pt' | 'ru' | 'zh'
    >;

    /**
     * Article types to include. Up to 3.
     */
    articleType?: Array<'editorial' | 'press_release' | 'regulatory_filing' | 'advisory'>;

    /**
     * Published-at window in epoch milliseconds.
     */
    date?: FilterBy.Date;

    /**
     * Publisher countries to include, as lowercase ISO 3166-1 alpha-2 codes. Up to 3.
     */
    sourceCountry?: Array<
      | 'ae'
      | 'ar'
      | 'au'
      | 'ca'
      | 'cg'
      | 'ch'
      | 'cl'
      | 'cz'
      | 'de'
      | 'fi'
      | 'fr'
      | 'gb'
      | 'hk'
      | 'il'
      | 'in'
      | 'jp'
      | 'kr'
      | 'mx'
      | 'ng'
      | 'nl'
      | 'qa'
      | 'sa'
      | 'se'
      | 'sg'
      | 'us'
      | 'za'
    >;

    /**
     * Publisher domains to include. Up to 3.
     */
    sourceDomain?: Array<string>;
  }

  export namespace FilterBy {
    /**
     * Published-at window in epoch milliseconds.
     */
    export interface Date {
      /**
       * Inclusive start of the published-at window, in epoch milliseconds.
       */
      from?: number;

      /**
       * Inclusive end of the published-at window, in epoch milliseconds.
       */
      to?: number;
    }
  }

  /**
   * Result ordering. Defaults to newest.
   */
  export interface SortBy {
    /**
     * Result ordering.
     */
    type: 'relevance' | 'newest';
  }
}

export declare namespace News {
  export { type NewsSearchResponse as NewsSearchResponse, type NewsSearchParams as NewsSearchParams };
}
