import {Spacing} from '@atoms';
import {StyleSheet} from 'react-native';

const DefaultStyle = StyleSheet.create({
  toggle: {
    padding: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  flexFull: {
    flex: 1,
    height: 40,
  },
  center: {
    alignSelf: 'center',
  },
  btnVoucher: {
    borderRadius: 30,
    paddingHorizontal: Spacing.Small,
  },
  header: {
    width: '100%',
    flexWrap: 'wrap',
    paddingVertical: Spacing.Small,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.Standard,
  },
  voucherIcon: {
    width: 26,
    height: 26,
    marginRight: Spacing.SuperTiny,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: Spacing.Small,
  },
});

export default DefaultStyle;
