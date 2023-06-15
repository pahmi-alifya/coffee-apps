import {RectButton, Theme} from '@atoms';
import Lottie, {AnimatedLottieViewProps} from 'lottie-react-native';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Reanimated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type GestureCtx = {
  startX: number;
  startY: number;
};

interface FloatingPromoProps {
  source: AnimatedLottieViewProps['source'];
  isScrolling: SharedValue<boolean>;
  height?: number;
  width?: number;
}

const ENTERING_DELAY_DURATION = 1500;
const HIDING_DURATION = 300;

const FloatingPromo: React.FC<FloatingPromoProps> = (props) => {
  const {source, height = 100, width = 100, isScrolling} = props;
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const y = useSharedValue(windowHeight / 2 - height);
  const x = useSharedValue(windowWidth - width);
  const halfWidth = width / 2;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureCtx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx: GestureCtx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (e, ctx: GestureCtx) => {
      y.value = ctx.startY + e.translationY;
      if (e.translationX > halfWidth - windowWidth) {
        x.value = withSpring(windowWidth - width);
      } else {
        x.value = withSpring(0);
      }
    },
  });

  useAnimatedReaction(
    () => {
      return isScrolling.value;
    },
    (result, prev) => {
      // If end scrolling.
      if (!result && prev) {
        // Return back to it's position.
        if (x.value > halfWidth - width) {
          x.value = withDelay(
            ENTERING_DELAY_DURATION,
            withSpring(windowWidth - width),
          );
        } else {
          x.value = withDelay(ENTERING_DELAY_DURATION, withSpring(0));
        }
      }
      // If start scrolling.
      else if (result && !prev) {
        // Hide.
        if (x.value > halfWidth - width) {
          x.value = withTiming(windowWidth, {duration: HIDING_DURATION});
        } else {
          x.value = withTiming(-width, {duration: HIDING_DURATION});
        }
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Reanimated.View style={animatedStyle}>
        <RectButton
          height={height}
          underlayColor={Theme.Transparent}
          shrinkOnPress>
          <Lottie
            style={{
              width,
              height,
            }}
            autoPlay
            source={source}
          />
        </RectButton>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

export default FloatingPromo;
