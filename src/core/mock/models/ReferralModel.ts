import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type ReferralType = {
  id_user_referral_master: number;
  referral_code: string;
  total_referred_user: number;
  id_user: number;
};

export const ReferralModel: ModelDefinition<ReferralType> = Model.extend({});
