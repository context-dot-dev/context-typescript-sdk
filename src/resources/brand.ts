// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Retrieve a brand's logos, colors, company details, and social links, or find brands by name or domain.
 */
export class Brand extends APIResource {
  /**
   * Look up a brand by domain, company name, work email, stock ticker, page URL, or
   * card transaction descriptor. Returns logos, colors, backdrops, description,
   * industries, address, stock listing, and social links. A `by_direct_url` lookup
   * reads only that page.
   *
   * @example
   * ```ts
   * const brand = await client.brand.retrieve({
   *   domain: 'stripe.com',
   *   type: 'by_domain',
   * });
   * ```
   */
  retrieve(body: BrandRetrieveParams, options?: RequestOptions): APIPromise<BrandRetrieveResponse> {
    return this._client.post('/brand/retrieve', { body, ...options });
  }

  /**
   * Autocomplete brand names and domains as a user types, with up to 10 brands
   * ranked by popularity and a ready-to-use logo URL for each. Filter by country and
   * primary language. Pass a returned `domain` to `POST /brand/retrieve` for the
   * full brand profile.
   *
   * @example
   * ```ts
   * const response = await client.brand.search({ query: 'x' });
   * ```
   */
  search(query: BrandSearchParams, options?: RequestOptions): APIPromise<BrandSearchResponse> {
    return this._client.get('/brand/search', { query, ...options });
  }
}

export interface BrandRetrieveResponse {
  /**
   * The brand's identity, visual assets, and company details.
   */
  brand: BrandRetrieveResponse.Brand;

  /**
   * Cache status of this response.
   */
  cache_metadata: BrandRetrieveResponse.CacheMetadata;

  /**
   * HTTP status code. Always `200` on success.
   */
  code: number;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Always `ok` on success.
   */
  status: string;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BrandRetrieveResponse.KeyMetadata;

  /**
   * `true` when the `timeoutOpts` deadline ended processing early. The response
   * holds the data completed so far; unfinished fields are omitted.
   */
  partial?: boolean;
}

export namespace BrandRetrieveResponse {
  /**
   * The brand's identity, visual assets, and company details.
   */
  export interface Brand {
    /**
     * Physical address of the brand. Omitted when unknown.
     */
    address?: Brand.Address;

    /**
     * Backdrop images for the brand, such as social profile banners.
     */
    backdrops?: Array<Brand.Backdrop>;

    /**
     * Brand colors from the website and logos.
     */
    colors?: Array<Brand.Color>;

    /**
     * Short description of the brand.
     */
    description?: string;

    /**
     * Domain of the brand.
     */
    domain?: string;

    /**
     * Contact email address for the company.
     */
    email?: string;

    /**
     * Employee headcount. Omitted when unknown.
     */
    employees?: Brand.Employees;

    /**
     * Industry classification of the brand.
     */
    industries?: Brand.Industries;

    /**
     * Whether the brand's content is not safe for work (NSFW).
     */
    is_nsfw?: boolean;

    /**
     * Key pages on the brand's website.
     */
    links?: Brand.Links;

    /**
     * Brand logos, most relevant first. An SVG is listed ahead of a raster logo of the
     * same shape.
     */
    logos?: Array<Brand.Logo>;

    /**
     * Contact phone number for the company.
     */
    phone?: string;

    /**
     * Lowercase language name, such as `english`.
     */
    primary_language?:
      | 'afrikaans'
      | 'albanian'
      | 'amharic'
      | 'arabic'
      | 'armenian'
      | 'assamese'
      | 'aymara'
      | 'azeri'
      | 'basque'
      | 'belarusian'
      | 'bengali'
      | 'bosnian'
      | 'bulgarian'
      | 'burmese'
      | 'cantonese'
      | 'catalan'
      | 'cebuano'
      | 'chinese'
      | 'corsican'
      | 'croatian'
      | 'czech'
      | 'danish'
      | 'dutch'
      | 'english'
      | 'esperanto'
      | 'estonian'
      | 'farsi'
      | 'fijian'
      | 'finnish'
      | 'french'
      | 'galician'
      | 'georgian'
      | 'german'
      | 'greek'
      | 'guarani'
      | 'gujarati'
      | 'haitian-creole'
      | 'hausa'
      | 'hawaiian'
      | 'hebrew'
      | 'hindi'
      | 'hmong'
      | 'hungarian'
      | 'icelandic'
      | 'igbo'
      | 'indonesian'
      | 'irish'
      | 'italian'
      | 'japanese'
      | 'javanese'
      | 'kannada'
      | 'kazakh'
      | 'khmer'
      | 'kinyarwanda'
      | 'korean'
      | 'kurdish'
      | 'kyrgyz'
      | 'lao'
      | 'latin'
      | 'latvian'
      | 'lingala'
      | 'lithuanian'
      | 'luxembourgish'
      | 'macedonian'
      | 'malagasy'
      | 'malay'
      | 'malayalam'
      | 'maltese'
      | 'maori'
      | 'marathi'
      | 'mongolian'
      | 'nepali'
      | 'norwegian'
      | 'odia'
      | 'oromo'
      | 'pashto'
      | 'pidgin'
      | 'polish'
      | 'portuguese'
      | 'punjabi'
      | 'quechua'
      | 'romanian'
      | 'russian'
      | 'samoan'
      | 'scottish-gaelic'
      | 'serbian'
      | 'sesotho'
      | 'shona'
      | 'sindhi'
      | 'sinhala'
      | 'slovak'
      | 'slovene'
      | 'somali'
      | 'spanish'
      | 'sundanese'
      | 'swahili'
      | 'swedish'
      | 'tagalog'
      | 'tajik'
      | 'tamil'
      | 'tatar'
      | 'telugu'
      | 'thai'
      | 'tibetan'
      | 'tigrinya'
      | 'tongan'
      | 'tswana'
      | 'turkish'
      | 'turkmen'
      | 'ukrainian'
      | 'urdu'
      | 'uyghur'
      | 'uzbek'
      | 'vietnamese'
      | 'welsh'
      | 'wolof'
      | 'xhosa'
      | 'yiddish'
      | 'yoruba'
      | 'zulu'
      | null;

    /**
     * Brand slogan or tagline.
     */
    slogan?: string;

    /**
     * Social media profiles of the brand.
     */
    socials?: Array<Brand.Social>;

    /**
     * Stock listing. Omitted when the company is not publicly traded.
     */
    stock?: Brand.Stock;

    /**
     * Brand name.
     */
    title?: string;
  }

  export namespace Brand {
    /**
     * Physical address of the brand. Omitted when unknown.
     */
    export interface Address {
      /**
       * City.
       */
      city?: string;

      /**
       * Country name.
       */
      country?: string;

      /**
       * Country code, such as `US`.
       */
      country_code?: string;

      /**
       * Postal or ZIP code.
       */
      postal_code?: string;

      /**
       * State or province code.
       */
      state_code?: string;

      /**
       * State or province name.
       */
      state_province?: string;

      /**
       * Street address.
       */
      street?: string;
    }

    export interface Backdrop {
      /**
       * Colors in the backdrop image.
       */
      colors?: Array<Backdrop.Color>;

      /**
       * Size of the backdrop image.
       */
      resolution?: Backdrop.Resolution;

      /**
       * URL of the backdrop image.
       */
      url?: string;
    }

    export namespace Backdrop {
      export interface Color {
        /**
         * Hex color code, such as `#635BFF`.
         */
        hex?: string;

        /**
         * Human-readable color name.
         */
        name?: string;
      }

      /**
       * Size of the backdrop image.
       */
      export interface Resolution {
        /**
         * Aspect ratio, as width divided by height.
         */
        aspect_ratio?: number;

        /**
         * Height, in pixels.
         */
        height?: number;

        /**
         * Width, in pixels.
         */
        width?: number;
      }
    }

    export interface Color {
      /**
       * Hex color code, such as `#635BFF`.
       */
      hex?: string;

      /**
       * Human-readable color name.
       */
      name?: string;

      /**
       * `site` colors come from the website's own theme (rendered page colors, web app
       * manifest, `theme-color` meta tag); `logo` colors come from logo pixels.
       */
      source?: 'site' | 'logo';
    }

    /**
     * Employee headcount. Omitted when unknown.
     */
    export interface Employees {
      /**
       * Exact employee count, when known.
       */
      exact?: number;

      /**
       * Headcount range, such as `11 to 50`.
       */
      range?:
        | '1 to 10'
        | '11 to 50'
        | '51 to 200'
        | '201 to 500'
        | '501 to 1000'
        | '1001 to 5000'
        | '5001 to 10000'
        | '10001+';
    }

    /**
     * Industry classification of the brand.
     */
    export interface Industries {
      /**
       * Industry and subindustry pairs from Context.dev's Easy Industry Classification
       * (EIC).
       */
      eic?: Array<Industries.Eic>;
    }

    export namespace Industries {
      export interface Eic {
        /**
         * Top-level industry in the Easy Industry Classification (EIC).
         */
        industry:
          | 'Aerospace & Defense'
          | 'Technology'
          | 'Finance'
          | 'Healthcare'
          | 'Retail & E-commerce'
          | 'Entertainment'
          | 'Education'
          | 'Government & Nonprofit'
          | 'Industrial & Energy'
          | 'Automotive & Transportation'
          | 'Lifestyle & Leisure'
          | 'Luxury & Fashion'
          | 'News & Media'
          | 'Sports'
          | 'Real Estate & PropTech'
          | 'Legal & Compliance'
          | 'Telecommunications'
          | 'Agriculture & Food'
          | 'Professional Services & Agencies'
          | 'Chemicals & Materials'
          | 'Logistics & Supply Chain'
          | 'Hospitality & Tourism'
          | 'Construction & Built Environment'
          | 'Consumer Packaged Goods (CPG)';

