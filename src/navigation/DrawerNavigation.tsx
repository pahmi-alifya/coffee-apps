import CustomDrawerContent from '@organisms/CustomDrawerContent';
import {Home, PointHistory, Notification, Profile} from '@pages';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgProps} from 'react-native-svg';
import ReferralStack from './StackNavigation';

const DRAWER_WIDTH_RATIO = 0.8;

export type DrawerStackParamList = {
  Home: undefined;
  ReferralStack: undefined;
  PointHistory: undefined;
  Notification: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export type DrawerMenuType = {
  text: string;
  subText?: string;
  position: number;
  MenuIcon: React.FC<SvgProps>;
  onPress(): void;
};

const DrawerNavigation = () => {
  const {width: screenWidth} = useWindowDimensions();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {width: screenWidth * DRAWER_WIDTH_RATIO},
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ReferralStack" component={ReferralStack} />
      {/* TODO: Need to change this to navigation stack, since PointHistory is accessed from Loyalty Membership */}
      <Drawer.Screen name="PointHistory" component={PointHistory} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
