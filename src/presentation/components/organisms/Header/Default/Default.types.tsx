import {ViewProps} from 'react-native';
import ButtonProps from '../../../molecules/Button/Button.types';

export interface DefaultProps extends ViewProps {
  variant?: 'default';
  useLogo?: boolean;
  point?: number;
  isAuth?: boolean;
  toggleProps: Partial<ButtonProps>;
}
