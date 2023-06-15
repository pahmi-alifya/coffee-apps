import {response} from '@utils';
import {Request} from 'miragejs';

const postRequestOtp = (schema: any, request: Request) => {
  return response(200, 'login success', null);
};
export default postRequestOtp;
