import {
  Column,
  Icon,
  ModalBottomSheet,
  Row,
  Spacer,
  Spacing,
  Text,
  Theme,
} from '@atoms';
import TextStyle from '@atoms/Text/Text.style';
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useCombinedRefs} from '@hooks/useCombinedRefs';
import {CartBodyType, ProductType, CartUpdateBodyType} from '@models';
import {
  CtaBottomContainer,
  CustomiseMenuHeader,
  ErrorBoundary,
} from '@organisms';
import SkeletonLoadingModifierMenu from '@organisms/CustomiseMenuProduct/SkeletonLoadingModifierMenu';
import SkeletonLoadingVariantMenu from '@organisms/CustomiseMenuProduct/SkeletonLoadingVariantMenu';
import {useQuery, useRequest} from '@swr';
import {product, transaction} from '@url';
import {ResponseDto} from '@utils';
import {flatMap, isNil, sumBy} from 'lodash';
import React, {forwardRef, useCallback, useMemo} from 'react';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSWRConfig} from 'swr';
import {
  CustomiseMenuForm,
  CustomiseMenuModalProps,
  HEADER_OFFSET,
  IdVariantHot,
  ProductVariantNonSkuNameIce,
} from './CustomiseMenu.type';
import MenuModifier from './MenuModifier.component';
import MenuVariant from './MenuVariant.component';

const CustomiseMenuModal = forwardRef<
  BottomSheetModalMethods,
  CustomiseMenuModalProps
