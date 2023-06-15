import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type CategoryType = {
  id_product_category: number;
  category: string;
  position: number;
};

export const CategoryModel: ModelDefinition<CategoryType> = Model.extend({});
