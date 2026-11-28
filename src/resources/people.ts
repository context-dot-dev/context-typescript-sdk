// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Enrich a person from identity clues, or find people with a natural-language query.
 */
export class People extends APIResource {
  /**
   * Match a person from a work email, a profile URL, or a name with company,
   * education, or location context, and get their profile with an identity-match
   * score from 0 to 100. The best candidate is returned even when the match is weak,
   * so set a score threshold for your workflow. `not_found` results are free.
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

  /**
   * Find people from a plain-language description, such as
   * `VPs of sales at solar companies in California`. Each result includes the
   * current role and employer, location, years of experience, skills, schools, and
   * public profile URLs. Pages with no matches are free.
   *
   * @example
   * ```ts
   * const response = await client.people.search({
   *   query: 'VPs of sales at solar companies in California',
   * });
   * ```
   */
  search(body: PersonSearchParams, options?: RequestOptions): APIPromise<PersonSearchResponse> {
    return this._client.post('/people/search', { body, ...options });
  }
}

export interface PersonEnrichResponse {
  /**
   * The best-matching person, with an identity-match score.
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
   * `true` when the `timeoutOpts` deadline ended processing early. The response
   * holds the data completed so far; unfinished fields are omitted.
   */
  partial?: boolean;
}

export namespace PersonEnrichResponse {
  /**
   * The best-matching person, with an identity-match score.
   */
  export interface PersonEnrichmentCandidateMatch {
    /**
     * Profile of the matched person.
     */
    person: PersonEnrichmentCandidateMatch.Person;

    /**
     * Identity-match score from 0 to 100. Higher is a stronger match; weak candidates
     * are still returned.
     */
    score: number;

    /**
     * Always `candidate` for a match.
     */
    status: 'candidate';
  }

  export namespace PersonEnrichmentCandidateMatch {
    /**
     * Profile of the matched person.
     */
    export interface Person {
      /**
       * Whether the person's current role is known. `present` means `current_role` is
       * filled in; `none` means the work history shows every role has ended; `unknown`
       * means it could not be confirmed either way, so treat a missing `current_role` as
       * unverified, not vacant.
       */
      current_role_status: 'present' | 'none' | 'unknown';

      /**
       * Education history.
       */
      education: Array<Person.Education>;

      /**
       * Work history. Each entry has the same fields as `current_role`.
       */
      experience: Array<Person.Experience>;

      /**
       * Professional skills.
       */
      skills: Array<string>;

      /**
       * Public profile URLs for the person.
       */
      social_urls: Array<string>;

      /**
       * Other websites associated with the person.
       */
      website_urls: Array<string>;

      /**
       * URL of the hosted profile picture. Omitted with zero data retention.
       */
      avatar_url?: string;

      /**
       * Short bio from the person's profile.
       */
      bio?: string;

      /**
       * When Context.dev last refreshed the profile from its sources, as an ISO 8601
       * timestamp.
       */
      checked_at?: string;

      /**
       * The person's current job. See `current_role_status` when it is missing.
       */
      current_role?: Person.CurrentRole;

      /**
       * Email address of the person.
       */
      email?: string;

      /**
       * When the profile data last changed at its sources, as an ISO 8601 timestamp.
       * Omitted when unknown.
       */
      last_updated?: string;

      /**
       * Where the person is based.
       */
      location?: Person.Location;

      /**
       * Name of the person.
       */
      name?: Person.Name;
    }

    export namespace Person {
      export interface Education {
        /**
         * School or university.
         */
        institution: Education.Institution;

        /**
         * Degree or qualification.
         */
        degree?: string;

        /**
         * Description of the studies.
         */
        description?: string;

        /**
         * When the studies ended.
         */
        end_date?: Education.EndDate;

        /**
         * Subject or major studied.
         */
        field_of_study?: string;

        /**
         * When the studies started.
         */
        start_date?: Education.StartDate;
      }

      export namespace Education {
        /**
         * School or university.
         */
        export interface Institution {
          /**
           * Name of the organization.
           */
          name: string;

          /**
           * Website domain of the organization. Omitted when unknown.
           */
          domain?: string;
        }

        /**
         * When the studies ended.
         */
        export interface EndDate {
          /**
           * Four-digit year.
           */
          year: number;

          /**
           * Day of the month. Omitted when unknown.
           */
          day?: number;

          /**
           * Month. Omitted when unknown.
           */
          month?: number;
        }

        /**
         * When the studies started.
         */
        export interface StartDate {
          /**
           * Four-digit year.
           */
          year: number;

          /**
           * Day of the month. Omitted when unknown.
           */
          day?: number;

          /**
           * Month. Omitted when unknown.
           */
          month?: number;
        }
      }