        /**
         * Subindustry in the Easy Industry Classification (EIC).
         */
        subindustry:
          | 'Defense Systems & Military Hardware'
          | 'Aerospace Manufacturing'
          | 'Avionics & Navigation Technology'
          | 'Subsea & Naval Defense Systems'
          | 'Space & Satellite Technology'
          | 'Defense IT & Systems Integration'
          | 'Software (B2B)'
          | 'Software (B2C)'
          | 'Cloud Infrastructure & DevOps'
          | 'Cybersecurity'
          | 'Artificial Intelligence & Machine Learning'
          | 'Data Infrastructure & Analytics'
          | 'Hardware & Semiconductors'
          | 'Fintech Infrastructure'
          | 'eCommerce & Marketplace Platforms'
          | 'Developer Tools & APIs'
          | 'Web3 & Blockchain'
          | 'XR & Spatial Computing'
          | 'Banking & Lending'
          | 'Investment Management & WealthTech'
          | 'Insurance & InsurTech'
          | 'Payments & Money Movement'
          | 'Accounting, Tax & Financial Planning Tools'
          | 'Capital Markets & Trading Platforms'
          | 'Financial Infrastructure & APIs'
          | 'Credit Scoring & Risk Management'
          | 'Cryptocurrency & Digital Assets'
          | 'BNPL & Alternative Financing'
          | 'Healthcare Providers & Services'
          | 'Pharmaceuticals & Drug Development'
          | 'Medical Devices & Diagnostics'
          | 'Biotechnology & Genomics'
          | 'Digital Health & Telemedicine'
          | 'Health Insurance & Benefits Tech'
          | 'Clinical Trials & Research Platforms'
          | 'Mental Health & Wellness'
          | 'Healthcare IT & EHR Systems'
          | 'Consumer Health & Wellness Products'
          | 'Online Marketplaces'
          | 'Direct-to-Consumer (DTC) Brands'
          | 'Retail Tech & Point-of-Sale Systems'
          | 'Omnichannel & In-Store Retail'
          | 'E-commerce Enablement & Infrastructure'
          | 'Subscription & Membership Commerce'
          | 'Social Commerce & Influencer Platforms'
          | 'Fashion & Apparel Retail'
          | 'Food, Beverage & Grocery E-commerce'
          | 'Streaming Platforms (Video, Music, Audio)'
          | 'Gaming & Interactive Entertainment'
          | 'Creator Economy & Influencer Platforms'
          | 'Film, TV & Production Studios'
          | 'Events, Venues & Live Entertainment'
          | 'Virtual Worlds & Metaverse Experiences'
          | 'K-12 Education Platforms & Tools'
          | 'Higher Education & University Tech'
          | 'Online Learning & MOOCs'
          | 'Test Prep & Certification'
          | 'Corporate Training & Upskilling'
          | 'Tutoring & Supplemental Learning'
          | 'Education Management Systems (LMS/SIS)'
          | 'Language Learning'
          | 'Creator-Led & Cohort-Based Courses'
          | 'Special Education & Accessibility Tools'
          | 'Government Technology & Digital Services'
          | 'Civic Engagement & Policy Platforms'
          | 'International Development & Humanitarian Aid'
          | 'Philanthropy & Grantmaking'
          | 'Nonprofit Operations & Fundraising Tools'
          | 'Public Health & Social Services'
          | 'Education & Youth Development Programs'
          | 'Environmental & Climate Action Organizations'
          | 'Legal Aid & Social Justice Advocacy'
          | 'Municipal & Infrastructure Services'
          | 'Manufacturing & Industrial Automation'
          | 'Energy Production (Oil, Gas, Nuclear)'
          | 'Renewable Energy & Cleantech'
          | 'Utilities & Grid Infrastructure'
          | 'Industrial IoT & Monitoring Systems'
          | 'Construction & Heavy Equipment'
          | 'Mining & Natural Resources'
          | 'Environmental Engineering & Sustainability'
          | 'Energy Storage & Battery Technology'
          | 'Automotive OEMs & Vehicle Manufacturing'
          | 'Electric Vehicles (EVs) & Charging Infrastructure'
          | 'Mobility-as-a-Service (MaaS)'
          | 'Fleet Management'
          | 'Public Transit & Urban Mobility'
          | 'Autonomous Vehicles & ADAS'
          | 'Aftermarket Parts & Services'
          | 'Telematics & Vehicle Connectivity'
          | 'Aviation & Aerospace Transport'
          | 'Maritime Shipping'
          | 'Fitness & Wellness'
          | 'Beauty & Personal Care'
          | 'Home & Living'
          | 'Dating & Relationships'
          | 'Hobbies, Crafts & DIY'
          | 'Outdoor & Recreational Gear'
          | 'Events, Experiences & Ticketing Platforms'
          | 'Designer & Luxury Apparel'
          | 'Accessories, Jewelry & Watches'
          | 'Footwear & Leather Goods'
          | 'Beauty, Fragrance & Skincare'
          | 'Fashion Marketplaces & Retail Platforms'
          | 'Sustainable & Ethical Fashion'
          | 'Resale, Vintage & Circular Fashion'
          | 'Fashion Tech & Virtual Try-Ons'
          | 'Streetwear & Emerging Luxury'
          | 'Couture & Made-to-Measure'
          | 'News Publishing & Journalism'
          | 'Advertising, Adtech & Media Buying'
          | 'Digital Media & Content Platforms'
          | 'Broadcasting (TV & Radio)'
          | 'Podcasting & Audio Media'
          | 'News Aggregators & Curation Tools'
          | 'Independent & Creator-Led Media'
          | 'Newsletters & Substack-Style Platforms'
          | 'Political & Investigative Media'
          | 'Trade & Niche Publications'
          | 'Media Monitoring & Analytics'
          | 'Professional Teams & Leagues'
          | 'Sports Media & Broadcasting'
          | 'Sports Betting & Fantasy Sports'
          | 'Fitness & Athletic Training Platforms'
          | 'Sportswear & Equipment'
          | 'Esports & Competitive Gaming'
          | 'Sports Venues & Event Management'
          | 'Athlete Management & Talent Agencies'
          | 'Sports Tech & Performance Analytics'
          | 'Youth, Amateur & Collegiate Sports'
          | 'Real Estate Marketplaces'
          | 'Property Management Software'
          | 'Rental Platforms'
          | 'Mortgage & Lending Tech'
          | 'Real Estate Investment Platforms'
          | 'Law Firms & Legal Services'
          | 'Legal Tech & Automation'
          | 'Regulatory Compliance'
          | 'E-Discovery & Litigation Tools'
          | 'Contract Management'
          | 'Governance, Risk & Compliance (GRC)'
          | 'IP & Trademark Management'
          | 'Legal Research & Intelligence'
          | 'Compliance Training & Certification'
          | 'Whistleblower & Ethics Reporting'
          | 'Mobile & Wireless Networks (3G/4G/5G)'
          | 'Broadband & Fiber Internet'
          | 'Satellite & Space-Based Communications'
          | 'Network Equipment & Infrastructure'
          | 'Telecom Billing & OSS/BSS Systems'
          | 'VoIP & Unified Communications'
          | 'Internet Service Providers (ISPs)'
          | 'Edge Computing & Network Virtualization'
          | 'IoT Connectivity Platforms'
          | 'Precision Agriculture & AgTech'
          | 'Crop & Livestock Production'
          | 'Food & Beverage Manufacturing & Processing'
          | 'Food Distribution'
          | 'Restaurants & Food Service'
          | 'Agricultural Inputs & Equipment'
          | 'Sustainable & Regenerative Agriculture'
          | 'Seafood & Aquaculture'
          | 'Management Consulting'
          | 'Marketing & Advertising Agencies'
          | 'Design, Branding & Creative Studios'
          | 'IT Services & Managed Services'
          | 'Staffing, Recruiting & Talent'
          | 'Accounting & Tax Firms'
          | 'Public Relations & Communications'
          | 'Business Process Outsourcing (BPO)'
          | 'Professional Training & Coaching'
          | 'Specialty Chemicals'
          | 'Commodity & Petrochemicals'
          | 'Polymers, Plastics & Rubber'
          | 'Coatings, Adhesives & Sealants'
          | 'Industrial Gases'
          | 'Advanced Materials & Composites'
          | 'Battery Materials & Energy Storage'
          | 'Electronic Materials & Semiconductor Chemicals'
          | 'Agrochemicals & Fertilizers'
          | 'Freight & Transportation Tech'
          | 'Last-Mile Delivery'
          | 'Warehouse Automation'
          | 'Supply Chain Visibility Platforms'
          | 'Logistics Marketplaces'
          | 'Shipping & Freight Forwarding'
          | 'Cold Chain Logistics'
          | 'Reverse Logistics & Returns'
          | 'Cross-Border Trade Tech'
          | 'Transportation Management Systems (TMS)'
          | 'Hotels & Accommodation'
          | 'Vacation Rentals & Short-Term Stays'
          | 'Restaurant Tech & Management'
          | 'Travel Booking Platforms'
          | 'Tourism Experiences & Activities'
          | 'Cruise Lines & Marine Tourism'
          | 'Hospitality Management Systems'
          | 'Event & Venue Management'
          | 'Corporate Travel Management'
          | 'Travel Insurance & Protection'
          | 'Construction Management Software'
          | 'BIM/CAD & Design Tools'
          | 'Construction Marketplaces'
          | 'Equipment Rental & Management'
          | 'Building Materials & Procurement'
          | 'Construction Workforce Management'
          | 'Project Estimation & Bidding'
          | 'Modular & Prefab Construction'
          | 'Construction Safety & Compliance'
          | 'Smart Building Technology'
          | 'Food & Beverage CPG'
          | 'Home & Personal Care CPG'
          | 'CPG Analytics & Insights'
          | 'Direct-to-Consumer CPG Brands'
          | 'CPG Supply Chain & Distribution'
          | 'Private Label Manufacturing'
          | 'CPG Retail Intelligence'
          | 'Sustainable CPG & Packaging'
          | 'Beauty & Cosmetics CPG'
          | 'Health & Wellness CPG';
      }
    }

