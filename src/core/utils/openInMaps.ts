import {Linking, Platform} from 'react-native';

/**
 * @param lat: latitude
 * @param lng: longitude
 * @param label?: To label the Pin on Google Maps Apps, can be any string you want.
 * @return void Linking to Google Maps Apps
 */
export default (lat: number | string, lng: number | string, label?: string) => {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${lat},${lng}`;

  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.openURL(url as string);
};
