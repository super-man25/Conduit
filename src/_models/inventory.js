// @flow
export type EDInventoryRow = {
  section: string,
  row: string,
  priceScaleId: number,
  seats: [number],
  listedPrice: number,
  isListed: boolean,
  overridePrice: ?number,
  minimumPrice: number,
  maximumPrice: number,
  id: string
};

export type EDInventorySectionFilter = {
  name: string
};

export type EDSectionsToPriceScale = {
  priceScaleId: string,
  sections: number[]
};

export type EDInventorySort = {
  name: string,
  direction: string
};
