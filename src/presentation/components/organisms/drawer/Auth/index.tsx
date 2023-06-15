/**
 *  Drawer Auth
 *  This code will do Create Drawer Auth
 */

// ! Import react module and library first on top of tsx file.
import React, {forwardRef, memo, useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dimensions, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useSessionStorage} from '@hooks/useStorage';
import {useTranslation} from 'react-i18next';
import RenderHtml from 'react-native-render-html';

// Import custom module of components
import {Theme, Layout, Spacing, Text, IconButton} from '@atoms';
import {Button, PinView} from '@molecules';
import DraweAuthStyle from './index.style';
import {request} from '@request';
import {user} from '@url';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  setIsOpen: (val: boolean) => void;
  snapPoints: string[];
  isOpen: boolean;
};

const TIMER_FOR_MINUTES = 60;

const DrawerAuth = forwardRef<BottomSheet, Props>((props, ref) => {
  const {t} = useTranslation();
  const {setIsOpen, snapPoints, isOpen} = props;
  const router = useRoute();
  const navigation = useNavigation();

  const [otpValue, setOtpValue] = useState('');
  const [pinVerifyValue, setPinVerifyValue] = useState('');
  const [pinValue, setPinValue] = useState('');
  const [authToken, setAuthToken] = useSessionStorage();
  const [isValid, setIsValid] = useState(true);
  const [timer, setTimer] = useState(TIMER_FOR_MINUTES - 1);
  const [userData, setUserData] = useState(null);

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    [],
  );

  useEffect(() => {
    if (isOpen) {
      setTimer(TIMER_FOR_MINUTES);
      setOtpValue('');
      setPinValue('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback, isOpen]);

  const resendOtp = async (phone: string) => {
    if (timer > 0) return;

    const result = await request(user(`auth/otp/request/`), {
      method: 'post',
      body: JSON.stringify({phone}),
    });

    if (result.statusCode === 200 || result.statusCode === 201) {
      setTimer(TIMER_FOR_MINUTES);
    }
  };

  const handleSubmitOtp = useCallback(async (value: string, params: any) => {
    if (value.length === 4) {
      setIsValid(false);
      const data = {
        phone: params.phone,
        otpSecret: value,
        device_id: DeviceInfo.getDeviceId(),
        device_type: DeviceInfo.getSystemName().toUpperCase(),
      };

      try {
        //TODO: need to change to swr
        const result = await request(user(`auth/otp/verify/`), {
          method: 'post',
          body: JSON.stringify(data),
        });

        if (result.statusCode === 200 || result.statusCode === 201) {
          setAuthToken(result.data.accessToken);

          setUserData(result.data.user);
          setIsValid(true);
          setOtpValue(value);

          if (params?.newUser) {
            navigation.navigate('Register', {data: result.data.user});
          }
        }
      } catch (error) {
        setIsValid(false);
        setOtpValue('');
        Toast.showWithGravity(t('auth.somethingWrong'), Toast.LONG, Toast.TOP);
      }
    }
    return;
  }, []);

  const handleSubmitPin = async () => {
    setIsValid(false);
    const data = {
      pin: pinValue,
    };

    try {
      const token = authToken;
      //TODO: need to change to swr
      const result = await request(user(`auth/customer/update-info`), {
        method: 'patch',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      });

      if (result.statusCode === 200 || result.statusCode === 201) {
        setIsValid(true);
        navigation.navigate('Home');
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  const handleCloseDrawer = () => {
    setIsValid(false);
    ref?.current?.close();
  };

  const renderTermsOfService = () => (
    <ScrollView style={{paddingHorizontal: 20}}>
      <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text weight="bold" text={t('auth.termOfService')} type="b1" />
        <IconButton
          size={32}
          onPress={handleCloseDrawer}
          iconProps={{name: 'Close', size: 24}}
        />
      </Layout>
      <Text weight="bold" text={t('auth.dateTerm')} type="b1" />
      <Layout style={{marginTop: 10, marginBottom: 50}}>
        <RenderHtml
          contentWidth={Dimensions.get('screen').width}
          source={{uri: 'https://privacypolicy.jiwa.app/'}}
        />
      </Layout>
    </ScrollView>
  );

  const renderOtp = () => {
    if (otpValue === '') {
      return (
        <ScrollView style={{paddingHorizontal: 20}}>
          <TouchableOpacity activeOpacity={1}>
            <Layout
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                weight="bold"
                text={t('auth.verificationNumber')}
                type="b1"
              />
              <TouchableOpacity
                onPress={handleCloseDrawer}
                style={DraweAuthStyle.iconClose}>
                <Ionicons
                  name="close"
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'flex-end',
                  }}
                  color={Theme.Neutral09}
                  size={18}
                />
              </TouchableOpacity>
            </Layout>
            <Layout style={{alignItems: 'center'}}>
              <Layout
                style={{
                  alignSelf: 'flex-start',
                  marginTop: Spacing.High,
                  width: Dimensions.get('screen').width - 50,
                }}>
                <Text
                  weight="regular"
                  text={t('auth.fillWithOtpCode')}
                  type="l1"
                />
                <Text weight="bold" text={router.params?.phone} type="l1" />
              </Layout>
              <PinView
                length={4}
                type="underline"
                isValid={isValid}
                onFinish={(value) => handleSubmitOtp(value, router?.params)}
              />
              <Layout style={{flexDirection: 'row', marginTop: 20}}>
                <Text weight="light" text={t('auth.resendOtp')} type="l1" />
                <TouchableOpacity
                  onPress={() => resendOtp(router?.params?.phone)}>
                  <Text
                    weight="bold"
                    text={timer <= 0 ? 'Resend OTP' : `0:${timer?.toString()}`}
                    type="l1"
                  />
                </TouchableOpacity>
              </Layout>
            </Layout>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    return (
      <ScrollView style={{paddingHorizontal: 20}}>
        <TouchableOpacity activeOpacity={1}>
          <Layout
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              weight="bold"
              text={
                pinValue === '' ? t('auth.createPin') : t('auth.confirmPin')
              }
              type="b1"
            />
            <TouchableOpacity
              onPress={handleCloseDrawer}
              style={DraweAuthStyle.iconClose}>
              <Ionicons
                name="close"
                style={{
                  alignSelf: 'center',
                  justifyContent: 'flex-end',
                }}
                color={Theme.Neutral09}
                size={18}
              />
            </TouchableOpacity>
          </Layout>
          <Layout style={{alignItems: 'center'}}>
            <Layout
              style={{
                alignSelf: 'center',
                marginTop: Spacing.High,
                width: Dimensions.get('screen').width - 80,
              }}>
              <Text
                weight="regular"
                text={t('auth.enterSixNumber')}
                type="l1"
                style={{textAlign: 'center'}}
              />
            </Layout>
            {pinValue === '' ? (
              <PinView
                length={6}
                type="circle"
                isValid={pinValue !== ''}
                onFinish={(pin) => setPinValue(pin)}
              />
            ) : (
              <PinView
                length={6}
                type="circle"
                isValid={isOpen}
                onFinish={(pin) => setPinVerifyValue(pin)}
              />
            )}
            <Layout>
              <Button
                text="Konfirmasi"
                style={{height: 52, marginTop: 20}}
                isBlock
                isRounded
                onPress={handleSubmitPin}
                disabled={pinVerifyValue === ''}
                textProps={{
                  color: Theme.Neutral01,
                  weight: 'regular',
                  type: 'b1',
                }}
              />
            </Layout>
          </Layout>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose
      onClose={() => setIsOpen(false)}>
      {router.params?.otp ? renderOtp() : renderTermsOfService()}
    </BottomSheet>
  );
});
// Export Drawer Auth as default
export default memo(DrawerAuth);
