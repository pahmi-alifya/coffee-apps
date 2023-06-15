import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type ModifierType = {
  product_modifier_master: string;
  product_modifier: Array<{
    id_modifier: number;
    modifier_name: string;
    modifier_price: number;
  }>;
};

export const ModifierModel: ModelDefinition<ModifierType> = Model.extend({});
