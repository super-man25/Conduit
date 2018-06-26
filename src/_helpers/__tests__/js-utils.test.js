import { isDefined, createActionTypeCreator } from '_helpers/js-utils';

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

describe('createActionTypeCreator', () => {
  it('should create a function that returns namespaced action types', () => {
    const actionCreator = createActionTypeCreator('NAMESPACE');

    expect(actionCreator('ACTION')).toEqual('NAMESPACE/ACTION');
    expect(actionCreator('ACTION_TYPE')).toEqual('NAMESPACE/ACTION_TYPE');
  });
});
