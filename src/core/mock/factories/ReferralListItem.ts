import {faker} from '@faker-js/faker';
import {ReferralListItemType} from '@models';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const ReferralListItemFactory: FactoryDefinition<ReferralListItemType> =
  Factory.extend({
    id_user_referral_detail() {
      return faker.datatype.number(1);
    },
    id_user_referral_master() {
      return faker.datatype.number(1);
    },
    createdAt() {
      return faker.datatype.string();
    },
    purchased() {
      return faker.datatype.boolean();
    },
    id_user(i) {
      return i + 1;
    },
    name() {
      return faker.name.fullName();
    },
    citizenship() {
      return faker.address.country();
    },
    phone() {
      return faker.phone.number();
    },
    email() {
      return faker.internet.email();
    },
    birth_date() {
      return faker.date.birthdate().toISOString();
    },
    occupation() {
      return faker.datatype.string();
    },
    is_phone_verified() {
      return faker.datatype.boolean();
    },
    is_email_verified() {
      return faker.datatype.boolean();
    },
    is_suspended() {
      return faker.datatype.boolean();
    },
    is_complete_profile() {
      return faker.datatype.boolean();
    },
    access_level() {
      return faker.datatype.string();
    },
    gender() {
      return faker.datatype.string();
    },
    v2_convert() {
      return faker.datatype.boolean();
    },
    is_v1() {
      return faker.datatype.boolean();
    },
    created_at() {
      return faker.date.past().toISOString();
    },
    updated_at() {
      return faker.date.past().toISOString();
    },
  });

export default ReferralListItemFactory;
