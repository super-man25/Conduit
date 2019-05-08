import { addHours } from 'date-fns';

import {
  readableDate,
  readableDateAndTime,
  readableDuration,
  orDash,
  titleCase,
  sentenceCase,
  truncateNumber,
  formatNumber,
  formatUSD
} from '_helpers/string-utils';

describe('readableDate', () => {
  it('should format the date to the correct format', () => {
    const date = new Date('2018-04-17T19:28:43+00:00');
    const readable = readableDate(date);
    expect(typeof readable).toBe('string');

    // Explicit check commented out because there's not a good way to write a resilient
    // test that works across timezones because the date-fns format uses the system
    // timezone
    // expect(readable).toBe('Tue, 4/17/18 @ 2:28PM');
  });

  it('should format the date to the correct format given a timeZone', () => {
    const date = new Date('2019-05-16T00:35:00Z');
    const timeZone = 'America/New_York';
    const readable = readableDate(date, timeZone);
    expect(readable).toBe('Wed, 5/15/19 @ 8:35 PM EDT');
  });
});

describe('readableDateAndTime', () => {
  it('should format the date to the correct format given a timeZone', () => {
    const date = new Date('2019-05-16T00:35:00Z');
    const timeZone = 'America/New_York';
    const readable = readableDateAndTime(date, timeZone);
    expect(readable).toBe('Wednesday, May 15th, 2019 @ 8:35 PM EDT');
  });
});

describe('readableDuration', () => {
  it('should take the duration from now', () => {
    const d = addHours(new Date(), 1);
    const readable = readableDuration(d);
    expect(readable).toBe('about 1 hour');
  });

  it('should take the duration from a different time', () => {
    const d1 = addHours(new Date(), 1);
    const d0 = addHours(new Date(), -1);
    const readable = readableDuration(d1, d0);
    expect(readable).toBe('about 2 hours');
  });
});

describe('orDash', () => {
  it('should return the value if it exists', () => {
    const vals = ['cat', 1, {}, [], new Date(), true, false];

    for (const v of vals) {
      expect(orDash(v)).toEqual(v);
    }
  });

  it('should return dashes if it does not exist', () => {
    const vals = [undefined, null];
    for (const v of vals) {
      expect(orDash(v)).toEqual('--');
    }
  });

  describe('titleCase', () => {
    it('should return the string in title case', () => {
      const original = 'john malcolm';
      const result = titleCase(original);
      expect(result).toEqual('John Malcolm');
    });
  });

  describe('sentenceCase', () => {
    it('should return the string in sentence case', () => {
      const original = 'all Small lettErs';
      const result = sentenceCase(original);
      expect(result).toEqual('All small letters');
    });
  });
});

describe('truncateNumber', () => {
  it('should return a truncated number formatted based on its value', () => {
    expect(truncateNumber(100)).toEqual('100');
    expect(truncateNumber(1000)).toEqual('1k');
    expect(truncateNumber(1500)).toEqual('1.50k');
    expect(truncateNumber(100000)).toEqual('100k');
    expect(truncateNumber(1000000)).toEqual('1M');
    expect(truncateNumber(1500000)).toEqual('1.50M');
    expect(truncateNumber(155550000)).toEqual('155.55M');
    expect(truncateNumber(-100)).toEqual('-100');
    expect(truncateNumber(-1000)).toEqual('-1k');
    expect(truncateNumber(-1500)).toEqual('-1.50k');
    expect(truncateNumber(-100000)).toEqual('-100k');
    expect(truncateNumber(-1000000)).toEqual('-1M');
    expect(truncateNumber(-1500000)).toEqual('-1.50M');
    expect(truncateNumber(-155550000)).toEqual('-155.55M');
  });
});

describe('formatNumber', () => {
  it('should return a number with commas in the correct places', () => {
    expect(formatNumber(100)).toEqual('100');
    expect(formatNumber(1000)).toEqual('1,000');
    expect(formatNumber(1000000)).toEqual('1,000,000');
    expect(formatNumber(-100)).toEqual('-100');
    expect(formatNumber(-1000)).toEqual('-1,000');
    expect(formatNumber(-1000000)).toEqual('-1,000,000');
  });

  it('should return dashes for bad values', () => {
    const bad = ['str', undefined, null];

    for (const val of bad) {
      expect(formatNumber(val)).toEqual('--');
    }
  });
});

describe('formatUSD', () => {
  it('should return a number formatted in US currency', () => {
    expect(formatUSD(100)).toEqual('$100.00');
    expect(formatUSD(1000)).toEqual('$1,000.00');
    expect(formatUSD(100.5)).toEqual('$100.50');
    expect(formatUSD(1000.5)).toEqual('$1,000.50');
  });
});
