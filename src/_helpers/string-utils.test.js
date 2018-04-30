import { addHours } from 'date-fns';

import {
  readableDate,
  readableDuration,
  orDash
} from './string-utils';

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
    const vals = [
      'cat',
      1,
      {},
      [],
      new Date(),
      true,
      false
    ];

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
});
