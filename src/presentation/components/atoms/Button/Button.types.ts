import {
  ContainerArrangementType,
  ContainerPaddingType,
} from '@atoms/Container/Container.types';
import {FlexStyle, PressableProps} from 'react-native';

export interface ButtonConfigProps extends PressableProps {
  underlayColor?: string;
  borderRadius?: number;
  backgroundColor?: string;
  alignSelf?: FlexStyle['alignSelf'];
  padding?: ContainerPaddingType;
  borderWidth?: number;
  borderColor?: string;
  arrangement?: ContainerArrangementType;
  foregroundRipple?: boolean;
}
