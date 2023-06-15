import {Spacing} from '@atoms';
import {StyleSheet} from 'react-native';

const EmptyPlaceholderStyle = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    marginBottom: Spacing.High,
  },
  selfCenter: {
    alignSelf: 'center',
  },
});

export default EmptyPlaceholderStyle;
