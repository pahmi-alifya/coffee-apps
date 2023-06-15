import {RectButtonProps} from '@atoms/Button/RectButton';

export type ToastContentProps = {
  type: 'success' | 'error';
  message: string;
};
export default interface ToastProps extends RectButtonProps {
  children: React.ReactNode;
}
