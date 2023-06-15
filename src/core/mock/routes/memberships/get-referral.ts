import {response} from '@utils';
import {Request} from 'miragejs';
import {AppSchema} from '../../server';

const getReferral = (schema: AppSchema, request: Request) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', {});
  }

  const referral = schema.first('referral')?.attrs;

  if (!referral) {
    return response(404, 'Referral not found!', {});
  }

  return referral;
};

export default getReferral;
