import {faker} from '@faker-js/faker';
import {MembershipDetailType} from '@models';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const MembershipDetailFactory: FactoryDefinition<MembershipDetailType> =
  Factory.extend({
    total_points() {
      return faker.datatype.number({
        min: 0,
        max: 1000,
      });
    },
    total_transaction() {
      return faker.datatype.number({min: 0, max: 50});
    },
    membership_lvl() {
      return faker.datatype.number({min: 1, max: 5});
    },
    membershipReward() {
      return [];
    },
    membership_icon() {
      return faker.image.avatar();
    },
    membership_title() {
      return faker.name.jobType();
    },
    max_exp() {
      return faker.datatype.number({min: 2000, max: 5000});
    },
    user_exp() {
      return faker.datatype.number({min: 1000, max: 2000});
    },
  });

export default MembershipDetailFactory;
