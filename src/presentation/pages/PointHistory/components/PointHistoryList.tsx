import {Column, Separator, Spacer, Spacing} from '@atoms';
import {JiwaPointTransactionType} from '@models';
import {PointHistoryCard, PointHistoryListSkeletonLoading} from '@molecules';
import PointHistoryEmptyPlaceholder from '@molecules/Placeholder/PointHistoryEmptyPlaceholder';
import {laggy, useQuery} from '@swr';
import {memberships} from '@url';
import {ResponseDto} from '@utils/response';
import React, {useCallback} from 'react';
import {ListRenderItem, RefreshControl} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

interface Props {
  isUsedPoint?: boolean;
}

const PointHistoryList: React.FC<Props> = ({isUsedPoint}) => {
  const transactions = useQuery<ResponseDto<JiwaPointTransactionType[]>>(
    memberships(`jiwapoint/list/${isUsedPoint ? 'deduct' : 'add'}`),
    {use: [laggy]},
  );

  const renderEmptyPlaceholder = useCallback(() => {
    if (transactions.isLoading) {
      return <PointHistoryListSkeletonLoading />;
    }

    return <PointHistoryEmptyPlaceholder isUsedPoint={isUsedPoint} />;
  }, [isUsedPoint, transactions.isLoading]);

  const ListHeaderComponent = useCallback(() => {
    return <Spacer length={Spacing.High} />;
  }, []);

  const ListFooterComponent = useCallback(() => {
    return <Column height={Spacing.High} withSafeArea="bottomOnly" />;
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <Separator margin={{v: Spacing.Standard, h: Spacing.High}} />;
  }, []);

  const renderItem: ListRenderItem<JiwaPointTransactionType> = useCallback(
    ({item}) => <PointHistoryCard item={item} isUsedPoint={isUsedPoint} />,
    [isUsedPoint],
  );

  return (
    <Tabs.FlatList
      refreshControl={
        <RefreshControl
          refreshing={transactions.isValidating}
          onRefresh={() => transactions.mutate()}
        />
      }
      data={transactions.data?.data}
      keyExtractor={(item) => `${item.id_point}`}
      ListEmptyComponent={renderEmptyPlaceholder}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
    />
  );
};

export default PointHistoryList;
