import Config from 'react-native-config';
import {useMMKV, useMMKVString} from 'react-native-mmkv';

export function useSessionStorage() {
  const sessionStorage = useMMKV({id: Config.SESSION_STORAGE_ID as string});
  return useMMKVString(Config.AUTH_TOKEN_KEY as string, sessionStorage);
}
