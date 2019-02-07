import { get } from '_helpers/api';

function getAll() {
  return get('buyerTypes');
}

export const buyerTypeService = {
  getAll
};
