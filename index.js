import {Server as mockServer} from '@mock';
import {AppRegistry} from 'react-native';
import Config from 'react-native-config';
import App from './App';
import {name as appName} from './app.json';

if (Config.MOCK_API === 'true') {
  try {
    if (window.server) {
      window.server.shutdown();
    }

    window.server = mockServer();
  } catch (e) {
    __DEV__ && console.error('Mock server error: ', e);
  }
}

AppRegistry.registerComponent(appName, () => App);
