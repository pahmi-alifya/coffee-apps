import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {isEqual, sortBy} from 'lodash';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const postDeliveryEstimation: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(401, {}, response(401, 'Authorization Failed!', []));
  }
  const body = JSON.parse(request.requestBody);
  const keys = sortBy(Object.keys(body));
  const correctKeys = ['id_outlet', 'items', 'recepients'];
  if (keys.length !== 3 || !isEqual(keys, correctKeys)) {
    return new Response(422, {}, response(422, 'Unprocessable Entity', []));
  }

  return new Response(
    200,
    {},
    response(200, 'Success', schema.all('deliveryEstimation').models),
  );
};

export default postDeliveryEstimation;
