import {Column, Icon, RectButton, Spacing, Text, Theme} from '@atoms';
import {ProductType} from '@models';
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

interface Props {
  product: ProductType | undefined;
  loading: boolean;
  onClosePress(): void;
}

const CustomiseMenuHeader: React.FC<Props> = ({
  onClosePress,
  product,
  loading,
}) => {
  return (
    <>
      <Column alignment="end">
        <RectButton
          onPress={onClosePress}
          backgroundColor={Theme.Neutral02}
          height={32}
          width={32}
          borderRadius={16}>
          <Icon name="Close" size={24} />
        </RectButton>
      </Column>

      <SkeletonContent
        containerStyle={styles.skeletonLoading}
        animationDirection="horizontalRight"
        isLoading={loading}
        layout={[
          {
            key: 'image',
            ...styles.image,
          },
          {
            key: 'title',
            width: 170,
            height: 22,
            marginBottom: Spacing.Small,
          },
          {
            key: 'description',
            width: 220,
            height: 16,
          },
        ]}>
        <FastImage
          source={{uri: product?.product_photo}}
          style={styles.image}
          resizeMode="contain"
        />

        <Text type="s1" weight="medium">
          {product?.product_name || ''}
        </Text>
        <Text type="b2" color={Theme.Neutral05} margin={{t: Spacing.SuperTiny}}>
          {product?.product_description || ''}
        </Text>
      </SkeletonContent>
    </>
  );
};

const styles = StyleSheet.create({
  skeletonLoading: {
    alignItems: 'flex-start',
  },
  image: {
    width: 171,
    height: 171,
    alignSelf: 'center',
    marginBottom: Spacing.High,
  },
});

export default CustomiseMenuHeader;
