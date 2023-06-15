import {faker} from '@faker-js/faker';
import {DeliveryEstimationType} from '@models/DeliveryEstimationModel';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const DeliveryEstimationFactory: FactoryDefinition<DeliveryEstimationType> =
  Factory.extend<DeliveryEstimationType>({
    image() {
      return faker.image.abstract(640, 640, true);
    },
    price() {
      return faker.datatype.number({min: 10, max: 9999}) * 100;
    },
    name() {
      return faker.company.name();
    },
  });

export default DeliveryEstimationFactory;
