// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DeliveriesAPI from './deliveries';
import {
  Attempt,
  Deliveries,
  Delivery,
  DeliveryListAttemptsParams,
  DeliveryListAttemptsResponse,
  DeliveryListParams,
  DeliveryListResponse,
  DeliveryRetrieveParams,
  DeliveryRetrieveResponse,
  DeliveryRetryParams,
  DeliveryRetryResponse,
  DeliverySummary,
} from './deliveries';

export class Webhooks extends APIResource {
  deliveries: DeliveriesAPI.Deliveries = new DeliveriesAPI.Deliveries(this._client);
}

/**
 * Webhook retry settings. Use {} for the default schedule.
 */
export interface RetryConfig {
  /**
   * Retry delays in seconds, totaling at most 72 hours. Use [] to disable automatic
   * retries.
   */
  delays_seconds?: Array<number>;
}

Webhooks.Deliveries = Deliveries;

export declare namespace Webhooks {
  export { type RetryConfig as RetryConfig };

  export {
    Deliveries as Deliveries,
    type Attempt as Attempt,
    type Delivery as Delivery,
    type DeliverySummary as DeliverySummary,
    type DeliveryRetrieveResponse as DeliveryRetrieveResponse,
    type DeliveryListResponse as DeliveryListResponse,
    type DeliveryListAttemptsResponse as DeliveryListAttemptsResponse,
    type DeliveryRetryResponse as DeliveryRetryResponse,
    type DeliveryRetrieveParams as DeliveryRetrieveParams,
    type DeliveryListParams as DeliveryListParams,
    type DeliveryListAttemptsParams as DeliveryListAttemptsParams,
    type DeliveryRetryParams as DeliveryRetryParams,
  };
}
