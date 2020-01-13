// @flow
export type EDPricingStats = {
  min: number,
  max: number,
};

export type EDPricingPreview = {
  event: EDPricingStats,
  sections: {
    [section: string]: EDPricingStats,
  },
};
