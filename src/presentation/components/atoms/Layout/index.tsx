import React, {forwardRef} from 'react';
import {Components} from './helper';
import {LayoutProps} from './Layout.types';

const Layout = forwardRef((props: LayoutProps, ref) => {
  const {type = 'view', children, ...rest} = props;
  const Component = Components[type];
  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

export default Layout;
