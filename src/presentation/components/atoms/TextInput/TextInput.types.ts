import React from 'react';
import {TextInputProps as RNTextInputProps} from 'react-native';
import {RectButtonProps} from '../Button/RectButton';
import {ContainerConfigProps} from '../Container/Container.types';

export interface TextInputProps extends RNTextInputProps {
  type?: 'bottomSheet' | 'animated' | 'default';
  containerProps?: ContainerConfigProps | RectButtonProps;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  allowClear?: boolean;
  onPress?(): void;
}
