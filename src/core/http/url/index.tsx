import qs from 'query-string';
import Config from 'react-native-config';
import {RecordQuery} from './url.types';

const baseUrl = (
  host: string | undefined,
  path: string,
  query?: RecordQuery,
): string => qs.stringifyUrl({url: new URL(path, host).toString(), query});

export const product = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.PRODUCT_URL, path, query);

export const user = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.USER_URL, path, query);

export const promotions = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.PROMOTION_URL, path, query);

export const transaction = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.TRANSACTION_URL, path, query);

export const outlet = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.OUTLET_URL, path, query);

export const delivery = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.DELIVERY_URL, path, query);

export const story = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.STORY_URL, path, query);

export const memberships = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.MEMBERSHIP_URL, path, query);

export const payment = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.PAYMENT_URL, path, query);

export const notification = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.NOTIFICATION_URL, path, query);

export const googleMaps = (path: string, query?: RecordQuery): string =>
  baseUrl(Config.GOOGLEMAPS_URL, path, query);
