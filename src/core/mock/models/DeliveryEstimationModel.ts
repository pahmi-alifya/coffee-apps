import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type DeliveryEstimationBody = {
  recepients: {
    lat: number;
    long: number;
    address: string;
    name: string;
    phone: string;
  };
  id_outlet: number;
  items: Array<string>;
};

export type DeliveryEstimationType = {
  price: number;
  name: string;
  image: string;
};

export const DeliveryEstimationModel: ModelDefinition<DeliveryEstimationType> =
  Model.extend({});
