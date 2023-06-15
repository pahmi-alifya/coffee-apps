import {TouchableOpacityProps, ViewProps} from 'react-native';
import {SearchProps} from '../../../molecules/Search/Search.types';

export interface ModalProps extends ViewProps {
  variant?: 'modal';
  useStrip?: boolean;
  title?: string;
  closeBtnProps?: TouchableOpacityProps;
  searchProps?: SearchProps;
}
