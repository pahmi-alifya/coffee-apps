import {faker} from '@faker-js/faker';
import {TransactionEstimationType} from '@models';
import {SummaryType} from '@models/TransactionEstimationModel';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const TransactionEstimationFactory: FactoryDefinition<TransactionEstimationType> =
  Factory.extend({
    subtotal() {
      return faker.datatype.number();
    },
    grand_total() {
      return faker.datatype.number();
    },
    summary() {
      return [
        {
          label: 'Subtotal',
          price: faker.datatype.number(),
          type: SummaryType.Text,
        },
        {
          label: 'Delivery Fee',
          price: faker.datatype.number(),
          type: SummaryType.Text,
        },
        {
          label: 'Platform Fee',
          price: faker.datatype.number(),
          type: SummaryType.Text,
        },
        {
          label: 'Promo PAYDAY',
          price: -1 * faker.datatype.number(),
          type: SummaryType.Promo,
        },
        {
          label: 'Plus Point Terpakai',
          price: -1 * faker.datatype.number(),
          type: SummaryType.Point,
        },
      ];
    },
    total_promo_price() {
      return faker.datatype.number();
    },
    is_promo_applied() {
      return false;
    },
    payment_method() {
      return {
        jiwa_point: false,
      };
    },
    promotions() {
      return {
        product_discount: faker.datatype.number(),
        invoice_discount: faker.datatype.number(),
        delivery_discount: faker.datatype.number(),
        message: faker.datatype.string(),
        total: faker.datatype.number(),
      };
    },
  });

export default TransactionEstimationFactory;
