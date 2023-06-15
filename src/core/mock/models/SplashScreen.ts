import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type SplashScreenType = {
  id_jiwa_splash_screen: number;
  media_url: string;
  media_type: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export const SplashScreenModel: ModelDefinition<SplashScreenType> =
  Model.extend({});
