import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Theme, Layout, Text, Image} from '@atoms';
import {Countries} from '@const';

type Props = {
  setIsOpen: (val: boolean) => void;
  onSelect: (val: any) => void;
};

const DrawerCountry = forwardRef<BottomSheet, Props>((props, ref) => {
  const {t} = useTranslation();
  const {setIsOpen, onSelect} = props;
  const [data, setData] = useState(
    Object.keys(Countries).map((key) => [key, Countries[key]]),
  );
  const snapPoints = useMemo(() => ['1', '100%'], []);

  const handleChangeCountry = (value: string) => {
    if (value !== '') {
      return setData(
        data.filter((result) =>
          result[1].name.common.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }

    setData(Object.keys(Countries).map((key) => [key, Countries[key]]));
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={BottomSheetBackdrop}
      onClose={() => setIsOpen(false)}>
      <>
        <SafeAreaView style={{margin: 15, marginTop: 30}}>
          <TouchableOpacity activeOpacity={1}>
            <Layout style={{flexDirection: 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={() => ref?.current?.close()}>
                <Ionicons
                  name="close"
                  style={{
                    alignSelf: 'center',
                    marginHorizontal: 10,
                    marginTop: 2,
                    marginRight: 20,
                    justifyContent: 'flex-end',
                  }}
                  color={Theme.Neutral05}
                  size={18}
                />
              </TouchableOpacity>
              <TextInput
                style={{color: Theme.Black, paddingVertical: 0}}
                placeholder={t('auth.enterCountryName')}
                placeholderTextColor={Theme.Neutral05}
                onChangeText={(value) => handleChangeCountry(value)}
              />
            </Layout>
          </TouchableOpacity>
        </SafeAreaView>
        <View
          style={{
            height: Dimensions.get('screen').height - 100,
            width: Dimensions.get('screen').width,
          }}>
          <FlashList
            data={data}
            ListFooterComponent={() => (
              <View
                style={{
                  marginBottom: 50,
                }}
              />
            )}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    borderColor: Theme.Black,
                    borderBottomWidth: 0.5,
                    borderBottomColor: Theme.Neutral04,
                  }}
                />
              );
            }}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    ref?.current?.close();
                    onSelect(item?.[1]);
                  }}>
                  <Layout style={{flexDirection: 'row', padding: 15}}>
                    <Image
                      style={{height: 30, width: 40}}
                      source={{
                        uri: item?.[1]?.flag,
                      }}
                    />
                    <Text
                      weight="regular"
                      style={{alignSelf: 'center', marginLeft: 10}}
                      text={item?.[1]?.name.common}
                      type="b2"
                    />
                  </Layout>
                </TouchableOpacity>
              );
            }}
            estimatedItemSize={200}
          />
        </View>
      </>
    </BottomSheet>
  );
});

export default DrawerCountry;