    /**
     * Key pages on the brand's website.
     */
    export interface Links {
      /**
       * URL of the blog or newsroom. `null` when not found.
       */
      blog?: string | null;

      /**
       * URL of the careers page. `null` when not found.
       */
      careers?: string | null;

      /**
       * URL of the contact page. `null` when not found.
       */
      contact?: string | null;

      /**
       * URL of the pricing page. `null` when not found.
       */
      pricing?: string | null;

      /**
       * URL of the privacy policy. `null` when not found.
       */
      privacy?: string | null;

      /**
       * URL of the terms of service. `null` when not found.
       */
      terms?: string | null;
    }

    export interface Logo {
      /**
       * Colors in the logo.
       */
      colors?: Array<Logo.Color>;

      /**
       * `light` works best in light mode, `dark` works best in dark mode, and
       * `has_opaque_background` works in either because the image has its own
       * background.
       */
      mode?: 'light' | 'dark' | 'has_opaque_background';

      /**
       * Size of the logo image.
       */
      resolution?: Logo.Resolution;

      /**
       * Whether the image is an `icon` or a full `logo`, based on its dimensions.
       */
      type?: 'icon' | 'logo';

      /**
       * URL of the hosted logo image.
       */
      url?: string;
    }

    export namespace Logo {
      export interface Color {
        /**
         * Hex color code, such as `#635BFF`.
         */
        hex?: string;

        /**
         * Human-readable color name.
         */
        name?: string;
      }

      /**
       * Size of the logo image.
       */
      export interface Resolution {
        /**
         * Aspect ratio, as width divided by height.
         */
        aspect_ratio?: number;

        /**
         * Height, in pixels.
         */
        height?: number;

        /**
         * Width, in pixels.
         */
        width?: number;
      }
    }

    export interface Social {
      /**
       * Social platform.
       */
      type?:
        | 'x'
        | 'facebook'
        | 'instagram'
        | 'linkedin'
        | 'youtube'
        | 'pinterest'
        | 'tiktok'
        | 'dribbble'
        | 'github'
        | 'behance'
        | 'snapchat'
        | 'whatsapp'
        | 'telegram'
        | 'line'
        | 'discord'
        | 'twitch'
        | 'vimeo'
        | 'imdb'
        | 'tumblr'
        | 'flickr'
        | 'giphy'
        | 'medium'
        | 'spotify'
        | 'soundcloud'
        | 'tripadvisor'
        | 'yelp'
        | 'producthunt'
        | 'reddit'
        | 'crunchbase'
        | 'appstore'
        | 'playstore';

      /**
       * URL of the brand's profile on that platform.
       */
      url?: string;
    }

    /**
     * Stock listing. Omitted when the company is not publicly traded.
     */
    export interface Stock {
      /**
       * Exchange the stock trades on.
       */
      exchange?: string;

      /**
       * Stock ticker symbol.
       */
      ticker?: string;
    }
  }

  /**
   * Cache status of this response.
   */
  export interface CacheMetadata {
    /**
     * Age of the cached data, in milliseconds. `0` for `miss` and `zdr`.
     */
    age_ms: number;

    /**
     * `hit` when served from cache, `miss` when fetched fresh, `zdr` when zero data
     * retention bypassed the cache.
     */
    status: 'hit' | 'miss' | 'zdr';
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

export interface BrandSearchResponse {
  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Up to 10 matching brands: name matches first, then domain matches, each group
   * ordered by popularity. Empty when nothing matches.
   */
  results: Array<BrandSearchResponse.Result>;

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: BrandSearchResponse.KeyMetadata;
}

export namespace BrandSearchResponse {
  export interface Result {
    /**
     * Domain of the brand.
     */
    domain: string;

    /**
     * Logo Link URL that serves the brand's logo with your organization's client ID.
     * Use it directly as an image source.
     */
    logo: string;

    /**
     * Name of the brand. Empty string when unknown.
     */
    name: string;

    /**
     * Country of the brand, as an uppercase ISO 3166-1 alpha-2 code. Omitted when
     * unknown.
     */
    country?:
      | 'AD'
      | 'AE'
      | 'AF'
      | 'AG'
      | 'AI'
      | 'AL'
      | 'AM'
      | 'AO'
      | 'AQ'
      | 'AR'
      | 'AS'
      | 'AT'
      | 'AU'
      | 'AW'
      | 'AX'
      | 'AZ'
      | 'BA'
      | 'BB'
      | 'BD'
      | 'BE'
      | 'BF'
      | 'BG'
      | 'BH'
      | 'BI'
      | 'BJ'
      | 'BL'
      | 'BM'
      | 'BN'
      | 'BO'
      | 'BQ'
      | 'BR'
      | 'BS'
      | 'BT'
      | 'BV'
      | 'BW'
      | 'BY'
      | 'BZ'
      | 'CA'
      | 'CC'
      | 'CD'
      | 'CF'
      | 'CG'
      | 'CH'
      | 'CI'
      | 'CK'
      | 'CL'
      | 'CM'
      | 'CN'
      | 'CO'
      | 'CR'
      | 'CU'
      | 'CV'
      | 'CW'
      | 'CX'
      | 'CY'
      | 'CZ'
      | 'DE'
      | 'DJ'
      | 'DK'
      | 'DM'
      | 'DO'
      | 'DZ'
      | 'EC'
      | 'EE'
      | 'EG'
      | 'EH'
      | 'ER'
      | 'ES'
      | 'ET'
      | 'FI'
      | 'FJ'
      | 'FK'
      | 'FM'
      | 'FO'
      | 'FR'
      | 'GA'
      | 'GB'
      | 'GD'
      | 'GE'
      | 'GF'
      | 'GG'
      | 'GH'
      | 'GI'
      | 'GL'
      | 'GM'
      | 'GN'
      | 'GP'
      | 'GQ'
      | 'GR'
      | 'GS'
      | 'GT'
      | 'GU'
      | 'GW'
      | 'GY'
      | 'HK'
      | 'HM'
      | 'HN'
      | 'HR'
      | 'HT'
      | 'HU'
      | 'ID'
      | 'IE'
      | 'IL'
      | 'IM'
      | 'IN'
      | 'IO'
      | 'IQ'
      | 'IR'
      | 'IS'
      | 'IT'
      | 'JE'
      | 'JM'
      | 'JO'
      | 'JP'
      | 'KE'
      | 'KG'
      | 'KH'
      | 'KI'
      | 'KM'
      | 'KN'
      | 'KP'
      | 'KR'
      | 'KW'
      | 'KY'
      | 'KZ'
      | 'LA'
      | 'LB'
      | 'LC'
      | 'LI'
      | 'LK'
      | 'LR'
      | 'LS'
      | 'LT'
      | 'LU'
      | 'LV'
      | 'LY'
      | 'MA'
      | 'MC'
      | 'MD'
      | 'ME'
      | 'MF'
      | 'MG'
      | 'MH'
      | 'MK'
      | 'ML'
      | 'MM'
      | 'MN'
      | 'MO'
      | 'MP'
      | 'MQ'
      | 'MR'
      | 'MS'
      | 'MT'
      | 'MU'
      | 'MV'
      | 'MW'
      | 'MX'
      | 'MY'
      | 'MZ'
      | 'NA'
      | 'NC'
      | 'NE'
      | 'NF'
      | 'NG'
      | 'NI'
      | 'NL'
      | 'NO'
      | 'NP'
      | 'NR'
      | 'NU'
      | 'NZ'
      | 'OM'
      | 'PA'
      | 'PE'
      | 'PF'
      | 'PG'
      | 'PH'
      | 'PK'
      | 'PL'
      | 'PM'
      | 'PN'
      | 'PR'
      | 'PS'
      | 'PT'
      | 'PW'
      | 'PY'
      | 'QA'
      | 'RE'
      | 'RO'
      | 'RS'
      | 'RU'
      | 'RW'
      | 'SA'
      | 'SB'
      | 'SC'
      | 'SD'
      | 'SE'
      | 'SG'
      | 'SH'
      | 'SI'
      | 'SJ'
      | 'SK'
      | 'SL'
      | 'SM'
      | 'SN'
      | 'SO'
      | 'SR'
      | 'SS'
      | 'ST'
      | 'SV'
      | 'SX'
      | 'SY'
      | 'SZ'
      | 'TC'
      | 'TD'
      | 'TF'
      | 'TG'
      | 'TH'
      | 'TJ'
      | 'TK'
      | 'TL'
      | 'TM'
      | 'TN'
      | 'TO'
      | 'TR'
      | 'TT'
      | 'TV'
      | 'TW'
      | 'TZ'
      | 'UA'
      | 'UG'
      | 'UM'
      | 'US'
      | 'UY'
      | 'UZ'
      | 'VA'
      | 'VC'
      | 'VE'
      | 'VG'
      | 'VI'
      | 'VN'
      | 'VU'
      | 'WF'
      | 'WS'
      | 'YE'
      | 'YT'
      | 'ZA'
      | 'ZM'
      | 'ZW';

