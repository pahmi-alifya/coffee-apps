import {memberships} from '@url';
import {Server} from 'miragejs';
import getJiwaPoint from '../memberships/get-jiwapoint';
import getJiwaPointTransaction from './get-jiwapoint-transaction';
import getMembershipDetail from './get-membership';
import getReferral from './get-referral';
import getReferralList from './get-referral-list';

const registerMembershipRoutes = (context: Server) => {
  return [
    context.get(memberships('membership-details'), getMembershipDetail),
    context.get(memberships('referral'), getReferral),
    context.get(memberships('referral/list'), getReferralList),
    context.get(memberships('jiwapoint/list/:type'), getJiwaPointTransaction),
    context.get(memberships('jiwapoint'), getJiwaPoint),
  ];
};

export default registerMembershipRoutes;
