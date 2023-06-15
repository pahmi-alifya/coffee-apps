import {AppRegistry} from '@mock/server';
import {CartUpdateBodyType} from '@models';
import {response} from '@utils';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const editCart: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(401, {}, response(401, 'Authorization Failed!', []));
  }
  const body: CartUpdateBodyType = JSON.parse(request.requestBody);
  const cartId = body.id_cart_item;
  const cart = schema.findBy('cart', {id_cart_item: cartId});

  if (!cart) {
    return new Response(404, {}, response(404, 'Cart not found!', undefined));
  }
  cart.update({
    ...cart.attrs,
    qty: body?.qty || cart.qty,
    notes: body?.notes || cart.notes,
    subtotal: body?.subtotal || cart.subtotal,
  });

  return new Response(
    200,
    {},
    response(200, 'Successfully get carts!', cart.attrs),
  );
};

export default editCart;
