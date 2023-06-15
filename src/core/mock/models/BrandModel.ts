import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type BrandType = {
  brand_id: number;
  brand_name: string;
  brand_code: string;
  brand_order: number;
  brand_active: boolean;
  brand_visibility: boolean;
  brand_logo: string;
  brand_image: string;
  created_at: string;
  updated_at: string;
};

export const BrandModel: ModelDefinition<BrandType> = Model.extend({});
