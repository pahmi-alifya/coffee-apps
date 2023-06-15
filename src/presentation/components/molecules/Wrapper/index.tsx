import React, {memo} from 'react';
import {Color, Layout} from '@atoms';
import {
  ImageBackgroundProps,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  LayoutImageBackground,
  LayoutProps,
  LayoutScrollView,
  LayoutView,
} from '../../atoms/Layout/Layout.types';

type WrapperProps = (LayoutView | LayoutScrollView | LayoutImageBackground) & {
  statusBarProps?: StatusBarProps;
  contentContainerStyle?: ViewStyle;
  contentContainerProps?: LayoutProps;
};
const Wrapper = (props: WrapperProps) => {
  const {
    statusBarProps,
    style,
    contentContainerStyle,
    contentContainerProps,
    children,
    ...rest
  } = props;
  return (
    <Layout style={[WrapperStyle.wrapper, style]} {...rest}>
      {statusBarProps && <StatusBar {...statusBarProps} />}
      <Layout
        style={[WrapperStyle.wrapper, contentContainerStyle]}
        {...contentContainerProps}>
        {children}
      </Layout>
    </Layout>
  );
};

const WrapperStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default memo(Wrapper);
