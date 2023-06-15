import {faker} from '@faker-js/faker';
import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const postTransaction: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(401, {}, response(401, 'Authorization Failed!', []));
  }

  return new Response(
    201,
    {},
    response(201, 'Successfully post transaction', {
      id_transaction: faker.datatype.number(),
      successful_callback_url: faker.internet.url(),
      url: faker.internet.url(),
      failed_success_url: null,
    }),
  );
};

export default postTransaction;
