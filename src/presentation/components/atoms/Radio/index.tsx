import {Theme} from '../Color';
import React from 'react';
import {View, ViewStyle} from 'react-native';

import RadioStyle from './Radio.styles';
import RadioProps from './Radio.types';

const Radio: React.FC<RadioProps> = (props) => {
  const {isSelected, isError, color = Theme.Red206} = props;

  const circleBorderStyle: ViewStyle = {
    ...RadioStyle.circleBorder,
    borderColor: isError ? Theme.Red206 : isSelected ? color : Theme.Neutral04,
  };

  const circleStyle: ViewStyle = {
    ...RadioStyle.circle,
    backgroundColor: color,
  };

  return (
    <View style={circleBorderStyle}>
      {isSelected && <View style={circleStyle} />}
    </View>
  );
};

export default Radio;
