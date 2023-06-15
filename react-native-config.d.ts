declare module 'react-native-config' {
  interface Env {
    APP_ID: string;
    APP_NAME: string;
    VERSION_NAME: string;
    VERSION_CODE: string;
    MOCK_API: string;
    PRODUCT_URL: string;
    USER_URL: string;
    TRANSACTION_URL: string;
    OUTLET_URL: string;
    DELIVERY_URL: string;
    STORY_URL: string;
    PROMOTION_URL: string;
    MEMBERSHIP_URL: string;
    PAYMENT_URL: string;
    NOTIFICATION_URL: string;
    DELIVERY_URL: string;
    GOOGLEMAPS_URL: string;
    GOOGLEMAPS_KEY: string;
    SESSION_STORAGE_ID: string;
    AUTH_TOKEN_KEY: string;
    SESSION_STORAGE_ENCRYPTION_KEY: string;
    USER_STORAGE_ID: string;
    USER_STORAGE_ENCRYPTION_KEY: string;
    VIDEO_STORAGE: string;
  }

  const Config: Env;

  export default Config;
}
