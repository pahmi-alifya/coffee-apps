import {Platform, StyleSheet} from 'react-native';
import {Theme, Spacing} from '@atoms';

/**
 * Start to styling your pages
 */
const RegisterStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Neutral01,
    paddingTop: 20,
  },
  keyboardWareScrollViewWrapper: {
    marginHorizontal: 20,
  },
  textInputWrapperStyle: {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Theme.Neutral04,
    borderRadius: 8,
    paddingHorizontal: Spacing.Standard,
    flexDirection: 'row',
    paddingVertical: Spacing.Tiny,
    marginTop: Spacing.High,
  },
  textInputStyle: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
    paddingLeft: 5,
    fontSize: 12,
    color: Theme.Neutral08,
  },
  textInputSelectStyle: {
    flex: 1,
    paddingVertical: 7,
    paddingLeft: 5,
    fontSize: 12,
    color: Theme.Neutral08,
  },
  radioButtonStyles: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  button: {
    height: 52,
    position: 'absolute',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 10,
  },
});

export default RegisterStyle;
