import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type VariantNonSkuType = {
  variant_non_sku_name: string;
  variant_non_sku: Array<{
    order: number;
    id_variant_non_sku_detail: number;
    variant_non_sku_name: string;
    variant_non_sku_detail: string;
  }>;
};

export const VariantNonSkuModel: ModelDefinition<VariantNonSkuType> =
  Model.extend({});
