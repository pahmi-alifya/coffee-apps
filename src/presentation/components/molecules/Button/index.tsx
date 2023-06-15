/**
 *  Components Button molecules
 *  This code will do Create components button for ui
 */

// ! Import react module and library first on top of tsx file.
import React, {FC} from 'react';

// Import custom module of components
import {Layout, Text, Icon, Image} from '@atoms';

// Import styling and types of module you created
import ButtonProps, {
  ButtonSizeType,
  ButtonStatusType,
  ButtonVariant,
} from './Button.types';
import ButtonStyle, {
  ButtonSize,
  ButtonTextColor,
  ButtonTextStyle,
} from './Button.style';
import {primaryColor} from '../../atoms/Color';
import {TextProps} from '../../atoms/Text/Text.types';
import {Components} from './helper';

/**
 * Init Button molecules
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
const Button: FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
  const {
    variant = 'primary',
    size = 'medium',
    text,
    description,
    disabled,
    style,
    isBlock,
    isRounded,
    iconRightProps,
    iconLeftProps,
    imageLeftProps,
    imageRightProps,
    textProps,
    descriptionProps,
    children,
    color = primaryColor,
    ...rest
  } = props;

  const Component = Components[variant as ButtonVariant];

  const textP: TextProps = {
    type: ButtonTextStyle[size as ButtonSizeType],
    text: text || '',
    weight: 'regular',
    ...textProps,
  };

  const descProps: TextProps = {
    type: ButtonTextStyle[size as ButtonSizeType],
    text: description || '',
    weight: 'regular',
    ...descriptionProps,
  };
  const haveLayoutText = !!(
    text ||
    description ||
    descriptionProps ||
    textProps
  );
  const haveIconOrImage = !!(
    (iconRightProps && iconLeftProps) ||
    (imageLeftProps && imageRightProps)
  );
  const haveDescription = !!(description || descriptionProps);
  const haveText = !!(text || textProps);
  const statusType: ButtonStatusType = disabled ? 'not' : 'active';

  return (
    <Component
      style={[
        ButtonStyle.button,
        isRounded && ButtonStyle.rounded,
        ButtonSize[size as ButtonSizeType],
        style,
      ]}
      variant={variant}
      disabled={disabled}
      color={color}
      {...rest}>
      {imageLeftProps && <Image {...imageLeftProps} />}
      {iconLeftProps && (
        <Icon color={ButtonTextColor[statusType]} {...iconLeftProps} />
      )}
      {haveLayoutText && (
        <Layout
          style={[
            {
              justifyContent: 'center',
              alignItems: haveIconOrImage ? 'flex-start' : 'center',
            },
            isBlock && ButtonStyle.w100,
          ]}>
          {haveDescription && <Text {...descProps} />}
          {haveText && <Text {...textP} />}
        </Layout>
      )}
      {imageRightProps && <Image {...imageRightProps} />}
      {iconRightProps && (
        <Icon color={ButtonTextColor[statusType]} {...iconRightProps} />
      )}
    </Component>
  );
};

// Export Button component as default
export default Button;
