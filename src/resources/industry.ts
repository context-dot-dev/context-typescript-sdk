// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Industry extends APIResource {
  /**
   * Classify any brand into 2022 NAICS industry codes from its domain or name.
   */
  retrieveNaics(
    query: IndustryRetrieveNaicsParams,
    options?: RequestOptions,
  ): APIPromise<IndustryRetrieveNaicsResponse> {
    return this._client.get('/web/naics', { query, ...options });
  }

  /**
   * Classify any brand into Standard Industrial Classification (SIC) codes from its
   * domain or name. Choose between the original SIC system (`original_sic`) or the
   * latest SIC list maintained by the SEC (`latest_sec`).
   */
  retrieveSic(
    query: IndustryRetrieveSicParams,
    options?: RequestOptions,
  ): APIPromise<IndustryRetrieveSicResponse> {
    return this._client.get('/web/sic', { query, ...options });
  }
}

export interface IndustryRetrieveNaicsResponse {
  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  /**
   * Array of NAICS codes and titles.
   */
  codes?: Array<IndustryRetrieveNaicsResponse.Code>;

  /**
   * Domain found for the brand
   */
  domain?: string;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: IndustryRetrieveNaicsResponse.KeyMetadata;

  /**
   * True when the timeout ended processing and this response contains only usable
   * results completed so far. Unfinished results are omitted.
   */
  partial?: boolean;

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;

  /**
   * Industry classification type, for naics api it will be `naics`
   */
  type?: string;
}

export namespace IndustryRetrieveNaicsResponse {
  export interface Code {
    /**
     * NAICS code
     */
    code: string;

    /**
     * Confidence level for how well this NAICS code matches the company description
     */
    confidence: 'high' | 'medium' | 'low';

    /**
     * NAICS title
     */
    name: string;
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

export interface IndustryRetrieveSicResponse {
  /**
   * Unique id of this API call, also sent in the X-Request-Id response header. Quote
   * it when contacting support about a failed request.
   */
  request_id: string;

  /**
   * Echoes back which SIC dataset was used to classify the brand.
   */
  classification?: 'original_sic' | 'latest_sec';

  /**
   * Array of SIC codes with confidence scores. Extra fields depend on the requested
   * classification: `original_sic` results include `majorGroup` and
   * `majorGroupName`; `latest_sec` results include `office`.
   */
  codes?: Array<IndustryRetrieveSicResponse.Code>;

  /**
   * Domain found for the brand
   */
  domain?: string;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: IndustryRetrieveSicResponse.KeyMetadata;

  /**
   * True when the timeout ended processing and this response contains only usable
   * results completed so far. Unfinished results are omitted.
   */
  partial?: boolean;

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;

  /**
   * Industry classification type, for sic api it will be `sic`
   */
  type?: string;
}

export namespace IndustryRetrieveSicResponse {
  export interface Code {
    /**
     * SIC code (4-digit).
     */
    code: string;

    /**
     * Confidence level for how well this SIC code matches the company description.
     */
    confidence: 'high' | 'medium' | 'low';

    /**
     * SIC industry title.
     */
    name: string;

    /**
     * 2-digit major group identifier (the leading two digits of the code). Only
     * present when `classification` is `original_sic`.
     */
    majorGroup?: string;

    /**
     * Description of the 2-digit major group. Only present when `classification` is
     * `original_sic`.
     */
    majorGroupName?: string;

    /**
     * SEC review office responsible for filings under this code. Only present when
     * `classification` is `latest_sec`.
     */
    office?: string;
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

export interface IndustryRetrieveNaicsParams {
  /**
   * Brand domain or title to retrieve NAICS code for. If a valid domain is provided,
   * it will be used for classification, otherwise, we will search for the brand
   * using the provided title.
   */
  input: string;

  /**
   * Maximum number of NAICS codes to return. Must be between 1 and 10. Defaults
   * to 5.
   */
  maxResults?: number;

  /**
   * Minimum number of NAICS codes to return. Must be at least 1. Defaults to 1.
   */
  minResults?: number;

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
  timeoutOpts?: IndustryRetrieveNaicsParams.TimeoutOpts;
}

export namespace IndustryRetrieveNaicsParams {
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

export interface IndustryRetrieveSicParams {
  /**
   * Brand domain or title to retrieve SIC code for. If a valid domain is provided,
   * it will be used for classification, otherwise, we will search for the brand
   * using the provided title.
   */
  input: string;

  /**
   * Maximum number of SIC codes to return. Must be between 1 and 10. Defaults to 5.
   */
  maxResults?: number;

  /**
   * Minimum number of SIC codes to return. Must be at least 1. Defaults to 1.
   */
  minResults?: number;

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
  timeoutOpts?: IndustryRetrieveSicParams.TimeoutOpts;

  /**
   * Which SIC dataset to classify against. `original_sic` uses the 1987 Standard
   * Industrial Classification system; `latest_sec` uses the current SIC list as
   * published by the SEC. Defaults to `original_sic`.
   */
  type?: 'original_sic' | 'latest_sec';
}

export namespace IndustryRetrieveSicParams {
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

export declare namespace Industry {
  export {
    type IndustryRetrieveNaicsResponse as IndustryRetrieveNaicsResponse,
    type IndustryRetrieveSicResponse as IndustryRetrieveSicResponse,
    type IndustryRetrieveNaicsParams as IndustryRetrieveNaicsParams,
    type IndustryRetrieveSicParams as IndustryRetrieveSicParams,
  };
}