    /**
     * Short description of the brand. Omitted when unknown.
     */
    description?: string;

    /**
     * Primary language of the brand. Omitted when unknown.
     */
    language?:
      | 'afrikaans'
      | 'albanian'
      | 'amharic'
      | 'arabic'
      | 'armenian'
      | 'assamese'
      | 'aymara'
      | 'azeri'
      | 'basque'
      | 'belarusian'
      | 'bengali'
      | 'bosnian'
      | 'bulgarian'
      | 'burmese'
      | 'cantonese'
      | 'catalan'
      | 'cebuano'
      | 'chinese'
      | 'corsican'
      | 'croatian'
      | 'czech'
      | 'danish'
      | 'dutch'
      | 'english'
      | 'esperanto'
      | 'estonian'
      | 'farsi'
      | 'fijian'
      | 'finnish'
      | 'french'
      | 'galician'
      | 'georgian'
      | 'german'
      | 'greek'
      | 'guarani'
      | 'gujarati'
      | 'haitian-creole'
      | 'hausa'
      | 'hawaiian'
      | 'hebrew'
      | 'hindi'
      | 'hmong'
      | 'hungarian'
      | 'icelandic'
      | 'igbo'
      | 'indonesian'
      | 'irish'
      | 'italian'
      | 'japanese'
      | 'javanese'
      | 'kannada'
      | 'kazakh'
      | 'khmer'
      | 'kinyarwanda'
      | 'korean'
      | 'kurdish'
      | 'kyrgyz'
      | 'lao'
      | 'latin'
      | 'latvian'
      | 'lingala'
      | 'lithuanian'
      | 'luxembourgish'
      | 'macedonian'
      | 'malagasy'
      | 'malay'
      | 'malayalam'
      | 'maltese'
      | 'maori'
      | 'marathi'
      | 'mongolian'
      | 'nepali'
      | 'norwegian'
      | 'odia'
      | 'oromo'
      | 'pashto'
      | 'pidgin'
      | 'polish'
      | 'portuguese'
      | 'punjabi'
      | 'quechua'
      | 'romanian'
      | 'russian'
      | 'samoan'
      | 'scottish-gaelic'
      | 'serbian'
      | 'sesotho'
      | 'shona'
      | 'sindhi'
      | 'sinhala'
      | 'slovak'
      | 'slovene'
      | 'somali'
      | 'spanish'
      | 'sundanese'
      | 'swahili'
      | 'swedish'
      | 'tagalog'
      | 'tajik'
      | 'tamil'
      | 'tatar'
      | 'telugu'
      | 'thai'
      | 'tibetan'
      | 'tigrinya'
      | 'tongan'
      | 'tswana'
      | 'turkish'
      | 'turkmen'
      | 'ukrainian'
      | 'urdu'
      | 'uyghur'
      | 'uzbek'
      | 'vietnamese'
      | 'welsh'
      | 'wolof'
      | 'xhosa'
      | 'yiddish'
      | 'yoruba'
      | 'zulu';
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

export type BrandRetrieveParams =
  | BrandRetrieveParams.BrandRetrieveByDomainRequest
  | BrandRetrieveParams.BrandRetrieveByNameRequest
  | BrandRetrieveParams.BrandRetrieveByEmailRequest
  | BrandRetrieveParams.BrandRetrieveByTickerRequest
  | BrandRetrieveParams.BrandRetrieveByDirectURLRequest
  | BrandRetrieveParams.BrandRetrieveFromTransactionRequest;

export declare namespace BrandRetrieveParams {
  export interface BrandRetrieveByDomainRequest {
    /**
     * Domain of the brand, such as `stripe.com`.
     */
    domain: string;

    /**
     * Set to `by_domain` to look up a brand by domain.
     */
    type: 'by_domain';

    /**
     * Translate the brand's `title`, `description`, and `slogan` into this language.
     */
    force_language?:
      | 'afrikaans'
      | 'albanian'
      | 'amharic'
      | 'arabic'
      | 'armenian'
      | 'assamese'
      | 'aymara'
      | 'azeri'
      | 'basque'
      | 'belarusian'
      | 'bengali'
      | 'bosnian'
      | 'bulgarian'
      | 'burmese'
      | 'cantonese'
      | 'catalan'
      | 'cebuano'
      | 'chinese'
      | 'corsican'
      | 'croatian'
      | 'czech'
      | 'danish'
      | 'dutch'
      | 'english'
      | 'esperanto'
      | 'estonian'
      | 'farsi'
      | 'fijian'
      | 'finnish'
      | 'french'
      | 'galician'
      | 'georgian'
      | 'german'
      | 'greek'
      | 'guarani'
      | 'gujarati'
      | 'haitian-creole'
      | 'hausa'
      | 'hawaiian'
      | 'hebrew'
      | 'hindi'
      | 'hmong'
      | 'hungarian'
      | 'icelandic'
      | 'igbo'
      | 'indonesian'
      | 'irish'
      | 'italian'
      | 'japanese'
      | 'javanese'
      | 'kannada'
      | 'kazakh'
      | 'khmer'
      | 'kinyarwanda'
      | 'korean'
      | 'kurdish'
      | 'kyrgyz'
      | 'lao'
      | 'latin'
      | 'latvian'
      | 'lingala'
      | 'lithuanian'
      | 'luxembourgish'
      | 'macedonian'
      | 'malagasy'
      | 'malay'
      | 'malayalam'
      | 'maltese'
      | 'maori'
      | 'marathi'
      | 'mongolian'
      | 'nepali'
      | 'norwegian'
      | 'odia'
      | 'oromo'
      | 'pashto'
      | 'pidgin'
      | 'polish'
      | 'portuguese'
      | 'punjabi'
      | 'quechua'
      | 'romanian'
      | 'russian'
      | 'samoan'
      | 'scottish-gaelic'
      | 'serbian'
      | 'sesotho'
      | 'shona'
      | 'sindhi'
      | 'sinhala'
      | 'slovak'
      | 'slovene'
      | 'somali'
      | 'spanish'
      | 'sundanese'
      | 'swahili'
      | 'swedish'
      | 'tagalog'
      | 'tajik'
      | 'tamil'
      | 'tatar'
      | 'telugu'
      | 'thai'
      | 'tibetan'
      | 'tigrinya'
      | 'tongan'
      | 'tswana'
      | 'turkish'
      | 'turkmen'
      | 'ukrainian'
      | 'urdu'
      | 'uyghur'
      | 'uzbek'
      | 'vietnamese'
      | 'welsh'
      | 'wolof'
      | 'xhosa'
      | 'yiddish'
      | 'yoruba'
      | 'zulu'
      | null;

    /**
     * Maximum age of cached brand data, in milliseconds. `0` always fetches fresh.
     * Defaults to 90 days (7776000000 ms). Values above 1 year (31536000000 ms) are
     * capped at 1 year.
     */
    maxAgeMs?: number;

    /**
     * Skip slower enrichment steps for a faster, less detailed response.
     */
    maxSpeed?: boolean;

    /**
     * Access policy IDs to apply; each URL must pass all of them. Requires access
     * policies enabled for your organization; otherwise returns
     * `ACCESS_POLICIES_NOT_ENABLED`.
     */
    policies?: Array<string>;

    /**
     * Labels for this request. Filter usage and request logs by them in the dashboard
     * or with `GET /org/logs`.
     */
    tags?: Array<string>;

    /**
     * Request deadline and what to return when it passes.
     */
    timeoutOpts?: BrandRetrieveByDomainRequest.TimeoutOpts;

    /**
     * `enabled` turns off request logs and traces and keeps request and response
     * content out of usage logs. Brand data and hosted assets may still be stored.
     * Returns 403 `ZDR_NOT_ENABLED` unless your organization has ZDR.
     */
    zdr?: 'enabled' | 'disabled';
  }

  export namespace BrandRetrieveByDomainRequest {
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

  export interface BrandRetrieveByNameRequest {
    /**
     * Company name, such as `Apple Inc`.
     */
    name: string;

    /**
     * Set to `by_name` to look up a brand by company name.
     */
    type: 'by_name';

