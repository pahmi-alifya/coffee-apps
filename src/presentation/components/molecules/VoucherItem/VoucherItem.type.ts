import {ViewStyle} from 'react-native';

interface VoucherItemProps {
  title: string;
  subtitle: string;
  activePeriod: string;
  onPress: () => void;
  isActive?: boolean;
  containerStyle?: ViewStyle;
}

export default VoucherItemProps;
