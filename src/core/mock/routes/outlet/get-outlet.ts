import {AppRegistry} from '@mock/server';
import {OutletQueryParam} from '@models/OutletModel';
import {response} from '@utils';
import {RouteHandler} from 'miragejs/server';

const getOutlet: RouteHandler<AppRegistry> = (schema, request) => {
  if (!request.requestHeaders.Authorization) {
    return response(401, 'Authorization Failed!', {});
  }

  const {brand: brandId, search: keyword} =
    request.queryParams as OutletQueryParam;

  /**
   * Update brands on each outlet.
   */
  schema.all('outlet').models.map((outlet) => {
    const outlet_brands = outlet.outlet_brands.map((brand) => {
      const _brand = schema.findBy('brand', {
        brand_id: brand.brand_id,
      })?.attrs;

      return {..._brand, ...brand};
    });

    outlet.update('outlet_brands', outlet_brands);
  });

  /**
   * Apply filters
   */
  const filteredOutlets = schema.where('outlet', (outlet) => {
    const filterByBrand = !!outlet.outlet_brands.find(
      (brand) => Number(brand.brand_id) === Number(brandId),
    );
    const filterByKeyword = outlet.outlet_name
      .toLowerCase()
      .includes(keyword.toLowerCase());

    if (brandId && keyword) {
      return filterByBrand && filterByKeyword;
    }

    if (brandId) {
      return filterByBrand;
    }

    if (keyword) {
      return filterByKeyword;
    }

    return true;
  });

  return response(200, 'Successfuly get outlets!', filteredOutlets.models);
};

export default getOutlet;
