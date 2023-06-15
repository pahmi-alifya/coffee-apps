import {faker} from '@faker-js/faker';
import {OutletType} from '@models';
import {range} from '@utils';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';
import {BRANDS} from './Brand';

const coordinates = faker.address.nearbyGPSCoordinate();

const OutletFactory: FactoryDefinition<OutletType> = Factory.extend({
  outlet_code() {
    return faker.datatype.string(5);
  },
  id_outlet(i) {
    return i + 1;
  },
  outlet_name() {
    return `Jilid ${faker.datatype.number(100)} - ${faker.company.name()}`;
  },
  outlet_email() {
    return faker.internet.email();
  },
  outlet_phone() {
    return faker.phone.number('08##########');
  },
  outlet_status() {
    return faker.helpers.arrayElement(['Active', 'Not Active']);
  },
  plastic_used_status() {
    return faker.datatype.boolean();
  },
  delivery_order_status() {
    return faker.datatype.boolean();
  },
  outlet_different_price() {
    return faker.datatype.boolean();
  },
  outlet_ownership_status() {
    return faker.helpers.arrayElement(['KBN']);
  },
  outlet_special_fee() {
    return faker.datatype.boolean();
  },
  outlet_address() {
    return faker.address.streetAddress(true);
  },
  city() {
    return faker.address.city();
  },
  geometry() {
    return {
      coordinates,
      type: faker.helpers.arrayElement(['Point']),
    };
  },
  timezone_utc() {
    return faker.datatype.number(1);
  },
  created_at() {
    return faker.date.past().toISOString();
  },
  updated_at() {
    return faker.date.past().toISOString();
  },
  is_must_spunbound() {
    return faker.datatype.boolean();
  },
  outlet_schedules() {
    return range(7).map((_, index) => ({
      outlet_schedule_id: faker.datatype.number(),
      id_outlet: this.id_outlet as number,
      day_of_week: index + 1,
      open_time: '08:00:00+00',
      close_time: '19:00:00+00',
      created_at: faker.date.past().toISOString(),
      deleted_at: null,
    }));
  },
  outlet_brands() {
    return faker.helpers.arrayElements(BRANDS);
  },
  outlet_long() {
    return Number(coordinates[1]);
  },
  outlet_lat() {
    return Number(coordinates[0]);
  },
  is_open() {
    return faker.datatype.boolean();
  },
  distance_in_km() {
    return faker.datatype.float({max: 30, precision: 0.01}); // 57.315
  },
});

export default OutletFactory;
