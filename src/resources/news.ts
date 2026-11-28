// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Search live and historical news by company or with a natural-language query.
 */
export class News extends APIResource {
  /**
   * Find news about a company by name, domain, ticker, or ISIN, or search all news
   * with a natural-language query. Each article includes its publisher, type of
   * coverage, and, for company searches, whether the company is the main subject.
   * Narrow results by publisher, country, language, article type, or publish date.
   *
   * @example
   * ```ts
   * const response = await client.news.search({
   *   searchBy: {
   *     type: 'entity',
   *     entity: { type: 'domain', domain: 'stripe.com' },
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
   * Articles on this page, in the requested order.
   */
  data: Array<NewsSearchResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

  /**
   * Summary of this page.
   */
  meta: NewsSearchResponse.Meta;

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
  key_metadata?: NewsSearchResponse.KeyMetadata;
}

export namespace NewsSearchResponse {
  export interface Data {
    /**
     * Unique ID of the article. It stays the same across requests, so you can use it
     * to deduplicate.
     */
    id: string;

    /**
     * Authors named in the byline. Empty when there is no byline.
     */
    authors: Array<string>;

    /**
     * Summary or excerpt of the article. For natural-language searches, it includes
     * the matching passages, up to 2,000 characters.
     */
    description: string | null;

    /**
     * URL of the article's lead image. `null` when there is none.
     */
    image_url: string | null;

    /**
     * Language of the article, as an ISO 639-1 code such as `en`. `null` when unknown.
     */
    language: string | null;

    /**
     * How the article relates to the company you searched for. `null` for
     * natural-language searches.
     */
    match: Data.Match | null;

    /**
     * When the article was published. `null` when the publisher does not give a
     * reliable date.
     */
    published_at: string | null;

    /**
     * Publication that published the article.
     */
    source: Data.Source;

    /**
     * ID shared by articles that cover the same story on the same day. Use it to group
     * syndicated copies of one announcement across outlets.
     */
    story_id: string;

    /**
     * Headline of the article.
     */
    title: string;

    /**
     * Type of coverage. Use it to separate independent reporting (`editorial`) from
     * company-issued content (`press_release`, `regulatory_filing`, `advisory`).
     */
    type: 'editorial' | 'press_release' | 'regulatory_filing' | 'advisory';

    /**
     * URL of the article on the publisher's site.
     */
    url: string;
  }

  export namespace Data {
    /**
     * How the article relates to the company you searched for. `null` for
     * natural-language searches.
     */
    export interface Match {
      /**
       * Confidence in the match, from 0 to 1. `null` when no score is available.
       */
      confidence: number | null;

      /**
       * `primary` when the article is mainly about the company; `secondary` when the
       * company is mentioned but is not the main subject.
       */
      level: 'primary' | 'secondary';
    }

    /**
     * Publication that published the article.
     */
    export interface Source {
      /**
       * Whether the article came directly from the publisher's own feed rather than
       * through an aggregator.
       */
      direct: boolean;

      /**
       * Website domain of the publication, such as `reuters.com`.
       */
      domain: string;

      /**
       * Name of the publication, such as Reuters.
       */
      name: string;
    }
  }

  /**
   * Summary of this page.
   */
  export interface Meta {
    /**
     * Number of articles on this page.
     */
    count: number;
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

export interface NewsSearchParams {
  /**
   * What to search for: news about a specific company, or a natural-language query
   * across all news.
   */
  searchBy: NewsSearchParams.NewsSearchByNaturalLanguage | NewsSearchParams.NewsSearchByEntity;

  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string | null;

  /**
   * Filters for the results. Use at most one of `sourceDomain`, `sourceCountry`,
   * `articleLanguage`, or `articleType`, optionally combined with `date`.
   */
  filterBy?: NewsSearchParams.FilterBy;

  /**
   * Maximum number of articles to return per page.
   */
  limit?: number;

  /**
   * Access policy IDs to apply; each URL must pass all of them. Requires access
   * policies enabled for your organization; otherwise returns
   * `ACCESS_POLICIES_NOT_ENABLED`.
   */
  policies?: Array<string>;

