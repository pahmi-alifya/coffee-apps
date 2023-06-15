import React, {FC, memo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import TertiaryProps from './Tertiary.types';

const Tertiary: FC<TertiaryProps> = (props: TertiaryProps): JSX.Element => {
  const {children, ...rest} = props;
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
};

export default memo(Tertiary);
