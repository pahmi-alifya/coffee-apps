import {response} from '@utils';
import {Request} from 'miragejs';
import {AppSchema} from '../../server';

const getMembershipDetail = (schema: AppSchema, request: Request) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', []);
  }

  return response(
    200,
    'Successfully get membership!',
    schema.first('membershipDetail')?.attrs,
  );
};

export default getMembershipDetail;
