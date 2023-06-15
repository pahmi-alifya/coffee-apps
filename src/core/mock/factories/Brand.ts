import {faker} from '@faker-js/faker';
import {BrandType} from '@models';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

/**
 * This BRANDS is intentionally served as a constant because
 * we will need their ids to be used in our filter, so it has to be the same.
 */
export const BRANDS = [
  {
    brand_id: 1,
    brand_name: 'Jiwa Toast',
    brand_code: '001',
    brand_logo:
      'https://storage.googleapis.com/jiwaplus-assets/LOGO/jiwa-toast-black-1-_1_.webp',
  },
  {
    brand_id: 2,
    brand_name: 'Janji Jiwa',
    brand_code: '002',
    brand_logo:
      'https://storage.googleapis.com/jiwaplus-assets/LOGO/LOGO_JANJI-JIWA_Logo-JJ-black.webp',
  },
  {
    brand_id: 3,
    brand_name: 'Jiwa Tea',
    brand_code: '003',
    brand_logo:
      'https://storage.googleapis.com/jiwaplus-assets/LOGO/jiwateanew.webp',
  },
  {
    brand_id: 4,
    brand_name: 'Jiwa Chips',
    brand_code: '004',
    brand_logo:
      'https://storage.googleapis.com/jiwaplus-assets/LOGO/JOOMBA-BLACK.webp',
  },
];

// Map for faster lookup.
const brandMap = new Map(BRANDS.map((brand) => [brand.brand_id, brand]));

const BrandFactory: FactoryDefinition<BrandType> = Factory.extend({
  brand_id(i) {
    return BRANDS[i % BRANDS.length].brand_id;
  },
  brand_name() {
    return brandMap.get(this.brand_id as number)?.brand_name as string;
  },
  brand_code() {
    return brandMap.get(this.brand_id as number)?.brand_code as string;
  },
  brand_order() {
    return this.brand_id as number;
  },
  brand_active() {
    return faker.datatype.boolean();
  },
  brand_visibility() {
    return faker.datatype.boolean();
  },
  brand_logo() {
    return brandMap.get(this.brand_id as number)?.brand_logo as string;
  },
  brand_image() {
    return faker.image.food();
  },
  created_at() {
    return faker.date.past().toISOString();
  },
  updated_at() {
    return faker.date.past().toISOString();
  },
});

export default BrandFactory;
