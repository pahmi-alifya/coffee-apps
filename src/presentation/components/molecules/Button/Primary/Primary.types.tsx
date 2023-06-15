import {TouchableOpacityProps, ViewStyle} from 'react-native';
import ButtonProps, {ButtonStatusType} from '../Button.types';

export interface PrimaryProps extends Partial<ButtonProps> {
  color?: string;
}
export type PrimaryStyleType = Record<ButtonStatusType, ViewStyle>;
