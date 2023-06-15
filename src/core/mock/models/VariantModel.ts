import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type VariantType = {
  product_variant_master: string;
  product_variant: Array<{
    id_variant: number;
    variant_name: string;
    variant_price: number;
  }>;
};

export const VariantModel: ModelDefinition<VariantType> = Model.extend({});
