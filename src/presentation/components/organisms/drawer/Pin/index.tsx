/**
 *  Drawer Auth
 *  This code will do Create Drawer Auth
 */

// ! Import react module and library first on top of tsx file.
import React, {forwardRef, memo, useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

// Import custom module of components
import {Theme, Layout, Spacing, Text} from '@atoms';
import {Button, PinView} from '@molecules';
import PinStyle from './index.style';

type Props = {
  setIsOpen: (val: boolean) => void;
  handleChangeText: (index: number, val: string) => void;
  value: string[];
  snapPoints: string[];
  isOpen: boolean;
  handleSubmit: () => void;
};

const DrawerPin = forwardRef<BottomSheet, Props>((props, ref) => {
  const {t} = useTranslation();
  const {setIsOpen, snapPoints, isOpen, handleChangeText, value, handleSubmit} =
    props;
  const router = useRoute();
  const navigation = useNavigation();

  const handleCloseDrawer = () => {
    handleChangeText(-1, '');
    ref?.current?.close();
  };

  const handleChange = (index: number, value: string) => {
    handleChangeText(index, value);
  };

  const isLogin = value[0] === '';

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose
      onClose={() => setIsOpen(false)}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <TouchableOpacity activeOpacity={1}>
          <Layout
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              weight="bold"
              text={isLogin ? t('auth.createPin') : t('auth.confirmPin')}
              type="b1"
            />
            <TouchableOpacity
              onPress={handleCloseDrawer}
              style={PinStyle.iconClose}>
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
                text={
                  isLogin
                    ? t('auth.enterSixNumber')
                    : t('auth.reEnterSixNumber')
                }
                type="l1"
                style={{textAlign: 'center'}}
              />
            </Layout>
            {isLogin ? (
              <PinView
                length={6}
                type="circle"
                isValid={value[0] !== ''}
                onFinish={(pin) => handleChange(0, pin)}
              />
            ) : (
              <PinView
                length={6}
                type="circle"
                isValid={true}
                onFinish={(pin) => handleChangeText(1, pin)}
              />
            )}
            <Layout>
              <Button
                text="Konfirmasi"
                style={{height: 52, marginTop: 20}}
                isBlock
                isRounded
                onPress={() => handleSubmit()}
                disabled={value[1] === undefined || value[1] === ''}
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
    </BottomSheet>
  );
});
// Export Drawer Auth as default
export default memo(DrawerPin);
