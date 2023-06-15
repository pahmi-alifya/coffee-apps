import {Column, Icon, RectButton, Spacing, Theme} from '@atoms';
import React from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  isSelected: boolean;
  onPress(): void;
  disabled?: boolean;
}

const ButtonCheckbox: React.FC<Props> = ({isSelected, onPress, disabled}) => {
  return (
    <RectButton
      onPress={onPress}
      disabled={disabled}
      height={24}
      style={styles.button}
      borderRadius={Spacing.SuperTiny}
      backgroundColor={isSelected ? Theme.Red206 : Theme.Neutral01}
      borderColor={Theme.Neutral04}
      borderWidth={isSelected ? 0 : 1}>
      <Column arrangement="center" alignment="center">
        <Icon name="Checklist" color={Theme.Neutral01} />
      </Column>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  button: {width: 24},
});

export default ButtonCheckbox;
