import React, {FC} from 'react';
import ButtonProps, {ButtonVariant} from './Button.types';
import Primary from './Primary';
import Tertiary from './Tertiary';

export const Components: Record<ButtonVariant, FC<Partial<ButtonProps>>> = {
  primary: Primary,
  secondary: Primary,
  tertiary: Tertiary,
  close: Primary,
};
