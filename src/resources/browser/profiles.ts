// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * List the authenticated browser profiles your organization created.
 */
export class Profiles extends APIResource {
  /**
   * List the browser profiles your organization saved through `POST /web/scrape`,
   * newest first. Pass a profile `id` as `sharedParams.profile.profileId` to scrape
   * as that signed-in user.
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
   * Browser profiles on this page, newest first.
   */
  data: Array<ProfileListResponse.Data>;

  /**
   * Whether more results are available after this page.
   */
  has_more: boolean;

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
  key_metadata?: ProfileListResponse.KeyMetadata;
}

export namespace ProfileListResponse {
  export interface Data {
    /**
     * Unique ID of the browser profile. Pass it as `sharedParams.profile.profileId` on
     * `POST /web/scrape`.
     */
    id: string;

    /**
     * When the browser profile was created.
     */
    created_at: string;

    /**
     * Label set when the profile was created. `null` when none was set.
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
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface ProfileListParams {
  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of profiles to return per page.
   */
  limit?: number;
}

export declare namespace Profiles {
  export { type ProfileListResponse as ProfileListResponse, type ProfileListParams as ProfileListParams };
}
