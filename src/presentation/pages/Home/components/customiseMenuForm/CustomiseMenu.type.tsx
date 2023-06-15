import {CartType} from '@models';

// get from bannerContainer height - userInformation bottom offset
// 130 - 45 = 85
export const HEADER_OFFSET = 85;

// this is variable to set the validation ice and hot
// the value got from BE guys
export const ProductVariantNameVariant = 'Variant';
export const IdVariantIce = 3;
export const IdVariantHot = 4;
export const ProductVariantNameSize = 'Size';
export const IdVariantRegular = 6;
export const ProductVariantNonSkuNameIce = 'Ice';
export const IdVariantNonSkuIces = [1, 2];

export interface CustomiseMenuModalProps {
  productId?: number | null;
  outletId?: number | null;
  cartData?: CartType;
}

export interface CustomiseMenuForm {
  variantNonSkus: Array<{name: string; value: number}>;
  variants: Array<{name: string; value: number}>;
  modifiers: Array<{name: string; values: number[]}>;
  quantity: number;
  note: string;
}
