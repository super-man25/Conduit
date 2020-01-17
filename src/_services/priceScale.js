import { get } from '_helpers/api';

function getAll() {
  return get('priceScales');
}

export const priceScaleService = {
  getAll,
};
