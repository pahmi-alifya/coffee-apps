import {faker} from '@faker-js/faker';
import {AppRegistry} from '@mock/server';
import {CartBodyType, VariantNonSkuType} from '@models';
import {response} from '@utils';
import {Response} from 'miragejs';
import {RouteHandler} from 'miragejs/server';

const postCart: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return new Response(
      401,
      {},
      response(401, 'Authorization Failed!', undefined),
    );
  }

  const body: CartBodyType = JSON.parse(request.requestBody);

  const product = schema.findBy('product', {id_product: body.id_product});

  if (!product) {
    return new Response(
      404,
      {},
      response(404, 'Product not found!', undefined),
    );
  }

  // relationship variants
  const variants = schema.all('variant').models.filter((v) => {
    return body.variant.some(
      (x) => x.product_variant_master === v.product_variant_master,
    );
  });
  const selectedVariants = variants.map((v) => ({
    product_variant_master: v.product_variant_master,
    product_variant: v.product_variant.filter((x) =>
      body.variant.some((y) => y.product_variant.includes(x)),
    ),
  }));

  // relationship variant_nonsku
  const variantNonSkuModel = schema.all('variantNonSku').models;
  const variantNonSkuItems = variantNonSkuModel.reduce(
    (acc, cur) => [...acc, ...cur.variant_non_sku],
    [] as VariantNonSkuType['variant_non_sku'],
  );
  const selectedVariantNonSku = variantNonSkuItems.filter((v) =>
    body.variant_non_sku.includes(v.id_variant_non_sku_detail),
  );
  const variantNonSkuDetails = selectedVariantNonSku.map(
    (v) => v.variant_non_sku_detail,
  );

  // relationship modifiers
  const modifiers = schema.all('modifier').models.filter((m) => {
    return body.modifier.some(
      (x) => x.product_modifier_master === m.product_modifier_master,
    );
  });

  const cart = schema.create('cart', {
    id_cart_item: faker.datatype.number({min: 40, max: 9999}),
    id_product: body.id_product,
    id_outlet: body.id_outlet,
    id_brand: body.id_brand,
    product_name: product.product_name,
    product_photo: product.product_photo,
    qty: body.qty,
    subtotal: body.subtotal,
    notes: body.notes,
    variant: selectedVariants,
    variant_nonsku: variantNonSkuDetails,
    modifier: modifiers,
  });

  // response with cart
  return new Response(
    200,
    {},
    response(200, 'Successfully get carts!', cart.attrs),
  );
};

export default postCart;
