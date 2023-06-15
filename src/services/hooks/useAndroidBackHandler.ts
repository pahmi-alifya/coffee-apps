import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useAndroidBackHandler(handler: () => boolean) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handler,
    );

    return () => backHandler.remove();
  }, [handler]);
}
