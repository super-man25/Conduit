import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function PeriodicRevenueChartLegend() {
  return (
    <Fragment>
      <ChartLegendItem
        color={cssConstants.PRIMARY_DARK_BLUE}
        label="Projected Revenue"
      />
      <ChartLegendItem label="Actual Revenue" />
    </Fragment>
  );
}
