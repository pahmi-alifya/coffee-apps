import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type GoogleMapsLatLongType = {
  plus_code: {
    compound_code: string;
    global_code: string;
  };
};

export const GoogleMapsLatLongModel: ModelDefinition<GoogleMapsLatLongType> =
  Model.extend({});
