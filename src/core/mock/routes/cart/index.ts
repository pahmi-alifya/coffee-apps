import {transaction} from '@url';
import {Server} from 'miragejs';
import deleteCart from './delete-cart';
import editCart from './edit-cart';
import getCart from './get-cart';
import postCart from './post-cart';

const registerCartRoutes = (context: Server) => {
  return [
    context.get(transaction('cart'), getCart),
    context.get(transaction('cart/:id'), getCart),
    context.post(transaction('cart'), postCart),
    context.patch(transaction('cart'), editCart),
    context.del(transaction('cart'), deleteCart),
  ];
};

export default registerCartRoutes;
