import {faker} from '@faker-js/faker';
import {CategoryType} from '@models/CategoryModel';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const CategoryFactory: FactoryDefinition<CategoryType> = Factory.extend({
  id_product_category(n) {
    return n + 1;
  },
  category() {
    return faker.commerce.department();
  },
  position() {
    return faker.random.numeric();
  },
});

export default CategoryFactory;
