import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type BannerType = {
  id: number;
  title: string;
  image: string;
  link: string;
};

export const BannerModel: ModelDefinition<BannerType> = Model.extend({});
