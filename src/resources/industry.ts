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
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
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
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;

  /**
   * Which SIC dataset to classify against. `original_sic` uses the 1987 Standard
   * Industrial Classification system; `latest_sec` uses the current SIC list as
   * published by the SEC. Defaults to `original_sic`.
   */
  type?: 'original_sic' | 'latest_sec';
}

export declare namespace Industry {
  export {
    type IndustryRetrieveNaicsResponse as IndustryRetrieveNaicsResponse,
    type IndustryRetrieveSicResponse as IndustryRetrieveSicResponse,
    type IndustryRetrieveNaicsParams as IndustryRetrieveNaicsParams,
    type IndustryRetrieveSicParams as IndustryRetrieveSicParams,
  };
}
