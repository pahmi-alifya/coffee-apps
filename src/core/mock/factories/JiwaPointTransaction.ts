import {faker} from '@faker-js/faker';
import {
  JiwaPointTransactionType,
  TransactionType,
} from '@models/JiwaPointTransactionModel';
import {Factory} from 'miragejs';

const JiwaPointTransactionFactory = Factory.extend<JiwaPointTransactionType>({
  id_point(i) {
    return i + 1;
  },
  id_user(i) {
    return i + 1;
  },
  id_transaction(i) {
    return i + 1;
  },
  transaction_type() {
    const data = [TransactionType.Add, TransactionType.Deduct];

    // random array index
    const index = faker.datatype.number({min: 0, max: data.length - 1});
    return data[index];
  },
  transaction_activity() {
    return `#J+${faker.datatype.number({min: 1000000})}`;
  },
  transaction_amount() {
    return faker.datatype.number({min: 20000});
  },
  createdAt() {
    return faker.date.past().toISOString();
  },
  updatedAt() {
    const data = [faker.date.past().toISOString(), null];

    // random array index
    const index = faker.datatype.number({min: 0, max: data.length - 1});
    return data[index];
  },
  expiry_date() {
    const data = [faker.date.soon(12, new Date()).toISOString(), null];

    // random array index
    const index = faker.datatype.number({min: 0, max: data.length - 1});
    return data[index];
  },
});

export default JiwaPointTransactionFactory;
