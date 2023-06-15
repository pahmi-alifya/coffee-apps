import {story} from '@url';
import {Server} from 'miragejs';
import {response} from '@utils';
import {AppSchema} from '../../server';

const registerStoryRoutes = (context: Server) => [
  context.get(story('banner'), (schema: AppSchema) =>
    response(200, 'Success get banner!', schema.all('banner').models),
  ),
  context.get(story('splash_screen'), (schema: AppSchema) =>
    response(
      200,
      'Success get splash screen!',
      schema.all('splashScreen').models,
    ),
  ),
];

export default registerStoryRoutes;
