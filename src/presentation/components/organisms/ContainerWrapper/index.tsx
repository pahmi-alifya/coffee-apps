import {Column} from '@atoms';
import {Navbar} from '@molecules';
import React, {forwardRef, useMemo} from 'react';
import {ScrollViewProps, StatusBar} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ContainerWrapperType} from './ContainerWrapper.types';

const ContainerWrapper = forwardRef((props: ContainerWrapperType, ref) => {
  const {
    children,
    statusBarProps,
    navbarProps,
    contentType = 'fixed',
    contentProps,
    footer,
    ...rest
  } = props;

  const renderContent = useMemo(() => {
    if (contentType === 'scrollable') {
      return (
        <ScrollView {...(contentProps as ScrollViewProps)}>
          {children}
        </ScrollView>
      );
    }

    return children;
  }, [contentType, children, contentProps]);

  return (
    <Column {...rest}>
      {statusBarProps && <StatusBar {...statusBarProps} />}
      {navbarProps && <Navbar {...navbarProps} />}
      <Column>{renderContent}</Column>
      {footer?.map((item) => item)}
    </Column>
  );
});

export default ContainerWrapper;
