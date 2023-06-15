import {faker} from '@faker-js/faker';
import {ModifierType} from '@models';
import {range} from '@utils';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const ModifierFactory: FactoryDefinition<ModifierType> =
  Factory.extend<ModifierType>({
    product_modifier_master() {
      return faker.commerce.productMaterial();
    },
    product_modifier() {
      const length = faker.datatype.number({min: 1, max: 3});

      return range(length).map(() => ({
        id_modifier: faker.helpers.unique(faker.datatype.number),
        modifier_name: faker.commerce.productMaterial(),
        modifier_price: faker.datatype.number({min: 5000, max: 10000}),
      }));
    },
  });

export default ModifierFactory;
