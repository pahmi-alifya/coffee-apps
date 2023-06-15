import {GoogleMapsLatLongType} from '@models';
import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';
import {laggy, useQuery} from '@swr';
import {googleMaps} from '@url';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';

export const geolocationKeys = {
  all: /\/geocode\/json/,
  current: (latlng: string) =>
    googleMaps('geocode/json', {
      latlng,
      key: Config.GOOGLEMAPS_KEY,
    }),
};

export const useGeocodeMap = (latlng: string, enabled = true) =>
  useQuery<GoogleMapsLatLongType>(geolocationKeys.current(latlng), {
    use: [laggy],
    immutable: true,
    enabled,
  });

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<GeolocationResponse>({
    coords: {
      // Default to Jakarta (Monas)
      latitude: -6.184521018424888,
      longitude: 106.83587758340899,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: 0,
  });

  const [error, setError] = useState<GeolocationError>({
    code: 0,
    message: '',
    PERMISSION_DENIED: 0,
    POSITION_UNAVAILABLE: 0,
    TIMEOUT: 0,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info: GeolocationResponse) => {
        setGeolocation(info);
      },
      (err: GeolocationError) => setError(err),
    );
  }, []);

  return {
    geolocation,
    latlng: `${geolocation.coords.latitude}, ${geolocation.coords.longitude}`,
    error,
  };
};
