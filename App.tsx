import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import '@i18n';
import {ToastContainer} from '@molecules';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import {SWRConfig} from 'swr';
import RootNavigation from './src/navigation/RootNavigation';

// Enable Freeze (experimental).
enableFreeze(true);

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <BottomSheetModalProvider>
          <ToastContainer>
            <SWRConfig value={{provider: () => new Map()}}>
              <RootNavigation />
            </SWRConfig>
          </ToastContainer>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
