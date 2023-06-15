import {Theme} from '@atoms';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  voucherLogoContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Theme.Red101,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoText: {
    flexGrow: 1,
  },
});

export default styles;
