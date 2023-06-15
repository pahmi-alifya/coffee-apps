import {Spacing} from '@atoms';
import {Platform, StyleSheet} from 'react-native';
import {Theme} from '@atoms';

/**
 * Start to styling your pages
 */
const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Neutral01,
    paddingHorizontal: Spacing.High,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  text: {
    marginTop: 20,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.Large,
  },
  iconClose: {
    backgroundColor: Theme.Neutral03,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: 'center',
    marginRight: 10,
  },
  avatar: {
    backgroundColor: Theme.Neutral03,
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    marginBottom: Spacing.Medium,
    alignSelf: 'center',
  },
  field: {
    marginBottom: Spacing.Medium,
  },
  pinElement: {
    borderRadius: 100,
    marginTop: Spacing.Tiny,
    marginRight: Spacing.Tiny,
    width: 10,
    height: 10,
    backgroundColor: Theme.Neutral05,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  buttonBottomSheetContainer: {
    borderTopWidth: 3,
    borderColor: Theme.Neutral03,
    paddingTop: Spacing.High,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});

export default ProfileStyle;
