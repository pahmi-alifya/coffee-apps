import {AppRegistry} from '@mock/server';
import {TransactionType} from '@models';
import {response} from '@utils';
import {RouteHandler} from 'miragejs/server';

const getJiwaPointTransaction: RouteHandler<AppRegistry> = (
  schema,
  request,
) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', []);
  }

  const type = request.params?.type;
  const data = schema.where('jiwaPointTransaction', {
    transaction_type: type?.toUpperCase() as TransactionType,
  }).models;

  return response(200, 'Successfully get jiwa point transactions!', data);
};

export default getJiwaPointTransaction;
