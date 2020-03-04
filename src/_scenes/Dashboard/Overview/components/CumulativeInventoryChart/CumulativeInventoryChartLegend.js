import React, { Fragment } from 'react';

import { colors } from '_constants';
import { ChartLegendItem } from '_components';

export function CumulativeInventoryChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        label={hasProjected ? 'Actual Revenue' : 'Revenue'}
        color={colors.purple}
      />
      {hasProjected && (
        <ChartLegendItem
          dashed
          color={colors.purple}
          label="Projected Inventory"
        />
      )}
    </Fragment>
  );
}