    /**
     * Lowercase ISO 3166-1 alpha-2 country code, such as `us`.
     */
    country?:
      | 'af'
      | 'al'
      | 'dz'
      | 'as'
      | 'ad'
      | 'ao'
      | 'ai'
      | 'aq'
      | 'ag'
      | 'ar'
      | 'am'
      | 'aw'
      | 'au'
      | 'at'
      | 'az'
      | 'bs'
      | 'bh'
      | 'bd'
      | 'bb'
      | 'by'
      | 'be'
      | 'bz'
      | 'bj'
      | 'bm'
      | 'bt'
      | 'bo'
      | 'ba'
      | 'bw'
      | 'bv'
      | 'br'
      | 'io'
      | 'bn'
      | 'bg'
      | 'bf'
      | 'bi'
      | 'kh'
      | 'cm'
      | 'ca'
      | 'cv'
      | 'ky'
      | 'cf'
      | 'td'
      | 'cl'
      | 'cn'
      | 'cx'
      | 'cc'
      | 'co'
      | 'km'
      | 'cg'
      | 'cd'
      | 'ck'
      | 'cr'
      | 'ci'
      | 'hr'
      | 'cu'
      | 'cy'
      | 'cz'
      | 'dk'
      | 'dj'
      | 'dm'
      | 'do'
      | 'ec'
      | 'eg'
      | 'sv'
      | 'gq'
      | 'er'
      | 'ee'
      | 'et'
      | 'fk'
      | 'fo'
      | 'fj'
      | 'fi'
      | 'fr'
      | 'gf'
      | 'pf'
      | 'tf'
      | 'ga'
      | 'gm'
      | 'ge'
      | 'de'
      | 'gh'
      | 'gi'
      | 'gr'
      | 'gl'
      | 'gd'
      | 'gp'
      | 'gu'
      | 'gt'
      | 'gn'
      | 'gw'
      | 'gy'
      | 'ht'
      | 'hm'
      | 'va'
      | 'hn'
      | 'hk'
      | 'hu'
      | 'is'
      | 'in'
      | 'id'
      | 'ir'
      | 'iq'
      | 'ie'
      | 'il'
      | 'it'
      | 'jm'
      | 'jp'
      | 'jo'
      | 'kz'
      | 'ke'
      | 'ki'
      | 'kp'
      | 'kr'
      | 'kw'
      | 'kg'
      | 'la'
      | 'lv'
      | 'lb'
      | 'ls'
      | 'lr'
      | 'ly'
      | 'li'
      | 'lt'
      | 'lu'
      | 'mo'
      | 'mk'
      | 'mg'
      | 'mw'
      | 'my'
      | 'mv'
      | 'ml'
      | 'mt'
      | 'mh'
      | 'mq'
      | 'mr'
      | 'mu'
      | 'yt'
      | 'mx'
      | 'fm'
      | 'md'
      | 'mc'
      | 'mn'
      | 'ms'
      | 'ma'
      | 'mz'
      | 'mm'
      | 'na'
      | 'nr'
      | 'np'
      | 'nl'
      | 'an'
      | 'nc'
      | 'nz'
      | 'ni'
      | 'ne'
      | 'ng'
      | 'nu'
      | 'nf'
      | 'mp'
      | 'no'
      | 'om'
      | 'pk'
      | 'pw'
      | 'ps'
      | 'pa'
      | 'pg'
      | 'py'
      | 'pe'
      | 'ph'
      | 'pn'
      | 'pl'
      | 'pt'
      | 'pr'
      | 'qa'
      | 're'
      | 'ro'
      | 'ru'
      | 'rw'
      | 'sh'
      | 'kn'
      | 'lc'
      | 'pm'
      | 'vc'
      | 'ws'
      | 'sm'
      | 'st'
      | 'sa'
      | 'sn'
      | 'rs'
      | 'sc'
      | 'sl'
      | 'sg'
      | 'sk'
      | 'si'
      | 'sb'
      | 'so'
      | 'za'
      | 'gs'
      | 'es'
      | 'lk'
      | 'sd'
      | 'sr'
      | 'sj'
      | 'sz'
      | 'se'
      | 'ch'
      | 'sy'
      | 'tw'
      | 'tj'
      | 'tz'
      | 'th'
      | 'tl'
      | 'tg'
      | 'tk'
      | 'to'
      | 'tt'
      | 'tn'
      | 'tr'
      | 'tm'
      | 'tc'
      | 'tv'
      | 'ug'
      | 'ua'
      | 'ae'
      | 'gb'
      | 'us'
      | 'um'
      | 'uy'
      | 'uz'
      | 'vu'
      | 've'
      | 'vn'
      | 'vg'
      | 'vi'
      | 'wf'
      | 'eh'
      | 'ye'
      | 'zm'
      | 'zw';

    /**
     * Translate the brand's `title`, `description`, and `slogan` into this language.
     */
    force_language?:
      | 'afrikaans'
      | 'albanian'
      | 'amharic'
      | 'arabic'
      | 'armenian'
      | 'assamese'
      | 'aymara'
      | 'azeri'
      | 'basque'
      | 'belarusian'
      | 'bengali'
      | 'bosnian'
      | 'bulgarian'
      | 'burmese'
      | 'cantonese'
      | 'catalan'
      | 'cebuano'
      | 'chinese'
      | 'corsican'
      | 'croatian'
      | 'czech'
      | 'danish'
      | 'dutch'
      | 'english'
      | 'esperanto'
      | 'estonian'
      | 'farsi'
      | 'fijian'
      | 'finnish'
      | 'french'
      | 'galician'
      | 'georgian'
      | 'german'
      | 'greek'
      | 'guarani'
      | 'gujarati'
      | 'haitian-creole'
      | 'hausa'
      | 'hawaiian'
      | 'hebrew'
      | 'hindi'
      | 'hmong'
      | 'hungarian'
      | 'icelandic'
      | 'igbo'
      | 'indonesian'
      | 'irish'
      | 'italian'
      | 'japanese'
      | 'javanese'
      | 'kannada'
      | 'kazakh'
      | 'khmer'
      | 'kinyarwanda'
      | 'korean'
      | 'kurdish'
      | 'kyrgyz'
      | 'lao'
      | 'latin'
      | 'latvian'
      | 'lingala'
      | 'lithuanian'
      | 'luxembourgish'
      | 'macedonian'
      | 'malagasy'
      | 'malay'
      | 'malayalam'
      | 'maltese'
      | 'maori'
      | 'marathi'
      | 'mongolian'
      | 'nepali'
      | 'norwegian'
      | 'odia'
      | 'oromo'
      | 'pashto'
      | 'pidgin'
      | 'polish'
      | 'portuguese'
      | 'punjabi'
      | 'quechua'
      | 'romanian'
      | 'russian'
      | 'samoan'
      | 'scottish-gaelic'
      | 'serbian'
      | 'sesotho'
      | 'shona'
      | 'sindhi'
      | 'sinhala'
      | 'slovak'
      | 'slovene'
      | 'somali'
      | 'spanish'
      | 'sundanese'
      | 'swahili'
      | 'swedish'
      | 'tagalog'
      | 'tajik'
      | 'tamil'
      | 'tatar'
      | 'telugu'
      | 'thai'
      | 'tibetan'
      | 'tigrinya'
      | 'tongan'
      | 'tswana'
      | 'turkish'
      | 'turkmen'
      | 'ukrainian'
      | 'urdu'
      | 'uyghur'
      | 'uzbek'
      | 'vietnamese'
      | 'welsh'
      | 'wolof'
      | 'xhosa'
      | 'yiddish'
      | 'yoruba'
      | 'zulu'
      | null;

    /**
     * Maximum age of cached brand data, in milliseconds. `0` always fetches fresh.
     * Defaults to 90 days (7776000000 ms). Values above 1 year (31536000000 ms) are
     * capped at 1 year.
     */
    maxAgeMs?: number;

    /**
     * Skip slower enrichment steps for a faster, less detailed response.
     */
    maxSpeed?: boolean;

    /**
     * Access policy IDs to apply; each URL must pass all of them. Requires access
     * policies enabled for your organization; otherwise returns
     * `ACCESS_POLICIES_NOT_ENABLED`.
     */
    policies?: Array<string>;

    /**
     * Labels for this request. Filter usage and request logs by them in the dashboard
     * or with `GET /org/logs`.
     */
    tags?: Array<string>;

    /**
     * Request deadline and what to return when it passes.
     */
    timeoutOpts?: BrandRetrieveByNameRequest.TimeoutOpts;

    /**
     * `enabled` turns off request logs and traces and keeps request and response
     * content out of usage logs. Brand data and hosted assets may still be stored.
     * Returns 403 `ZDR_NOT_ENABLED` unless your organization has ZDR.
     */
    zdr?: 'enabled' | 'disabled';
  }

  export namespace BrandRetrieveByNameRequest {
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

  export interface BrandRetrieveByEmailRequest {
    /**
     * Work email address, such as `jane@stripe.com`. The brand is looked up from its
     * domain.
     */
    email: string;

    /**
     * Set to `by_email` to look up a brand from a work email address.
     */
    type: 'by_email';

