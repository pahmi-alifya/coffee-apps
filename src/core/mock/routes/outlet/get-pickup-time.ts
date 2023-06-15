import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const getPickupTime: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(401, {}, response(401, 'Authorization Failed!', []));
  }
  const outletId = Number(request.params?.id);
  const outlet = schema.findBy('outlet', {id_outlet: outletId});
  if (!outletId || !outlet) {
    return new Response(404, {}, response(404, 'Not Found', []));
  }

  return new Response(
    200,
    {},
    response(200, 'Successfully get pickup time', [
      'NOW',
      '15',
      '30',
      '60',
      '90',
    ]),
  );
};

export default getPickupTime;
