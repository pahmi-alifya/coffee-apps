import {response} from '@utils';
import {Request} from 'miragejs';

const postVerifyPin = (schema: any, request: Request) => {
  return response(200, 'login success', null);
};
export default postVerifyPin;
