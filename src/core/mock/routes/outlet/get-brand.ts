import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {RouteHandler} from 'miragejs/server';

const getBrand: RouteHandler<AppRegistry> = (schema) => {
  return response(200, 'Successfuly get brands!', schema.all('brand').models);
};

export default getBrand;
