import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {RouteHandler} from 'miragejs/server';

const getJiwaPoint: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', {});
  }

  const data = schema.first('jiwaPoint')?.attrs;

  if (!data) {
    return response(404, 'Jiwa Point not found!', {});
  }

  return data;
};

export default getJiwaPoint;
