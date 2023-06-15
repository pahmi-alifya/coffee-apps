import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';
import {CategoryType} from './CategoryModel';
import {ModifierType} from './ModifierModel';
import {VariantType} from './VariantModel';
import {VariantNonSkuType} from './VariantNonSkuModel';

export type ProductQueryParams = Partial<{
  pagesize: number;
  product_category: number;
  product_name: string;
  id_membership: number;
  id_outlet: number;
  membership_lvl: number;
}>;

export enum ProductTypeOptions {
  Menu = 'menu',
  Topping = 'topping',
}

export enum ProductVariantStatus {
  Blank = '',
}

export enum ProductVisibility {
  Hide = 'HIDE',
  Visible = 'Visible',
}

export type ProductType = {
  id_product: number;
  id_brand: number;
  category_id: number;
  price: number;
  discounted_price?: number;
  is_oos: boolean;
  is_active: boolean;
  plastic_used: null | number;
  position: string;
  product_description: string;
  product_name: string;
  product_photo: string;
  product_type: ProductTypeOptions;
  product_variant_status: ProductVariantStatus;
  product_visibility: ProductVisibility;
  sku: number;
  variant: VariantType[];
  variant_nonsku?: VariantNonSkuType[];
  modifier: ModifierType[];
};

export type ProductListItemType = CategoryType & {
  products: ProductType[];
};

export type ProductListType = Array<ProductListItemType>;

export const ProductModel: ModelDefinition<ProductType> = Model.extend({});