    /**
     * Translate the brand's `title`, `description`, and `slogan` into this language.
     */
    force_language?:
      | 'afrikaans'
      | 'albanian'
      | 'amharic'
      | 'arabic'
      | 'armenian'
      | 'assamese'
      | 'aymara'
      | 'azeri'
      | 'basque'
      | 'belarusian'
      | 'bengali'
      | 'bosnian'
      | 'bulgarian'
      | 'burmese'
      | 'cantonese'
      | 'catalan'
      | 'cebuano'
      | 'chinese'
      | 'corsican'
      | 'croatian'
      | 'czech'
      | 'danish'
      | 'dutch'
      | 'english'
      | 'esperanto'
      | 'estonian'
      | 'farsi'
      | 'fijian'
      | 'finnish'
      | 'french'
      | 'galician'
      | 'georgian'
      | 'german'
      | 'greek'
      | 'guarani'
      | 'gujarati'
      | 'haitian-creole'
      | 'hausa'
      | 'hawaiian'
      | 'hebrew'
      | 'hindi'
      | 'hmong'
      | 'hungarian'
      | 'icelandic'
      | 'igbo'
      | 'indonesian'
      | 'irish'
      | 'italian'
      | 'japanese'
      | 'javanese'
      | 'kannada'
      | 'kazakh'
      | 'khmer'
      | 'kinyarwanda'
      | 'korean'
      | 'kurdish'
      | 'kyrgyz'
      | 'lao'
      | 'latin'
      | 'latvian'
      | 'lingala'
      | 'lithuanian'
      | 'luxembourgish'
      | 'macedonian'
      | 'malagasy'
      | 'malay'
      | 'malayalam'
      | 'maltese'
      | 'maori'
      | 'marathi'
      | 'mongolian'
      | 'nepali'
      | 'norwegian'
      | 'odia'
      | 'oromo'
      | 'pashto'
      | 'pidgin'
      | 'polish'
      | 'portuguese'
      | 'punjabi'
      | 'quechua'
      | 'romanian'
      | 'russian'
      | 'samoan'
      | 'scottish-gaelic'
      | 'serbian'
      | 'sesotho'
      | 'shona'
      | 'sindhi'
      | 'sinhala'
      | 'slovak'
      | 'slovene'
      | 'somali'
      | 'spanish'
      | 'sundanese'
      | 'swahili'
      | 'swedish'
      | 'tagalog'
      | 'tajik'
      | 'tamil'
      | 'tatar'
      | 'telugu'
      | 'thai'
      | 'tibetan'
      | 'tigrinya'
      | 'tongan'
      | 'tswana'
      | 'turkish'
      | 'turkmen'
      | 'ukrainian'
      | 'urdu'
      | 'uyghur'
      | 'uzbek'
      | 'vietnamese'
      | 'welsh'
      | 'wolof'
      | 'xhosa'
      | 'yiddish'
      | 'yoruba'
      | 'zulu'
      | null;

    /**
     * Maximum age of cached brand data, in milliseconds. `0` always fetches fresh.
     * Defaults to 90 days (7776000000 ms). Values above 1 year (31536000000 ms) are
     * capped at 1 year.
     */
    maxAgeMs?: number;

    /**
     * Skip slower enrichment steps for a faster, less detailed response.
     */
    maxSpeed?: boolean;

    /**
     * Access policy IDs to apply; each URL must pass all of them. Requires access
     * policies enabled for your organization; otherwise returns
     * `ACCESS_POLICIES_NOT_ENABLED`.
     */
    policies?: Array<string>;

    /**
     * Labels for this request. Filter usage and request logs by them in the dashboard
     * or with `GET /org/logs`.
     */
    tags?: Array<string>;

    /**
     * Request deadline and what to return when it passes.
     */
    timeoutOpts?: BrandRetrieveByEmailRequest.TimeoutOpts;

    /**
     * `enabled` turns off request logs and traces and keeps request and response
     * content out of usage logs. Brand data and hosted assets may still be stored.
     * Returns 403 `ZDR_NOT_ENABLED` unless your organization has ZDR.
     */
    zdr?: 'enabled' | 'disabled';
  }

  export namespace BrandRetrieveByEmailRequest {
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

  export interface BrandRetrieveByTickerRequest {
    /**
     * Stock ticker symbol, such as `AAPL`.
     */
    ticker: string;

    /**
     * Set to `by_ticker` to look up a brand by stock ticker.
     */
    type: 'by_ticker';

    /**
     * Translate the brand's `title`, `description`, and `slogan` into this language.
     */
    force_language?:
      | 'afrikaans'
      | 'albanian'
      | 'amharic'
      | 'arabic'
      | 'armenian'
      | 'assamese'
      | 'aymara'
      | 'azeri'
      | 'basque'
      | 'belarusian'
      | 'bengali'
      | 'bosnian'
      | 'bulgarian'
      | 'burmese'
      | 'cantonese'
      | 'catalan'
      | 'cebuano'
      | 'chinese'
      | 'corsican'
      | 'croatian'
      | 'czech'
      | 'danish'
      | 'dutch'
      | 'english'
      | 'esperanto'
      | 'estonian'
      | 'farsi'
      | 'fijian'
      | 'finnish'
      | 'french'
      | 'galician'
      | 'georgian'
      | 'german'
      | 'greek'
      | 'guarani'
      | 'gujarati'
      | 'haitian-creole'
      | 'hausa'
      | 'hawaiian'
      | 'hebrew'
      | 'hindi'
      | 'hmong'
      | 'hungarian'
      | 'icelandic'
      | 'igbo'
      | 'indonesian'
      | 'irish'
      | 'italian'
      | 'japanese'
      | 'javanese'
      | 'kannada'
      | 'kazakh'
      | 'khmer'
      | 'kinyarwanda'
      | 'korean'
      | 'kurdish'
      | 'kyrgyz'
      | 'lao'
      | 'latin'
      | 'latvian'
      | 'lingala'
      | 'lithuanian'
      | 'luxembourgish'
      | 'macedonian'
      | 'malagasy'
      | 'malay'
      | 'malayalam'
      | 'maltese'
      | 'maori'
      | 'marathi'
      | 'mongolian'
      | 'nepali'
      | 'norwegian'
      | 'odia'
      | 'oromo'
      | 'pashto'
      | 'pidgin'
      | 'polish'
      | 'portuguese'
      | 'punjabi'
      | 'quechua'
      | 'romanian'
      | 'russian'
      | 'samoan'
      | 'scottish-gaelic'
      | 'serbian'
      | 'sesotho'
      | 'shona'
      | 'sindhi'
      | 'sinhala'
      | 'slovak'
      | 'slovene'
      | 'somali'
      | 'spanish'
      | 'sundanese'
      | 'swahili'
      | 'swedish'
      | 'tagalog'
      | 'tajik'
      | 'tamil'
      | 'tatar'
      | 'telugu'
      | 'thai'
      | 'tibetan'
      | 'tigrinya'
      | 'tongan'
      | 'tswana'
      | 'turkish'
      | 'turkmen'
      | 'ukrainian'
      | 'urdu'
      | 'uyghur'
      | 'uzbek'
      | 'vietnamese'
      | 'welsh'
      | 'wolof'
      | 'xhosa'
      | 'yiddish'
      | 'yoruba'
      | 'zulu'
      | null;

    /**
     * Maximum age of cached brand data, in milliseconds. `0` always fetches fresh.
     * Defaults to 90 days (7776000000 ms). Values above 1 year (31536000000 ms) are
     * capped at 1 year.
     */
    maxAgeMs?: number;

    /**
     * Skip slower enrichment steps for a faster, less detailed response.
     */
    maxSpeed?: boolean;

    /**
     * Access policy IDs to apply; each URL must pass all of them. Requires access
     * policies enabled for your organization; otherwise returns
     * `ACCESS_POLICIES_NOT_ENABLED`.
     */
    policies?: Array<string>;

    /**
     * Labels for this request. Filter usage and request logs by them in the dashboard
     * or with `GET /org/logs`.
     */
    tags?: Array<string>;

    /**
     * Stock exchange code, such as `NASDAQ` or `LSE`.
     */
    ticker_exchange?:
      | 'AMEX'
      | 'AMS'
      | 'AQS'
      | 'ASX'
      | 'ATH'
      | 'BER'
      | 'BME'
      | 'BRU'
      | 'BSE'
      | 'BUD'
      | 'BUE'
      | 'BVC'
      | 'CBOE'
      | 'CNQ'
      | 'CPH'
      | 'DFM'
      | 'DOH'
      | 'DUB'
      | 'DUS'
      | 'DXE'
      | 'EGX'
      | 'FSX'
      | 'HAM'
      | 'HEL'
      | 'HKSE'
      | 'HOSE'
      | 'ICE'
      | 'IOB'
      | 'IST'
      | 'JKT'
      | 'JNB'
      | 'JPX'
      | 'KLS'
      | 'KOE'
      | 'KSC'
      | 'KUW'
      | 'LIS'
      | 'LSE'
      | 'MCX'
      | 'MEX'
      | 'MIL'
      | 'MUN'
      | 'NASDAQ'
      | 'NEO'
      | 'NSE'
      | 'NYSE'
      | 'NZE'
      | 'OSL'
      | 'OTC'
      | 'PAR'
      | 'PNK'
      | 'PRA'
      | 'RIS'
      | 'SAO'
      | 'SAU'
      | 'SES'
      | 'SET'
      | 'SGO'
      | 'SHH'
      | 'SHZ'
      | 'SIX'
      | 'STO'
      | 'STU'
      | 'TAI'
      | 'TAL'
      | 'TLV'
      | 'TSX'
      | 'TSXV'
      | 'TWO'
      | 'VIE'
      | 'WSE'
      | 'XETRA';

    /**
     * Request deadline and what to return when it passes.
     */
    timeoutOpts?: BrandRetrieveByTickerRequest.TimeoutOpts;

