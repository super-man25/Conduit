import { get, put } from '_helpers/api';
import { denormalize } from './normalizers/buyerType';

function getAll(params) {
  return get('buyerTypes', params);
}

function updateMultiple(buyerTypes) {
  return denormalize(buyerTypes).then((payload) =>
    put('buyerTypes/_bulk', payload, {
      headers: { 'Content-Type': 'application/json' },
    }).catch(handleResponseError)
  );
}

function handleResponseError(error) {
  switch (error.code) {
    case 409:
      error.toString = () => `Conflicts with existing rule`;
      break;
    default:
      error.toString = () => `Error saving buyer type`;
  }

  throw error;
}

export const buyerTypeService = {
  getAll,
  updateMultiple,
};
