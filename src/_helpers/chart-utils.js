// @flow
import React from 'react';
import {
  isAfter,
  isBefore,
  differenceInHours,
  format,
  differenceInCalendarDays,
} from 'date-fns';

import {
  READABLE_TIME_FORMAT,
  READABLE_MONTH_FORMAT,
  CONCISE_READABLE_DATE_FORMAT,
  ABBREVIATED_READABLE_DATE_FORMAT,
  READABLE_MONTH_YEAR_FORMAT,
  DAILY,
  END_OF_DAY,
  WEEKLY,
  BI_WEEKLY,
  MONTHLY,
  BUSINESS_WEEK,
  END_OF_MONTH,
  QUARTERLY,
} from '_constants';
import { formatDate, formatUSD, formatNumber } from './string-utils';
import { EventStat, EventStatInterval } from '_models';
import { MinorXAxisTick } from '_components/Charts/MinorXAxisTick';
import {
  MajorXAxisTick,
  MajorXAxisTickLine,
} from '_components/Charts/MajorXAxisTick';

export type ChartPoint = { x: Date, y: number };

type DataSet = {
  [string]: Array<ChartPoint>,
};

type TickProps = {
  tickTotal: number,
  tickFormat: (any) => string,
};

type RenderXAxisTicksProps = {
  interval: EventStatInterval,
  tickProps: {
    x: number,
    y: number,
    payload: { value: Date },
    index: number,
  },
  timeZone: Object,
  dataLength: number,
};

export function dayFormat(t: Date): string {
  return format(new Date(t), 'MM/DD');
}

export function dayTimeFormat(t: Date): string {
  return format(new Date(t), 'MM/DD HH:MM');
}

export function periodicTooltip(stat: EventStat) {
  const periodicInventory = stat.isProjected
    ? stat.projectedPeriodicInventory
    : stat.periodicInventory;
  const periodicRevenue = stat.isProjected
    ? stat.projectedPeriodicRevenue
    : stat.periodicRevenue;
  const avgTicketPrice = stat.isProjected
    ? stat.projectedPeriodicRevenue / (stat.projectedPeriodicInventory * -1)
    : stat.periodicRevenue / (stat.periodicInventory * -1);

  return {
    periodicInventory: formatNumber(periodicInventory),
    periodicRevenue: formatUSD(periodicRevenue),
    avgTicketPrice: formatUSD(avgTicketPrice),
  };
}

export function cumulativeTooltip(stat: EventStat, totalInventory: number) {
  const inventory = stat.isProjected ? stat.projectedInventory : stat.inventory;
  const revenue = stat.isProjected ? stat.projectedRevenue : stat.revenue;
  const avgTicketPrice = stat.isProjected
    ? stat.projectedRevenue / (totalInventory - stat.projectedInventory)
    : stat.revenue / Math.abs(stat.soldInventory);

  return {
    inventory: formatNumber(inventory),
    revenue: formatUSD(revenue),
    avgTicketPrice: formatUSD(avgTicketPrice),
  };
}

export function getAxisTickOptions(dataset: DataSet = {}): TickProps {
  let firstDay;
  let lastDay;

  for (const key of Object.keys(dataset)) {
    for (const point of dataset[key]) {
      const { x: date } = point;
      if (!firstDay) firstDay = date;
      if (!lastDay) lastDay = date;

      if (isAfter(date, lastDay)) {
        lastDay = date;
      } else if (isBefore(date, firstDay)) {
        firstDay = date;
      }
    }
  }

  if (!firstDay || !lastDay) {
    return { tickTotal: 10, tickFormat: dayFormat };
  }

  const totalDays = differenceInCalendarDays(lastDay, firstDay);

  if (totalDays <= 1) {
    return {
      tickTotal: Math.min(differenceInHours(lastDay, firstDay), 6),
      tickFormat: dayTimeFormat,
    };
  } else if (totalDays) {
    return {
      tickTotal: Math.min(totalDays, END_OF_MONTH),
      tickFormat: dayFormat,
    };
  }

  // Fallback
  return { tickTotal: 10, tickFormat: dayFormat };
}

