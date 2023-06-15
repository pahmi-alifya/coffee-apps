import {response} from '@utils';
import {Request} from 'miragejs';

const postLogin = (schema: any, request: Request) => {
  return response(200, 'Successfully get products!', null);
};
export default postLogin;
