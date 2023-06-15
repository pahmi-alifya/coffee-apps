import {AppRegistry} from '@mock/server';
import {response} from '@utils';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const getProduct: RouteHandler<AppRegistry> = (schema, request) => {
  const productId = request.params?.id;

  // get all products
  if (!productId) {
    const products = schema.all('product').models;
    const categories = schema.all('category').models;

    const data = categories.map((c) => ({
      ...c.attrs,
      products: products.filter((p) => p.category_id === c.id_product_category),
    }));

    // response with products
    return new Response(
      200,
      {},
      response(200, 'Successfully get products!', data),
    );
  }

  // get one product
  const product = schema.find('product', productId);

  // product not found
  if (!product) {
    return new Response(
      404,
      {},
      response(404, 'Product not found!', undefined),
    );
  }

  // product found
  return new Response(
    200,
    {},
    response(200, 'Successfully get product!', product?.attrs),
  );
};

export default getProduct;
