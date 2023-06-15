import React, {FC, memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {PrimaryProps} from './Primary.types';
import {ButtonStatusType} from '../Button.types';
import Color from '../../../atoms/Color';

const Primary: FC<PrimaryProps> = (props: PrimaryProps): JSX.Element => {
  const {style, color, disabled, children, ...rest} = props;
  const backgroundColor = disabled ? Color('neutral', '03') : color;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          backgroundColor: backgroundColor,
        },
        style,
      ]}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default memo(Primary);
