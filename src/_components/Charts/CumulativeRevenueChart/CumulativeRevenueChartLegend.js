import React, { Fragment } from 'react';
import { ChartLegendItem } from '_components';
import { cssConstants } from '_constants';

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
