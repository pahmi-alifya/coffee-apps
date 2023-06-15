import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';
import {ModifierType} from './ModifierModel';
import {VariantType} from './VariantModel';

export type CartQueryParams = Partial<{
  id_outlet: number;
}>;

export type CartCountType = {
  total: number;
};

export type CartBodyType = {
  id_product: number;
  id_brand: number;
  id_outlet: number;
  variant_non_sku: number[];
  variant: Array<{
    product_variant_master: string;
    product_variant: Array<{
      id_variant: number;
    }>;
  }>;
  modifier: Array<{
    product_modifier_master: string;
    product_modifier: Array<{
      id_modifier: number;
    }>;
  }>;
  notes: string;
  qty: number;
  subtotal: number;
};

export type CartUpdateBodyType = {
  id_cart_item: number;
  variant: Array<{
    product_variant_master: string;
    product_variant: Array<{
      id_variant: number;
    }>;
  }>;
  modifier: Array<{
    product_modifier_master: string;
    product_modifier: Array<{
      id_modifier: number;
    }>;
  }>;
  notes: string;
  qty: number;
  subtotal: number;
  variant_non_sku: number[];
};

export type CartType = {
  id_cart_item: number;
  id_product: number;
  id_outlet: number;
  id_brand: number;
  product_name: string;
  product_photo: string;
  qty: number;
  subtotal: number;
  discounted_price?: number;
  notes: string;
  variant: VariantType[];
  variant_non_sku: string[];
  modifier: ModifierType[];
};

export const CartModel: ModelDefinition<CartType> = Model.extend({});
