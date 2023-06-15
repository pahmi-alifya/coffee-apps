import {IconButton, Text, Theme} from '@atoms';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useGeolocation} from '@hooks/useGeolocation';
import {
  CartType,
  CartUpdateBodyType,
  OutletType,
  TransactionEstimationType,
} from '@models';
import {
  DeliveryEstimationBody,
  DeliveryEstimationType,
} from '@models/DeliveryEstimationModel';
import {RootStackParamList} from '@navigation/RootNavigation';
import {ContainerWrapper, TabBar} from '@organisms';
import OrderDetailFooter from '@organisms/OrderDetailFooter';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {laggy, useQuery, useRequest} from '@swr';
import OrderDetailContent from '@templates/OrderDetailContent';
import {delivery, outlet, transaction} from '@url';
import {ResponseDto} from '@utils/response';
import {isNil} from 'lodash';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TabBarProps, Tabs} from 'react-native-collapsible-tab-view';
import CustomiseMenuModal from '../../Home/components/customiseMenuForm/CustomiseMenuModal';
import {ORDER_DETAIL_TABS, TabType} from './OrderDetail.constant';
import styles from './OrderDetail.style';
import {
  PaymentMethod,
  PostTransactionBody,
  PostTransactionResponse,
} from './OrderDetail.type';

