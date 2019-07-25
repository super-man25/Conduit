// @flow
export type PerformanceType = 'MLB' | 'NFL';

export type EDClient = {
  createdAt: Date,
  id: number,
  modifiedAt: Date,
  name: string,
  pricingInterval: number,
  logoUrl: string,
  performanceType: PerformanceType
};

export type EDClientList = {
  clients: EDClient[]
};
