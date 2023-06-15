import {faker} from '@faker-js/faker';
import {SplashScreenType} from '@models';
import {Factory} from 'miragejs';

const SplashScreenFactory = Factory.extend<SplashScreenType>({
  id_jiwa_splash_screen(i) {
    return i + 1;
  },
  media_url() {
    const videos = [
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    ];
    return faker.helpers.arrayElement(videos);
  },
  media_type() {
    return 'image/png';
  },
  status() {
    return faker.datatype.boolean();
  },
  created_at() {
    return faker.date.past().toISOString();
  },
  updated_at() {
    return faker.date.past().toISOString();
  },
  deleted_at() {
    return null;
  },
});

export default SplashScreenFactory;
