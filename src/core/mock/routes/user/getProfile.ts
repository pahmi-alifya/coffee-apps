import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {RouteHandler} from 'miragejs/server';

const getProfile: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', []);
  }
  const data = schema.first('user')?.attrs;
  return response(200, 'Successfully get user profile!', data);
};

export default getProfile;
