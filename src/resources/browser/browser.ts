// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProfilesAPI from './profiles';
import { ProfileListParams, ProfileListResponse, Profiles } from './profiles';

export class Browser extends APIResource {
  profiles: ProfilesAPI.Profiles = new ProfilesAPI.Profiles(this._client);
}

Browser.Profiles = Profiles;

export declare namespace Browser {
  export {
    Profiles as Profiles,
    type ProfileListResponse as ProfileListResponse,
    type ProfileListParams as ProfileListParams,
  };
}
