import {
  SvgBookmark,
  SvgCallCenter,
  SvgGlobe,
  SvgHandToss,
  SvgLogoJiwa,
  SvgLogout,
  SvgLoyaltyMembership,
  SvgShield,
  SvgShoppingBag,
  SvgStar,
  SvgUser,
  SvgVoucher,
} from '@assets';
import {
  Column,
  IconButton,
  RectButton,
  Row,
  Spacer,
  Spacing,
  Text,
  TextButton,
  Theme,
} from '@atoms';
import {useSessionStorage} from '@hooks/useStorage';
import {DrawerMenu} from '@molecules';
import {DrawerMenuProps} from '@molecules/DrawerMenu';
import {DrawerMenuType} from '@navigation/DrawerNavigation';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, ListRenderItem} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

enum DrawerMenuPosition {
  Transaction = 1,
  LoyaltyMembership = 2,
  Address = 3,
  Voucher = 4,
  Language = 5,
  CallCenter = 6,
}

const WHATSAPP_NUMBER = '+6281113406142'; // According to Trello

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const {t} = useTranslation();
  const [authToken, setAuthToken] = useSessionStorage();

  const handleCloseDrawer = useCallback(
    () => navigation.closeDrawer(),
    [navigation],
  );

  const handleCallCenterPress = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=${WHATSAPP_NUMBER}`);
  }, []);

  const handleReferralPress = useCallback(() => {
    if (authToken) {
      navigation.navigate('ReferralStack');
    } else {
      // TODO: Add "You have not login" Toast.
    }
  }, [navigation, authToken]);

  const handlePrivacyPolicyPress = useCallback(() => {
    // TODO: Link to Privacy Policy.
  }, []);

  const handleGiveRating = useCallback(() => {
    // TODO: Link to Playstore/Appstore.
  }, []);

  const handleLogin = useCallback(() => {
    // TODO: Replace this with the actual Login function.
    // setAuthToken('some-token');
    if (authToken) {
      navigation.navigate('Profile');
    }
  }, [setAuthToken]);

  const handleLogout = useCallback(() => {
    // TODO: Replace this with the actual Logout function.
    setAuthToken(undefined);
  }, [setAuthToken]);

  const menu = useMemo(() => {
    let array: DrawerMenuType[] = [
      {
        text: t('drawer.language'),
        position: DrawerMenuPosition.Language,
        MenuIcon: SvgGlobe,
        onPress: () => navigation.navigate(''),
      },
      {
        text: t('drawer.customerService'),
        position: DrawerMenuPosition.CallCenter,
        MenuIcon: SvgCallCenter,
        onPress: handleCallCenterPress,
      },
    ];

    if (authToken) {
      array = [
        ...array,
        // TODO: this is temporary solution for QA to gain access
        // to point history to test ticket -> JJ-561 Point History
        {
          text: 'Point History',
          position: 1,
          MenuIcon: SvgShoppingBag,
          onPress: () => navigation.navigate('PointHistory'),
        },
        {
          text: t('drawer.transaction'),
          position: DrawerMenuPosition.Transaction,
          MenuIcon: SvgShoppingBag,
          onPress: () => navigation.navigate(''),
        },
        {
          text: t('drawer.loyaltyMembership'),
          position: DrawerMenuPosition.LoyaltyMembership,
          MenuIcon: SvgLoyaltyMembership,
          onPress: () => navigation.navigate(''),
        },
        {
          text: t('drawer.savedAddress'),
          position: DrawerMenuPosition.Address,
          MenuIcon: SvgBookmark,
          onPress: () => navigation.navigate(''),
        },
        {
          text: t('drawer.voucher'),
          position: DrawerMenuPosition.Voucher,
          MenuIcon: SvgVoucher,
          onPress: () => navigation.navigate(''),
        },
      ];
    }

    return array;
  }, [t, handleCallCenterPress, authToken, navigation]);

  const sortedMenu = useMemo(
    () => menu.sort((a, b) => a.position - b.position),
    [menu],
  );

  const renderHeader = useCallback(
    () => (
      <Column
        contentStyle="fitContent"
        padding={Spacing.High}
        withSafeArea="topOnly">
        <Row arrangement="between">
          <SvgLogoJiwa width={104} height={48} />
          <IconButton
            size={32}
            onPress={handleCloseDrawer}
            iconProps={{name: 'Close', size: 24}}
          />
        </Row>

        <Spacer length={32} />

        <RectButton onPress={handleReferralPress} foregroundRipple>
          <Column
            contentStyle="fitContent"
            borderRadius={24}
            backgroundColor={Theme.Red206}
            overflow="hidden">
            <Row padding={{h: Spacing.High, t: Spacing.High, b: Spacing.Tiny}}>
              <Column>
                <Text
                  type="b2"
                  text={t('drawer.getFreeCoffee')}
                  color={Theme.Neutral01}
                />
              </Column>
              <Spacer length={4} horizontal />
              <SvgHandToss width={48} height={48} />
            </Row>
            <Column
              contentStyle="fitContent"
              padding={{h: Spacing.High, v: Spacing.Standard}}
              borderRadius={Spacing.Standard}
              backgroundColor={Theme.Neutral01o30}>
              <Text
                type="l2"
                color={Theme.Neutral01}
                text={t('drawer.enjoyPromo')}
              />
            </Column>
          </Column>
        </RectButton>
      </Column>
    ),
    [handleCloseDrawer, handleReferralPress, t],
  );

  const renderItem: ListRenderItem<DrawerMenuProps> = ({item}) => {
    return <DrawerMenu {...item} />;
  };

  const renderFooter = useCallback(
    () => (
      <Column contentStyle="fitContent" padding={{t: Spacing.Standard}}>
        <Column contentStyle="fitContent" padding={{h: Spacing.High}}>
          <Text type="b2" weight="bold" text={t('drawer.otherInfo')} />
        </Column>
        <Spacer length={Spacing.Standard} />

        <DrawerMenu
          text={t('drawer.privacyPolicy')}
          MenuIcon={SvgShield}
          onPress={handlePrivacyPolicyPress}
        />

        {!!authToken && (
          <DrawerMenu
            text={t('drawer.logout')}
            MenuIcon={SvgLogout}
            onPress={handleLogout}
          />
        )}

        <DrawerMenu
          text={t('drawer.giveRating')}
          // TODO: Change this dynamically according to Application version.
          subText="Version 2.0"
          MenuIcon={SvgStar}
          onPress={handleGiveRating}
        />

        <Column padding={Spacing.High}>
          <Text type="l1" weight="light" text={t('drawer.footNote')} />
          <Spacer length={Spacing.Standard} />
          <Text type="l1" weight="bold" text={t('drawer.whatsApp')} />
        </Column>
      </Column>
    ),
    [authToken, handleGiveRating, handleLogout, handlePrivacyPolicyPress, t],
  );

  return (
    <Column backgroundColor={Theme.Neutral01}>
      <Column>
        <FlatList
          data={sortedMenu}
          keyExtractor={(item) => item.position.toString()}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      </Column>

      <Row
        style={{borderTopWidth: 1, borderColor: Theme.Neutral05}}
        padding={Spacing.High}
        withSafeArea="bottomOnly">
        <SvgUser />
        <Column padding={{l: Spacing.Standard}}>
          <Text
            type="b2"
            weight="bold"
            text={`${t('drawer.greetings')}, ${
              // TODO: Replace with the actual user name.
              authToken ? 'Ryan' : t('drawer.temanSejiwa')
            }!`}
          />
          <Spacer length={Spacing.Tiny} />
          <TextButton
            backgroundColor={Theme.Red206}
            height={30}
            borderRadius={32}
            onPress={handleLogin}
            padding={{h: 12}}
            alignSelf="flex-start"
            textProps={{
              type: 'l2',
              color: Theme.Neutral01,
              text: authToken ? t('drawer.seeProfile') : t('drawer.login'),
            }}
          />
        </Column>
      </Row>
    </Column>
  );
};

export default CustomDrawerContent;
