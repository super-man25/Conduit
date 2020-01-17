import { get, post, put, del } from '_helpers/api';
import { normalize, denormalize } from './normalizers/priceRule';
import lodashGet from 'lodash.get';

const route = 'proVenuePricingRules';

function getAll(params) {
  return get(route, params).then((pr) => pr.map(normalize));
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

function deletePriceRule(id) {
  return del(`${route}/${id}`).catch(handleResponseError);
}

function getOne(id) {
  return get(`${route}/${id}`).then(normalize);
}

function handleResponseError(error) {
  switch (error.code) {
    case 409:
      let errorStrings = [];
      errorStrings = conflictingPriceRule(errorStrings, error);
      errorStrings = disabledBuyerType(errorStrings, error);
      error.toString = () => errorStrings.join(' ');
      break;
    default:
      error.toString = () => `Error saving price rule`;
  }

  throw error;
}

function conflictingPriceRule(errorStrings, error) {
  if (lodashGet(error, 'body.proVenuePricingRules', []).length > 0) {
    return [...errorStrings, 'Conflicts with existing price rule.'];
  }
  return errorStrings;
}

function disabledBuyerType(errorStrings, error) {
  if (lodashGet(error, 'body.excludedBuyerTypes', []).length > 0) {
    return [...errorStrings, 'Active rule cannot have disabled buyer types.'];
  }
  return errorStrings;
}

export const priceRuleService = {
  getAll,
  create,
  update,
  getOne,
  deletePriceRule,
};
