import {Layout, Text} from '@atoms';
import {Button} from '@molecules';
import React, {FC, memo} from 'react';
import ModalStyle from './Modal.style';
import {ModalProps} from './Modal.types';

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const {
    useStrip,
    title,
    closeBtnProps,
    searchProps,
    children,
    style,
    ...rest
  } = props;
  return (
    <Layout type="safeareaview" style={ModalStyle.wrapper}>
      <Layout style={ModalStyle.column}>
        {useStrip && <Layout style={ModalStyle.strip} />}
        <Layout style={[ModalStyle.header, style]} {...rest}>
          <Text
            style={ModalStyle.title}
            type="b1"
            weight="medium"
            text={title || 'Loading...'}
          />
          {closeBtnProps && (
            <Button
              style={ModalStyle.close}
              size="auto"
              variant={'tertiary'}
              iconLeftProps={{name: 'Close'}}
              {...closeBtnProps}
            />
          )}
          {searchProps && <Search {...searchProps} />}
          {children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default memo(Modal);
