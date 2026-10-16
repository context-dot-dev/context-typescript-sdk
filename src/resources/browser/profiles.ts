// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * See the authenticated browser profiles your organization created.
 */
export class Profiles extends APIResource {
  /**
   * List the browser profiles your organization created with `/web/scrape`, newest
   * first.
   */
  list(
    query: ProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProfileListResponse> {
    return this._client.get('/org/browser/profiles', { query, ...options });
  }
}

export interface ProfileListResponse {
  /**
   * Browser profiles, newest first.
   */
  data: Array<ProfileListResponse.Data>;

  /**
   * Whether a next page exists.
   */
  has_more: boolean;

  /**
   * Pass as `cursor` to fetch the next page.
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
  key_metadata?: ProfileListResponse.KeyMetadata;
}

export namespace ProfileListResponse {
  export interface Data {
    /**
     * Profile ID to pass as `sharedParams.profile.profileId` on `/web/scrape`.
     */
    id: string;

    /**
     * When the profile was created.
     */
    created_at: string;

    /**
     * The description supplied when the profile was created, or null.
     */
    description: string | null;
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

export interface ProfileListParams {
  /**
   * The `next_cursor` from the previous page.
   */
  cursor?: string;

  /**
   * Number of profiles per page.
   */
  limit?: number;
}

export declare namespace Profiles {
  export { type ProfileListResponse as ProfileListResponse, type ProfileListParams as ProfileListParams };
}
