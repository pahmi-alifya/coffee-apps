import React, {useContext} from 'react';
import {ToastContentProps} from './ToastContainer.types';

interface ToastContextProps {
  show(
    type: ToastContentProps['type'],
    message: ToastContentProps['message'],
  ): void;
}

const ToastContext = React.createContext({} as ToastContextProps);

export const ToastProvider = ToastContext.Provider;
export const useToastContext = () => useContext(ToastContext);
