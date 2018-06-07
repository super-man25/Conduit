import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function CumulativeInventoryChartLegend() {
  return (
    <Fragment>
      <ChartLegendItem
        dashed
        color={cssConstants.SECONDARY_LIGHT_PURPLE}
        label="Projected Inventory"
      />
      <ChartLegendItem
        label="Actual Inventory"
        color={cssConstants.SECONDARY_LIGHT_PURPLE}
      />
    </Fragment>
  );
}
