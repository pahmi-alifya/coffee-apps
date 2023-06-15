import {MyReferral, Referral} from '@pages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

export type StackParamList = {
  Referral: undefined;
  MyReferral: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const ReferralStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Referral" component={Referral} />
      <Stack.Screen name="MyReferral" component={MyReferral} />
    </Stack.Navigator>
  );
};

export default ReferralStack;
