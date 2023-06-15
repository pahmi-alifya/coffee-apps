import {StyleSheet} from 'react-native';
import {Theme, Spacing} from '@atoms';

/**
 * Start to styling your pages
 */
const PinStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Neutral01,
  },
  wrapper: {
    marginHorizontal: Spacing.High,
    marginTop: Spacing.High,
  },
  icon: {
    backgroundColor: Theme.Neutral03,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default PinStyle;
