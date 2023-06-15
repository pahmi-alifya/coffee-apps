import {outlet} from '@url';
import {Server} from 'miragejs';
import getBrand from './get-brand';
import getOutlet from './get-outlet';
import getPickupTime from './get-pickup-time';

const registerOutletRoutes = (context: Server) => {
  return [
    context.get(outlet('v1/brands'), getBrand),
    context.get(outlet('v1/outlets'), getOutlet),
    context.get(outlet('v1/outlets/pickup-time/:id'), getPickupTime),
  ];
};

export default registerOutletRoutes;
