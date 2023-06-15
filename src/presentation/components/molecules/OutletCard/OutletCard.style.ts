import {Theme} from '@atoms';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  labelOpen: {
    backgroundColor: Theme.Green01,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  labelDistance: {
    backgroundColor: Theme.Neutral02,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  brand: {
    width: 40,
    aspectRatio: 40 / 16,
  },
  borderDefault: {
    borderWidth: 1,
    borderColor: Theme.Neutral04,
  },
  borderSelected: {
    borderWidth: 2,
    borderColor: Theme.Red206,
  },
});
