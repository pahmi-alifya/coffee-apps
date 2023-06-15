import {ProductListType, ProductQueryParams} from '@models';
import {laggy, useQuery} from '@swr';
import {product} from '@url';
import {ResponseDto} from '@utils';

export const productKeys = {
  all: /\/product/,
  list: (params: ProductQueryParams) => product('product', params),
  detail: (id: string) => product(`product/${id}`),
};

export const useProducts = (params: ProductQueryParams, enabled = true) =>
  useQuery<ResponseDto<ProductListType>>(productKeys.list(params), {
    use: [laggy],
    enabled: !!params.membership_lvl && !!params.id_outlet && enabled,
  });

export const useProductDetail = (id: string) => {
  // TODO: Add product detail query here.
};
