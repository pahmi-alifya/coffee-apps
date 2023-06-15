import {product} from '@url';
import {Server} from 'miragejs';
import getProduct from './get-product';

const registerProductRoutes = (context: Server) => {
  return [
    context.get(product('product'), getProduct),
    context.get(product('product/:id'), getProduct),
  ];
};

export default registerProductRoutes;
