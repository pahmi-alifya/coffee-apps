import {Column, IconButton, Spacing, Text, Theme} from '@atoms';
import {ContainerWrapper, TabBar} from '@organisms';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import React, {useCallback, useState} from 'react';
import {TabBarProps, Tabs} from 'react-native-collapsible-tab-view';
import NotificationList from './components/NotificationList';
import styles from './Notification.style';
import NotificationProps from './Notification.type';

const NotificationScreen: React.FC<NotificationProps> = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [infoCount, setInfoCount] = useState(0);
  const [promoCount, setPromoCount] = useState(0);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderTabBar = useCallback((tabBarProps: TabBarProps<string>) => {
    return (
      <Column
        arrangement="center"
        padding={{h: Spacing.High, t: Spacing.Tiny, b: Spacing.Medium}}
        style={styles.tabBarContainer}>
        <TabBar
          position={tabBarProps.indexDecimal}
          tabs={tabBarProps.tabNames.map((title) => ({title}))}
          onPressTab={tabBarProps.onTabPress}
        />
      </Column>
    );
  }, []);

  const infoCountWrap = infoCount ? `(${infoCount})` : '';
  const promoCountWrap = promoCount ? `(${promoCount})` : '';

  return (
    <ContainerWrapper
      withSafeArea="topOnly"
      backgroundColor={Theme.Neutral01}
      statusBarProps={{
        barStyle: 'dark-content',
        backgroundColor: Theme.Neutral01,
      }}
      navbarProps={{
        items: [
          <IconButton
            backgroundColor={Theme.Neutral02}
            onPress={handleBackPress}
            iconProps={{name: 'Arrow-Left', size: 20}}
          />,
          <Text type="b1" weight="medium" color={Theme.Neutral10}>
            {t('notification.title')}
          </Text>,
        ],
      }}>
      <Tabs.Container
        headerContainerStyle={{
          elevation: 0,
        }}
        tabBarHeight={72}
        renderTabBar={renderTabBar}>
        <Tabs.Tab
          name={`${t('notification.information.titleTab')} ${infoCountWrap}`}>
          <NotificationList count={(val) => setInfoCount(val)} tab="info" />
        </Tabs.Tab>
        <Tabs.Tab
          name={`${t('notification.promotion.titleTab')} ${promoCountWrap}`}>
          <NotificationList count={(val) => setPromoCount(val)} tab="promo" />
        </Tabs.Tab>
      </Tabs.Container>
    </ContainerWrapper>
  );
};

export default NotificationScreen;
