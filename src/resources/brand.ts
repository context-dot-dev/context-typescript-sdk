// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Brand extends APIResource {
  /**
   * Retrieve logos, backdrops, colors, industry, description, and more. Provide
   * exactly one lookup identifier in the request body: a domain, company name, email
   * address, stock ticker, transaction descriptor, or direct URL. Note:
   * `by_direct_url` fetches brand data only from the provided URL — not from the
   * entire internet.
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
   * Returns a simplified version of brand data containing only essential
   * information: domain, title, colors, logos, and backdrops. Optimized for faster
   * responses and reduced data transfer.
   *
   * @example
   * ```ts
   * const response = await client.brand.retrieveSimplified({
   *   domain: 'xxx',
   * });
   * ```
   */
  retrieveSimplified(
    query: BrandRetrieveSimplifiedParams,
    options?: RequestOptions,
  ): APIPromise<BrandRetrieveSimplifiedResponse> {
    return this._client.get('/brand/retrieve-simplified', { query, ...options });
  }

  /**
   * Search indexed brands by name or domain
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
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: BrandRetrieveResponse.CacheMetadata;

  /**
   * Detailed brand information
   */
  brand?: BrandRetrieveResponse.Brand;

  /**
   * HTTP status code
   */
  code?: number;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: BrandRetrieveResponse.KeyMetadata;

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;
}

export namespace BrandRetrieveResponse {
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
   * Detailed brand information
   */
  export interface Brand {
    /**
     * Physical address of the brand
     */
    address?: Brand.Address;

    /**
     * An array of backdrop images for the brand
     */
    backdrops?: Array<Brand.Backdrop>;

    /**
     * An array of brand colors
     */
    colors?: Array<Brand.Color>;

    /**
     * A brief description of the brand
     */
    description?: string;

    /**
     * The domain name of the brand
     */
    domain?: string;

    /**
     * Company email address
     */
    email?: string;

    /**
     * Employee headcount information for the brand (will be null if unknown)
     */
    employees?: Brand.Employees;

    /**
     * Industry classification information for the brand
     */
    industries?: Brand.Industries;

    /**
     * Indicates whether the brand content is not safe for work (NSFW)
     */
    is_nsfw?: boolean;

    /**
     * Important website links for the brand
     */
    links?: Brand.Links;

    /**
     * An array of logos associated with the brand. When a similarly shaped SVG variant
     * exists, it is returned ahead of its raster equivalent; otherwise relevance order
     * is preserved
     */
    logos?: Array<Brand.Logo>;

    /**
     * Company phone number
     */
    phone?: string;

    /**
     * Language to force for the retrieved brand data.
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
     * The brand's slogan
     */
    slogan?: string;

    /**
     * An array of social media links for the brand
     */
    socials?: Array<Brand.Social>;

    /**
     * Stock market information for this brand (will be null if not a publicly traded
     * company)
     */
    stock?: Brand.Stock;

    /**
     * The title or name of the brand
     */
    title?: string;
  }

  export namespace Brand {
    /**
     * Physical address of the brand
     */
    export interface Address {
      /**
       * City name
       */
      city?: string;

      /**
       * Country name
       */
      country?: string;

      /**
       * Country code
       */
      country_code?: string;

      /**
       * Postal or ZIP code
       */
      postal_code?: string;

      /**
       * State or province code
       */
      state_code?: string;

      /**
       * State or province name
       */
      state_province?: string;

      /**
       * Street address
       */
      street?: string;
    }

    export interface Backdrop {
      /**
       * Array of colors in the backdrop image
       */
      colors?: Array<Backdrop.Color>;

      /**
       * Resolution of the backdrop image
       */
      resolution?: Backdrop.Resolution;

      /**
       * URL of the backdrop image
       */
      url?: string;
    }

    export namespace Backdrop {
      export interface Color {
        /**
         * Color in hexadecimal format
         */
        hex?: string;

        /**
         * Name of the color
         */
        name?: string;
      }

      /**
       * Resolution of the backdrop image
       */
      export interface Resolution {
        /**
         * Aspect ratio of the image (width/height)
         */
        aspect_ratio?: number;

        /**
         * Height of the image in pixels
         */
        height?: number;

        /**
         * Width of the image in pixels
         */
        width?: number;
      }
    }

    export interface Color {
      /**
       * Color in hexadecimal format
       */
      hex?: string;

      /**
       * Name of the color
       */
      name?: string;