      export interface Experience {
        /**
         * Employer for this role.
         */
        organization: Experience.Organization;

        /**
         * Job title.
         */
        title: string;

        /**
         * Description of the role.
         */
        description?: string;

        /**
         * When the role ended.
         */
        end_date?: Experience.EndDate;

        /**
         * Whether the person still holds this role.
         */
        is_current?: boolean;

        /**
         * Where the role is based.
         */
        location?: string;

        /**
         * When the role started.
         */
        start_date?: Experience.StartDate;
      }

      export namespace Experience {
        /**
         * Employer for this role.
         */
        export interface Organization {
          /**
           * Name of the organization.
           */
          name: string;

          /**
           * Website domain of the organization. Omitted when unknown.
           */
          domain?: string;
        }

        /**
         * When the role ended.
         */
        export interface EndDate {
          /**
           * Four-digit year.
           */
          year: number;

          /**
           * Day of the month. Omitted when unknown.
           */
          day?: number;

          /**
           * Month. Omitted when unknown.
           */
          month?: number;
        }

        /**
         * When the role started.
         */
        export interface StartDate {
          /**
           * Four-digit year.
           */
          year: number;

          /**
           * Day of the month. Omitted when unknown.
           */
          day?: number;

          /**
           * Month. Omitted when unknown.
           */
          month?: number;
        }
      }

      /**
       * The person's current job. See `current_role_status` when it is missing.
       */
      export interface CurrentRole {
        /**
         * Employer for this role.
         */
        organization: CurrentRole.Organization;

        /**
         * Job title.
         */
        title: string;

        /**
         * Description of the role.
         */
        description?: string;

        /**
         * When the role ended.
         */
        end_date?: CurrentRole.EndDate;

        /**
         * Whether the person still holds this role.
         */
        is_current?: boolean;

        /**
         * Where the role is based.
         */
        location?: string;

        /**
         * When the role started.
         */
        start_date?: CurrentRole.StartDate;
      }

      export namespace CurrentRole {
        /**
         * Employer for this role.
         */
        export interface Organization {
          /**
           * Name of the organization.
           */
          name: string;

          /**
           * Website domain of the organization. Omitted when unknown.
           */
          domain?: string;
        }

        /**
         * When the role ended.
         */
        export interface EndDate {
          /**
           * Four-digit year.
           */
          year: number;

          /**
           * Day of the month. Omitted when unknown.
           */
          day?: number;

          /**
           * Month. Omitted when unknown.
           */
          month?: number;
        }

        /**
         * When the role started.
         */
        export interface StartDate {
          /**
           * Four-digit year.
           */
          year: number;

          /**
           * Day of the month. Omitted when unknown.
           */
          day?: number;

          /**
           * Month. Omitted when unknown.
           */
          month?: number;
        }
      }

      /**
       * Where the person is based.
       */
      export interface Location {
        /**
         * City.
         */
        city?: string;

        /**
         * Country name.
         */
        country?: string;

        /**
         * ISO 3166-1 alpha-2 country code.
         */
        country_code?: string;

        /**
         * Location as a single display string.
         */
        display?: string;

        /**
         * State, province, or region.
         */
        region?: string;
      }

      /**
       * Name of the person.
       */
      export interface Name {
        /**
         * First or given name.
         */
        first?: string;

        /**
         * Full name.
         */
        full?: string;

        /**
         * Last or family name.
         */
        last?: string;
      }
    }
  }

  /**
   * No usable candidate was found.
   */
  export interface PersonEnrichmentNotFoundMatch {
    /**
     * Always `null`.
     */
    person: null;

    /**
     * Always `null`.
     */
    score: null;

    /**
     * Always `not_found` when no candidate exists.
     */
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
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface PersonSearchResponse {
  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Up to 10 matching people, most relevant first.
   */
  results: Array<PersonSearchResponse.Result>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: PersonSearchResponse.KeyMetadata;

  /**
   * Pass as `cursor` to fetch the next page. `null` on the last page.
   */
  next_cursor?: string | null;
}

export namespace PersonSearchResponse {
  /**
   * A person who matches your search. Unknown details are `null` or empty lists.
   */
  export interface Result {
    /**
     * What the person does.
     */
    description: string | null;

    /**
     * Whether the person is currently a founder or co-founder. `null` when unknown.
     */
    is_founder: boolean | null;

    /**
     * Where the person lives.
     */
    location: Result.Location;

    /**
     * Full name.
     */
    name: string | null;

    /**
     * Public professional profile URLs. Send one to `POST /people/enrich` as
     * `social_urls` for the full profile.
     */
    profiles: Array<string>;

    /**
     * The person's current role.
     */
    role: Result.Role;

