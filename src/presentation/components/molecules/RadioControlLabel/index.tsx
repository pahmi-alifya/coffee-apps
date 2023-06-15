import {Radio, RectButton, Row, Text, Theme} from '@atoms';
import React from 'react';
import RadioControlLabelProps from './RadioControlLabel.types';

const RadioControlLabel: React.FC<RadioControlLabelProps> = (props) => {
  const {
    text,
    value,
    onChange,
    isSelected,
    rectButtonProps,
    textProps,
    ...restProps
  } = props;

  return (
    <RectButton {...rectButtonProps} onPress={() => onChange(value)}>
      <Row contentStyle="fitContent" alignment="center">
        <Radio isSelected={isSelected} {...restProps} />
        <Text
          type="l1"
          text={text}
          weight="light"
          color={Theme.Neutral10}
          {...textProps}
        />
      </Row>
    </RectButton>
  );
};

export default RadioControlLabel;
