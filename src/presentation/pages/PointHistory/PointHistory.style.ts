import {Spacing, Theme} from '@atoms';
import {StyleSheet} from 'react-native';

const pointHistoryStyles = StyleSheet.create({
  body: {
    borderTopLeftRadius: Spacing.High,
    borderTopRightRadius: Spacing.High,
    shadowOpacity: 0,
    elevation: 0,
  },
  tabBarContainer: {
    borderBottomWidth: Spacing.SuperTiny,
    borderColor: Theme.Neutral02,
  },
});

export default pointHistoryStyles;
