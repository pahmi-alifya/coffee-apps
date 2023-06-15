import {faker} from '@faker-js/faker';
import {AppRegistry, AppSchema} from '@mock/server';
import {CartType} from '@models';
import {range} from '@utils';
import {sample} from 'lodash';
import {Factory, Instantiate, Server} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const CartFactory: FactoryDefinition<CartType> = Factory.extend<CartType>({
  id_cart_item(i) {
    return i + 1;
  },
  id_product(i) {
    return i + 1;
  },
  id_outlet(i) {
    return i + 1;
  },
  id_brand(i) {
    return i + 1;
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
  qty() {
    return faker.datatype.number({min: 1, max: 10});
  },
  subtotal() {
    return faker.datatype.number({min: 30000, max: 100000});
  },
  discounted_price() {
    const chance = Math.random();
    if (chance > 0.5) {
      return faker.datatype.number({min: 30000, max: 100000});
    }
    return undefined;
  },
  notes() {
    return faker.random.words(5);
  },
  variant() {
    const TOTAL_ITEM = 3;

    return range(TOTAL_ITEM).map(() => ({
      product_variant_master: faker.commerce.productMaterial(),
      product_variant: [
        {
          id_variant: faker.helpers.unique(faker.datatype.number),
          variant_name: faker.commerce.productMaterial(),
          variant_price: faker.datatype.number(15000),
        },
      ],
    }));
  },
  variant_non_sku() {
    const length = faker.datatype.number({min: 1, max: 3});

    return range(length).map(() => faker.commerce.productMaterial());
  },
  modifier() {
    const TOTAL_ITEM = 4;

    return range(TOTAL_ITEM).map(() => ({
      product_modifier_master: faker.commerce.productMaterial(),
      product_modifier: [
        {
          id_modifier: faker.helpers.unique(faker.datatype.number),
          modifier_name: faker.commerce.productMaterial(),
          modifier_price: faker.datatype.number({min: 5000, max: 10000}),
        },
      ],
    }));
  },
  afterCreate(item: Instantiate<AppRegistry, 'cart'>, server: Server) {
    const product = sample((server.schema as AppSchema).all('product').models);
    const outletId =
      (server.schema as AppSchema).first('outlet')?.attrs.id_outlet || 1;
    item.update({
      ...item.attrs,
      id_product: product?.id_product,
      id_outlet: outletId,
      id_brand: product?.id_brand,
      product_name: product?.product_name,
      product_photo: product?.product_photo,
    });
  },
});

export default CartFactory;
