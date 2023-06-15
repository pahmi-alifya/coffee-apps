import {Spacing, Theme} from '@atoms';
import {Dimensions, StyleSheet} from 'react-native';

/**
 * Start to styling your UserInformation component
 */
const UserInformationStyle = StyleSheet.create({
  container: {
    padding: Spacing.Small,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    borderRadius: 16,
    width: Dimensions.get('screen').width - Spacing.Standard * 2,
    backgroundColor: Theme.Neutral01,
  },
  marginRightSuperTiny: {
    marginRight: Spacing.SuperTiny,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingHorizontalStandard: {
    paddingHorizontal: Spacing.Standard,
  },
  expand: {
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: Spacing.Tiny,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  marginBottom: {
    marginBottom: Spacing.Small,
  },
  divider: {
    height: 40,
    borderRadius: 1,
    marginHorizontal: Spacing.Small,
    width: 0.4,
    backgroundColor: Theme.Neutral04,
  },
});

export default UserInformationStyle;
