import {Theme} from '@atoms/Color';
import React, {forwardRef} from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import {IconProps} from './Icon.types';
import jiwaIcon from './jiwaIcon.json';

const JiwaIconComponent = createIconSetFromIcoMoon(
  jiwaIcon,
  'icomoon',
  'icomoon.ttf',
);

const Icon = forwardRef((props: IconProps) => {
  return <JiwaIconComponent color={Theme.Neutral10} size={16} {...props} />;
});

export default Icon;
