import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function PeriodicRevenueChartLegend() {
  return (
    <Fragment>
      <ChartLegendItem
        label="Actual Revenue"
        color={cssConstants.PRIMARY_BLUE}
      />
      <ChartLegendItem
        label="Projected Revenue"
        color={cssConstants.PRIMARY_LIGHT_BLUE}
      />
    </Fragment>
  );
}
