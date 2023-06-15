import Config from 'react-native-config';
import {MMKV} from 'react-native-mmkv';

/**
 * Storage for application system settings.
 */
export const globalStorage = new MMKV();

/**
 * Secure storage for auth session.
 */
export const sessionStorage = new MMKV({
  id: Config.SESSION_STORAGE_ID as string,
  encryptionKey: Config.SESSION_STORAGE_ENCRYPTION_KEY as string,
});

/**
 * Create storage for a specific User.
 * @param userId number
 * @param secure boolean, default = false
 * @returns MMKV Storage
 */
export const createUserStorage = (userId: number, secure = false) => {
  return new MMKV({
    id: `${Config.USER_STORAGE_ID}-${userId}`,
    encryptionKey: secure
      ? `${Config.USER_STORAGE_ENCRYPTION_KEY}.${userId}`
      : undefined,
  });
};
