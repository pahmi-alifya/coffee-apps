import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {RouteHandler} from 'miragejs/server';

const getGeocodeByLatLong: RouteHandler<AppRegistry> = (schema, request) => {
  const {key, latlng} = request.queryParams || {};
  if (!key && !latlng) {
    return response(422, 'Parameter Failed!', {});
  }

  const data = schema.first('googleMap')?.attrs;

  if (!data) {
    return response(404, 'Jiwa Point not found!', {});
  }

  return data;
};

export default getGeocodeByLatLong;
