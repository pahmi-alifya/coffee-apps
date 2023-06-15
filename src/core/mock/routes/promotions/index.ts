import {promotions} from '@url';
import {Server} from 'miragejs';
import getVoucherCount from './get-voucher-count';

const registerPromotionRoutes = (context: Server) => {
  return [context.get(promotions('/v1/vouchers/count'), getVoucherCount)];
};

export default registerPromotionRoutes;
