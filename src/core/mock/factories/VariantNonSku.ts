import {faker} from '@faker-js/faker';
import {VariantNonSkuType} from '@models';
import {range} from '@utils';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const VariantNonSkuFactory: FactoryDefinition<VariantNonSkuType> =
  Factory.extend<VariantNonSkuType>({
    variant_non_sku_name() {
      return faker.commerce.productMaterial();
    },
    variant_non_sku() {
      const length = faker.datatype.number({min: 1, max: 3});

      return range(length).map((_, i) => ({
        order: i + 1,
        id_variant_non_sku_detail: faker.helpers.unique(faker.datatype.number),
        variant_non_sku_name: this.variant_non_sku_name as string,
        variant_non_sku_detail: faker.commerce.productMaterial(),
      }));
    },
  });

export default VariantNonSkuFactory;
