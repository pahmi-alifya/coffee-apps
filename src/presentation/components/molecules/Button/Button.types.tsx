import {TouchableOpacityProps} from 'react-native';
import {IconProps} from '../../atoms/Icon/Icon.types';
import ImageProps from '../../atoms/Image/Image.types';
import {TextProps, TextType} from '../../atoms/Text/Text.types';

export type ButtonSizeType = 'small' | 'medium' | 'big' | 'auto';

export type ButtonStatusType = 'active' | 'not';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'close';

export type ButtonTextType = Record<ButtonSizeType, TextType>;

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  text?: string;
  description?: string;
  size?: ButtonSizeType;
  isRounded?: boolean;
  isBlock?: boolean;
  iconRightProps?: IconProps;
  iconLeftProps?: IconProps;
  imageLeftProps?: ImageProps;
  imageRightProps?: ImageProps;
  textProps?: Partial<TextProps>;
  descriptionProps?: TextProps;
  color?: string;
}

export default ButtonProps;
