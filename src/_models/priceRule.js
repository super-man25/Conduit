// @flow

export type EDPriceRule = {
  id: number,
  name: ?string,
  mirrorPriceScaleId: ?number,
  percent: ?number,
  constant: ?number,
  isActive: boolean,
  round: 'Ceil' | 'Floor' | 'Round' | 'None',

  externalBuyerTypeIds: string[],
  priceScaleIds: number[],
  eventIds: number[]
};

export const emptyEDPriceRule = {
  id: 0,
  name: null,
  mirrorPriceScaleId: null,
  percent: null,
  constant: null,
  isActive: true,
  round: 'Ceil',

  externalBuyerTypeIds: [],
  priceScaleIds: [],
  eventIds: []
};
