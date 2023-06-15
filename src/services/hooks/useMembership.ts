import {MembershipDetailType} from '@models';
import {laggy, useQuery} from '@swr';
import {memberships} from '@url';
import {ResponseDto} from '@utils';

export const membershipKeys = {
  all: /\/membership-details/,
  detail: memberships('membership-details'),
};

export const useMembershipDetail = (enabled = true) =>
  useQuery<ResponseDto<MembershipDetailType>>(membershipKeys.detail, {
    use: [laggy],
    immutable: true,
    enabled,
  });
