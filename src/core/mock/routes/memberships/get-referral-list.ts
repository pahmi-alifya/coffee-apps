import {response} from '@utils';
import {Request} from 'miragejs';
import {AppSchema} from '../../server';

const getReferralList = (schema: AppSchema, request: Request) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', {});
  }

  return response(
    200,
    'Successfuly get referral list',
    schema.all('referralListItem').models,
  );
};

export default getReferralList;
