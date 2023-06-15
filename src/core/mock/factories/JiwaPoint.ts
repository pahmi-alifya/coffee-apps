import {faker} from '@faker-js/faker';
import {JiwaPointType} from '@models';
import {Factory} from 'miragejs';

const JiwaPointFactory = Factory.extend<JiwaPointType>({
  id_point_summary(i) {
    return i + 1;
  },
  id_user(i) {
    return i + 1;
  },
  amount() {
    return faker.datatype.number();
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
});

export default JiwaPointFactory;