    /**
     * Schools attended.
     */
    schools: Array<string>;

    /**
     * Professional skills.
     */
    skills: Array<string>;

    /**
     * Years of professional experience. `null` when unknown.
     */
    years_of_experience: number | null;

    /**
     * How well the person matches the query. Returned only in `ultra` mode.
     */
    match?: Result.Match;
  }

  export namespace Result {
    /**
     * Where the person lives.
     */
    export interface Location {
      /**
       * City.
       */
      city: string | null;

      /**
       * ISO 3166-1 alpha-2 country code, such as `US`.
       */
      country_code: string | null;

      /**
       * State or region.
       */
      region: string | null;
    }

    /**
     * The person's current role.
     */
    export interface Role {
      /**
       * Current employer. `null` when unknown.
       */
      company: Role.Company | null;

      /**
       * Areas of responsibility, such as `sales`.
       */
      functions: Array<string>;

      /**
       * Seniority level, such as `executive`.
       */
      seniority: string | null;

      /**
       * When the role started, as `YYYY-MM-DD`.
       */
      started_on: string | null;

      /**
       * Job title.
       */
      title: string | null;
    }

    export namespace Role {
      /**
       * Current employer. `null` when unknown.
       */
      export interface Company {
        /**
         * Website domain of the company.
         */
        domain: string | null;

        /**
         * Company name.
         */
        name: string | null;
      }
    }

    /**
     * How well the person matches the query. Returned only in `ultra` mode.
     */
    export interface Match {
      /**
       * How well the person matches the query, from 0 to 1.
       */
      confidence: number;
    }
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

export interface PersonEnrichParams {
  /**
   * Company associated with the person. Send a `name`, a `domain`, or both.
   */
  company?: PersonEnrichParams.Company;

  /**
   * Education history to help distinguish people with similar names.
   */
  education?: Array<PersonEnrichParams.Education>;

  /**
   * Work email address of the person. Free and disposable email providers
   * return 422.
   */
  email?: string;

  /**
   * Location associated with the person. Send at least one of `city`, `region`, or
   * `country`.
   */
  location?: PersonEnrichParams.Location;

  /**
   * Name of the person. Without an email or profile URL, send both `first` and
   * `last` plus `company`, `education`, or `location`.
   */
  name?: PersonEnrichParams.Name;

  /**
   * Public profile URLs for the person. A person-profile URL is enough to identify
   * them without a name.
   */
  social_urls?: Array<string>;

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
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
   * Company associated with the person. Send a `name`, a `domain`, or both.
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
   * Location associated with the person. Send at least one of `city`, `region`, or
   * `country`.
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
   * Name of the person. Without an email or profile URL, send both `first` and
   * `last` plus `company`, `education`, or `location`.
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
     * `fail` returns 408 at the deadline. `return-partial` returns the results
     * collected so far and marks the response as partial.
     */
    behavior?: 'fail' | 'return-partial';
  }
}

export interface PersonSearchParams {
  /**
   * Plain-language description of the people to find. Up to 500 characters in `fast`
   * mode and 5000 in `ultra` mode.
   */
  query: string;

  /**
   * Cursor from the previous page's `next_cursor`. Omit for the first page. Send the
   * same `query`, `mode`, and `filters` with it.
   */
  cursor?: string;

  /**
   * Constraints every result must match, in addition to `query`.
   */
  filters?: PersonSearchParams.Filters;

  /**
   * `fast` matches people on basic criteria such as role, location, or background;
   * `ultra` runs a deeper search, checks every candidate against each criterion in
   * your query, and adds a `match` score. Complex `ultra` searches can take up to 30
   * seconds, so set your client timeout to match.
   */
  mode?: 'fast' | 'ultra';

  /**
   * Labels for this request. Filter usage and request logs by them in the dashboard
   * or with `GET /org/logs`.
   */
  tags?: Array<string>;

  /**
   * `enabled` turns on zero data retention. Returns 403 `ZDR_NOT_ENABLED` unless
   * your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace PersonSearchParams {
  /**
   * Constraints every result must match, in addition to `query`.
   */
  export interface Filters {
    /**
     * Only return people who live in these countries, as ISO 3166-1 alpha-2 codes such
     * as `US`.
     */
    countries?: Array<string>;

    /**
     * Maximum years of professional experience.
     */
    years_of_experience_max?: number;

    /**
     * Minimum years of professional experience.
     */
    years_of_experience_min?: number;
  }
}

export declare namespace People {
  export {
    type PersonEnrichResponse as PersonEnrichResponse,
    type PersonSearchResponse as PersonSearchResponse,
    type PersonEnrichParams as PersonEnrichParams,
    type PersonSearchParams as PersonSearchParams,
  };
}
