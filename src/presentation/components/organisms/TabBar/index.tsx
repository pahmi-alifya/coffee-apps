import {Row, Spacing, Theme} from '@atoms';
import {useOnLayout} from '@hooks/useOnLayout';
import {ButtonTab} from '@molecules';
import React, {useMemo} from 'react';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styles from './TabBar.style';
import {TabBarProps} from './TabBar.type';

const TabBar: React.FC<TabBarProps> = ({onPressTab, tabs, position}) => {
  const {onLayout, ...layout} = useOnLayout();
  const widthAnimatedSelector = layout.width / tabs.length;

  const height = useMemo(() => {
    const hasIcon = tabs.some((tab) => !!tab.icon);
    return hasIcon ? 40 : 32;
  }, [tabs]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    if (!position) {
      return {};
    }

    const translateX = interpolate(
      position.value,
      tabs.map((_, index) => index),
      tabs.map((_, index) => index * widthAnimatedSelector),
      {extrapolateRight: Extrapolate.CLAMP},
    );

    return {transform: [{translateX}]};
  });

  return (
    <Row
      onLayout={onLayout}
      backgroundColor={Theme.Neutral02}
      borderRadius={Spacing.Extra}
      height={height}>
      <Reanimated.View
        style={[
          styles.indicator,
          {width: widthAnimatedSelector, height},
          animatedIndicatorStyle,
        ]}
      />

      {tabs.map((route, i) => (
        <ButtonTab
          key={route.title}
          index={i}
          label={route.title}
          onPress={() => onPressTab(route.title)}
          position={position}
          icon={!route.icon ? undefined : {name: route.icon}}
        />
      ))}
    </Row>
  );
};

export default TabBar;
