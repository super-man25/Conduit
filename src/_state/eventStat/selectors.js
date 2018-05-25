// @flow
import { createSelector } from 'reselect';
import type { EventStatState } from './reducer';
import type { DateRange } from '_helpers/types';

export const getModel = (state: EventStatState) => state.eventStats;
export const getFilterArguments = (state: EventStatState) => state.dateRange;
export const getDateLimits = (state: EventStatState): DateRange =>
  state.eventDateLimits;

export type EventStatChartData = {
  inventory: {
    actual: Array<{ x: Date, y: number }>,
    projected: Array<{ x: Date, y: number }>
  },
  revenue: {
    actual: Array<{ x: Date, y: number }>,
    projected: Array<{ x: Date, y: number }>
  }
};

// All data is sorted/returned from the server, here we format correctly to display in charts
export const getChartData = createSelector(
  getModel,
  (data): EventStatChartData => {
    const inventory = { actual: [], projected: [] };
    const revenue = { actual: [], projected: [] };

    for (const d of data) {
      if (d.isProjected) {
        revenue.projected.push({ x: d.date, y: d.revenue });
        inventory.projected.push({ x: d.date, y: d.inventory });
      } else {
        revenue.actual.push({ x: d.date, y: d.revenue });
        inventory.actual.push({ x: d.date, y: d.inventory });
      }
    }

    // For display purposes, we push the first item of the
    // projected set onto the actual set to get smooth lines
    // without holes in the chart
    if (revenue.actual.length && revenue.projected.length) {
      revenue.projected.unshift(revenue.actual[revenue.actual.length - 1]);
      inventory.projected.unshift(
        inventory.actual[inventory.actual.length - 1]
      );
    }

    return { inventory, revenue };
  }
);
