import React, {useCallback, useEffect} from 'react';
import {primaryColor, Theme} from '@atoms/Color';
import {StyleSheet, View} from 'react-native';
import Reanimated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Row} from '@atoms';
import ProgressBarProps from './ProgressBar.types';

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const {
    color = primaryColor,
    value = 0,
    maxValue = 100,
    height = 10,
    isRounded = false,
    containerColor = Theme.Neutral04,
    style,
    ...rest
  } = props;

  const progressAnimatedValue = useSharedValue(0);

  const progressBarAnimatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progressAnimatedValue.value}%`, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
  }));

  useEffect(() => {
    if (value >= 0 && value <= maxValue)
      progressAnimatedValue.value = (value / maxValue) * 100;
  }, [progressAnimatedValue, value, maxValue]);

  return (
    <Row
      style={[
        {
          height: height,
          backgroundColor: containerColor,
        },
        isRounded && {borderRadius: height},
        style,
      ]}
      contentStyle="fillContainer"
      {...rest}>
      <Reanimated.View
        style={[
          {
            height: height,
            backgroundColor: color,
          },
          isRounded && {borderRadius: height},
          progressBarAnimatedStyle,
        ]}
      />
    </Row>
  );
};

export default ProgressBar;
