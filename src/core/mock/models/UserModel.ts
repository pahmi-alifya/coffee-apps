import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export type UserType = {
  id_user: number;
  name: string;
  citizenship: string;
  phone: string;
  email: string;
  birth_date: string;
  occupation: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_complete_profile: boolean;
  is_suspended: boolean;
  access_level: string;
  gender: string;
  v2_convert: boolean;
  is_v1: boolean;
  created_at: string;
  updated_at: string;
  referral_code?: string;
};

export const UserModel: ModelDefinition<UserType> = Model.extend({});
