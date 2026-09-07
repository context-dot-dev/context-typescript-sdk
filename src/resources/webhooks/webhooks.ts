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
} from './deliveries';

export class Webhooks extends APIResource {
  deliveries: DeliveriesAPI.Deliveries = new DeliveriesAPI.Deliveries(this._client);
}

/**
 * Opt into durable webhook delivery. An empty object uses the default retry
 * schedule. Omit retry to preserve legacy delivery behavior. The policy is
 * snapshotted for each event.
 */
export interface RetryConfig {
  /**
   * Wait in seconds after each failed attempt. The first attempt is immediate. At
   * most 10 delays, each 1–86400 seconds, totaling at most 72 hours. Small jitter is
   * added automatically. An empty array disables automatic retries; manual retries
   * remain available.
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