export function getChartRange(dataset: DataSet = {}): [number, number] {
  let max = -Infinity;
  let min = 0;
  for (const key of Object.keys(dataset)) {
    for (const point of dataset[key]) {
      const { y } = point;
      max = Math.max(max, y);
      min = Math.min(min, y);
    }
  }

  return [min, max];
}

/**
 * renderMinorXAxisTicks() has custom logic on how to breakdown
 * the ticks shown in the charts based on defined constants valuable to the
 * business.
 */
export function renderMinorXAxisTicks({
  interval,
  tickProps,
  dataLength,
  timeZone,
}: RenderXAxisTicksProps) {
  const {
    x,
    y,
    payload: { value },
  } = tickProps;
  let ticksToRender = [];
  let formattedValue = '';

  if (interval === 'Hours') {
    const dayRange = Math.ceil(dataLength / END_OF_DAY);

    switch (true) {
      case dayRange <= DAILY:
        // The ticks will render for the following hours:
        // 12:00am - 4:00am - 8:00am - 12:00pm - 4:00pm - 8:00pm
        ticksToRender = Array.from({ length: 6 }, (_, i) => `${i * 4}`);
        formattedValue = formatDate(value, READABLE_TIME_FORMAT, timeZone);
        break;
      case dayRange <= BUSINESS_WEEK:
        // 12:00am - 12:00pm
        ticksToRender = Array.from({ length: 2 }, (_, i) => `${i * 12}`);
        formattedValue = formatDate(value, READABLE_TIME_FORMAT, timeZone);
        break;
      case dayRange <= WEEKLY:
        // 12:00am
        ticksToRender = ['0'];
        formattedValue = formatDate(
          value,
          CONCISE_READABLE_DATE_FORMAT,
          timeZone
        );
        break;
      case dayRange <= BI_WEEKLY:
        // 12:00am
        ticksToRender = ['0'];
        formattedValue = formatDate(
          value,
          ABBREVIATED_READABLE_DATE_FORMAT,
          timeZone
        );
        break;
      default:
        // 12:00am
        ticksToRender = ['0'];
        formattedValue = formatDate(
          value,
          CONCISE_READABLE_DATE_FORMAT,
          timeZone
        );
        break;
    }

    const currentHour = formatDate(value, 'H', timeZone);
    if (ticksToRender.includes(currentHour))
      return <MinorXAxisTick x={x} y={y} value={formattedValue} />;
  }

  if (interval === 'Days') {
    const monthRange = Math.ceil(dataLength / END_OF_MONTH);
    switch (true) {
      case monthRange <= MONTHLY:
        // The ticks will render for the following days:
        // 1st - 8th - 15th - 22nd
        const weeksToFit = Math.floor(dataLength / WEEKLY);
        ticksToRender = Array.from(
          { length: weeksToFit },
          (_, i) => `${i * WEEKLY + 1}`
        );
        formattedValue = formatDate(
          value,
          CONCISE_READABLE_DATE_FORMAT,
          timeZone
        );
        break;
      case monthRange <= QUARTERLY:
        // 1st - 15th
        ticksToRender = Array.from(
          { length: 2 },
          (_, i) => `${i * BI_WEEKLY + 1}`
        );
        formattedValue = formatDate(
          value,
          CONCISE_READABLE_DATE_FORMAT,
          timeZone
        );
        break;
      default:
        // 1st
        ticksToRender = ['1'];
        formattedValue = formatDate(value, READABLE_MONTH_FORMAT, timeZone);
        break;
    }

    const currentDay = formatDate(value, 'D', timeZone);
    if (ticksToRender.includes(currentDay))
      return <MinorXAxisTick x={x} y={y} value={formattedValue} />;
  }
}

/**
 * renderMajorXAxisTicks() has custom logic on how to breakdown
 * the ticks shown in the charts based on defined constants valuable to the
 * business.
 */
