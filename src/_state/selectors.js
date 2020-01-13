// @flow
// Non state slice specific selectors
export type RouterState = {
  location: {
    pathname: string,
    search: string,
    hash: string,
    key: string,
  },
  action: string,
};

export const selectRouterLocation = (state: { router: RouterState }) =>
  state.router.location;
