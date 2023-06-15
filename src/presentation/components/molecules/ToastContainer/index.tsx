import {
  Column,
  Icon,
  ReanimatedBox,
  RectButton,
  Spacer,
  Spacing,
  Text,
  Theme,
} from '@atoms';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ToastProvider} from './ToastContainer.context';
import ToastProps, {ToastContentProps} from './ToastContainer.types';

const SHOW_TOAST_DURATION = 3500;
const HIDE_ANIMATION_DURATION = 500;

const ToastContainer = forwardRef((props: ToastProps, ref) => {
  const {height = 36, borderRadius = 32, children} = props;
  const {top} = useSafeAreaInsets();
  const showOffset = top + Spacing.Small;
  const hideOffset = -((height as number) + showOffset);
  const hideTimeoutRef = useRef<number>();
  const [isShow, setIsShow] = useState(false);
  const [content, setContent] = useState<ToastContentProps>();
  const translateY = useSharedValue(hideOffset);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const hide = useCallback(() => {
    setIsShow(false);
  }, []);

  const show = useCallback(
    (
      type: ToastContentProps['type'],
      message: ToastContentProps['message'],
    ) => {
      setIsShow(() => {
        setContent({type, message});

        hideTimeoutRef.current = setTimeout(() => {
          hide();
        }, SHOW_TOAST_DURATION);

        return true;
      });
    },
    [hide],
  );

  const animatedStyle = useAnimatedStyle(() => {
    translateY.value = isShow
      ? withSpring(showOffset)
      : withTiming(hideOffset, {duration: HIDE_ANIMATION_DURATION});

    return {
      width: '100%',
      transform: [{translateY: translateY.value}],
    };
  });

  const renderIcon = useMemo(() => {
    if (!content) {
      return null;
    }

    if (content.type === 'success') {
      return <Icon name="Checklist" color={Theme.Neutral01} size={20} />;
    }

    return (
      <Column
        width={20}
        height={20}
        borderRadius={10}
        alignment="center"
        arrangement="center"
        backgroundColor={Theme.Neutral01}>
        <Icon name="Close" color={Theme.Red106} size={20} />
      </Column>
    );
  }, [content]);

  const backgroundColor = content
    ? content.type === 'success'
      ? Theme.Green06
      : Theme.Red106
    : undefined;

  return (
    <ToastProvider value={{show}}>
      {children}

      <ReanimatedBox alignment="center" style={animatedStyle}>
        <RectButton
          height={height}
          backgroundColor={backgroundColor}
          padding={Spacing.Tiny}
          borderRadius={borderRadius}
          onPress={hide}>
          {renderIcon}
          <Spacer length={Spacing.Tiny} horizontal />
          <Text type="l1" color={Theme.Neutral01} text={content?.message} />
        </RectButton>
      </ReanimatedBox>
    </ToastProvider>
  );
});

export default ToastContainer;
