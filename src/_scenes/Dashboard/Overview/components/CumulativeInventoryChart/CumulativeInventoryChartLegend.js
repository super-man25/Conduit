import React, { Fragment } from 'react';

import { colors } from '_constants';
import { ChartLegendItem } from '_components';

export function CumulativeInventoryChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        label={hasProjected ? 'Actual Inventory' : 'Inventory'}
        color={colors.blue}
      />
      {hasProjected && (
        <ChartLegendItem
          dashed
          color={colors.neonBlue}
          label="Projected Inventory"
        />
      )}
    </Fragment>
  );
}