      /**
       * Where the color was observed: 'site' colors come from the website's own theme
       * signals (rendered page colors, manifest, theme-color meta), 'logo' colors from
       * logo image pixels.
       */
      source?: 'site' | 'logo';
    }

    /**
     * Employee headcount information for the brand (will be null if unknown)
     */
    export interface Employees {
      /**
       * Exact employee count when a precise headcount is known
       */
      exact?: number;

      /**
       * Employee count range for the brand (e.g. '11 to 50')
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
     * Industry classification information for the brand
     */
    export interface Industries {
      /**
       * Easy Industry Classification - array of industry and subindustry pairs
       */
      eic?: Array<Industries.Eic>;
    }

    export namespace Industries {
      export interface Eic {
        /**
         * Industry classification enum
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
         * Subindustry classification enum
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
     * Important website links for the brand
     */
    export interface Links {
      /**
       * URL to the brand's blog or news page
       */
      blog?: string | null;

      /**
       * URL to the brand's careers or job opportunities page
       */
      careers?: string | null;

      /**
       * URL to the brand's contact or contact us page
       */
      contact?: string | null;

      /**
       * URL to the brand's pricing or plans page
       */
      pricing?: string | null;

      /**
       * URL to the brand's privacy policy page
       */
      privacy?: string | null;

      /**
       * URL to the brand's terms of service or terms and conditions page
       */
      terms?: string | null;
    }

    export interface Logo {
      /**
       * Array of colors in the logo
       */
      colors?: Array<Logo.Color>;

      /**
       * Indicates when this logo is best used: 'light' = best for light mode, 'dark' =
       * best for dark mode, 'has_opaque_background' = can be used for either as image
       * has its own background
       */
      mode?: 'light' | 'dark' | 'has_opaque_background';

      /**
       * Resolution of the logo image
       */
      resolution?: Logo.Resolution;

      /**
       * Type of the logo based on resolution (e.g., 'icon', 'logo')
       */
      type?: 'icon' | 'logo';

      /**
       * CDN hosted url of the logo (ready for display)
       */
      url?: string;
    }

    export namespace Logo {
      export interface Color {
        /**
         * Color in hexadecimal format
         */
        hex?: string;

        /**
         * Name of the color
         */
        name?: string;
      }

      /**
       * Resolution of the logo image
       */
      export interface Resolution {
        /**
         * Aspect ratio of the image (width/height)
         */
        aspect_ratio?: number;

        /**
         * Height of the image in pixels
         */
        height?: number;

        /**
         * Width of the image in pixels
         */
        width?: number;
      }
    }

    export interface Social {
      /**
       * Type of social media platform
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
       * URL of the social media page
       */
      url?: string;
    }

    /**
     * Stock market information for this brand (will be null if not a publicly traded
     * company)
     */
    export interface Stock {
      /**
       * Stock exchange name
       */
      exchange?: string;

      /**
       * Stock ticker symbol
       */
      ticker?: string;
    }
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

export interface BrandRetrieveSimplifiedResponse {
  /**
   * Cache outcome for this response. Composite responses are hits only when every
   * cache-controlled fetch contributing to the output was a hit; age_ms is the
   * oldest contributing hit.
   */
  cache_metadata: BrandRetrieveSimplifiedResponse.CacheMetadata;

  /**
   * Simplified brand information
   */
  brand?: BrandRetrieveSimplifiedResponse.Brand;

  /**
   * HTTP status code of the response
   */
  code?: number;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: BrandRetrieveSimplifiedResponse.KeyMetadata;

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;
}

export namespace BrandRetrieveSimplifiedResponse {
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
   * Simplified brand information
   */
  export interface Brand {
    /**
     * An array of backdrop images for the brand
     */
    backdrops?: Array<Brand.Backdrop>;

    /**
     * An array of brand colors
     */
    colors?: Array<Brand.Color>;

    /**
     * The domain name of the brand
     */
    domain?: string;

    /**
     * An array of logos associated with the brand
     */
    logos?: Array<Brand.Logo>;

    /**
     * The title or name of the brand
     */
    title?: string;
  }

  export namespace Brand {
    export interface Backdrop {
      /**
       * Array of colors in the backdrop image
       */
      colors?: Array<Backdrop.Color>;

      /**
       * Resolution of the backdrop image
       */
      resolution?: Backdrop.Resolution;

      /**
       * URL of the backdrop image
       */
      url?: string;
    }

    export namespace Backdrop {
      export interface Color {
        /**
         * Color in hexadecimal format
         */
        hex?: string;

