// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class People extends APIResource {
  /**
   * Finds and normalizes the best available person candidate from additive identity
   * clues, then assigns an identity match score from 0 to 100. Available on all paid
   * plans. Successful requests cost 20 credits. Disposable and free email addresses
   * (like gmail.com, yahoo.com) will throw a 422 error.
   *
   * @example
   * ```ts
   * const response = await client.people.enrich({
   *   company: {
   *     name: 'Analytical Engines',
   *     domain: 'analyticalengines.example',
   *   },
   *   name: { first: 'Ada', last: 'Lovelace' },
   *   social_urls: [
   *     'https://www.linkedin.com/in/ada-lovelace/',
   *   ],
   * });
   * ```
   */
  enrich(body: PersonEnrichParams, options?: RequestOptions): APIPromise<PersonEnrichResponse> {
    return this._client.post('/people/enrich', { body, ...options });
  }
}

export interface PersonEnrichResponse {
  /**
   * The highest-scoring person candidate.
   */
  match:
    | PersonEnrichResponse.PersonEnrichmentCandidateMatch
    | PersonEnrichResponse.PersonEnrichmentNotFoundMatch;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: PersonEnrichResponse.KeyMetadata;
}

export namespace PersonEnrichResponse {
  /**
   * The highest-scoring person candidate.
   */
  export interface PersonEnrichmentCandidateMatch {
    person: PersonEnrichmentCandidateMatch.Person;

    score: number;

    status: 'candidate';
  }

  export namespace PersonEnrichmentCandidateMatch {
    export interface Person {
      /**
       * Whether the person's current role is known. `present` — current_role is
       * populated. `none` — the work history explicitly shows every role has ended.
       * `unknown` — our data sources could not confirm either way; treat a missing
       * current_role as unverified rather than vacant.
       */
      current_role_status: 'present' | 'none' | 'unknown';

      education: Array<Person.Education>;

      experience: Array<Person.Experience>;

      skills: Array<string>;

      social_urls: Array<string>;

      website_urls: Array<string>;

      avatar_url?: string;

      bio?: string;

      /**
       * When we last refreshed this profile from our data sources (ISO 8601).
       */
      checked_at?: string;

      current_role?: Person.CurrentRole;

      email?: string;

      /**
       * When the underlying profile data last changed in our data sources (ISO 8601).
       * Omitted when unknown.
       */
      last_updated?: string;

      location?: Person.Location;

      name?: Person.Name;
    }

    export namespace Person {
      export interface Education {
        institution: Education.Institution;

        degree?: string;

        description?: string;

        end_date?: Education.EndDate;

        field_of_study?: string;

        start_date?: Education.StartDate;
      }

      export namespace Education {
        export interface Institution {
          name: string;

          domain?: string;
        }

        export interface EndDate {
          year: number;

          day?: number;

          month?: number;
        }

        export interface StartDate {
          year: number;

          day?: number;

          month?: number;
        }
      }

      export interface Experience {
        organization: Experience.Organization;

        title: string;

        description?: string;

        end_date?: Experience.EndDate;

        is_current?: boolean;

        location?: string;

        start_date?: Experience.StartDate;
      }

      export namespace Experience {
        export interface Organization {
          name: string;

          domain?: string;
        }

        export interface EndDate {
          year: number;

          day?: number;

          month?: number;
        }

        export interface StartDate {
          year: number;

          day?: number;

          month?: number;
        }
      }

      export interface CurrentRole {
        organization: CurrentRole.Organization;

        title: string;

        description?: string;

        end_date?: CurrentRole.EndDate;

        is_current?: boolean;

        location?: string;

        start_date?: CurrentRole.StartDate;
      }

      export namespace CurrentRole {
        export interface Organization {
          name: string;

          domain?: string;
        }

        export interface EndDate {
          year: number;

          day?: number;

          month?: number;
        }

        export interface StartDate {
          year: number;

          day?: number;

          month?: number;
        }
      }

      export interface Location {
        city?: string;

        country?: string;

        country_code?: string;

        display?: string;

        region?: string;
      }

      export interface Name {
        first?: string;

        full?: string;

        last?: string;
      }
    }
  }

  /**
   * No usable person candidate was found.
   */
  export interface PersonEnrichmentNotFoundMatch {
    person: null;

    score: null;

    status: 'not_found';
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

export interface PersonEnrichParams {
  company?: PersonEnrichParams.Company;

  education?: Array<PersonEnrichParams.Education>;

  email?: string;

  location?: PersonEnrichParams.Location;

  name?: PersonEnrichParams.Name;

  social_urls?: Array<string>;

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

export namespace PersonEnrichParams {
  export interface Company {
    domain?: string;

    name?: string;
  }

  export interface Education {
    degree?: string;

    field_of_study?: string;

    graduation_year?: number;

    institution?: Education.Institution;
  }

  export namespace Education {
    export interface Institution {
      domain?: string;

      name?: string;
    }
  }

  export interface Location {
    city?: string;

    country?: string;

    region?: string;
  }

  export interface Name {
    first?: string;

    last?: string;
  }
}

export declare namespace People {
  export { type PersonEnrichResponse as PersonEnrichResponse, type PersonEnrichParams as PersonEnrichParams };
}
