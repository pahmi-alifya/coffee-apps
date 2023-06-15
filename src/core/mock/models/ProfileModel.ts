import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

export type ProfileType = {
  id_user: number;
  name: string | null;
  citizenship: string | null;
  phone: string | number;
  email: string | null;
  birth_date: string | null;
  occupation: string | null;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_complete_profile: boolean
  is_suspended: boolean;
  access_level: string;
  gender: string | null;
  v2_convert: boolean
  is_v1: boolean
  created_at: string;
  updated_at: string | null;
  referral_code: string | null;
}

export const ProfileModel: ModelDefinition<ProfileType> = Model.extend({});