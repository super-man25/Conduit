import { normalize } from './eventStats.normalize';

describe('normalize', () => {
  it('should set default values', () => {
    const input = {};
    const output = normalize(input);
    expect(output).toEqual({
      eventId: undefined,
      id: undefined,
      inventory: undefined,
      revenue: undefined,
      isProjected: undefined,
      date: undefined,
      timestamp: undefined
    });
  });

  it('should parse timestamps from integers', () => {
    const unix = 10000;
    const date = new Date(unix);
    const input = {
      timestamp: unix
    };

    expect(normalize(input)).toEqual({
      eventId: undefined,
      id: undefined,
      inventory: undefined,
      revenue: undefined,
      isProjected: undefined,
      timestamp: unix,
      date
    });
  });
});
