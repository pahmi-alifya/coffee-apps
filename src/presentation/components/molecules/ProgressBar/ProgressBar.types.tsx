import {ContainerConfigProps} from '@atoms/Container/Container.types';

interface ProgressBarProps extends ContainerConfigProps {
  color?: string;
  containerColor?: string;
  value?: number;
  maxValue: number;
  height?: number;
  progress?: number;
  isRounded?: boolean;
}

export default ProgressBarProps;