const OrderDetail: React.FC = () => {
  const menuModal = useRef<BottomSheetModal>(null);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.Pickup);
  const [activePickupTime, setActivePickupTime] = useState('NOW');
  const [activeCourier, setActiveCourier] = useState<DeliveryEstimationType>();
  const [deliveryCourierSelections, setDeliveryCourierSelections] = useState<
    Array<DeliveryEstimationType>
  >([]);
  const [activeCartItem, setActiveCartItem] = useState<CartType>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // TODO: Replace this with outlet data from homepage
  const outletData: Partial<OutletType> = useMemo(
    () => ({
      id_outlet: 1,
      outlet_name: 'Outlet Green Garden 1 - Mall Bekasi, La Terrazza',
    }),
    [],
  );
  const {geolocation} = useGeolocation();
  const editCart = useRequest<Partial<CartUpdateBodyType>>(
    transaction('cart'),
    {
      method: 'patch',
    },
  );
  const deleteCart = useRequest<{id_cart_item: number}>(transaction('cart'), {
    method: 'delete',
  });
  const deliveryEstimation = useRequest<DeliveryEstimationBody>(
    delivery('delivery/estimate'),
    {
      method: 'post',
    },
  );
  const postTransaction = useRequest<PostTransactionBody>(
    transaction('transaction'),
    {
      method: 'post',
    },
  );

  const {data: cartData, mutate: cartMutate} = useQuery<
    ResponseDto<CartType[]>
  >(transaction('cart'), {
    revalidateIfStale: true,
  });
  const {data: estimationData} = useQuery<
    ResponseDto<TransactionEstimationType>
  >(
    transaction('transaction-estimate', {
      id_outlet: outletData.id_outlet,
    }),
    {
      use: [laggy],
      enabled: !!outletData?.id_outlet,
    },
  );

  const {data: pickupTime} = useQuery<ResponseDto<string[]>>(
    outlet(`v1/outlets/pickup-time/${outletData.id_outlet}`),
    {
      use: [laggy],
      enabled: !!outletData?.id_outlet,
    },
  );

  useEffect(() => {
    if ((cartData?.data.length || 0) > 0 && outletData?.id_outlet) {
      const deliveryEstimationBody: DeliveryEstimationBody = {
        id_outlet: outletData?.id_outlet || 0,
        items: (cartData?.data || []).map((item) => item.product_name),
        recepients: {
          lat: geolocation.coords.latitude,
          long: geolocation.coords.longitude,
          address: 'Test',
          name: 'Test',
          phone: '1234',
        },
      };
      deliveryEstimation.mutate(deliveryEstimationBody, {
        onSuccess(res) {
          setDeliveryCourierSelections(res?.data || []);
          setActiveCourier(res?.data?.[0]);
        },
      });
    }
  }, [cartData, geolocation, outletData]);

  const renderTabBar = useCallback((tabBarProps: TabBarProps<string>) => {
    return (
      <TabBar
        position={tabBarProps.indexDecimal}
        tabs={ORDER_DETAIL_TABS}
        onPressTab={tabBarProps.onTabPress}
      />
    );
  }, []);

  const handleCloseButton = () => {
    navigation.goBack();
  };

  const handleTabChange = ({tabName}: {tabName: string}) => {
    if (tabName === 'Delivery') {
      setActiveTab(TabType.Delivery);
    } else {
      setActiveTab(TabType.Pickup);
    }
  };

  const handleSelectPickupTime = useCallback((newValue: string) => {
    setActivePickupTime(newValue);
  }, []);

  const handleSelectCourier = useCallback(
    (newValue: DeliveryEstimationType) => {
      setActiveCourier(newValue);
    },
    [],
  );

  const handleEditItem = useCallback((cartItem: CartType) => {
    setActiveCartItem(cartItem);
    menuModal.current?.present();
  }, []);

  const handleEditItemQty = useCallback(
    (cartItemId: number, newQty: number) => {
      const updateBody: Partial<CartUpdateBodyType> = {
        id_cart_item: cartItemId,
        qty: newQty,
      };
      editCart.mutate(updateBody, {
        onSuccess() {
          // revalidate get cart query with optimistic update
          cartMutate((data) => {
            const updatedIndex = data?.data.findIndex(
              (item) => item.id_cart_item === cartItemId,
            );
            if (data && !isNil(updatedIndex) && updatedIndex !== -1) {
              data.data[updatedIndex].qty = newQty;
              return data;
            }
          });
        },
      });
    },
    [cartMutate, editCart],
  );

  const handleDeleteItem = useCallback(
    (cartItemId: number) => {
      deleteCart.mutate(
        {
          id_cart_item: cartItemId,
        },
        {
          onSuccess() {
            cartMutate((data) => {
              const deletedIndex = data?.data.findIndex(
                (item) => item.id_cart_item === cartItemId,
              );
              if (data && !isNil(deletedIndex) && deletedIndex !== -1) {
                const newData = {...data};
                newData.data.splice(deletedIndex, 1);
                return newData;
              }
            });
          },
        },
      );
    },
    [cartMutate, deleteCart],
  );

  const handleNavigateToVoucherList = useCallback(() => {
    navigation.navigate('VoucherList');
  }, [navigation]);

  const handleNavigateToPaymentMethodSelect = useCallback(() => {
    // TODO: get payment method from payment method screen
    setPaymentMethod({
      id_payment: 9,
      payment_vendor: 'durian_pay',
      jiwa_point: false,
      payment_name: 'OVO',
      logo: 'https://storage.googleapis.com/jiwaplus-assets/payment_methods_logo/E-wallet/logoOvo.png',
    });
  }, []);

  const handleSubmitTransaction = useCallback(() => {
    // Handle Submit transaction
    const body: PostTransactionBody = {
      transaction: {
        id_outlet: outletData.id_outlet || 0,
        id_promocode: [],
      },
      transaction_payment: {
        id_payment: paymentMethod?.id_payment || 0,
        payment_vendor: paymentMethod?.payment_vendor || '',
        jiwa_point: !!paymentMethod?.jiwa_point,
      },
      product_transaction: (cartData?.data || []).map((item) => ({
        id_product: item.id_product,
        id_brand: item.id_brand,
        transaction_product: item.product_name,
        qty: item.qty,
      })),
      delivery: {
        delivery_type: activeTab,
        ...(activeTab === TabType.Delivery
          ? {
              delivery_notes: '',
              courier: activeCourier?.name || '',
              delivery_data: {
                recepients: {
                  lat: 0,
                  long: 0,
                  address: '',
                  name: '',
                  phone: '',
                },
                id_outlet: outletData.id_outlet || 0,
                items: (cartData?.data || []).map((item) => item.product_name),
              },
            }
          : {
              pick_up_time: activePickupTime,
            }),
      },
    };
    postTransaction.mutate(body, {
      onSuccess(res: PostTransactionResponse) {
        if (res?.data?.url) {
          // TODO: Open url in browser
        } else if (res?.data?.successful_callback_url) {
          // TODO: Open this url in webview
        }
      },
    });
  }, [
    activeCourier,
    activePickupTime,
    activeTab,
    cartData,
    outletData,
    paymentMethod,
    postTransaction,
  ]);

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
          <Text>{t('orderDetail.title')}</Text>,
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
      <Tabs.Container
        tabBarHeight={40}
        renderTabBar={renderTabBar}
        headerContainerStyle={styles.tabBarHeader}
        onTabChange={handleTabChange}>
        {ORDER_DETAIL_TABS.map((item) => (
          <Tabs.Tab name={item.title} key={item.title}>
            <OrderDetailContent
              // TODO: remove the as if it's already correctly typed
              outlet={outletData as OutletType}
              type={item.type}
              items={cartData?.data}
              onEditItem={handleEditItem}
              onEditItemQty={handleEditItemQty}
              onDeleteItem={handleDeleteItem}
              estimationData={estimationData?.data}
              onPromoButtonPress={handleNavigateToVoucherList}
              {...(item.type === TabType.Delivery
                ? {
                    // TODO: need to change to real data
                    address: 'Jl. Satu Jiwa no.27, Jakarta Selatan',
                    addressNotes: 'Blok A1. no 27, depan warung laku terus',
                    activeCourier,
                    deliveryCourierSelections,
                    onPressChangeCourier: handleSelectCourier,
                  }
                : {
                    activePickupTime,
                    onPressSelectPickupTime: handleSelectPickupTime,
                    pickupTimeSelections: pickupTime?.data || [],
                  })}
            />
          </Tabs.Tab>
        ))}
      </Tabs.Container>
      <OrderDetailFooter
        activePaymentMethod={paymentMethod}
        totalPrice={estimationData?.data.grand_total || 0}
        onChoosePayment={handleNavigateToPaymentMethodSelect}
        onSubmitTransaction={handleSubmitTransaction}
      />
      <CustomiseMenuModal
        ref={menuModal}
        productId={activeCartItem?.id_product || 0}
        outletId={activeCartItem?.id_outlet || 0}
        cartData={activeCartItem}
      />
    </ContainerWrapper>
  );
};

export default OrderDetail;
