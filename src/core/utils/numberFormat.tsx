import {default as LibCurrency} from 'currency.js';

const numberFormat = (
  value: number,
  options?: {
    decimal?: string;
    precision?: number;
    separator?: string;
  },
): string => {
  return LibCurrency(value, {
    ...options,
    symbol: '',
    decimal: options?.decimal || ',',
    precision: options?.precision || 0,
    separator: options?.separator || '.',
  }).format();
};

export default numberFormat;
