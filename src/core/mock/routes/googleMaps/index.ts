import {googleMaps} from '@url';
import {Server} from 'miragejs';
import getGeocodeByLatLong from './get-geocode-latlong';

const registerGoogleMaps = (context: Server) => {
  return [context.get(googleMaps('geocode/json'), getGeocodeByLatLong)];
};

export default registerGoogleMaps;
