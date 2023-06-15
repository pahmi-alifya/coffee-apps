import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {user} from '@url';
import {request} from '@request';
import {useSessionStorage} from '@hooks/useStorage';

import {Theme, Layout, Text} from '@atoms';
import {PinView} from '@molecules';

import PinStyle from './Pin.style';

interface Props {}

const Pin = (props: Props) => {
  const {navigation, route} = props;
  const {t} = useTranslation();
  const {phone, country_code} = route?.params;
  const [isValid, setIsValid] = useState(true);
  const [authToken, setAuthToken] = useSessionStorage();

  const handleClickSendOtp = async () => {
    const phoneNumber = country_code + phone;
    const result = await request(user(`auth/otp/request/`), {
      method: 'post',
      body: JSON.stringify({phone: phoneNumber}),
    });

    if (result.statusCode === 200 || result.statusCode === 201) {
      navigation.navigate('Login', {otp: true, phone: phoneNumber});
    }
  };

  const handleSubmitPin = async (pin: string) => {
    try {
      setIsValid(true);
      const result = await request(user(`auth/pins/verify`), {
        method: 'post',
        body: JSON.stringify({phone: `${country_code}${phone}`, pin}),
      });

      if (result.statusCode === 200 || result.statusCode === 201) {
        setAuthToken(result?.data?.accessToken);
        setIsValid(true);
        navigation.navigate('Home');
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <SafeAreaView style={PinStyle.container}>
      <Layout style={PinStyle.wrapper}>
        <Layout style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={PinStyle.icon}>
            <Ionicons
              name="arrow-back"
              style={{
                alignSelf: 'center',
                justifyContent: 'flex-end',
              }}
              color={Theme.Neutral09}
              size={18}
            />
          </TouchableOpacity>
          <Text weight="bold" text={t('auth.insertPin')} type="b1" />
        </Layout>
        <Layout
          style={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            top: 150,
          }}>
          <Text weight="medium" text={t('auth.insertSixPin')} type="l1" />
          <PinView
            type="circle"
            length={6}
            onFinish={(pin) => handleSubmitPin(pin)}
            isValid={isValid}
          />
          <Layout style={{flexDirection: 'row', marginTop: 60}}>
            <Text
              weight="regular"
              text={t('auth.forgotPin')}
              type="l1"
              color={Theme.Neutral05}
            />
            <TouchableOpacity onPress={handleClickSendOtp}>
              <Text weight="medium" text={t('auth.sendOtp')} type="l1" />
            </TouchableOpacity>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default Pin;
