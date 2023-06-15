import {Icon, RectButton, Spacing, Text, Theme} from '@atoms';
import {IconProps} from '@atoms/Icon/Icon.types';
import React, {useMemo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  onPress(): void;
  label: string;
  icon?: Pick<IconProps, 'name' | 'size'>;
  isSelected: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ButtonTagMenu: React.FC<Props> = ({
  onPress,
  label,
  icon,
  isSelected,
  disabled,
  style,
}) => {
  const setting = useMemo(() => {
    if (isSelected) {
      return {
        backgroundColor: Theme.Red206,
        textColor: Theme.Neutral01,
        borderColor: Theme.Red206,
      };
    }

    if (disabled) {
      return {
        backgroundColor: Theme.Neutral02,
        textColor: Theme.Neutral05,
        borderColor: Theme.Neutral02,
      };
    }

    return {
      backgroundColor: Theme.Neutral01,
      textColor: Theme.Neutral10,
      borderColor: Theme.Neutral04,
    };
  }, [isSelected, disabled]);

  return (
    <RectButton
      onPress={onPress}
      backgroundColor={setting.backgroundColor}
      borderRadius={Spacing.SuperTiny}
      height={40}
      padding={{h: Spacing.Small}}
      borderWidth={1}
      borderColor={setting.borderColor}
      disabled={disabled}
      style={style}>
      {!!icon && (
        <Icon
          {...icon}
          color={setting.textColor}
          size={icon.size || 16}
          style={{marginRight: Spacing.SuperTiny}}
        />
      )}
      <Text type="l1" color={setting.textColor}>
        {label}
      </Text>
    </RectButton>
  );
};

export default ButtonTagMenu;
