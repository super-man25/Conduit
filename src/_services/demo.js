// @flow
import { post } from '_helpers/model-api';
import { DemoPriceContext, DemoPriceExample } from '_models';

type DemoPriceResponse = {
  prices: Array<number>
};

function getPrices(payload: {
  context: DemoPriceContext,
  examples: Array<DemoPriceExample>
}): Promise<DemoPriceResponse> {
  return post('client/demo/price', payload);
}

export const demoService = {
  getPrices
};
