// @flow
export type EDInventoryRow = {
  section: string,
  row: string,
  priceScaleId: number,
  seats: number,
  listedPrice: number,
  isListed: boolean,
  overridePrice: ?number,
  id: string
};
