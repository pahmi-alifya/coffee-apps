import {RectButtonProps} from '@atoms/Button/RectButton';
import RadioProps from '@atoms/Radio/Radio.types';
import {TextProps} from '@atoms/Text/Text.types';
interface RadioControlLabelProps extends RadioProps {
  text: string;
  value: unknown;
  textProps?: TextProps;
  onChange(val: unknown): void;
  rectButtonProps?: RectButtonProps;
}

export default RadioControlLabelProps;
