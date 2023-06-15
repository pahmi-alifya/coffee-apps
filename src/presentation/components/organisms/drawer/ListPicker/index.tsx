/**
 *  Drawer Auth
 *  This code will do Create Drawer Auth
 */

// ! Import react module and library first on top of tsx file.
import React, {forwardRef, memo, useCallback, useEffect, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

// Import custom module of components
import {Theme, Layout, Text} from '@atoms';
import {Pressable, ScrollView, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListPickerStyle from './index.style';
import {Button} from '@molecules';

type Props = {
  snapPoints: string[];
  title: string;
  items: {title: string; value: string | number}[];
  onSelect: (value: string) => void;
};

const ListPicker = forwardRef<BottomSheet, Props>((props, ref) => {
  const {snapPoints, items, title, onSelect} = props;
  const [selected, setSelected] = useState<any>(null);
  const {t} = useTranslation();

  const handleCloseDrawer = () => {
    ref?.current?.close();
  };

  const onSubmit = () => {
    onSelect(selected);
    handleCloseDrawer();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose>
      <ScrollView>
        <Layout
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            type="b1"
            style={{fontWeight: '500'}}
            color={Theme.Neutral10}
            weight="light"
            text={title}
          />
          <Pressable
            onPress={handleCloseDrawer}
            style={ListPickerStyle.iconClose}>
            <Ionicons
              name="close"
              style={{
                alignSelf: 'center',
                justifyContent: 'flex-end',
              }}
              color={Theme.Neutral10}
              size={18}
            />
          </Pressable>
        </Layout>
        <Layout>
          <View style={ListPickerStyle.line} />
          {items.map((item, index) => (
            <Pressable
              onPress={() => setSelected(item.value)}
              key={index.toString()}
              style={{
                paddingHorizontal: 20,
              }}>
              <Layout style={ListPickerStyle.itemWrapper}>
                <Text
                  type="b2"
                  color={Theme.Neutral10}
                  text={item.title}
                  weight="regular"
                />
                <View
                  style={
                    item.value === selected
                      ? ListPickerStyle.circleBorderSelected
                      : ListPickerStyle.circleBorder
                  }>
                  {item.value === selected && (
                    <View style={ListPickerStyle.circle} />
                  )}
                </View>
              </Layout>
              <View
                style={[
                  ListPickerStyle.line,
                  {height: 2, borderColor: Theme.Neutral10},
                ]}
              />
            </Pressable>
          ))}
        </Layout>

        <Layout style={{paddingHorizontal: 20}}>
          <Button
            onPress={onSubmit}
            text={t('auth.confirm')}
            style={{height: 52, marginTop: 30}}
            isBlock
            isRounded
            disabled={!selected}
            textProps={{
              color: Theme.Neutral01,
              weight: 'regular',
              type: 'b1',
            }}
          />
        </Layout>
      </ScrollView>
    </BottomSheet>
  );
});
// Export Drawer Auth as default
export default memo(ListPicker);
