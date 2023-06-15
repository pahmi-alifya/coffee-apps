import {BannerType} from '@models';
import {laggy, useQuery} from '@swr';
import {story} from '@url';
import {ResponseDto} from '@utils';

export const bannerKeys = {
  all: /\/banner/,
  list: story('banner'),
};

export const useBanner = (enabled = true) =>
  useQuery<ResponseDto<BannerType[]>>(bannerKeys.list, {
    use: [laggy],
    immutable: true,
    enabled,
  });
