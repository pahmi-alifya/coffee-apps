import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type JiwaPointType = {
  id_point_summary: number;
  id_user: number;
  amount: number;
  createdAt: string;
  updatedAt: string | null;
};

export const JiwaPointModel: ModelDefinition<JiwaPointType> = Model.extend({});
