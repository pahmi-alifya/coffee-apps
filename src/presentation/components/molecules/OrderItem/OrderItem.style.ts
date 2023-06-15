import {Spacing} from '@atoms';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productImage: {
    width: 64,
    height: 64,
  },
  editProductSeparator: {
    flexGrow: 1,
  },
  deleteLogo: {
    marginRight: Spacing.High,
  },
  minusLogo: {
    marginRight: Spacing.SuperTiny,
  },
  quantityText: {
    width: 36,
  },
  plusLogo: {
    marginLeft: Spacing.SuperTiny,
  },
});

export default styles;
