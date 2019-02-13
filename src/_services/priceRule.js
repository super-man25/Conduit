import { get } from '_helpers/api';

function getAll() {
  return get('proVenuePricingRules').then(normalizePriceRules);
}

function normalizePriceRules(priceRules) {
  return priceRules.map((priceRule) => ({
    ...priceRule,
    ...priceRule.proVenuePricingRule,
    proVenuePricingRule: undefined
  }));
}

export const priceRuleService = {
  getAll
};
