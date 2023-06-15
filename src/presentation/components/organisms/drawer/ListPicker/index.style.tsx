import {StyleSheet} from 'react-native';
import {Theme} from '@atoms';

/**
 * Start to styling your pages
 */
const ListPickerStyle = StyleSheet.create({
  iconClose: {
    backgroundColor: Theme.Neutral03,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: 'center',
  },
  line: {
    marginVertical: 15,
    height: 5,
    width: '100%',
    backgroundColor: Theme.Neutral03,
  },
  circleBorder: {
    height: 20,
    width: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Theme.Neutral05,
    borderWidth: 1,
  },
  circleBorderSelected: {
    height: 20,
    width: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Theme.Red205,
    borderWidth: 1,
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: Theme.Red110,
    borderColor: Theme.Red205,
  },
  itemWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListPickerStyle;
