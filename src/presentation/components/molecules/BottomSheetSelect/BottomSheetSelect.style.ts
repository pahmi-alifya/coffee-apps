import {Theme} from '@atoms';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  radioButtonContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveRadioButton: {
    borderColor: Theme.Neutral04,
  },
  activeRadioButton: {
    borderColor: Theme.Red206,
  },
  radioButtonActiveContent: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Theme.Red206,
  },
});

export default styles;
