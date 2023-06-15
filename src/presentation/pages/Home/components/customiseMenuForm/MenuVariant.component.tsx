import {ProductType} from '@models';
import {CustomiseMenuOptionField} from '@organisms';
import React, {useCallback, useMemo} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {
  CustomiseMenuForm,
  IdVariantHot,
  IdVariantRegular,
  ProductVariantNameSize,
  ProductVariantNonSkuNameIce,
} from './CustomiseMenu.type';

interface Props {
  product?: ProductType;
  name: keyof Pick<CustomiseMenuForm, 'variantNonSkus' | 'variants'>;
}

const MenuVariant: React.FC<Props> = ({product, name}) => {
  const {control, watch} = useFormContext<CustomiseMenuForm>();
  const variantsValue = watch('variants', []);
  const isVariant = name === 'variants';

  const isVariantHotSelected = useMemo(() => {
    return !!variantsValue.find((v) => v.value === IdVariantHot);
  }, [variantsValue]);

  const variants = useFieldArray({
    control,
    name,
    rules: {
      // all variants sku & non sku is required
      // this is control the disabled state of cta button
      validate: (value) => {
        const filteredOutValue = value.filter((v) => {
          if (isVariant || !isVariantHotSelected) {
            return true;
          }

          // filter out the ice variant non sku selection if hot is selected
          // and the variant non sku has ice option
          // check if variant non sku is ice
          return (
            v.name.toLowerCase() !== ProductVariantNonSkuNameIce.toLowerCase()
          );
        });

        return filteredOutValue.every((v) => v.value);
      },
    },
  });

  const options = useMemo((): Array<{
    label: string;
    options: Array<{value: number; name: string}>;
  }> => {
    if (!product) {
      return [];
    }

    if (isVariant) {
      return product.variant.map((v) => {
        const hasRegularOption = v.product_variant.some(
          (pv) => pv.id_variant === IdVariantRegular,
        );

        const variantOptions = v.product_variant
          .filter((pv) => {
            if (!isVariantHotSelected || !hasRegularOption) {
              return true;
            }

            // make sure to keep only regular size option if hot is selected
            // and the variant has regular size option
            return pv.id_variant === IdVariantRegular;
          })
          .map((pv) => ({value: pv.id_variant, name: pv.variant_name}));

        return {
          label: v.product_variant_master,
          options: variantOptions,
        };
      });
    }

    if (!product.variant_nonsku) {
      return [];
    }

    return product.variant_nonsku
      .filter((v) => {
        if (!isVariantHotSelected) {
          return true;
        }

        // filter out the ice variant non sku selection if hot is selected
        // and the variant non sku is ice
        return (
          v.variant_non_sku_name.toLowerCase() !==
          ProductVariantNonSkuNameIce.toLowerCase()
        );
      })
      .map((v) => ({
        label: v.variant_non_sku_name,
        options: v.variant_non_sku
          .sort((a, b) => a.order - b.order)
          .map((pv) => ({
            value: pv.id_variant_non_sku_detail,
            name: pv.variant_non_sku_detail,
          })),
      }));
  }, [product, isVariant, isVariantHotSelected]);

  const handleOptionPress = useCallback(
    (option: {value: number; name: string}, label: string) => {
      const index = variants.fields.findIndex((v) => v.name === label);
      const value = variants.fields[index];
      const sizeVariantIndex = variants.fields.findIndex(
        (v) => v.name === ProductVariantNameSize,
      );
      const sizeValue = variants.fields[sizeVariantIndex];
      const isHotSelected = option.value === IdVariantHot;

      // update current variant value
      variants.update(index, {...value, value: option.value});

      // update size variant value to regular only if hot is selected
      if (isVariant && isHotSelected) {
        variants.update(sizeVariantIndex, {
          ...sizeValue,
          value: IdVariantRegular,
        });
      }
    },
    [variants, isVariant],
  );

  // this is for the case variant only has one item and one option in it
  // example: food with only variant base
  const hasOnlyOneValueOptions = useMemo(() => {
    const hasOptionsOnlyOne = options.length <= 1;
    const hasVariantOptionOnlyOne = options.every((o) => o.options.length <= 1);

    return hasOptionsOnlyOne && hasVariantOptionOnlyOne;
  }, [options]);

  // don't render if the product only has one variant and one options variant
  if (hasOnlyOneValueOptions) {
    return null;
  }

  return (
    <>
      {options.map((item, index) => (
        <CustomiseMenuOptionField
          key={`${item.label}-${index}`}
          label={item.label}
          options={item.options}
          onPress={(option) => handleOptionPress(option, item.label)}
          selectedValue={
            variants.fields.find((v) => v.name === item.label)?.value
          }
        />
      ))}
    </>
  );
};

export default MenuVariant;
