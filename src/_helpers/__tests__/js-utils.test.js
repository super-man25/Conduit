import { isDefined } from '_helpers/js-utils';

describe('isDefined', () => {
  it('should return false if a value is null or undefined', () => {
    expect(isDefined(null)).toEqual(false);
    expect(isDefined(undefined)).toEqual(false);
  });

  it('should return true if a value is not null or undefined', () => {
    [0, 1, false, true, {}, () => {}, Date, '', '123'].forEach((v) =>
      expect(isDefined(v)).toEqual(true)
    );
  });
});
