import { get, post, put } from '_helpers/api';
import { normalize, denormalize } from './normalizers/priceRule';

const route = 'proVenuePricingRules';

function getAll() {
  return get(route).then((pr) => pr.map(normalize));
}

function create(priceRule) {
  return denormalize(priceRule).then((payload) =>
    post(route, payload).catch(handleResponseError)
  );
}

function update(priceRule) {
  return denormalize(priceRule).then((payload) =>
    put(`${route}/${priceRule.id}`, payload).catch(handleResponseError)
  );
}

function getOne(id) {
  return get(`${route}/${id}`).then(normalize);
}

function handleResponseError(error) {
  switch (error.code) {
    case 409:
      error.toString = () => `Conflicts with existing rule`;
      break;
    default:
      error.toString = () => `Error saving price rule`;
  }

  throw error;
}

export const priceRuleService = {
  getAll,
  create,
  update,
  getOne
};
