import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function PeriodicInventoryChartLegend() {
  return (
    <Fragment>
      <ChartLegendItem
        color={cssConstants.SECONDARY_PURPLE}
        label="Projected Inventory"
      />
      <ChartLegendItem
        label="Actual Inventory"
        color={cssConstants.SECONDARY_LIGHT_PURPLE}
      />
    </Fragment>
  );
}
