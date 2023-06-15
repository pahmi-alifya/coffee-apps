import {AppRegistry} from '@mock/server';
import {TypeNotifType} from '@models';
import {response} from '@utils';
import {RouteHandler} from 'miragejs/server';

const getNotificationList: RouteHandler<AppRegistry> = (
  schema,
  request,
) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', []);
  }

  const type = request.params?.type;
  const data = schema.where('notification', {
    type: type?.toLowerCase() as TypeNotifType,
  }).models;

  return response(200, 'Successfully get notifications!', data);
};

export default getNotificationList;
