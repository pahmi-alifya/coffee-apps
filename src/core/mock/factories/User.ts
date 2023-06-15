import {faker} from '@faker-js/faker';
import {JiwaUserTransactionType} from '@models';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const UserFactory: FactoryDefinition<JiwaUserTransactionType> = Factory.extend({
  id_user(i) {
    return i + 1;
  },
  name() {
    return faker.name.firstName();
  },
  citizenship() {
    return 'Indonesia';
  },
  phone() {
    return faker.phone.number();
  },
  email() {
    return `${faker.name.fullName}@gmail.com`;
  },
  birth_date() {
    return '1994-05-12';
  },
  occupation() {
    return 'Profesional';
  },
  is_phone_verified() {
    return true;
  },
  is_email_verified() {
    return true;
  },
  is_complete_profile() {
    return true;
  },
  is_suspended() {
    return false;
  },
  gender() {
    return 'male';
  },
  v2_convert() {
    return true;
  },
  is_v1() {
    return false;
  },
  created_at() {
    return new Date(faker.date.recent());
  },
  updated_at() {
    return new Date(faker.date.recent());
  },
  referral_code() {
    return '';
  },
  access_level() {
    return 'user';
  },
});

export default UserFactory;
