import {Column} from '@atoms/Container';
import {ContainerConfigProps} from '@atoms/Container/Container.types';
import React from 'react';
import {ViewProps} from 'react-native';
import {Theme} from '../Color';

const Separator: React.FC<ViewProps & ContainerConfigProps> = (props) => {
  const {height = 0.5, backgroundColor = Theme.Neutral04, ...rest} = props;

  return <Column height={height} backgroundColor={backgroundColor} {...rest} />;
};

export default Separator;
