// @flow
import {
  isAfter,
  isBefore,
  differenceInHours,
  format,
  differenceInCalendarDays
} from 'date-fns';

type Point = { x: Date, y: number };

type DataSet = {
  [string]: Array<Point>
};

type TickProps = {
  tickTotal: number,
  tickFormat: (any) => string
};

export function dayFormat(t: Date): string {
  return format(new Date(t), 'MM/DD');
}

export function timeFormat(t: Date): string {
  return format(new Date(t), 'MM/DD HH:MM');
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
      tickFormat: timeFormat
    };
  } else if (totalDays) {
    return {
      tickTotal: Math.min(totalDays, 31),
      tickFormat: dayFormat
    };
  }
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