export function renderMajorXAxisTicks({
  interval,
  tickProps,
  dataLength,
  timeZone,
}: RenderXAxisTicksProps) {
  const {
    x,
    y,
    payload: { value },
  } = tickProps;
  let ticksToRender = [];
  let tickLinesToRender = [];
  let formattedValue = '';

  if (interval === 'Hours') {
    const dayRange = Math.ceil(dataLength / END_OF_DAY);

    if (dayRange <= BUSINESS_WEEK) {
      ticksToRender = ['12']; // tick is placed in middle of day
      tickLinesToRender = ['0']; // tick line is placed at start of day
      formattedValue = formatDate(
        value,
        CONCISE_READABLE_DATE_FORMAT,
        timeZone
      );
    }

    const currentHour = formatDate(value, 'H', timeZone);
    if (ticksToRender.includes(currentHour))
      return <MajorXAxisTick x={x} y={y} value={formattedValue} />;

    if (tickLinesToRender.includes(currentHour))
      return <MajorXAxisTickLine x={x} y={y} value={formattedValue} />;
  }

  if (interval === 'Days') {
    const monthRange = Math.ceil(dataLength / END_OF_MONTH);

    if (monthRange === MONTHLY) {
      ticksToRender = [`${Math.floor(dataLength / 2)}`]; // tick is placed in middle of days shown
      tickLinesToRender = ['1']; // tick line is placed at start of month
      formattedValue = formatDate(value, READABLE_MONTH_YEAR_FORMAT, timeZone);
    } else if (monthRange <= QUARTERLY) {
      ticksToRender = ['15']; // tick is placed in middle of month
      tickLinesToRender = ['1']; // tick line is placed at start of month
      formattedValue = formatDate(value, READABLE_MONTH_YEAR_FORMAT, timeZone);
    }

    const currentDay = formatDate(value, 'D', timeZone);
    if (ticksToRender.includes(currentDay))
      return <MajorXAxisTick x={x} y={y} value={formattedValue} />;

    if (tickLinesToRender.includes(currentDay))
      return <MajorXAxisTickLine x={x} y={y} value={formattedValue} />;
  }
}

/**
 * renderMobileXAxisTicks() has custom logic on how to breakdown
 * the ticks shown in the charts based on defined constants valuable to the
 * business.
 */
export function renderMobileXAxisTicks({
  interval,
  tickProps,
  dataLength,
  timeZone,
}: RenderXAxisTicksProps) {
  const {
    x,
    y,
    payload: { value },
  } = tickProps;
  let ticksToRender = [];
  let tickLinesToRender = [];
  let formattedValue = '';

  if (interval === 'Hours') {
    const dayRange = Math.ceil(dataLength / END_OF_DAY);

    if (dayRange <= BUSINESS_WEEK) {
      ticksToRender = ['12']; // tick is placed in middle of day
      tickLinesToRender = ['0']; // tick line is placed at start of day
      formattedValue = formatDate(
        value,
        CONCISE_READABLE_DATE_FORMAT,
        timeZone
      );
    } else {
      ticksToRender = ['12']; // tick is placed in middle of day
      tickLinesToRender = ['0']; // tick line is placed at start of day
      formattedValue = formatDate(value, 'ddd', timeZone);
    }

    const currentHour = formatDate(value, 'H', timeZone);
    if (ticksToRender.includes(currentHour))
      return <MajorXAxisTick x={x} y={y} value={formattedValue} />;

    if (tickLinesToRender.includes(currentHour))
      return <MajorXAxisTickLine x={x} y={y} value={formattedValue} />;
  }

  if (interval === 'Days') {
    const monthRange = Math.ceil(dataLength / END_OF_MONTH);

    if (monthRange === MONTHLY) {
      ticksToRender = [`${Math.floor(dataLength / 2)}`]; // tick is placed in middle of days shown
      tickLinesToRender = ['1']; // tick line is placed at start of month
      formattedValue = formatDate(value, 'MMMM', timeZone);
    } else if (monthRange <= QUARTERLY) {
      ticksToRender = ['15']; // tick is placed in middle of month
      tickLinesToRender = ['1']; // tick line is placed at start of month
      formattedValue = formatDate(value, 'MMMM', timeZone);
    } else {
      ticksToRender = ['15']; // tick is placed in middle of month
      tickLinesToRender = ['1']; // tick line is placed at start of month
      formattedValue = formatDate(value, 'MMM', timeZone);
    }

    const currentDay = formatDate(value, 'D', timeZone);
    if (ticksToRender.includes(currentDay))
      return <MajorXAxisTick x={x} y={y} value={formattedValue} />;

    if (tickLinesToRender.includes(currentDay))
      return <MajorXAxisTickLine x={x} y={y} value={formattedValue} />;
  }
}
