import {ListRenderItem, RefreshControl} from 'react-native';
import {
  IllustrationEmptyNotificationInfo,
  IllustrationEmptyNotificationPromo,
} from '@assets';
import {Column, Separator, Spacing} from '@atoms';
import {NotificationCard, NotificationCardSkeletonLoading} from '@molecules';
import NotificationEmptyPlaceholder from '@molecules/Placeholder/NotificationEmptyPlaceholder';
import {NotificationType} from '@models';
import {laggy, useQuery} from '@swr';
import {notification} from '@url';
import {ResponseDto} from '@utils/response';
import React, {useCallback, useEffect} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import {useTranslation} from 'react-i18next';
interface Props {
  tab: string;
  count: (val: number) => void;
}

type TabType = {
  [key: string]: {
    title: string;
    desc: string;
    image: string;
  };
};

const NotificationList: React.FC<Props> = ({tab, count}) => {
  const {t} = useTranslation();

  const notifications = useQuery<ResponseDto<NotificationType[]>>(
    notification(`v1/notifications/notification_group/${tab}`),
    {use: [laggy]},
  );

  // use this condition because the response from the backend does not match the response dto
  const data = notifications.data?.notification_data
    ? notifications.data?.notification_data
    : notifications.data?.data;

  useEffect(() => {
    const countVal = data?.length;
    if (countVal) {
      count(countVal);
    }
  }, [notifications]);

  const renderEmptyPlaceholder = useCallback(() => {
    if (notifications.isLoading) {
      return <NotificationCardSkeletonLoading />;
    }

    const tabs: TabType = {
      info: {
        title: t('notification.information.emptyState.title'),
        desc: t('notification.information.emptyState.description'),
        image: IllustrationEmptyNotificationInfo,
      },
      promo: {
        title: t('notification.promotion.emptyState.title'),
        desc: t('notification.promotion.emptyState.description'),
        image: IllustrationEmptyNotificationPromo,
      },
    };

    return (
      <NotificationEmptyPlaceholder
        title={tabs[tab].title}
        desc={tabs[tab].desc}
        image={tabs[tab].image}
      />
    );
  }, [tab, notifications.isLoading]);

  const ListFooterComponent = useCallback(() => {
    return <Column height={Spacing.High} withSafeArea="bottomOnly" />;
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <Separator height={1} />;
  }, []);

  const renderItem: ListRenderItem<NotificationType> = useCallback(
    ({item}) => <NotificationCard item={item} />,
    [tab],
  );

  return (
    <Tabs.FlatList
      refreshControl={
        <RefreshControl
          refreshing={notifications.isValidating}
          onRefresh={() => notifications.mutate()}
        />
      }
      data={data}
      keyExtractor={(item) => `${item.id_notification}`}
      ListEmptyComponent={renderEmptyPlaceholder}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default NotificationList;
