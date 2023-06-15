import {faker} from '@faker-js/faker';
import {GoogleMapsLatLongType} from '@models';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const GoogleMapsByLatLongFactory: FactoryDefinition<GoogleMapsLatLongType> =
  Factory.extend({
    plus_code() {
      return {
        compound_code: faker.address.streetAddress(),
        global_code: faker.address.city(),
      };
    },
  });

export default GoogleMapsByLatLongFactory;
