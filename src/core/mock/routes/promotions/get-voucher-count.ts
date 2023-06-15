import {AppRegistry} from '@mock/server';
import {random, response} from '@utils';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const getVoucherCount: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(401, {}, response(401, 'Unauthorized!', []));
  }
  return new Response(
    200,
    {},
    response(200, 'Successfully get voucher count!', {
      total_voucher: random(1, 10),
    }),
  );
};

export default getVoucherCount;
