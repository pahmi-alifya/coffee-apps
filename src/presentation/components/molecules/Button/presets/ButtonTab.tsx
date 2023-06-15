import {Column, Icon, RectButton, Row, Spacing, Text, Theme} from '@atoms';
import {IconProps} from '@atoms/Icon/Icon.types';
import React from 'react';
import Reanimated, {useAnimatedStyle} from 'react-native-reanimated';

interface Props {
  index: number;
  activeColor?: string;
  inactiveColor?: string;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  position?: Reanimated.SharedValue<number>;
  icon?: IconProps;
}

const AnimatedText = Reanimated.createAnimatedComponent(Text);
const AnimatedIcon = Reanimated.createAnimatedComponent(Icon);
const THRESHOLD = 0.5;

const ButtonTab: React.FC<Props> = ({
  index,
  activeColor = Theme.Neutral01,
  inactiveColor = Theme.Neutral10,
  label,
  onPress,
  disabled,
  position,
  icon,
}) => {
  const height = icon ? 40 : 32;

  const textAnimatedStyle = useAnimatedStyle(() => {
    if (disabled) {
      return {color: Theme.Neutral05};
    }

    if (!position) {
      return {color: activeColor};
    }

    return {
      color:
        Math.abs(index - position.value) < THRESHOLD
          ? activeColor
          : inactiveColor,
    };
  });

  return (
    <Column>
      <RectButton
        height={height}
        onPress={onPress}
        borderRadius={Spacing.Extra}
        android_ripple={undefined}>
        <Row arrangement="center">
          <AnimatedText
            type="l1"
            weight="medium"
            align="center"
            style={textAnimatedStyle}>
            {label}
          </AnimatedText>

          {!!icon && (
            <AnimatedIcon
              {...icon}
              style={[textAnimatedStyle, {marginLeft: Spacing.Tiny}]}
            />
          )}
        </Row>
      </RectButton>
    </Column>
  );
};

export default ButtonTab;
