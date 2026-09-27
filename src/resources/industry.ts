// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Industry extends APIResource {
  /**
   * Classify a company into NAICS industry codes.
   */
  retrieveNaics(
    query: IndustryRetrieveNaicsParams,
    options?: RequestOptions,
  ): APIPromise<IndustryRetrieveNaicsResponse> {
    return this._client.get('/web/naics', { query, ...options });
  }

  /**
   * Classify a company into SIC industry codes.
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
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
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
   * Credits this request used and your remaining balance.
   */
  key_metadata?: IndustryRetrieveNaicsResponse.KeyMetadata;

  /**
   * True when the timeout ended processing and this response contains only usable
   * results completed so far. Unfinished results are omitted.
   */
  partial?: boolean;

  /**
   * Always `ok` on success.
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

export interface IndustryRetrieveSicResponse {
  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
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
   * Credits this request used and your remaining balance.
   */
  key_metadata?: IndustryRetrieveSicResponse.KeyMetadata;

  /**
   * True when the timeout ended processing and this response contains only usable
   * results completed so far. Unfinished results are omitted.
   */
  partial?: boolean;

  /**
   * Always `ok` on success.
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
   * Comma-separated labels for filtering usage, e.g. `production,team-alpha`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: IndustryRetrieveNaicsParams.TimeoutOpts;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace IndustryRetrieveNaicsParams {
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
   * Comma-separated labels for filtering usage, e.g. `production,team-alpha`.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: IndustryRetrieveSicParams.TimeoutOpts;

  /**
   * SIC dataset: `original_sic` (1987) or `latest_sec` (current SEC list).
   */
  type?: 'original_sic' | 'latest_sec';

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace IndustryRetrieveSicParams {
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

export declare namespace Industry {
  export {
    type IndustryRetrieveNaicsResponse as IndustryRetrieveNaicsResponse,
    type IndustryRetrieveSicResponse as IndustryRetrieveSicResponse,
    type IndustryRetrieveNaicsParams as IndustryRetrieveNaicsParams,
    type IndustryRetrieveSicParams as IndustryRetrieveSicParams,
  };
}
