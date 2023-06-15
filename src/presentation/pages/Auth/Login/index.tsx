/**
 *  Page Login
 *  This code will do Create login pages
 */

// ! Import react module and library first on top of tsx file.
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, Pressable, TextInput, TouchableOpacity} from 'react-native';
import PagerView from 'react-native-pager-view';
import DeviceInfo from 'react-native-device-info';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

// Import custom module of components
import {Color, Icon, Image, Layout, Text, Theme} from '@atoms';
import {Button} from '@molecules';
import {BannerLoginFirst, BannerLoginSecond, BannerLoginThird} from '@assets';

import {user} from '@url';
import {request} from '@request';

// Import styling and types of module you created
import LoginProps from './Login.types';
import LoginStyle from './Login.style';
import useKeyboard from '../../../../services/hooks/useKeyboard';
import DrawerAuth from '../../../components/organisms/drawer/Auth';
import DrawerCountry from '../../../components/organisms/drawer/Country';

/**
 * Init Login pages
 * @param {LoginProps} props
 * @returns {JSX.Element}
 */
const Login: React.FC<LoginProps> = (props) => {
  const {navigation, route} = props;
  const {t} = useTranslation();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetCountryRef = useRef<BottomSheet>(null);

  const [selectedCountry, setSelectedCountry] = useState({
    callingCode: ['62'],
    cca2: 'ID',
    currency: ['IDR'],
    flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeBAMAAACs80HuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAA9QTFRF5wAR5wAP6h8u/ODi////32xIVQAAAAFiS0dEBI9o2VEAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAfSURBVCjPY2AYBahAEAtgUMICGIyxAAYXLGBUEA0AAKSuUllCEXddAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTEwLTA3VDEzOjE0OjQ4KzAyOjAwLpNLqAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMC0wN1QxMzoxNDo0OCswMjowMF/O8xQAAAAASUVORK5CYII=',
    name: 'Indonesia',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
  });

  const [visibleSelectCountry, setVisibleSelectCountry] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const keyboard = useKeyboard();
  const snapPoints = useMemo(() => ['1', '50%', '70%', '90%'], []);
  const bannerCarousel = useMemo(
    () => [
      {
        key: '1',
        url: BannerLoginFirst,
      },
      {
        key: '2',
        url: BannerLoginSecond,
      },
      {
        key: '3',
        url: BannerLoginThird,
      },
    ],
    [],
  );

  const handleSnapPressCountry = useCallback(async (index: number) => {
    bottomSheetCountryRef.current?.snapToIndex(index);
    setVisibleSelectCountry(true);
  }, []);

  const handleSnapPress = useCallback(async (index: number) => {
    navigation.setParams({otp: false, newUser: null});
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const handleChangePhoneNumber = useCallback(
    (item: string) => {
      if (item === '0' && phoneNumber.length === 0) return;
      setPhoneNumber(item);
    },
    [phoneNumber],
  );

  useEffect(() => {
    if (route?.params?.otp) {
      setIsOpen(true);
      bottomSheetRef.current?.snapToIndex(
        snapPoints.length - route?.params?.newUser ? 2 : 3,
      );
    }
  }, [route?.params]);

  useEffect(() => {
    if (keyboard && isOpen)
      bottomSheetRef.current?.snapToIndex(snapPoints.length - 2);
    if (isOpen) bottomSheetRef.current?.snapToIndex(snapPoints.length - 3);
  }, [keyboard]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const phone = selectedCountry.callingCode + phoneNumber;
    const data = {
      phone: phone,
      device_id: DeviceInfo.getDeviceId(),
      device_type: DeviceInfo.getSystemName().toUpperCase(),
    };

    try {
      const result = await request(user(`auth/signin`), {
        method: 'post',
        body: JSON.stringify(data),
      });

      if (result.statusCode === 200) {
        setIsLoading(false);
        navigation.navigate('Pin', {
          country_code: selectedCountry?.callingCode[0],
          phone: phoneNumber,
        });
        return;
      }

      if (result.statusCode === 201) {
        const resultOtp = await request(user(`auth/otp/request/`), {
          method: 'post',
          body: JSON.stringify({phone: phone}),
        });

        if (resultOtp.statusCode === 200 || resultOtp.statusCode === 201) {
          setIsLoading(false);
          navigation.setParams({otp: true, phone, newUser: true});
        }

        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error('err', error);
    }
  };

  return (
    <Layout
      style={{
        flex: 1,
      }}>
      <Layout style={LoginStyle.bannerStyle}>
        <PagerView style={{flex: 1}} initialPage={0}>
          {bannerCarousel.map((value) => (
            <Layout
              key={value.key}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="cover"
                source={value.url}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Layout>
          ))}
        </PagerView>
      </Layout>
      <Layout style={LoginStyle.wrapper}>
        <Text weight="medium" text={t('auth.enter')} type="s1" />
        <Layout style={LoginStyle.paragraphWrapper}>
          <Text
            weight="regular"
            text={t('auth.welcome')}
            type="l1"
            color={Theme.Neutral05}
          />
        </Layout>
        <Layout style={LoginStyle.phoneInputWrapperStyle}>
          <Pressable
            onPress={() => handleSnapPressCountry(1)}
            style={LoginStyle.phoneSelectedWrapper}>
            <Image
              style={{height: 25, width: 35, marginRight: 10}}
              source={{
                uri: selectedCountry?.flag,
              }}
            />
            <Text
              text={`+${selectedCountry?.callingCode[0]}`}
              weight="regular"
              type="b2"
              color={Theme.Neutral10}
            />
            <Icon style={{marginHorizontal: 3}} name="Chevron-Down" size={18} />
          </Pressable>
          <TextInput
            placeholder={t('auth.phoneNumber')}
            keyboardType="number-pad"
            style={LoginStyle.phoneInputStyle}
            placeholderTextColor={Theme.Neutral05}
            value={phoneNumber}
            onChangeText={handleChangePhoneNumber}
          />
        </Layout>
        <TouchableOpacity
          onPress={() => handleSnapPress(3)}
          style={LoginStyle.termAndPolicyWrapper}>
          <Text weight="medium" text={t('auth.term')} type="l1" />
          <Text
            weight="medium"
            text={t('auth.termTwo')}
            type="l1"
            style={LoginStyle.underline}
          />
          <Text
            weight="medium"
            text={t('auth.termThree')}
            type="l1"
            style={LoginStyle.underline}
          />
          <Text weight="medium" text={t('auth.termFour')} type="l1" />
        </TouchableOpacity>
        <Layout>
          <Button
            text={t('auth.enter')}
            style={{height: 52}}
            isBlock
            isRounded
            onPress={handleSubmit}
            disabled={phoneNumber.length < 11 || isLoading}
            textProps={{
              color: Theme.Neutral01,
              weight: 'regular',
              type: 'b1',
            }}
          />
        </Layout>
      </Layout>

      <DrawerCountry
        ref={bottomSheetCountryRef}
        onSelect={(country) => {
          setSelectedCountry(country);
        }}
        setIsOpen={(val) => setVisibleSelectCountry(val)}
      />

      <DrawerAuth
        snapPoints={snapPoints}
        setIsOpen={(val) => setIsOpen(val)}
        isOpen={isOpen}
        ref={bottomSheetRef}
      />
    </Layout>
  );
};

// Export Login pages as default
export default Login;
