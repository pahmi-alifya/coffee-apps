import {Spacing, Theme} from '@atoms';
import {StyleSheet} from 'react-native';

const tabBarStyles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    backgroundColor: Theme.Red206,
    borderRadius: Spacing.Extra,
  },
});

export default tabBarStyles;
