import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';
import {BrandType} from './BrandModel';

export type OutletQueryParam = {
  sort_by: 'distance';
  latlong: string;
  pagenumber: number;
  pagesize: number;
  search: string;
  brand?: number;
};

export type OutletScheduleType = {
  outlet_schedule_id: number;
  id_outlet: number;
  day_of_week: number;
  open_time: string;
  close_time: string;
  created_at: string;
  deleted_at: string | null;
};

export type OutletType = {
  outlet_code: string;
  id_outlet: number;
  outlet_name: string;
  outlet_email: string;
  outlet_phone: string;
  outlet_status: string;
  plastic_used_status: boolean;
  delivery_order_status: boolean;
  outlet_different_price: boolean;
  outlet_ownership_status: string;
  outlet_special_fee: boolean;
  outlet_address: string;
  city: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  timezone_utc: number;
  created_at: string;
  updated_at: string;
  is_must_spunbound: boolean;
  outlet_schedules: OutletScheduleType[];
  outlet_brands: BrandType[];
  outlet_long: number;
  outlet_lat: number;
  is_open: boolean;
  distance_in_km: number;
};

export const OutletModel: ModelDefinition<OutletType> = Model.extend({});
