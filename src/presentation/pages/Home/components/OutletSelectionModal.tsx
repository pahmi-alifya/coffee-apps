import {IllustrationEmptySearch} from '@assets';
import {
  Column,
  Icon,
  Image,
  Spacer,
  Spacing,
  Text,
  TextInput,
  Theme,
} from '@atoms';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useBrands} from '@hooks/useBrand';
import {useCombinedRefs} from '@hooks/useCombinedRefs';
import useDebounce from '@hooks/useDebounce';
import {useGeolocation} from '@hooks/useGeolocation';
import {useOutlets, useSortedOutlets} from '@hooks/useOutlet';
import {OutletType} from '@models';
import {BrandFilterButton, OutletCard} from '@molecules';
import {BrandFilterOptionType} from '@molecules/BrandFilterButton';
import {BottomSheetWrapper} from '@organisms';
import {range} from '@utils';
import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ListRenderItem} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useHomeContext} from '../Home.context';

interface Props {
  setSelectedOutlet(value: OutletType): void;
}

const OutletSelectionModal = forwardRef((props: Props, ref) => {
  const combinedRef = useCombinedRefs<BottomSheetModalMethods>(ref);
  const {setSelectedOutlet} = props;
  const {t} = useTranslation();
  const context = useHomeContext();
  const selectedOutletId = context.selectedOutlet?.id_outlet;

  const translationY = useSharedValue(0);
  const [selectedBrand, setSelectedBrand] = useState<BrandFilterOptionType>();
  const [keyword, setKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(keyword);

  const {latlng} = useGeolocation();

  const {data: brands} = useBrands();

  const {data: outlets, isValidating} = useOutlets({
    sort_by: 'distance',
    latlong: latlng,
    pagenumber: 1,
    pagesize: 30,
    search: debouncedSearchKeyword.length >= 3 ? debouncedSearchKeyword : '',
    brand: selectedBrand?.value,
  });

  const sortedOutlets = useSortedOutlets(outlets?.data, selectedOutletId);

  const filterOptions: BrandFilterOptionType[] = useMemo(
    () => [
      {
        content: t('outlet.allBrands'),
        value: undefined,
      } as BrandFilterOptionType,
      ...(brands?.data || []).map(
        (brand) =>
          ({
            content: brand.brand_logo,
            value: brand.brand_id,
          } as BrandFilterOptionType),
      ),
    ],
    [brands?.data, t],
  );

  const handleClose = useCallback(
    () => combinedRef.current?.close(),
    [combinedRef],
  );

  const handleSelectOutlet = useCallback(
    (value: OutletType) => {
      setSelectedOutlet(value);
      handleClose();
    },
    [handleClose, setSelectedOutlet],
  );

  const handleClearOnDismiss = useCallback(() => {
    setSelectedBrand(undefined);
    setKeyword('');
  }, []);

  const renderFilter: ListRenderItem<BrandFilterOptionType> = useCallback(
    ({item}) => {
      return (
        <BrandFilterButton
          item={item}
          isSelected={item.value === selectedBrand?.value}
          onPress={setSelectedBrand}
        />
      );
    },
    [selectedBrand?.value],
  );

  const renderItem: ListRenderItem<OutletType> = useCallback(
    ({item}) => (
      <OutletCard
        {...item}
        isSelected={selectedOutletId === item.id_outlet}
        onPress={() => handleSelectOutlet(item)}
      />
    ),
    [selectedOutletId, handleSelectOutlet],
  );

  // TODO: onScroll handler isn't working on BottomSheetFlatList.
  // const scrollHandler = useAnimatedScrollHandler((event) => {
  //   translationY.value = event.contentOffset.y;
  // });

  const headerStyle = useAnimatedStyle(() => {
    const elevation = interpolate(
      translationY.value,
      [0, 16],
      [0, 5],
      Extrapolate.CLAMP,
    );

    return {
      elevation,
      backgroundColor: Theme.Neutral01,
    };
  });

  const renderEmpty = useCallback(() => {
    return (
      <Column alignment="center" arrangement="center" padding={Spacing.High}>
        <Image
          source={IllustrationEmptySearch}
          style={{width: 120, height: 120}}
          resizeMode="contain"
        />
        <Spacer length={Spacing.High} />
        <Text
          type="b1"
          weight="bold"
          text={t('outlet.notFound', {keyword: debouncedSearchKeyword})}
        />
        <Text type="l1" text={t('outlet.tryEntering')} />
      </Column>
    );
  }, [debouncedSearchKeyword, t]);

  return (
    <BottomSheetWrapper
      ref={combinedRef}
      onClose={handleClose}
      title={t('outlet.selectOutlet')}
      showCloseButton
      style={{backgroundColor: Theme.Neutral01}}
      onDismiss={handleClearOnDismiss}
      headerComponent={
        <>
          <Column contentStyle="fitContent" padding={{h: Spacing.High}}>
            <TextInput
              placeholder={t('outlet.searchPlaceholder')}
              prefixComponent={
                <Icon name="Outlet" size={22} color={Theme.Red206} />
              }
              allowClear
              onChangeText={setKeyword}
            />
          </Column>

          <Column height={60}>
            <FlatList
              data={filterOptions}
              keyExtractor={(_, index) => `filter-${index}`}
              renderItem={renderFilter}
              extraData={selectedBrand}
              horizontal
              contentContainerStyle={{
                paddingHorizontal: Spacing.High,
                paddingVertical: Spacing.Standard,
              }}
              ItemSeparatorComponent={() => <Spacer length={8} horizontal />}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          </Column>
        </>
      }
      headerStyle={headerStyle}>
      <SkeletonContent
        isLoading={isValidating}
        containerStyle={{flex: 1}}
        layout={range(2).map(() => ({
          borderWidth: 1,
          paddingHorizontal: Spacing.High,
          paddingVertical: Spacing.Standard,
          marginHorizontal: Spacing.High,
          marginVertical: Spacing.Small,
          borderRadius: Spacing.Standard,
          borderColor: Theme.Neutral04,
          children: [
            {width: '70%', height: 20, marginBottom: 16},
            {width: '90%', height: 16, marginBottom: 4},
            {width: '40%', height: 16, marginBottom: 16},
            {
              flexDirection: 'row',
              children: [
                {width: 56, height: 28, marginRight: 16},
                {width: 56, height: 28, marginRight: 16},
                {width: 56, height: 28, marginRight: 16},
                {width: 56, height: 28},
              ],
            },
          ],
        }))}>
        <BottomSheetFlatList
          data={sortedOutlets}
          keyExtractor={(item) => item.id_outlet.toString()}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{paddingBottom: Spacing.Small}}
          // TODO: onScroll handler isn't working on BottomSheetFlatList.
          // onScroll={scrollHandler}
          ListEmptyComponent={renderEmpty}
        />
      </SkeletonContent>
    </BottomSheetWrapper>
  );
});

export default OutletSelectionModal;
