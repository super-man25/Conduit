import {
  getAxisTickOptions,
  dayFormat,
  dayTimeFormat,
  getChartRange,
  cumulativeTooltip
} from '../chart-utils';
import { addDays, subDays, startOfDay, endOfDay, format } from 'date-fns';

describe('getAxisTickOptions', () => {
  it('should return a sane default', () => {
    expect(getAxisTickOptions({})).toEqual({
      tickTotal: 10,
      tickFormat: dayFormat
    });
  });

  it('should return the number of days in a dataset when number of days is greater than 1 and less than 31', () => {
    const dataset = {
      actual: [
        {
          x: subDays(new Date(), 15),
          y: 0
        },
        {
          x: new Date(),
          y: 0
        }
      ],
      projected: [
        {
          x: addDays(new Date(), 15),
          y: 0
        }
      ]
    };
    expect(getAxisTickOptions(dataset)).toEqual({
      tickTotal: 30,
      tickFormat: dayFormat
    });
  });

  it('should return the number of hours in a dataset when number of days is less than 1', () => {
    const dataset = {
      actual: [
        {
          x: startOfDay(new Date(10000)),
          y: 0
        }
      ],
      projected: [
        {
          x: endOfDay(new Date(10000)),
          y: 0
        }
      ]
    };

    expect(getAxisTickOptions(dataset)).toEqual({
      tickTotal: 6,
      tickFormat: dayTimeFormat
    });
  });

  it('should return a maximum of 31 ticks if number of days is greater than 31', () => {
    const dataset = {
      actual: [
        {
          x: addDays(new Date(), 50),
          y: 0
        }
      ],
      projected: [
        {
          x: new Date(),
          y: 0
        }
      ]
    };

    expect(getAxisTickOptions(dataset)).toEqual({
      tickTotal: 31,
      tickFormat: dayFormat
    });
  });
});

describe('dayFormat', () => {
  it('should return a date formatted as MM/DD', () => {
    const d = new Date('2018-04-17T19:28:43+00:00');
    expect(dayFormat(d)).toEqual(format(d, 'MM/DD'));
  });
});

describe('timeFormat', () => {
  it('should return a date formatted as MM/DD HH:MM', () => {
    const d = new Date('2018-04-17T19:28:43+00:00');
    expect(dayTimeFormat(d)).toEqual(format(d, 'MM/DD HH:MM'));
  });
});

describe('getChartRange', () => {
  it('should calculate the range, lower bounded by 0', () => {
    const dataset = {
      actual: [{ y: 10 }, { y: 20 }, { y: 30 }],
      projected: [{ y: 40 }, { y: 50 }, { y: 60 }]
    };

    expect(getChartRange(dataset)).toEqual([0, 60]);
  });

  it('if the range goes below 0, should be lower bounded by the minimum', () => {
    const dataset = {
      actual: [{ y: 10 }, { y: 20 }, { y: 30 }],
      projected: [{ y: 40 }, { y: -50 }, { y: 60 }]
    };

    expect(getChartRange(dataset)).toEqual([-50, 60]);
  });

  it('if all values are below 0, should still return a viable range', () => {
    const dataset = {
      actual: [{ y: -10 }, { y: -20 }, { y: -30 }],
      projected: [{ y: -40 }, { y: -50 }, { y: -60 }]
    };

    expect(getChartRange(dataset)).toEqual([-60, -10]);
  });
});

describe('cumulativeTooltip', () => {
  it('should create accurate values for actual data', () => {
    const dataset = {
      isProjected: false,
      inventory: 50,
      revenue: 2000,
      soldInventory: 100
    };

    expect(cumulativeTooltip(dataset, undefined)).toEqual({
      inventory: '50',
      revenue: '$2,000.00',
      avgTicketPrice: '$20.00'
    });
  });

  it('should create accurate values for projected data', () => {
    const dataset = {
      isProjected: true,
      projectedInventory: 50,
      projectedRevenue: 2000
    };

    const totalInventory = 150;

    expect(cumulativeTooltip(dataset, totalInventory)).toEqual({
      inventory: '50',
      revenue: '$2,000.00',
      avgTicketPrice: '$20.00'
    });
  });
});
