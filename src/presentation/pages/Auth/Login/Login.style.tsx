import {Platform, StyleSheet} from 'react-native';
import {Color, Spacing, Theme} from '@atoms';

/**
 * Start to styling your pages
 */
const LoginStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Theme.Neutral01,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.High,
    marginTop: 170,
  },
  paragraphWrapper: {
    marginTop: Spacing.Tiny,
    marginBottom: Spacing.High,
  },
  termAndPolicyWrapper: {
    marginBottom: Spacing.High,
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  iconClose: {
    backgroundColor: Theme.Neutral03,
    height: 25,
    width: 25,
    borderRadius: 100,
    justifyContent: 'center',
    marginRight: 10,
  },
  phoneInputWrapperStyle: {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Theme.Neutral04,
    borderRadius: 8,
    paddingHorizontal: Spacing.Standard,
    flexDirection: 'row',
    paddingVertical: Spacing.Tiny,
    marginBottom: Spacing.High,
  },
  phoneInputStyle: {
    flex: 1,
    borderLeftWidth: 1,
    paddingLeft: 5,
    color: Theme.Black,
    paddingVertical: 0,
  },
  bannerStyle: {
    width: '100%',
    height: 200,
    position: 'absolute',
  },
  phoneSelectedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LoginStyle;
