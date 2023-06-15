import {VoucherCountType} from '@models/VoucherModel';
import {laggy, useQuery} from '@swr';
import {promotions} from '@url';
import {ResponseDto} from '@utils';

export const voucherKeys = {
  all: /\/v1\/vouchers/,
  count: promotions('/v1/vouchers/count'),
};

export const useVoucher = () =>
  useQuery<ResponseDto<VoucherCountType>>(voucherKeys.count, {
    use: [laggy],
    immutable: true,
  });
