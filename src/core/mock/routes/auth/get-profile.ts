import {response} from '@utils';
import {Request} from 'miragejs';
import {AppSchema} from '../../server';

const getProfile = (schema: AppSchema, request: Request) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', []);
  }

  return response(
    200,
    'Successfully get profile!',
    schema.first('profile')?.attrs,
  );
};

export default getProfile;
