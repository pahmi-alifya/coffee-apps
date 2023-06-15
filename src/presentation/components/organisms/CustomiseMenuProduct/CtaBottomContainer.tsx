import {
  Column,
  IconButton,
  RectButton,
  Row,
  Shadow,
  Spacing,
  Text,
  Theme,
} from '@atoms';
import {currency} from '@utils';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

interface Props {
  price: number;
  discountedPrice?: number;
  loadingProduct: boolean;
  onPressIncrement(): void;
  onPressDecrement(): void;
  quantity: number;
  onPressAddToCart(): void;
  disabled?: boolean;
  loadingSubmit?: boolean;
}

const CtaBottomContainer: React.FC<Props> = ({
  price,
  discountedPrice,
  loadingProduct,
  onPressIncrement,
  onPressDecrement,
  quantity,
  onPressAddToCart,
  disabled,
  loadingSubmit,
}) => {
  const {t} = useTranslation();

  return (
    <Column
      contentStyle="fitContent"
      padding={{h: Spacing.High, b: Spacing.High, t: Spacing.Standard}}
      backgroundColor={Theme.Neutral01}
      borderRadius={{
        tl: Spacing.High,
        tr: Spacing.High,
      }}
      style={Shadow}>
      <Row margin={{b: Spacing.High}}>
        <SkeletonContent
          containerStyle={styles.skeletonLoadingPrice}
          animationDirection="horizontalRight"
          isLoading={loadingProduct}
          layout={[
            {
              key: 'price',
              width: 100,
              height: 16,
            },
          ]}>
          <Text type="s3" weight="medium">
            {currency(discountedPrice || price || 0)}
          </Text>
          {!!discountedPrice && (
            <Text
              type="l1"
              color={Theme.Red106}
              margin={{l: Spacing.Tiny}}
              textDecorationLine="line-through">
              {currency(price)}
            </Text>
          )}
        </SkeletonContent>

        <Column>
          <Row arrangement="trailing">
            <IconButton
              onPress={onPressDecrement}
              disabled={quantity <= 1}
              iconProps={{name: 'Minus', size: 28}}
            />

            <Text
              type="b1"
              margin={{h: Spacing.Tiny}}
              align="center"
              style={styles.quantity}>
              {quantity}
            </Text>

            <IconButton
              onPress={onPressIncrement}
              iconProps={{name: 'Plus', size: 28}}
            />
          </Row>
        </Column>
      </Row>

      <RectButton
        onPress={onPressAddToCart}
        disabled={disabled}
        borderRadius={999}
        height={52}
        backgroundColor={disabled ? Theme.Neutral04 : Theme.Red206}>
        {loadingSubmit ? (
          <ActivityIndicator
            color={disabled ? Theme.Neutral06 : Theme.Neutral01}
          />
        ) : (
          <Text type="b1" color={disabled ? Theme.Neutral06 : Theme.Neutral01}>
            {t('home.addToCart')}
          </Text>
        )}
      </RectButton>
    </Column>
  );
};

const styles = StyleSheet.create({
  skeletonLoadingPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    minWidth: 36,
  },
});

export default CtaBottomContainer;
