import {UserType} from '@models';
import {laggy, useQuery} from '@swr';
import {user} from '@url';
import {ResponseDto} from '@utils';

export const userAccountKeys = {
  all: /\/auth/,
  me: user('auth/profile'),
};

export const useMe = () =>
  useQuery<ResponseDto<UserType>>(userAccountKeys.me, {
    use: [laggy],
    immutable: true,
  });
