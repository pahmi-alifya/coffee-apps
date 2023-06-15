import {user} from '@url';
import {Server} from 'miragejs';
import getProfile from './getProfile';
import updateInfo from './updateInfo';

const registerUserRoutes = (context: Server) => {
  return [
    context.patch(user('auth/customer/update-info'), updateInfo),
    context.get(user('auth/profile'), getProfile),
  ];
};

export default registerUserRoutes;
