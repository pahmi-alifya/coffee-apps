import {faker} from '@faker-js/faker';
import {ReferralType} from '@models';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const ReferralFactory: FactoryDefinition<ReferralType> = Factory.extend({
  id_user(i) {
    return i + 1;
  },
  id_user_referral_master() {
    return faker.datatype.number(1);
  },
  referral_code() {
    return faker.datatype.string(8);
  },
  total_referred_user() {
    return faker.datatype.number();
  },
});

export default ReferralFactory;
