import {primaryColor, Theme} from '@atoms/Color';
import {Dimensions, StyleSheet} from 'react-native';

/**
 * Start to styling your pages
 */
const HomeStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.Neutral01,
  },
  bannerContainer: {
    width: Dimensions.get('screen').width,
    height: 130,
    backgroundColor: primaryColor,
  },
  wrapperBanner: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  userInformation: {
    position: 'absolute',
    top: -45,
    alignSelf: 'center',
  },
});

export default HomeStyle;
