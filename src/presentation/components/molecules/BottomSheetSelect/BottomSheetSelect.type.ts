import {RectButtonProps} from '@atoms/Button/RectButton';
import React from 'react';

interface BottomSheetSelectProps {
  value: string;
  onConfirm: (newValue: string) => void;
  title?: string;
  confirmButtonText?: string;
  triggerElement?: React.ReactNode;
  selections?: Array<{
    key: string;
    content: React.ReactNode;
  }>;
  rectButtonProps?: RectButtonProps;
}

export default BottomSheetSelectProps;
