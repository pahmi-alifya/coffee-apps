import {transaction} from '@url';
import {Server} from 'miragejs';
import getTransactionEstimate from './get-transaction-estimate';
import postTransaction from './post-transaction';

const registerTransactionRoutes = (context: Server) => {
  return [
    context.get(transaction('transaction-estimate'), getTransactionEstimate),
    context.post(transaction('transaction'), postTransaction),
  ];
};

export default registerTransactionRoutes;
