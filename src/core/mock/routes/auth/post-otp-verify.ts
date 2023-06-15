import {response} from '@utils';
import {Request} from 'miragejs';

const postVerifyOtp = (schema: any, request: Request) => {
  return response(200, 'login success', null);
};
export default postVerifyOtp;
