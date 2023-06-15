import {ButtonConfigProps} from '@atoms/Button/Button.types';
import {ProductType} from '@models';
import {PressableProps, ViewStyle} from 'react-native';

export type ProductCardSizeType = 'small' | 'big';

type ButtonProps = ButtonConfigProps & PressableProps;

interface ProductCardProps extends ButtonProps {
  product?: ProductType;
  hasValue?: boolean;
  notAvailable?: boolean;
  style?: ViewStyle;
  size?: ProductCardSizeType;
}

export default ProductCardProps;
