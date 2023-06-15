import {user} from '@url';
import {Server} from 'miragejs';
import postLogin from './post-login';
import postOtpRequest from './post-otp-request';
import postOtpVerify from './post-otp-verify';
import postPinVerify from './post-pin-verify';
import getProfile from './get-profile';

const registerAuthRoutes = (context: Server) => {
  return [
    context.post(user('auth/signin'), postLogin),
    context.post(user('auth/otp/request/'), postOtpRequest),
    context.post(user('auth/pins/verify'), postPinVerify),
    context.post(user('auth/otp/verify/'), postOtpVerify),
    context.post(user('auth/profile/'), getProfile),
  ];
};

export default registerAuthRoutes;
