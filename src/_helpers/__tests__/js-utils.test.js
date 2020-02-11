import { createActionTypeCreator } from '_helpers/js-utils';

describe('createActionTypeCreator', () => {
  it('should create a function that returns namespaced action types', () => {
    const actionCreator = createActionTypeCreator('NAMESPACE');

    expect(actionCreator('ACTION')).toEqual('NAMESPACE/ACTION');
    expect(actionCreator('ACTION_TYPE')).toEqual('NAMESPACE/ACTION_TYPE');
  });
});
