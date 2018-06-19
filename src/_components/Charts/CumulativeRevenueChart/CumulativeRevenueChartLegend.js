import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function CumulativeRevenueChartLegend() {
  return (
    <Fragment>
      <ChartLegendItem label="Actual Revenue" />
      <ChartLegendItem
        dashed
        color={cssConstants.PRIMARY_LIGHT_BLUE}
        label="Projected Revenue"
      />
    </Fragment>
  );
}
