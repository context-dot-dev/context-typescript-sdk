// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class People extends APIResource {
  /**
   * Find a person from identity clues and return their profile with a match score.
   * Requires a paid plan; free or disposable email addresses return 422.
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
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: PersonEnrichResponse.KeyMetadata;

  /**
   * True when the timeout ended processing and this response contains the usable
   * data completed so far. Unfinished fields are omitted.
   */
  partial?: boolean;
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

export interface PersonEnrichParams {
  /**
   * Company context to help identify the person. Provide a name or domain.
   */
  company?: PersonEnrichParams.Company;

  /**
   * Education history to help distinguish people with similar names.
   */
  education?: Array<PersonEnrichParams.Education>;

  /**
   * Email address of the person to find.
   */
  email?: string;

  /**
   * Location context to help identify the person. Provide a city, region, or
   * country.
   */
  location?: PersonEnrichParams.Location;

  /**
   * Person name. Without an email or person-profile URL, provide both first and last
   * name plus company, education, or location.
   */
  name?: PersonEnrichParams.Name;

  /**
   * Public profile URLs for the person. A person-profile URL can identify the person
   * without a name.
   */
  social_urls?: Array<string>;

  /**
   * Labels for filtering usage in the dashboard.
   */
  tags?: Array<string>;

  /**
   * Request deadline and what to return when it passes.
   */
  timeoutOpts?: PersonEnrichParams.TimeoutOpts;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace PersonEnrichParams {
  /**
   * Company context to help identify the person. Provide a name or domain.
   */
  export interface Company {
    /**
     * Website domain of a company associated with the person.
     */
    domain?: string;

    /**
     * Name of a company associated with the person.
     */
    name?: string;
  }

  export interface Education {
    /**
     * Degree or qualification earned.
     */
    degree?: string;

    /**
     * Subject or major studied.
     */
    field_of_study?: string;

    /**
     * Four-digit graduation year.
     */
    graduation_year?: number;

    /**
     * School or university, identified by name or domain.
     */
    institution?: Education.Institution;
  }

  export namespace Education {
    /**
     * School or university, identified by name or domain.
     */
    export interface Institution {
      /**
       * Website domain of the school or university.
       */
      domain?: string;

      /**
       * Name of the school or university.
       */
      name?: string;
    }
  }

  /**
   * Location context to help identify the person. Provide a city, region, or
   * country.
   */
  export interface Location {
    /**
     * City associated with the person.
     */
    city?: string;

    /**
     * Country associated with the person.
     */
    country?: string;

    /**
     * State, province, or region associated with the person.
     */
    region?: string;
  }

  /**
   * Person name. Without an email or person-profile URL, provide both first and last
   * name plus company, education, or location.
   */
  export interface Name {
    /**
     * First or given name.
     */
    first?: string;

    /**
     * Last or family name.
     */
    last?: string;
  }

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

export declare namespace People {
  export { type PersonEnrichResponse as PersonEnrichResponse, type PersonEnrichParams as PersonEnrichParams };
}