  /**
   * How to order results. Company searches default to `newest`; natural-language
   * searches always use `relevance`.
   */
  sortBy?: NewsSearchParams.SortBy;

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
   */
  tags?: Array<string>;
}

export namespace NewsSearchParams {
  /**
   * Search all news with a plain-language query. Returns up to 100 matches, ordered
   * by relevance.
   */
  export interface NewsSearchByNaturalLanguage {
    /**
     * What to search for, in plain language, such as
     * `chip export restrictions to China`.
     */
    query: string;

    /**
     * Set to `natural_language` to search all news with a plain-language query.
     */
    type: 'natural_language';
  }

  /**
   * Find news about a specific company.
   */
  export interface NewsSearchByEntity {
    /**
     * The company to search news for, identified by name, domain, ticker, or ISIN.
     */
    entity:
      | NewsSearchByEntity.NewsSearchEntityByName
      | NewsSearchByEntity.NewsSearchEntityByDomain
      | NewsSearchByEntity.NewsSearchEntityByTicker
      | NewsSearchByEntity.NewsSearchEntityByIsin;

    /**
     * Set to `entity` to find news about a specific company.
     */
    type: 'entity';
  }

  export namespace NewsSearchByEntity {
    /**
     * Identify the company by name.
     */
    export interface NewsSearchEntityByName {
      /**
       * Company name, such as `Stripe`.
       */
      name: string;

      /**
       * Set to `name` to identify the company by name.
       */
      type: 'name';
    }

    /**
     * Identify the company by website domain.
     */
    export interface NewsSearchEntityByDomain {
      /**
       * Company website domain, such as `apple.com`.
       */
      domain: string;

      /**
       * Set to `domain` to identify the company by website domain.
       */
      type: 'domain';
    }

    /**
     * Identify the company by stock ticker, optionally on a specific exchange.
     */
    export interface NewsSearchEntityByTicker {
      /**
       * Stock ticker symbol, such as `AAPL`.
       */
      ticker: string;

      /**
       * Set to `ticker` to identify a publicly traded company.
       */
      type: 'ticker';

      /**
       * Exchange the ticker trades on. Use it when the same ticker is listed on more
       * than one exchange.
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
     * Identify the company by International Securities Identification Number (ISIN).
     */
    export interface NewsSearchEntityByIsin {
      /**
       * International Securities Identification Number, such as `US0378331005`.
       */
      isin: string;

      /**
       * Set to `isin` to identify the company by its International Securities
       * Identification Number.
       */
      type: 'isin';
    }
  }

  /**
   * Filters for the results. Use at most one of `sourceDomain`, `sourceCountry`,
   * `articleLanguage`, or `articleType`, optionally combined with `date`.
   */
  export interface FilterBy {
    /**
     * Only return articles in these languages, as ISO 639 codes such as `en`.
     */
    articleLanguage?: Array<
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
     * Only return these types of coverage, such as `press_release`.
     */
    articleType?: Array<'editorial' | 'press_release' | 'regulatory_filing' | 'advisory'>;

    /**
     * Publish date range, in epoch milliseconds. `from` must not be later than `to`.
     */
    date?: FilterBy.Date;

    /**
     * Only return articles from publishers in these countries, as ISO 3166-1 alpha-2
     * codes such as `us`.
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
      | 'pk'
      | 'qa'
      | 'sa'
      | 'se'
      | 'sg'
      | 'us'
      | 'za'
    >;

    /**
     * Only return articles from these publisher domains, such as `reuters.com`.
     */
    sourceDomain?: Array<string>;
  }

  export namespace FilterBy {
    /**
     * Publish date range, in epoch milliseconds. `from` must not be later than `to`.
     */
    export interface Date {
      /**
       * Inclusive start of the publish date range, in epoch milliseconds.
       */
      from?: number;

      /**
       * Inclusive end of the publish date range, in epoch milliseconds.
       */
      to?: number;
    }
  }

  /**
   * How to order results. Company searches default to `newest`; natural-language
   * searches always use `relevance`.
   */
  export interface SortBy {
    /**
     * `newest` puts the most recently published articles first; `relevance` puts the
     * closest matches first.
     */
    type: 'relevance' | 'newest';
  }
}

export declare namespace News {
  export { type NewsSearchResponse as NewsSearchResponse, type NewsSearchParams as NewsSearchParams };
}
