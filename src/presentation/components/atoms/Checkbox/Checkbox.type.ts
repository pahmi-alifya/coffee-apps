import {RectButtonProps} from '@atoms/Button/RectButton';

interface CheckboxProps extends RectButtonProps {
  defaultValue: boolean;
  onChange: (newValue: boolean) => void;
  size?: number;
}

export default CheckboxProps;
