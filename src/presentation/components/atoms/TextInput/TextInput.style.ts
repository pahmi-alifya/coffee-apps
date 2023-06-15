import {Theme} from '@atoms/Color';
import {StyleSheet} from 'react-native';
import {Spacing} from '../Spacing';

export default StyleSheet.create({
  defaultStyle: {
    flex: 1,
    paddingHorizontal: Spacing.Tiny,
    textAlignVertical: 'center',
    paddingVertical: 0,
    color: Theme.Neutral10,
  },
});
