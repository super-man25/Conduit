import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function PeriodicInventoryChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        color={cssConstants.SECONDARY_PURPLE}
        label={hasProjected ? 'Actual Revenue' : 'Revenue'}
      />
      {hasProjected && (
        <ChartLegendItem
          color={cssConstants.SECONDARY_LIGHT_PURPLE}
          label="Projected Inventory"
        />
      )}
    </Fragment>
  );
}
