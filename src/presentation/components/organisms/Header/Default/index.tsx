import {Color, Layout, Text} from '@atoms';
import {Button} from '@molecules';
import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {primaryColor, whiteColor} from '../../../atoms/Color';
import {IconProps} from '../../../atoms/Icon/Icon.types';
import {TextProps} from '../../../atoms/Text/Text.types';
import DefaultStyle from './Default.style';
import {DefaultProps} from './Default.types';

const Default: FC<DefaultProps> = (props: DefaultProps): JSX.Element => {
  const {style, isAuth, toggleProps} = props;

  const navigation = useNavigation();

  const toggleIcon: IconProps = {
    name: 'Notes',
    size: 38,
    color: Color('neutral', '01'),
  };

  const textVoucherProps: TextProps = {
    style: {
      alignSelf: 'flex-start',
    },
    text: '500',
    type: 'l2',
    weight: 'medium',
  };

  const descriptionVoucherProps: TextProps = {
    text: 'Voucher',
    weight: 'bold',
    type: 'l2',
  };
  const notificationIconProps: IconProps = {
    name: 'Bell',
    size: 24,
    color: primaryColor,
  };

  return (
    <Layout style={[DefaultStyle.header, style]}>
      <Button
        style={DefaultStyle.toggle}
        iconLeftProps={toggleIcon}
        variant={'tertiary'}
        {...toggleProps}
      />
      <Layout style={DefaultStyle.flexFull}>
        <Text
          weight="bold"
          color={whiteColor}
          type="b2"
          text={isAuth ? 'Hi, Jan!' : 'Hi, Teman Sejiwa!'}
        />
        <Text
          weight="regular"
          color={whiteColor}
          type="l2"
          text={isAuth ? 'Jiwa Toast enak banget!' : 'Enjoy Your Coffee Time'}
        />
      </Layout>
      {isAuth ? (
        <Button
          style={DefaultStyle.btnVoucher}
          size="medium"
          color={whiteColor}
          variant={'primary'}
          imageLeftProps={{
            style: DefaultStyle.voucherIcon,
            source: require('../../../../../assets/images/icons/voucher.png'),
          }}
          textProps={textVoucherProps}
          descriptionProps={descriptionVoucherProps}
        />
      ) : (
        <Button
          style={DefaultStyle.center}
          size="small"
          color={whiteColor}
          variant={'primary'}
          onPress={() => navigation.navigate('Login')}
          textProps={{
            text: 'Login disini',
            color: primaryColor,
          }}
          isRounded
        />
      )}
      <Button
        style={[DefaultStyle.center, DefaultStyle.circleBtn]}
        size="medium"
        color={whiteColor}
        onPress={() => navigation.navigate<any>('Notification')}
        iconLeftProps={notificationIconProps}
        variant={'primary'}
        isRounded
      />
    </Layout>
  );
};

export default Default;
