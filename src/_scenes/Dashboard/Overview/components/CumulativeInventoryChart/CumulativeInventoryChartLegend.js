import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function CumulativeInventoryChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        label={hasProjected ? 'Actual Revenue' : 'Revenue'}
        color={cssConstants.SECONDARY_PURPLE}
      />
      {hasProjected && (
        <ChartLegendItem
          dashed
          color={cssConstants.SECONDARY_LIGHT_PURPLE}
          label="Projected Inventory"
        />
      )}
    </Fragment>
  );
}
