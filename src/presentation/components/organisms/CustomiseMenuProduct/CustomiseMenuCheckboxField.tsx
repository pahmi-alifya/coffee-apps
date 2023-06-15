import {Column, RectButton, Spacer, Spacing, Text, Theme} from '@atoms';
import {ButtonCheckbox} from '@molecules';
import numberFormat from '@utils/numberFormat';
import React from 'react';

interface Props {
  label: string;
  price: number;
  onPress: () => void;
  selected: boolean;
}

const CustomiseMenuCheckboxField: React.FC<Props> = ({
  label,
  price,
  onPress,
  selected,
}) => {
  return (
    <RectButton
      onPress={onPress}
      height={40}
      backgroundColor={Theme.Neutral02}
      borderRadius={Spacing.Tiny}
      padding={{h: Spacing.Tiny}}
      style={{marginBottom: Spacing.Standard}}>
      <Column>
        <Text type="b1">{label}</Text>
      </Column>

      <Text type="l1">{`+${numberFormat(price)}`}</Text>

      <Spacer length={Spacing.Standard} horizontal />

      <ButtonCheckbox isSelected={selected} onPress={onPress} />
    </RectButton>
  );
};

export default CustomiseMenuCheckboxField;
