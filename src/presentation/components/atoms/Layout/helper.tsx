import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {LayoutType} from './Layout.types';

export const Components: Record<LayoutType, any> = {
  imagebackground: ImageBackground,
  safeareaview: SafeAreaView,
  view: View,
  scrollview: ScrollView,
};
