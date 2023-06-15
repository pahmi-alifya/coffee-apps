import {StyleSheet} from 'react-native';
import {Theme, Spacing} from '@atoms';

/**
 * Start to styling your pages
 */
const PinViewStyle = StyleSheet.create({
  underlineElement: {
    width: 60,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 2,
    marginHorizontal: 10,
    marginTop: 50,
    borderColor: Theme.Neutral05,
  },
  activeUnderlineElement: {
    borderColor: Theme.Green04,
  },
  pinElement: {
    borderRadius: 20,
    margin: 12,
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Theme.Neutral05,
    marginTop: 50,
  },
  activePinElement: {
    backgroundColor: Theme.Red206,
    borderColor: Theme.Red206,
  },
  invisible: {
    width: 0,
    height: 0,
  },
});

export default PinViewStyle;
