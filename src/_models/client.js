// @flow

export type EDClient = {
  createdAt: Date,
  id: number,
  modifiedAt: Date,
  name: string,
  pricingInterval: number,
  logoUrl: string
};

export type EDClientList = {
  clients: EDClient[]
};