>(({productId, outletId, cartData}, ref) => {
  const combinedRef = useCombinedRefs<BottomSheetModalMethods>(ref);
  const {mutate} = useSWRConfig();
  const {t} = useTranslation();
  const {top} = useSafeAreaInsets();
  const {height: screenHeight} = useWindowDimensions();
  const snapPoints = [screenHeight - top - HEADER_OFFSET];
  const form = useForm<CustomiseMenuForm>();
  const {isValid} = form.formState;
  const addToCart = useRequest<CartBodyType>(transaction('cart'));
  const editCart = useRequest<CartUpdateBodyType>(transaction('cart'), {
    method: 'patch',
  });
  const variants = form.watch('variants', []);
  const modifiers = form.watch('modifiers', []);
  const quantity = form.watch('quantity', 1);

  const handleSetDefaultValueForm = useCallback(
    ({data}: ResponseDto<ProductType>) => {
      form.reset({
        variants: (!isNil(cartData) ? cartData.variant : data.variant).map(
          (v) => ({
            name: v.product_variant_master,
            value:
              v.product_variant.length === 1
                ? v.product_variant[0].id_variant
                : undefined,
          }),
        ),
        variantNonSkus: data.variant_nonsku?.map((v) => ({
          name: v.variant_non_sku_name,
          value: !isNil(cartData)
            ? v.variant_non_sku.find((val) =>
                cartData.variant_non_sku.includes(val.variant_non_sku_detail),
              )?.id_variant_non_sku_detail
            : v.variant_non_sku.length === 1
            ? v.variant_non_sku[0].id_variant_non_sku_detail
            : undefined,
        })),
        modifiers: (!isNil(cartData) ? cartData.modifier : data.modifier).map(
          (m) => ({
            name: m.product_modifier_master,
            values: !isNil(cartData)
              ? m.product_modifier.map((mod) => mod.id_modifier)
              : [],
          }),
        ),
      } as Partial<CustomiseMenuForm>);
    },
    [form, cartData],
  );

  const productQuery = useQuery<ResponseDto<ProductType>>(
    productId ? product(`product/${productId}`) : null,
    {onSuccess: handleSetDefaultValueForm},
  );

  const isProductLoading = productQuery.isLoading || productQuery.isValidating;

  const {price, discountedPrice} = useMemo(() => {
    // calculate price from variant
    const flatVariants = flatMap(variants, (v) => v.value);
    const flatProductVariants = flatMap(
      productQuery.data?.data.variant,
      (v) => v.product_variant,
    ).filter((v) => flatVariants.includes(v.id_variant));
    const variantsPrice = sumBy(flatProductVariants, (v) => v.variant_price);

    // calculate price modifier
    const flatModifiers = flatMap(modifiers, (m) => m.values);
    const flatProductModifiers = flatMap(
      productQuery.data?.data.modifier,
      (m) => m.product_modifier,
    ).filter((m) => flatModifiers.includes(m.id_modifier));
    const modifiersPrice = sumBy(flatProductModifiers, (m) => m.modifier_price);

    const totalPrice =
      ((productQuery.data?.data.price || 0) + variantsPrice + modifiersPrice) *
      quantity;
    const totalDiscountedPrice = productQuery.data?.data.discounted_price
      ? (productQuery.data?.data.discounted_price +
          variantsPrice +
          modifiersPrice) *
        quantity
      : undefined;

    return {
      price: totalPrice,
      discountedPrice: totalDiscountedPrice,
    };
  }, [modifiers, variants, quantity, productQuery.data]);

  const handleSubmitPress = form.handleSubmit(
    useCallback(
      (values) => {
        // dismiss keyboard
        Keyboard.dismiss();

        if (isNil(cartData)) {
          const isVariantHotSelected = !!values.variants.find(
            (v) => v.value === IdVariantHot,
          );

          // filter out variant non sku ices if variant hot is selected
          const filteredOutVariantNonSkus = values.variantNonSkus.filter(
            (v) => {
              if (!isVariantHotSelected) {
                return true;
              }

              return (
                v.name.toLowerCase() !==
                ProductVariantNonSkuNameIce.toLowerCase()
              );
            },
          );

          const body: CartBodyType = {
            id_product: productQuery.data?.data.id_product as number,
            id_brand: productQuery.data?.data.id_brand as number,
            id_outlet: outletId as number,
            variant_non_sku: flatMap(filteredOutVariantNonSkus, (v) => v.value),
            variant: values.variants.map((v) => ({
              product_variant_master: v.name,
              product_variant: [{id_variant: v.value}],
            })),
            modifier: values.modifiers.map((m) => ({
              product_modifier_master: m.name,
              product_modifier: m.values.map((mId) => ({id_modifier: mId})),
            })),
            notes: values.note,
            qty: values.quantity,
            subtotal: discountedPrice || price,
          };

          // add to cart
          addToCart.mutate(body, {
            onSuccess() {
              // revalidate get cart query
              mutate(transaction('cart'));

              // close modal
              combinedRef?.current?.close();
            },
          });
        } else {
          const body: CartUpdateBodyType = {
            id_cart_item: cartData.id_cart_item,
            variant: values.variants.map((v) => ({
              product_variant_master: v.name,
              product_variant: [{id_variant: v.value}],
            })),
            modifier: values.modifiers.map((m) => ({
              product_modifier_master: m.name,
              product_modifier: m.values.map((mId) => ({id_modifier: mId})),
            })),
            variant_non_sku: flatMap(values.variantNonSkus, (v) => v.value),
            notes: values.note,
            qty: values.quantity,
            subtotal: discountedPrice || price,
          };
          editCart.mutate(body, {
            onSuccess() {
              // revalidate get cart query
              mutate(transaction('cart'));

              // close modal
              combinedRef?.current?.close();
            },
          });
        }
      },
      [
        addToCart,
        editCart,
        discountedPrice,
        outletId,
        cartData,
        price,
        productQuery.data,
        combinedRef,
        mutate,
      ],
    ),
  );

  return (
    <ModalBottomSheet
      ref={combinedRef}
      backgroundStyle={{backgroundColor: Theme.Neutral01}}
      snapPoints={snapPoints}
      keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onDismiss={() => form.reset()}>
      <FormProvider {...form}>
        <ErrorBoundary>
          <BottomSheetScrollView>
            <Column
              padding={{h: Spacing.High, b: Spacing.High}}
              borderRadius={{tl: Spacing.High, tr: Spacing.High}}>
              <CustomiseMenuHeader
                product={productQuery.data?.data}
                loading={isProductLoading}
                onClosePress={() => combinedRef.current?.close()}
              />

              <Spacer length={Spacing.High} />

              <SkeletonLoadingVariantMenu loading={isProductLoading}>
                <MenuVariant
                  product={productQuery.data?.data}
                  name="variants"
                />

                <MenuVariant
                  product={productQuery.data?.data}
                  name="variantNonSkus"
                />
              </SkeletonLoadingVariantMenu>

              <Spacer length={Spacing.High} />

              <SkeletonLoadingModifierMenu loading={isProductLoading}>
                <MenuModifier product={productQuery.data?.data} />
              </SkeletonLoadingModifierMenu>

              <Text type="b1" weight="bold">
                {t('home.note')}{' '}
                <Text type="l1" weight="regular">
                  ({t('home.optional')})
                </Text>
              </Text>

              <Row
                height={40}
                margin={{t: Spacing.Standard}}
                borderRadius={Spacing.Tiny}
                alignment="center"
                padding={{h: Spacing.Small}}
                style={styles.textInputContainer}>
                <Icon
                  name="Notes"
                  color={Theme.Neutral05}
                  size={20}
                  style={{marginRight: Spacing.Tiny}}
                />
                <Controller
                  control={form.control}
                  name="note"
                  defaultValue=""
                  render={({field}) => (
                    <BottomSheetTextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder={t('home.notePlaceholder')}
                      placeholderTextColor={Theme.Neutral05}
                      style={styles.textInput}
                    />
                  )}
                />
              </Row>
            </Column>
          </BottomSheetScrollView>
          <Controller
            control={form.control}
            name="quantity"
            defaultValue={1}
            render={({field}) => (
              <CtaBottomContainer
                price={price}
                discountedPrice={discountedPrice}
                loadingProduct={isProductLoading}
                onPressIncrement={() => field.onChange(field.value + 1)}
                onPressDecrement={() => field.onChange(field.value - 1)}
                quantity={field.value}
                onPressAddToCart={handleSubmitPress}
                disabled={isProductLoading || !isValid || addToCart.isLoading}
                loadingSubmit={addToCart.isLoading}
              />
            )}
          />
        </ErrorBoundary>
      </FormProvider>
    </ModalBottomSheet>
  );
});

const styles = StyleSheet.create({
  textInputContainer: {
    borderColor: Theme.Neutral04,
    borderWidth: 1,
  },
  textInput: {
    ...TextStyle({
      type: 'l2',
      weight: 'regular',
      color: Theme.Neutral10,
    }).text,
    flex: 1,
    margin: 0,
    padding: 0,
  },
});

export default CustomiseMenuModal;
