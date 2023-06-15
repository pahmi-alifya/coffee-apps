import {AppSchema} from '@mock/server';
import {response} from '@utils';
import {Request, Response} from 'miragejs';

const getTransactionEstimate = (schema: AppSchema, request: Request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(422, {}, response(422, 'Authorization Failed', {}));
  }

  const outletId = request.queryParams?.id_outlet;

  if (!outletId) {
    return new Response(
      422,
      {},
      response(422, 'No outlet id is specified', {}),
    );
  }

  return new Response(
    200,
    {},
    response(
      200,
      'Successfuly get transaction estimation',
      schema.first('transactionEstimation')?.attrs,
    ),
  );
};

export default getTransactionEstimate;
