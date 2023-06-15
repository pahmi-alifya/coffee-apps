import {faker} from '@faker-js/faker';
import {VariantType} from '@models';
import {range} from '@utils';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const VariantFactory: FactoryDefinition<VariantType> =
  Factory.extend<VariantType>({
    product_variant_master() {
      return faker.commerce.productMaterial();
    },
    product_variant() {
      const length = faker.datatype.number({min: 1, max: 3});

      return range(length).map(() => ({
        id_variant: faker.helpers.unique(faker.datatype.number),
        variant_name: faker.commerce.productMaterial(),
        variant_price: faker.datatype.number(15000),
      }));
    },
  });

export default VariantFactory;
