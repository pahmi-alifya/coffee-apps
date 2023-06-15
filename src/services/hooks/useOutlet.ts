import {OutletType} from '@models';
import {OutletQueryParam} from '@models/OutletModel';
import {laggy, useQuery} from '@swr';
import {outlet} from '@url';
import {ResponseDto} from '@utils';
import {useMemo} from 'react';

export const outletKeys = {
  all: /\/v1\/outlets/,
  list: (params: OutletQueryParam) => outlet('v1/outlets', params),
};

export const useOutlets = (params: OutletQueryParam, enabled = true) =>
  useQuery<ResponseDto<OutletType[]>>(outletKeys.list(params), {
    use: [laggy],
    enabled,
  });

export const useSortedOutlets = (
  outlets?: OutletType[],
  selectedOutletId?: number,
) => {
  const sortedOutlets = useMemo(() => {
    if (!outlets) {
      return undefined;
    }

    const distance = outlets.sort(
      (a, b) => a.distance_in_km - b.distance_in_km,
    );
    const openStatus = outlets.sort(
      (a, b) => Number(b.is_open) - Number(a.is_open),
    );
    const selected = selectedOutletId
      ? outlets.sort(
          (a, b) =>
            Number(b.id_outlet === selectedOutletId) -
            Number(a.id_outlet === selectedOutletId),
        )
      : false;

    return distance || openStatus || selected;
  }, [outlets, selectedOutletId]);

  return sortedOutlets;
};
