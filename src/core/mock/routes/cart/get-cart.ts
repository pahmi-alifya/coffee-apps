import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const getCart: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(401, {}, response(401, 'Authorization Failed!', []));
  }

  const cartId = request.params?.id;

  // get all carts
  if (!cartId) {
    const carts = schema.all('cart').models;

    // response with carts
    return new Response(
      200,
      {},
      response(200, 'Successfully get carts!', carts),
    );
  }

  // get one cart
  const cart = schema.find('cart', cartId);

  // cart not found
  if (!cart) {
    return new Response(404, {}, response(404, 'Cart not found!', undefined));
  }

  // cart found
  return new Response(
    200,
    {},
    response(200, 'Successfully get cart!', cart?.attrs),
  );
};

export default getCart;
