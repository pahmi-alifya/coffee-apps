import {Column, Spacer, Spacing, Text} from '@atoms';
import {ProductType} from '@models';
import {CustomiseMenuCheckboxField} from '@organisms';
import React, {useCallback} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {CustomiseMenuForm} from './CustomiseMenu.type';

interface Props {
  product?: ProductType;
}

const MenuModifier: React.FC<Props> = ({product}) => {
  const {control} = useFormContext<CustomiseMenuForm>();
  const modifiers = useFieldArray({control, name: 'modifiers'});

  const handleItemPress = useCallback(
    (modifierId: number, index: number) => {
      const value = modifiers.fields?.[index];
      const isExist = value?.values?.includes(modifierId);

      if (isExist) {
        return modifiers.update(index, {
          ...value,
          values: value.values.filter((v) => v !== modifierId),
        });
      }

      modifiers.update(index, {
        ...value,
        values: [...value.values, modifierId],
      });
    },
    [modifiers],
  );

  return (
    <>
      {product?.modifier.map((item, index) => {
        const isLast = index + 1 === product.modifier.length;

        return (
          <Column
            key={`${item.product_modifier_master}-${index}`}
            margin={{b: isLast ? 0 : Spacing.Standard}}>
            <Text type="b1" weight="bold">
              {item.product_modifier_master}
            </Text>

            <Spacer length={Spacing.Small} />

            {item.product_modifier.map((m) => (
              <CustomiseMenuCheckboxField
                key={m.id_modifier}
                label={m.modifier_name}
                onPress={() => handleItemPress(m.id_modifier, index)}
                price={m.modifier_price}
                selected={modifiers.fields?.[index]?.values?.includes(
                  m.id_modifier,
                )}
              />
            ))}
          </Column>
        );
      })}
    </>
  );
};

export default MenuModifier;
