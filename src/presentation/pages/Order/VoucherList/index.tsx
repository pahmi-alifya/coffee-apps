import {Column, IconButton, Separator, Text, TextButton, Theme} from '@atoms';
import VoucherItem from '@molecules/VoucherItem';
import {ContainerWrapper} from '@organisms';
import {useNavigation} from '@react-navigation/native';
import {range} from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';

const appliedVoucher = {
  title: 'Promo Payday 30%',
  subtitle: 'minimum pesanan Rp50.000',
  activePeriod: 'berlaku s/d 31 des 2022',
};

const mockData = range(10).map(() => ({
  title: 'Diskon Akhir Bulan',
  subtitle: 'Tambahan diskon untuk semua menu 15rb + diskon ongkir 3rb',
  activePeriod: 'berlaku s/d 31 des 2022',
}));

const VoucherList: React.FC = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const handleCloseButton = () => {
    navigation.goBack();
  };

  return (
    <ContainerWrapper
      backgroundColor={Theme.Neutral01}
      withSafeArea="topOnly"
      statusBarProps={{
        barStyle: 'dark-content',
      }}
      navbarProps={{
        backgroundColor: Theme.Neutral01,
        items: [
          <Text>{t('voucherList.title')}</Text>,
          <IconButton
            backgroundColor={Theme.Neutral02}
            iconProps={{
              name: 'Close',
            }}
            onPress={handleCloseButton}
          />,
        ],
        fillContainerIndexes: [0],
        arrangement: 'between',
      }}>
      <ScrollView>
        <Separator height={4} backgroundColor={Theme.Neutral02} />
        <Column padding={{h: 24, v: 16}}>
          <Text type="s3" weight="medium">
            Terpasang
          </Text>
          <VoucherItem
            title={appliedVoucher.title}
            subtitle={appliedVoucher.subtitle}
            activePeriod={appliedVoucher.activePeriod}
            onPress={() => {}}
            isActive
            containerStyle={{marginVertical: 16}}
          />
          <Text type="s3" weight="medium">
            Voucher Diskon (4)
          </Text>
          {mockData.map((item, index) => (
            <VoucherItem
              key={`voucher-${index}`}
              title={item.title}
              subtitle={item.subtitle}
              activePeriod={item.activePeriod}
              onPress={() => {}}
              containerStyle={{marginTop: 16}}
            />
          ))}
        </Column>
      </ScrollView>
      <Column
        withSafeArea="bottomOnly"
        contentStyle="fitContent"
        padding={24}
        backgroundColor={Theme.Neutral01}>
        <TextButton
          textProps={{
            type: 'b1',
            color: Theme.Neutral01,
            children: 'Terapkan',
          }}
          backgroundColor={Theme.Red206}
          padding={{v: 16}}
          borderRadius={32}
          onPress={() => {}}
        />
      </Column>
    </ContainerWrapper>
  );
};

export default VoucherList;
