import {Theme} from '@atoms/Color';
import Icon from '@atoms/Icon';
import React, {forwardRef, useState} from 'react';
import CheckboxProps from './Checkbox.type';
import {RectButton} from '@atoms/Button';

const Checkbox = forwardRef((props: CheckboxProps, ref) => {
  const {defaultValue, size, onChange, ...rest} = props;
  const [value, setValue] = useState(defaultValue);
  const handleCheckboxPress = () => {
    setValue((prev) => {
      onChange(!value);
      return !prev;
    });
  };

  return (
    <RectButton
      width={size}
      height={size}
      borderWidth={1}
      backgroundColor={value ? Theme.Red206 : Theme.Neutral01}
      borderColor={value ? Theme.Red206 : Theme.Neutral04}
      borderRadius={4}
      onPress={handleCheckboxPress}
      {...rest}>
      <Icon
        name="Checklist"
        size={16}
        color={value ? Theme.Neutral01 : Theme.Transparent}
      />
    </RectButton>
  );
});

export default Checkbox;