        /**
         * Name of the color
         */
        name?: string;
      }

      /**
       * Resolution of the backdrop image
       */
      export interface Resolution {
        /**
         * Aspect ratio of the image (width/height)
         */
        aspect_ratio?: number;

        /**
         * Height of the image in pixels
         */
        height?: number;

        /**
         * Width of the image in pixels
         */
        width?: number;
      }
    }

    export interface Color {
      /**
       * Color in hexadecimal format
       */
      hex?: string;

      /**
       * Name of the color
       */
      name?: string;

      /**
       * Where the color was observed: 'site' colors come from the website's own theme
       * signals (rendered page colors, manifest, theme-color meta), 'logo' colors from
       * logo image pixels.
       */
      source?: 'site' | 'logo';
    }

    export interface Logo {
      /**
       * Array of colors in the logo
       */
      colors?: Array<Logo.Color>;

      /**
       * Indicates when this logo is best used: 'light' = best for light mode, 'dark' =
       * best for dark mode, 'has_opaque_background' = can be used for either as image
       * has its own background
       */
      mode?: 'light' | 'dark' | 'has_opaque_background';

      /**
       * Resolution of the logo image
       */
      resolution?: Logo.Resolution;

      /**
       * Type of the logo based on resolution (e.g., 'icon', 'logo')
       */
      type?: 'icon' | 'logo';

      /**
       * CDN hosted url of the logo (ready for display)
       */
      url?: string;
    }

    export namespace Logo {
      export interface Color {
        /**
         * Color in hexadecimal format
         */
        hex?: string;

        /**
         * Name of the color
         */
        name?: string;
      }

      /**
       * Resolution of the logo image
       */
      export interface Resolution {
        /**
         * Aspect ratio of the image (width/height)
         */
        aspect_ratio?: number;

        /**
         * Height of the image in pixels
         */
        height?: number;

        /**
         * Width of the image in pixels
         */
        width?: number;
      }
    }
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

export interface BrandSearchResponse {
  /**
   * Up to 10 matching brands, name matches first, then domain matches, most popular
   * first within each group. Empty when nothing matches.
   */
  results: Array<BrandSearchResponse.Result>;

  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: BrandSearchResponse.KeyMetadata;
}

export namespace BrandSearchResponse {
  export interface Result {
    /**
     * The brand's domain.
     */
    domain: string;

    /**
     * Logo link URL that serves the brand's logo, generated per request for the
     * calling organization.
     */
    logo: string;

    /**
     * The brand's name. Empty string when unknown.
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
     * Domain name to retrieve brand data for (e.g., 'stripe.com').
     */
    domain: string;

    /**
     * Discriminator for domain-based brand retrieval.
     */
    type: 'by_domain';

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
     * Maximum age in milliseconds for cached brand data before the API performs a hard
     * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
     * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
     * year.
     */
    maxAgeMs?: number;

    /**
     * Optional parameter to optimize the API call for maximum speed. When set to true,
     * the API will skip time-consuming operations for faster response at the cost of
     * less comprehensive data.
     */
    maxSpeed?: boolean;

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

  export interface BrandRetrieveByNameRequest {
    /**
     * Company name to retrieve brand data for (e.g., 'Apple Inc').
     */
    name: string;

    /**
     * Discriminator for name-based brand retrieval.
     */
    type: 'by_name';

    /**
     * Optional country code hint (GL parameter) to specify the country when looking up
     * by company name.
     */
    country_gl?: string;

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
     * Maximum age in milliseconds for cached brand data before the API performs a hard
     * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
     * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
     * year.
     */
    maxAgeMs?: number;

    /**
     * Optional parameter to optimize the API call for maximum speed. When set to true,
     * the API will skip time-consuming operations for faster response at the cost of
     * less comprehensive data.
     */
    maxSpeed?: boolean;

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

  export interface BrandRetrieveByEmailRequest {
    /**
     * Email address to retrieve brand data for (e.g., 'jane@stripe.com').
     */
    email: string;

    /**
     * Discriminator for email-based brand retrieval.
     */
    type: 'by_email';

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
     * Maximum age in milliseconds for cached brand data before the API performs a hard
     * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
     * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
     * year.
     */
    maxAgeMs?: number;

    /**
     * Optional parameter to optimize the API call for maximum speed. When set to true,
     * the API will skip time-consuming operations for faster response at the cost of
     * less comprehensive data.
     */
    maxSpeed?: boolean;

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

