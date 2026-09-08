// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class AI extends APIResource {
  /**
   * Given a single URL, determines if it is a product page and extracts the product
   * information.
   *
   * @example
   * ```ts
   * const response = await client.ai.extractProduct({
   *   url: 'https://example.com',
   * });
   * ```
   */
  extractProduct(
    body: AIExtractProductParams,
    options?: RequestOptions,
  ): APIPromise<AIExtractProductResponse> {
    return this._client.post('/brand/ai/product', { body, ...options });
  }

  /**
   * Extract product information from a brand's website. We will analyze the website
   * and return a list of products with details such as name, description, image,
   * pricing, features, and more.
   *
   * @example
   * ```ts
   * const response = await client.ai.extractProducts({
   *   domain: 'domain',
   * });
   * ```
   */
  extractProducts(
    body: AIExtractProductsParams,
    options?: RequestOptions,
  ): APIPromise<AIExtractProductsResponse> {
    return this._client.post('/brand/ai/products', { body, ...options });
  }
}

export interface AIExtractProductResponse {
  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: AIExtractProductResponse.CacheMetadata;

  /**
   * Whether the given URL is a product detail page
   */
  is_product_page?: boolean;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: AIExtractProductResponse.KeyMetadata;

  /**
   * The detected ecommerce platform, or null if not a product page
   */
  platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic' | null;

  /**
   * The extracted product data, or null if not a product page
   */
  product?: AIExtractProductResponse.Product | null;
}

export namespace AIExtractProductResponse {
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
   * The extracted product data, or null if not a product page
   */
  export interface Product {
    /**
     * Description of the product
     */
    description: string;

    /**
     * List of product features
     */
    features: Array<string>;

    /**
     * URLs to product images on the page (up to 7)
     */
    images: Array<string>;

    /**
     * Name of the product
     */
    name: string;

    /**
     * Stock Keeping Unit (product identifier). Null if no identifier is found.
     */
    sku: string | null;

    /**
     * Tags associated with the product
     */
    tags: Array<string>;

    /**
     * Target audience for the product (array of strings)
     */
    target_audience: Array<string>;

    /**
     * Normalized stock or ordering availability
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
     * Billing frequency for the product
     */
    billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based' | null;

    /**
     * Category of the product
     */
    category?: string | null;

    /**
     * Currency code for the price (e.g., USD, EUR)
     */
    currency?: string | null;

    /**
     * Dimension statements shown for the product, preserving labels, values, and units
     */
    dimensions?: Array<string>;

    /**
     * URL to the product image
     */
    image_url?: string | null;

    /**
     * Price of the product
     */
    price?: number | null;

    /**
     * Pricing model for the product
     */
    pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom' | null;

    /**
     * Original or regular price before a displayed discount
     */
    regular_price?: number | null;

    /**
     * URL to the product page
     */
    url?: string | null;
  }
}

export interface AIExtractProductsResponse {
  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: AIExtractProductsResponse.CacheMetadata;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: AIExtractProductsResponse.KeyMetadata;

  /**
   * Array of products extracted from the website
   */
  products?: Array<AIExtractProductsResponse.Product>;
}

export namespace AIExtractProductsResponse {
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

  export interface Product {
    /**
     * Description of the product
     */
    description: string;

    /**
     * List of product features
     */
    features: Array<string>;

    /**
     * URLs to product images on the page (up to 7)
     */
    images: Array<string>;

    /**
     * Name of the product
     */
    name: string;

    /**
     * Stock Keeping Unit (product identifier). Null if no identifier is found.
     */
    sku: string | null;

    /**
     * Tags associated with the product
     */
    tags: Array<string>;

    /**
     * Target audience for the product (array of strings)
     */
    target_audience: Array<string>;

    /**
     * Normalized stock or ordering availability
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
     * Billing frequency for the product
     */
    billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based' | null;

    /**
     * Category of the product
     */
    category?: string | null;

    /**
     * Currency code for the price (e.g., USD, EUR)
     */
    currency?: string | null;

    /**
     * Dimension statements shown for the product, preserving labels, values, and units
     */
    dimensions?: Array<string>;

    /**
     * URL to the product image
     */
    image_url?: string | null;

    /**
     * Price of the product
     */
    price?: number | null;

    /**
     * Pricing model for the product
     */
    pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom' | null;

    /**
     * Original or regular price before a displayed discount
     */
    regular_price?: number | null;

    /**
     * URL to the product page
     */
    url?: string | null;
  }
}

export interface AIExtractProductParams {
  /**
   * The product page URL to extract product data from.
   */
  url: string;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 7 days (604800000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number;

  /**
   * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export type AIExtractProductsParams = AIExtractProductsParams.ByDomain | AIExtractProductsParams.ByDirectURL;

export declare namespace AIExtractProductsParams {
  export interface ByDomain {
    /**
     * The domain name to analyze.
     */
    domain: string;

    /**
     * Return a cached result if a prior scrape for the same parameters exists and is
     * younger than this many milliseconds. Defaults to 7 days (604800000 ms) when
     * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
     */
    maxAgeMs?: number;

    /**
     * Maximum number of products to extract.
     */
    maxProducts?: number;

    /**
     * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
     */
    tags?: Array<string>;

    /**
     * Optional timeout in milliseconds for the request. If the request takes longer
     * than this value, it will be aborted with a 408 status code. Maximum allowed
     * value is 300000ms (5 minutes).
     */
    timeoutMS?: number;
  }

  export interface ByDirectURL {
    /**
     * A specific URL to use directly as the starting point for extraction without
     * domain resolution.
     */
    directUrl: string;

    /**
     * Return a cached result if a prior scrape for the same parameters exists and is
     * younger than this many milliseconds. Defaults to 7 days (604800000 ms) when
     * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
     */
    maxAgeMs?: number;

    /**
     * Maximum number of products to extract.
     */
    maxProducts?: number;

    /**
     * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
     */
    tags?: Array<string>;

    /**
     * Optional timeout in milliseconds for the request. If the request takes longer
     * than this value, it will be aborted with a 408 status code. Maximum allowed
     * value is 300000ms (5 minutes).
     */
    timeoutMS?: number;
  }
}

export declare namespace AI {
  export {
    type AIExtractProductResponse as AIExtractProductResponse,
    type AIExtractProductsResponse as AIExtractProductsResponse,
    type AIExtractProductParams as AIExtractProductParams,
    type AIExtractProductsParams as AIExtractProductsParams,
  };
}
