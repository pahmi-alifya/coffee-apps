import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const deleteCart: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(401, {}, response(401, 'Authorization Failed!', []));
  }

  const body = JSON.parse(request.requestBody);
  const cartId = body?.id_cart_item || -1;
  const cart = schema.find('cart', cartId);

  if (!cart) {
    return new Response(404, {}, response(404, 'Cart not found!', undefined));
  }

  cart.destroy();

  return new Response(204, {}, '');
};

export default deleteCart;
