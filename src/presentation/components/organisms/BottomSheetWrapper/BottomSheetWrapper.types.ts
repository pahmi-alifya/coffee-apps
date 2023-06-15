import {StyleProp, ViewProps, ViewStyle} from 'react-native';

export interface BottomSheetWrapperProps extends ViewProps {
  onClose(): void;
  backdropStyle?: StyleProp<ViewStyle>;
  title?: string;
  showCloseButton?: boolean;
  headerComponent?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  onDismiss?(): void;
}
