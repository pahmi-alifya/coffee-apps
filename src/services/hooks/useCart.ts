import {CartCountType, CartQueryParams} from '@models/CartModel';
import {laggy, useQuery} from '@swr';
import {transaction} from '@url';
import {ResponseDto} from '@utils';

export const cartKeys = {
  all: /\/cart/,
  count: transaction('cart/count'),
};

export const useCartCount = (params: CartQueryParams, enabled = true) =>
  useQuery<ResponseDto<CartCountType>>(cartKeys.count, {
    use: [laggy],
    enabled: !!params.id_outlet && enabled,
  });
