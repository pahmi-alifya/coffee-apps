import {faker} from '@faker-js/faker';
import {BannerType} from '@models';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const BannerFactory: FactoryDefinition<BannerType> = Factory.extend({
  id() {
    return faker.datatype.number();
  },
  title() {
    return faker.commerce.productName();
  },
  image() {
    return faker.image.abstract(400, 163);
  },
  link() {
    return faker.internet.url();
  },
});

export default BannerFactory;