    /**
     * `enabled` turns off request logs and traces and keeps request and response
     * content out of usage logs. Brand data and hosted assets may still be stored.
     * Returns 403 `ZDR_NOT_ENABLED` unless your organization has ZDR.
     */
    zdr?: 'enabled' | 'disabled';
  }

  export namespace BrandRetrieveByTickerRequest {
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

  export interface BrandRetrieveByDirectURLRequest {
    /**
     * Full `http` or `https` URL of the page to read, such as
     * `https://stripe.com/enterprise`. Only this page is fetched.
     */
    direct_url: string;

    /**
     * Set to `by_direct_url` to extract brand data from a single page.
     */
    type: 'by_direct_url';

    /**
     * Access policy IDs to apply; each URL must pass all of them. Requires access
     * policies enabled for your organization; otherwise returns
     * `ACCESS_POLICIES_NOT_ENABLED`.
     */
    policies?: Array<string>;

    /**
     * Labels for this request. Filter usage and request logs by them in the dashboard
     * or with `GET /org/logs`.
     */
    tags?: Array<string>;

    /**
     * Request deadline and what to return when it passes.
     */
    timeoutOpts?: BrandRetrieveByDirectURLRequest.TimeoutOpts;

    /**
     * `enabled` turns off request logs and traces and keeps request and response
     * content out of usage logs. Brand data and hosted assets may still be stored.
     * Returns 403 `ZDR_NOT_ENABLED` unless your organization has ZDR.
     */
    zdr?: 'enabled' | 'disabled';
  }

  export namespace BrandRetrieveByDirectURLRequest {
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

  export interface BrandRetrieveFromTransactionRequest {
    /**
     * Transaction descriptor from a card or bank statement, such as `SQ *COFFEE SHOP`.
     */
    transaction_info: string;

    /**
     * Set to `by_transaction` to identify the merchant behind a transaction
     * descriptor.
     */
    type: 'by_transaction';

    /**
     * City where the transaction took place. Brands in this city are preferred.
     */
    city?: string;

    /**
     * Lowercase ISO 3166-1 alpha-2 country code, such as `us`.
     */
    country?:
      | 'af'
      | 'al'
      | 'dz'
      | 'as'
      | 'ad'
      | 'ao'
      | 'ai'
      | 'aq'
      | 'ag'
      | 'ar'
      | 'am'
      | 'aw'
      | 'au'
      | 'at'
      | 'az'
      | 'bs'
      | 'bh'
      | 'bd'
      | 'bb'
      | 'by'
      | 'be'
      | 'bz'
      | 'bj'
      | 'bm'
      | 'bt'
      | 'bo'
      | 'ba'
      | 'bw'
      | 'bv'
      | 'br'
      | 'io'
      | 'bn'
      | 'bg'
      | 'bf'
      | 'bi'
      | 'kh'
      | 'cm'
      | 'ca'
      | 'cv'
      | 'ky'
      | 'cf'
      | 'td'
      | 'cl'
      | 'cn'
      | 'cx'
      | 'cc'
      | 'co'
      | 'km'
      | 'cg'
      | 'cd'
      | 'ck'
      | 'cr'
      | 'ci'
      | 'hr'
      | 'cu'
      | 'cy'
      | 'cz'
      | 'dk'
      | 'dj'
      | 'dm'
      | 'do'
      | 'ec'
      | 'eg'
      | 'sv'
      | 'gq'
      | 'er'
      | 'ee'
      | 'et'
      | 'fk'
      | 'fo'
      | 'fj'
      | 'fi'
      | 'fr'
      | 'gf'
      | 'pf'
      | 'tf'
      | 'ga'
      | 'gm'
      | 'ge'
      | 'de'
      | 'gh'
      | 'gi'
      | 'gr'
      | 'gl'
      | 'gd'
      | 'gp'
      | 'gu'
      | 'gt'
      | 'gn'
      | 'gw'
      | 'gy'
      | 'ht'
      | 'hm'
      | 'va'
      | 'hn'
      | 'hk'
      | 'hu'
      | 'is'
      | 'in'
      | 'id'
      | 'ir'
      | 'iq'
      | 'ie'
      | 'il'
      | 'it'
      | 'jm'
      | 'jp'
      | 'jo'
      | 'kz'
      | 'ke'
      | 'ki'
      | 'kp'
      | 'kr'
      | 'kw'
      | 'kg'
      | 'la'
      | 'lv'
      | 'lb'
      | 'ls'
      | 'lr'
      | 'ly'
      | 'li'
      | 'lt'
      | 'lu'
      | 'mo'
      | 'mk'
      | 'mg'
      | 'mw'
      | 'my'
      | 'mv'
      | 'ml'
      | 'mt'
      | 'mh'
      | 'mq'
      | 'mr'
      | 'mu'
      | 'yt'
      | 'mx'
      | 'fm'
      | 'md'
      | 'mc'
      | 'mn'
      | 'ms'
      | 'ma'
      | 'mz'
      | 'mm'
      | 'na'
      | 'nr'
      | 'np'
      | 'nl'
      | 'an'
      | 'nc'
      | 'nz'
      | 'ni'
      | 'ne'
      | 'ng'
      | 'nu'
      | 'nf'
      | 'mp'
      | 'no'
      | 'om'
      | 'pk'
      | 'pw'
      | 'ps'
      | 'pa'
      | 'pg'
      | 'py'
      | 'pe'
      | 'ph'
      | 'pn'
      | 'pl'
      | 'pt'
      | 'pr'
      | 'qa'
      | 're'
      | 'ro'
      | 'ru'
      | 'rw'
      | 'sh'
      | 'kn'
      | 'lc'
      | 'pm'
      | 'vc'
      | 'ws'
      | 'sm'
      | 'st'
      | 'sa'
      | 'sn'
      | 'rs'
      | 'sc'
      | 'sl'
      | 'sg'
      | 'sk'
      | 'si'
      | 'sb'
      | 'so'
      | 'za'
      | 'gs'
      | 'es'
      | 'lk'
      | 'sd'
      | 'sr'
      | 'sj'
      | 'sz'
      | 'se'
      | 'ch'
      | 'sy'
      | 'tw'
      | 'tj'
      | 'tz'
      | 'th'
      | 'tl'
      | 'tg'
      | 'tk'
      | 'to'
      | 'tt'
      | 'tn'
      | 'tr'
      | 'tm'
      | 'tc'
      | 'tv'
      | 'ug'
      | 'ua'
      | 'ae'
      | 'gb'
      | 'us'
      | 'um'
      | 'uy'
      | 'uz'
      | 'vu'
      | 've'
      | 'vn'
      | 'vg'
      | 'vi'
      | 'wf'
      | 'eh'
      | 'ye'
      | 'zm'
      | 'zw';

    /**
     * Translate the brand's `title`, `description`, and `slogan` into this language.
     */
    force_language?:
      | 'afrikaans'
      | 'albanian'
      | 'amharic'
      | 'arabic'
      | 'armenian'
      | 'assamese'
      | 'aymara'
      | 'azeri'
      | 'basque'
      | 'belarusian'
      | 'bengali'
      | 'bosnian'
      | 'bulgarian'
      | 'burmese'
      | 'cantonese'
      | 'catalan'
      | 'cebuano'
      | 'chinese'
      | 'corsican'
      | 'croatian'
      | 'czech'
      | 'danish'
      | 'dutch'
      | 'english'
      | 'esperanto'
      | 'estonian'
      | 'farsi'
      | 'fijian'
      | 'finnish'
      | 'french'
      | 'galician'
      | 'georgian'
      | 'german'
      | 'greek'
      | 'guarani'
      | 'gujarati'
      | 'haitian-creole'
      | 'hausa'
      | 'hawaiian'
      | 'hebrew'
      | 'hindi'
      | 'hmong'
      | 'hungarian'
      | 'icelandic'
      | 'igbo'
      | 'indonesian'
      | 'irish'
      | 'italian'
      | 'japanese'
      | 'javanese'
      | 'kannada'
      | 'kazakh'
      | 'khmer'
      | 'kinyarwanda'
      | 'korean'
      | 'kurdish'
      | 'kyrgyz'
      | 'lao'
      | 'latin'
      | 'latvian'
      | 'lingala'
      | 'lithuanian'
      | 'luxembourgish'
      | 'macedonian'
      | 'malagasy'
      | 'malay'
      | 'malayalam'
      | 'maltese'
      | 'maori'
      | 'marathi'
      | 'mongolian'
      | 'nepali'
      | 'norwegian'
      | 'odia'
      | 'oromo'
      | 'pashto'
      | 'pidgin'
      | 'polish'
      | 'portuguese'
      | 'punjabi'
      | 'quechua'
      | 'romanian'
      | 'russian'
      | 'samoan'
      | 'scottish-gaelic'
      | 'serbian'
      | 'sesotho'
      | 'shona'
      | 'sindhi'
      | 'sinhala'
      | 'slovak'
      | 'slovene'
      | 'somali'
      | 'spanish'
      | 'sundanese'
      | 'swahili'
      | 'swedish'
      | 'tagalog'
      | 'tajik'
      | 'tamil'
      | 'tatar'
      | 'telugu'
      | 'thai'
      | 'tibetan'
      | 'tigrinya'
      | 'tongan'
      | 'tswana'
      | 'turkish'
      | 'turkmen'
      | 'ukrainian'
      | 'urdu'
      | 'uyghur'
      | 'uzbek'
      | 'vietnamese'
      | 'welsh'
      | 'wolof'
      | 'xhosa'
      | 'yiddish'
      | 'yoruba'
      | 'zulu'
      | null;

