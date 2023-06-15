import {Spacing, Theme} from '@atoms';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    backgroundColor: Theme.Neutral04,
    borderRadius: 3,
    marginRight: Spacing.Tiny,
  },
  banner: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.Neutral04,
  },
});
