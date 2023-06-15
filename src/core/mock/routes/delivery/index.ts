import {delivery} from '@url';
import {Server} from 'miragejs';
import postDeliveryEstimation from './post-delivery-estimation';

const registerDeliveryRoutes = (context: Server) => {
  return [context.post(delivery('delivery/estimate'), postDeliveryEstimation)];
};

export default registerDeliveryRoutes;
