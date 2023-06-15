import {Color, Spacing} from '@atoms';
import {StyleSheet, ViewStyle} from 'react-native';
import {TextType} from '../../atoms/Text/Text.types';
import {ButtonSizeType, ButtonStatusType} from './Button.types';

export const ButtonSize = StyleSheet.create<Record<ButtonSizeType, ViewStyle>>({
  big: {
    height: 52,
    width: 50,
    paddingHorizontal: Spacing.Small,
  },
  medium: {
    height: 40,
    paddingHorizontal: Spacing.Tiny,
  },
  small: {
    height: 28,
    paddingHorizontal: Spacing.Tiny,
  },
  auto: {
    height: 'auto',
  },
});

export const ButtonTextColor: Record<ButtonStatusType, string> = {
  active: Color('neutral', '01'),
  not: Color('neutral', '05'),
};

export const ButtonTextStyle: Record<ButtonSizeType, TextType> = {
  small: 'l2',
  medium: 'b2',
  big: 'b1',
  auto: 'b1',
};

/**
 * Start to styling your Button component
 */
const ButtonStyle = StyleSheet.create({
  button: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: Spacing.Tiny,
  },
  rounded: {
    borderRadius: 100,
  },
  w100: {
    flex: 1,
  },
});

export default ButtonStyle;
