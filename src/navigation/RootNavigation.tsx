import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import {Login, Pin, Register, OrderDetail, VoucherList} from '@pages';

export type RootStackParamList = {
  DrawerNavigation: undefined;
  Login: undefined;
  OrderDetail: undefined;
  VoucherList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Group
          screenOptions={{
            animation: 'slide_from_bottom',
            gestureDirection: 'vertical',
            gestureEnabled: true,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} />
          <Stack.Screen name="VoucherList" component={VoucherList} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Pin" component={Pin} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