    /**
     * Run extra verification so the returned brand matches the transaction with high
     * confidence.
     */
    high_confidence_only?: boolean;

    /**
     * Skip slower enrichment steps for a faster, less detailed response.
     */
    maxSpeed?: boolean;

    /**
     * Merchant Category Code (MCC) from the transaction. Helps identify the type of
     * business.
     */
    mcc?: string | number;

    /**
     * Merchant phone number from the transaction. Helps confirm the match.
     */
    phone?: string | number;

    /**
     * Access policy IDs to apply; each URL must pass all of them. Requires access
     * policies enabled for your organization; otherwise returns
     * `ACCESS_POLICIES_NOT_ENABLED`.
     */
    policies?: Array<string>;

    /**
     * Labels for this request. Filter usage and request logs by them in the dashboard
     * or with `GET /org/logs`.
     */
    tags?: Array<string>;

    /**
     * Request deadline and what to return when it passes.
     */
    timeoutOpts?: BrandRetrieveFromTransactionRequest.TimeoutOpts;

    /**
     * `enabled` turns off request logs and traces and keeps request and response
     * content out of usage logs. Brand data and hosted assets may still be stored.
     * Returns 403 `ZDR_NOT_ENABLED` unless your organization has ZDR.
     */
    zdr?: 'enabled' | 'disabled';
  }

  export namespace BrandRetrieveFromTransactionRequest {
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
}

export interface BrandSearchParams {
  /**
   * Search term, matched against the fields in `queryBy`, such as `nike`,
   * `nike.com`, or `nik`.
   */
  query: string;

  /**
   * Match the search term as a prefix, so `nik` matches Nike while the user is still
   * typing. Set to `false` to match whole words only.
   */
  autocomplete?: boolean;

  /**
   * Only return brands in this country, as an uppercase ISO 3166-1 alpha-2 code such
   * as `US` or `GB`.
   */
  country?:
    | 'AD'
    | 'AE'
    | 'AF'
    | 'AG'
    | 'AI'
    | 'AL'
    | 'AM'
    | 'AO'
    | 'AQ'
    | 'AR'
    | 'AS'
    | 'AT'
    | 'AU'
    | 'AW'
    | 'AX'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BL'
    | 'BM'
    | 'BN'
    | 'BO'
    | 'BQ'
    | 'BR'
    | 'BS'
    | 'BT'
    | 'BV'
    | 'BW'
    | 'BY'
    | 'BZ'
    | 'CA'
    | 'CC'
    | 'CD'
    | 'CF'
    | 'CG'
    | 'CH'
    | 'CI'
    | 'CK'
    | 'CL'
    | 'CM'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CU'
    | 'CV'
    | 'CW'
    | 'CX'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DJ'
    | 'DK'
    | 'DM'
    | 'DO'
    | 'DZ'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'EH'
    | 'ER'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FJ'
    | 'FK'
    | 'FM'
    | 'FO'
    | 'FR'
    | 'GA'
    | 'GB'
    | 'GD'
    | 'GE'
    | 'GF'
    | 'GG'
    | 'GH'
    | 'GI'
    | 'GL'
    | 'GM'
    | 'GN'
    | 'GP'
    | 'GQ'
    | 'GR'
    | 'GS'
    | 'GT'
    | 'GU'
    | 'GW'
    | 'GY'
    | 'HK'
    | 'HM'
    | 'HN'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IM'
    | 'IN'
    | 'IO'
    | 'IQ'
    | 'IR'
    | 'IS'
    | 'IT'
    | 'JE'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KE'
    | 'KG'
    | 'KH'
    | 'KI'
    | 'KM'
    | 'KN'
    | 'KP'
    | 'KR'
    | 'KW'
    | 'KY'
    | 'KZ'
    | 'LA'
    | 'LB'
    | 'LC'
    | 'LI'
    | 'LK'
    | 'LR'
    | 'LS'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'LY'
    | 'MA'
    | 'MC'
    | 'MD'
    | 'ME'
    | 'MF'
    | 'MG'
    | 'MH'
    | 'MK'
    | 'ML'
    | 'MM'
    | 'MN'
    | 'MO'
    | 'MP'
    | 'MQ'
    | 'MR'
    | 'MS'
    | 'MT'
    | 'MU'
    | 'MV'
    | 'MW'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NA'
    | 'NC'
    | 'NE'
    | 'NF'
    | 'NG'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NR'
    | 'NU'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PF'
    | 'PG'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PM'
    | 'PN'
    | 'PR'
    | 'PS'
    | 'PT'
    | 'PW'
    | 'PY'
    | 'QA'
    | 'RE'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'RW'
    | 'SA'
    | 'SB'
    | 'SC'
    | 'SD'
    | 'SE'
    | 'SG'
    | 'SH'
    | 'SI'
    | 'SJ'
    | 'SK'
    | 'SL'
    | 'SM'
    | 'SN'
    | 'SO'
    | 'SR'
    | 'SS'
    | 'ST'
    | 'SV'
    | 'SX'
    | 'SY'
    | 'SZ'
    | 'TC'
    | 'TD'
    | 'TF'
    | 'TG'
    | 'TH'
    | 'TJ'
    | 'TK'
    | 'TL'
    | 'TM'
    | 'TN'
    | 'TO'
    | 'TR'
    | 'TT'
    | 'TV'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'UM'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VA'
    | 'VC'
    | 'VE'
    | 'VG'
    | 'VI'
    | 'VN'
    | 'VU'
    | 'WF'
    | 'WS'
    | 'YE'
    | 'YT'
    | 'ZA'
    | 'ZM'
    | 'ZW';

  /**
   * Only return brands with this primary language, such as `english` or `french`.
   */
  language?:
    | 'afrikaans'
    | 'albanian'
    | 'amharic'
    | 'arabic'
    | 'armenian'
    | 'assamese'
    | 'aymara'
    | 'azeri'
    | 'basque'
    | 'belarusian'
    | 'bengali'
    | 'bosnian'
    | 'bulgarian'
    | 'burmese'
    | 'cantonese'
    | 'catalan'
    | 'cebuano'
    | 'chinese'
    | 'corsican'
    | 'croatian'
    | 'czech'
    | 'danish'
    | 'dutch'
    | 'english'
    | 'esperanto'
    | 'estonian'
    | 'farsi'
    | 'fijian'
    | 'finnish'
    | 'french'
    | 'galician'
    | 'georgian'
    | 'german'
    | 'greek'
    | 'guarani'
    | 'gujarati'
    | 'haitian-creole'
    | 'hausa'
    | 'hawaiian'
    | 'hebrew'
    | 'hindi'
    | 'hmong'
    | 'hungarian'
    | 'icelandic'
    | 'igbo'
    | 'indonesian'
    | 'irish'
    | 'italian'
    | 'japanese'
    | 'javanese'
    | 'kannada'
    | 'kazakh'
    | 'khmer'
    | 'kinyarwanda'
    | 'korean'
    | 'kurdish'
    | 'kyrgyz'
    | 'lao'
    | 'latin'
    | 'latvian'
    | 'lingala'
    | 'lithuanian'
    | 'luxembourgish'
    | 'macedonian'
    | 'malagasy'
    | 'malay'
    | 'malayalam'
    | 'maltese'
    | 'maori'
    | 'marathi'
    | 'mongolian'
    | 'nepali'
    | 'norwegian'
    | 'odia'
    | 'oromo'
    | 'pashto'
    | 'pidgin'
    | 'polish'
    | 'portuguese'
    | 'punjabi'
    | 'quechua'
    | 'romanian'
    | 'russian'
    | 'samoan'
    | 'scottish-gaelic'
    | 'serbian'
    | 'sesotho'
    | 'shona'
    | 'sindhi'
    | 'sinhala'
    | 'slovak'
    | 'slovene'
    | 'somali'
    | 'spanish'
    | 'sundanese'
    | 'swahili'
    | 'swedish'
    | 'tagalog'
    | 'tajik'
    | 'tamil'
    | 'tatar'
    | 'telugu'
    | 'thai'
    | 'tibetan'
    | 'tigrinya'
    | 'tongan'
    | 'tswana'
    | 'turkish'
    | 'turkmen'
    | 'ukrainian'
    | 'urdu'
    | 'uyghur'
    | 'uzbek'
    | 'vietnamese'
    | 'welsh'
    | 'wolof'
    | 'xhosa'
    | 'yiddish'
    | 'yoruba'
    | 'zulu';

  /**
   * Fields to match the search term against: `name`, `domain`, or both. Send a
   * comma-separated list or repeat the parameter.
   */
  queryBy?: Array<'name' | 'domain'>;

  /**
   * Comma-separated labels for this request, such as `production,team-alpha`. Filter
   * usage and request logs by them.
   */
  tags?: Array<string>;

  /**
   * Maximum number of typos to tolerate when matching. `0` requires exact spelling.
   */
  typoTolerance?: number;
}

export declare namespace Brand {
  export {
    type BrandRetrieveResponse as BrandRetrieveResponse,
    type BrandSearchResponse as BrandSearchResponse,
    type BrandRetrieveParams as BrandRetrieveParams,
    type BrandSearchParams as BrandSearchParams,
  };
}
