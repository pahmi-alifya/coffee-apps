import {useToastContext} from '@molecules';
import {ToastContentProps} from '@molecules/ToastContainer/ToastContainer.types';
import {useCallback} from 'react';

export const useToast = () => {
  const {show} = useToastContext();

  const showToast = useCallback(
    (
      type: ToastContentProps['type'],
      message: ToastContentProps['message'],
    ) => {
      show(type, message);
    },
    [show],
  );

  return {showToast};
};