  export interface BrandRetrieveByTickerRequest {
    /**
     * Stock ticker symbol to retrieve brand data for (e.g., 'AAPL').
     */
    ticker: string;

    /**
     * Discriminator for ticker-based brand retrieval.
     */
    type: 'by_ticker';

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
     * Maximum age in milliseconds for cached brand data before the API performs a hard
     * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
     * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
     * year.
     */
    maxAgeMs?: number;

    /**
     * Optional parameter to optimize the API call for maximum speed. When set to true,
     * the API will skip time-consuming operations for faster response at the cost of
     * less comprehensive data.
     */
    maxSpeed?: boolean;

    /**
     * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
     */
    tags?: Array<string>;

    /**
     * Optional stock exchange for the ticker. Defaults to NASDAQ if not specified.
     */
    ticker_exchange?: string;

    /**
     * Optional timeout in milliseconds for the request. If the request takes longer
     * than this value, it will be aborted with a 408 status code. Maximum allowed
     * value is 300000ms (5 minutes).
     */
    timeoutMS?: number;
  }

  export interface BrandRetrieveByDirectURLRequest {
    /**
     * Full http(s) URL to fetch brand data from (e.g.,
     * 'https://stripe.com/enterprise'). Only this URL is fetched — not the entire
     * internet.
     */
    direct_url: string;

    /**
     * Discriminator for direct-URL-based brand retrieval.
     */
    type: 'by_direct_url';

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

  export interface BrandRetrieveFromTransactionRequest {
    /**
     * Transaction information to identify the brand.
     */
    transaction_info: string;

    /**
     * Discriminator for transaction-based brand retrieval.
     */
    type: 'by_transaction';

    /**
     * Optional city name to prioritize when searching for the brand.
     */
    city?: string;

    /**
     * Optional country code hint (GL parameter) to specify the country when
     * identifying a transaction.
     */
    country_gl?: string;

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
     * When set to true, the API performs additional verification to ensure the
     * identified brand matches the transaction with high confidence.
     */
    high_confidence_only?: boolean;

    /**
     * Optional parameter to optimize the API call for maximum speed. When set to true,
     * the API will skip time-consuming operations for faster response at the cost of
     * less comprehensive data.
     */
    maxSpeed?: boolean;

    /**
     * Optional Merchant Category Code (MCC) to help identify the business category or
     * industry.
     */
    mcc?: string | number;

    /**
     * Optional phone number from the transaction to help verify brand match.
     */
    phone?: string | number;

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

export interface BrandRetrieveSimplifiedParams {
  /**
   * Domain name to retrieve simplified brand data for
   */
  domain: string;

  /**
   * Maximum age in milliseconds for cached brand data before the API performs a hard
   * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
   * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
   * year.
   */
  maxAgeMs?: number | null;

  /**
   * Comma-separated tags for tracking request usage. Up to 20 tags, each 1-50
   * characters.
   */
  tags?: Array<string>;

  /**
   * Optional theme preference used when selecting brand assets.
   */
  theme?: 'light' | 'dark';

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export interface BrandSearchParams {
  /**
   * Search term, matched against the fields selected by queryBy (e.g. 'nike',
   * 'nike.com', 'nik').
   */
  query: string;

  /**
   * Whether the search term matches by prefix, so partial words match as they are
   * typed (e.g. 'nik' matches Nike). Set to false to match whole words only.
   */
  autocomplete?: boolean;

  /**
   * Fields to match the search term against, as a comma-separated list or repeated
   * parameter: 'name', 'domain', or both. Defaults to both.
   */
  queryBy?: Array<'name' | 'domain'>;

  /**
   * Comma-separated tags for tracking request usage. Up to 20 tags, each 1-50
   * characters.
   */
  tags?: Array<string>;

  /**
   * Maximum number of typos tolerated when matching, from 0 to 2. Defaults to 0 (no
   * typo tolerance).
   */
  typoTolerance?: number;
}

export declare namespace Brand {
  export {
    type BrandRetrieveResponse as BrandRetrieveResponse,
    type BrandRetrieveSimplifiedResponse as BrandRetrieveSimplifiedResponse,
    type BrandSearchResponse as BrandSearchResponse,
    type BrandRetrieveParams as BrandRetrieveParams,
    type BrandRetrieveSimplifiedParams as BrandRetrieveSimplifiedParams,
    type BrandSearchParams as BrandSearchParams,
  };
}
