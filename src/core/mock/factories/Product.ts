import {faker} from '@faker-js/faker';
import {
  ProductType,
  ProductTypeOptions,
  ProductVariantStatus,
  ProductVisibility,
} from '@models';
import {range} from '@utils';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const ProductFactory: FactoryDefinition<ProductType> =
  Factory.extend<ProductType>({
    id_product(i) {
      return i + 1;
    },
    id_brand(i) {
      return i + 1;
    },
    category_id() {
      return faker.datatype.number({min: 1, max: 10});
    },
    price() {
      return faker.datatype.number({min: 50000, max: 100000});
    },
    discounted_price() {
      // return random undefined or number
      return faker.helpers.arrayElement([
        undefined,
        faker.datatype.number({min: 30000, max: 50000}),
      ]);
    },
    is_oos() {
      return faker.datatype.boolean();
    },
    is_active() {
      return faker.datatype.boolean();
    },
    plastic_used() {
      return faker.helpers.arrayElement([
        null,
        faker.datatype.number({min: 1, max: 10}),
      ]);
    },
    position() {
      return faker.datatype.number({min: 1, max: 10}).toString();
    },
    product_description() {
      return faker.random.words(5);
    },
    product_name() {
      return faker.commerce.productName();
    },
    product_photo() {
      return faker.helpers.arrayElement([
        'https://storage.googleapis.com/jiwaplus-assets/products_photo/JanjiJiwa/7030019.webp',
        faker.image.food(640, 480, true),
      ]);
    },
    product_type() {
      return faker.helpers.arrayElement([ProductTypeOptions.Menu]);
    },
    product_variant_status() {
      return faker.helpers.arrayElement([ProductVariantStatus.Blank]);
    },
    product_visibility() {
      return faker.helpers.arrayElement([ProductVisibility.Hide]);
    },
    sku() {
      return faker.datatype.number({min: 1000000, max: 9999999});
    },
    variant() {
      const TOTAL_ITEM = 3;

      return range(TOTAL_ITEM).map(() => {
        const length = faker.datatype.number({min: 1, max: 3});

        return {
          product_variant_master: faker.commerce.productMaterial(),
          product_variant: range(length).map(() => ({
            id_variant: faker.helpers.unique(faker.datatype.number),
            variant_name: faker.commerce.productMaterial(),
            variant_price: faker.datatype.number(15000),
          })),
        };
      });
    },
    variant_nonsku() {
      const TOTAL_ITEM = 5;

      return range(TOTAL_ITEM).map(() => {
        const length = faker.datatype.number({min: 1, max: 3});
        const skuName = faker.commerce.productMaterial();

        return {
          variant_non_sku_name: skuName,
          variant_non_sku: range(length).map((_, i) => ({
            order: i + 1,
            id_variant_non_sku_detail: faker.helpers.unique(
              faker.datatype.number,
            ),
            variant_non_sku_name: skuName,
            variant_non_sku_detail: faker.commerce.productMaterial(),
          })),
        };
      });
    },
    modifier() {
      const TOTAL_ITEM = 2;

      return range(TOTAL_ITEM).map(() => {
        const length = faker.datatype.number({min: 2, max: 5});

        return {
          product_modifier_master: faker.commerce.productMaterial(),
          product_modifier: range(length).map(() => ({
            id_modifier: faker.helpers.unique(faker.datatype.number),
            modifier_name: faker.commerce.productMaterial(),
            modifier_price: faker.datatype.number({min: 5000, max: 10000}),
          })),
        };
      });
    },
  });

export default ProductFactory;
