import {Column, Spacing, Theme} from '@atoms';
import {JiwaPointType} from '@models';
import {ContainerWrapper, Header, TabBar} from '@organisms';
import {useNavigation} from '@react-navigation/native';
import {laggy, useQuery} from '@swr';
import {memberships} from '@url';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {TabBarProps, Tabs} from 'react-native-collapsible-tab-view';
import PlusPointHeader from './components/PlusPointHeader';
import PointHistoryList from './components/PointHistoryList';
import styles from './PointHistory.style';
import PointHistoryProps from './PointHistory.type';

const PointHistoryScreen: React.FC<PointHistoryProps> = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const jiwaPoint = useQuery<JiwaPointType>(memberships(`jiwapoint`), {
    use: [laggy],
  });

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderTabBar = useCallback((tabBarProps: TabBarProps<string>) => {
    return (
      <Column
        height={72}
        arrangement="center"
        padding={{h: Spacing.High}}
        style={styles.tabBarContainer}>
        <TabBar
          position={tabBarProps.indexDecimal}
          tabs={tabBarProps.tabNames.map((title) => ({title}))}
          onPressTab={tabBarProps.onTabPress}
        />
      </Column>
    );
  }, []);

  return (
    <ContainerWrapper
      backgroundColor={Theme.Red207}
      statusBarProps={{
        barStyle: 'light-content',
        backgroundColor: Theme.Red207,
      }}>
      <Column
        height={188}
        padding={{t: Spacing.Standard, h: Spacing.High}}
        withSafeArea="topOnly">
        <Header
          variant="backable"
          title={t('pointHistory.title')}
          onPress={handleBackPress}
        />

        <PlusPointHeader
          point={jiwaPoint.data?.amount || 0}
          loading={jiwaPoint.isLoading}
        />
      </Column>

      <Column backgroundColor={Theme.Neutral01} style={styles.body}>
        <Tabs.Container
          tabBarHeight={72}
          renderTabBar={renderTabBar}
          headerContainerStyle={styles.body}>
          <Tabs.Tab name={t('pointHistory.earnedPoint')}>
            <PointHistoryList />
          </Tabs.Tab>
          <Tabs.Tab name={t('pointHistory.usedPoint')}>
            <Tabs.Lazy>
              <PointHistoryList isUsedPoint />
            </Tabs.Lazy>
          </Tabs.Tab>
        </Tabs.Container>
      </Column>
    </ContainerWrapper>
  );
};

export default PointHistoryScreen;
