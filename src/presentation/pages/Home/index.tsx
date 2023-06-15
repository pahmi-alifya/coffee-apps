import {KopiSusuLottieFilesEN} from '@assets';
import {Column, Spacer, Spacing, Theme} from '@atoms';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {bannerKeys} from '@hooks/useBanner';
import {cartKeys, useCartCount} from '@hooks/useCart';
import {geolocationKeys, useGeolocation} from '@hooks/useGeolocation';
import {membershipKeys} from '@hooks/useMembership';
import {outletKeys, useOutlets, useSortedOutlets} from '@hooks/useOutlet';
import {productKeys} from '@hooks/useProduct';
import usePullToRefresh from '@hooks/usePullToRefresh';
import {userAccountKeys} from '@hooks/useUserAccount';
import {voucherKeys} from '@hooks/useVoucher';
import {OutletType} from '@models';
import {ProductType} from '@models/ProductModel';
import {DrawerStackParamList} from '@navigation/DrawerNavigation';
import {RootStackParamList} from '@navigation/RootNavigation';
import {ContainerWrapper, PopUpPromo, TabBar} from '@organisms';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl} from 'react-native';
import Reanimated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomiseMenuModal from './components/customiseMenuForm/CustomiseMenuModal';
import FloatingCart from './components/FloatingCart';
import FloatingPromo from './components/FloatingPromo';
import HomeBanner from './components/HomeBanner';
import HomeNavbar from './components/HomeNavbar';
import OutletSelectionModal from './components/OutletSelectionModal';
import ProductSection from './components/ProductSection';
import StickyHomeHeader from './components/StickyHomeHeader';
import UserInformation from './components/UserInformation';
import {HomeContextProvider} from './Home.context';

interface HomeNavigation
  extends CompositeScreenProps<
    DrawerScreenProps<DrawerStackParamList, 'Home'>,
    NativeStackScreenProps<RootStackParamList, 'DrawerNavigation'>
  > {}

interface Props extends HomeNavigation {}

// TODO: Use this as a sticky scroll indicator.
// const SCROLL_OFFSET = 434;

const Home: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const customMenuModalRef = useRef<BottomSheetModal>(null);
  const outletSelectionModalRef = useRef<BottomSheetModal>(null);
  const tabAnimatedValue = useSharedValue(0);
  const scrollPosition = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();
  const [searchKeyword, setSearchKeyword] = useState('');

  const pullToRefresh = usePullToRefresh([
    geolocationKeys.all,
    membershipKeys.all,
    outletKeys.all,
    productKeys.all,
    bannerKeys.all,
    userAccountKeys.me,
    cartKeys.count,
    voucherKeys.count,
  ]);

  const [selectedOutlet, setSelectedOutlet] = useState<OutletType>();

  const {latlng} = useGeolocation();
  const {data: outlets} = useOutlets({
    sort_by: 'distance',
    latlong: latlng,
    pagesize: 1,
    pagenumber: 1,
    search: '',
  });

  const {data: cart} = useCartCount({
    id_outlet: outlets?.data[0].id_outlet,
  });

  const sortedOutlets = useSortedOutlets(outlets?.data);

  useEffect(() => {
    if (sortedOutlets && sortedOutlets.length > 0) {
      setSelectedOutlet(
        // Set initial outlet if only there's no outlet is selected yet.
        (prevValue) => prevValue || sortedOutlets[0], // The first index is the nearest.
      );
    }
  }, [sortedOutlets]);

  const handleOpenDrawer = useCallback(
    () => navigation.openDrawer(),
    [navigation],
  );

  const handleNotificationPress = useCallback(
    () => navigation.navigate('Notification'),
    [navigation],
  );

  const handleLoginPress = useCallback(
    () => navigation.navigate('Login'),
    [navigation],
  );

  const handleVoucherPress = useCallback(() => {
    // TODO: Handle voucher press.
  }, []);

  const handleBannerPress = useCallback((bannerId: number) => {
    // TODO: Handle banner press.
  }, []);

  const handleLocationPress = useCallback(() => {
    // TODO: Handle location press.
  }, []);

  const handleCartPress = useCallback(() => {
    // TODO: Handle when cart press.
  }, []);

  const handleProductPress = useCallback((item: ProductType) => {
    setSelectedProduct(item);
    customMenuModalRef.current?.present();
  }, []);

  const handleOutletPress = useCallback(() => {
    outletSelectionModalRef.current?.present();
  }, []);

  const handleTabPress = useCallback(
    (index: string) => {
      if (index === t('home.tabs.pickup')) {
        return (tabAnimatedValue.value = withTiming(0));
      }

      return (tabAnimatedValue.value = withTiming(1, {duration: 300}));
    },
    [t, tabAnimatedValue],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollPosition.value = e.contentOffset.y;

      if (!isScrolling.value) {
        isScrolling.value = true;
      }
    },
  });

  return (
    <HomeContextProvider
      value={{
        searchKeyword,
        scrollPosition,
        selectedOutlet,
        handleOutletPress,
      }}>
      <ContainerWrapper
        backgroundColor={Theme.Neutral01}
        withSafeArea="topOnly"
        statusBarProps={{
          backgroundColor: Theme.Red206,
          barStyle: 'light-content',
          animated: true,
        }}
        footer={[
          <FloatingPromo
            source={KopiSusuLottieFilesEN}
            isScrolling={isScrolling}
          />,
          <FloatingCart
            qty={cart?.data.total}
            onPress={handleCartPress}
            size={50}
          />,
        ]}>
        <Reanimated.ScrollView
          stickyHeaderIndices={[7]}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          refreshControl={<RefreshControl {...pullToRefresh} />}
          onMomentumScrollEnd={() => (isScrolling.value = false)}>
          <HomeNavbar
            onOpenDrawerPress={handleOpenDrawer}
            onLoginPress={handleLoginPress}
            onNotificationPress={handleNotificationPress}
          />

          <Column backgroundColor={Theme.Red206} height={70} />

          <UserInformation onLocationPress={handleLocationPress} />

          <Spacer length={Spacing.Standard} />

          <HomeBanner onBannerPress={handleBannerPress} />

          <Spacer length={Spacing.Standard} />

          <Column contentStyle="fitContent" padding={{h: Spacing.High}}>
            <TabBar
              position={tabAnimatedValue}
              tabs={[
                {title: t('home.tabs.pickup')},
                {title: t('home.tabs.delivery')},
              ]}
              onPressTab={handleTabPress}
            />
          </Column>

          <StickyHomeHeader setSearchKeyword={setSearchKeyword} />

          <ProductSection handleProductPress={handleProductPress} />
        </Reanimated.ScrollView>

        <CustomiseMenuModal
          ref={customMenuModalRef}
          productId={selectedProduct?.id_product}
          outletId={selectedOutlet?.id_outlet}
        />

        <OutletSelectionModal
          ref={outletSelectionModalRef}
          setSelectedOutlet={setSelectedOutlet}
        />
      </ContainerWrapper>

      <PopUpPromo />
    </HomeContextProvider>
  );
};

export default Home;
