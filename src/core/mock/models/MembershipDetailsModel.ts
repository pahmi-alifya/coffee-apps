import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type MembershipDetailType = {
  total_points: number;
  total_transaction: number;
  membership_lvl: number;
  membership_title: string;
  membership_icon: string;
  membershipReward: any[];
  max_exp: number;
  user_exp: number;
};

export const MembershipDetailModel: ModelDefinition<MembershipDetailType> =
  Model.extend({});
