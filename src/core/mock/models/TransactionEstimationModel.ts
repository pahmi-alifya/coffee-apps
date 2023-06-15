import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export enum SummaryType {
  Text = 'TEXT',
  Promo = 'PROMO',
  Point = 'POINT',
}

export type TransactionEstimationType = {
  subtotal: number;
  grand_total: number;
  summary: Array<{
    label: string;
    price: number;
    type: SummaryType;
  }>;
  total_promo_price: number;
  is_promo_applied: boolean;
  payment_method: {
    jiwa_point: boolean;
  };
  promotions: {
    product_discount: number;
    invoice_discount: number;
    delivery_discount: number;
    message: string | null;
    total: number;
  };
};

export const TransactionEstimationModel: ModelDefinition<TransactionEstimationType> =
  Model.extend({});
