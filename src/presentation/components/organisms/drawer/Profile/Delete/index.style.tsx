import {StyleSheet} from 'react-native';
import {Spacing, Theme} from '@atoms';

/**
 * Start to styling your pages
 */
const DeleteStyle = StyleSheet.create({
  text: {
    marginTop: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    borderTopWidth: 3,
    borderColor: Theme.Neutral03,
    paddingTop: Spacing.High,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});

export default DeleteStyle;
