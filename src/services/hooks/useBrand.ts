import {BrandType} from '@models';
import {laggy, useQuery} from '@swr';
import {outlet} from '@url';
import {ResponseDto} from '@utils';

export const brandKeys = {
  all: /\/v1\/brands/,
  list: outlet('v1/brands'),
};

export const useBrands = (enabled = true) =>
  useQuery<ResponseDto<BrandType[]>>(brandKeys.list, {
    use: [laggy],
    immutable: true,
    enabled,
  });
