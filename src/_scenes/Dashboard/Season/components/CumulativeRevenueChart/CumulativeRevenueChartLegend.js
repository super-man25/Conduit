import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function CumulativeRevenueChartLegend() {
  return (
    <Fragment>
      <ChartLegendItem
        dashed
        color={cssConstants.PRIMARY_LIGHT_BLUE}
        label="Projected Revenue"
      />
      <ChartLegendItem label="Actual Revenue" />
    </Fragment>
  );
}
