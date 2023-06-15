import {default as LibCurrency} from 'currency.js';

const currency = (val: number): string => {
  const libOptions = {
    symbol: 'Rp',
    decimal: ',',
    precision: 0,
    separator: '.',
  };

  return LibCurrency(val || 0, libOptions).format();
};

export default currency;
