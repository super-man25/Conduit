// @flow
import type { EDEventCategory } from '_models/eventCategory';

export { default as saga } from './saga';

const FETCH_EVENT_CATEGORIES = 'eventCategory/FETCH_EVENT_CATEGORIES';
const FETCH_EVENT_CATEGORIES_SUCCESS =
  'eventCategory/FETCH_EVENT_CATEGORIES_SUCCESS';
const FETCH_EVENT_CATEGORIES_ERROR =
  'eventCategory/FETCH_EVENT_CATEGORIES_ERROR';
const RESET_EVENT_CATEGORIES = 'eventCategory/RESET_EVENT_CATEGORIES';

// Action types
export type FetchEventCategoryAction = {
  type: 'eventCategory/FETCH_EVENT_CATEGORIES'
};

export type FetchEventCategorySuccessAction = {
  type: 'eventCategory/FETCH_EVENT_CATEGORIES_SUCCESS',
  payload: EDEventCategory[]
};

export type FetchEventCategoryErrorAction = {
  type: 'eventCategory/FETCH_EVENT_CATEGORIES_ERROR',
  payload: Error
};

export type ResetEventCategoryAction = {
  type: 'eventCategory/RESET_EVENT_CATEGORIES'
};

export type Action =
  | FetchEventCategoryAction
  | FetchEventCategorySuccessAction
  | FetchEventCategoryErrorAction
  | ResetEventCategoryAction;

export const types = {
  FETCH_EVENT_CATEGORIES,
  FETCH_EVENT_CATEGORIES_SUCCESS,
  FETCH_EVENT_CATEGORIES_ERROR,
  RESET_EVENT_CATEGORIES
};

// Actions
const fetchEventCategories = (): FetchEventCategoryAction => ({
  type: FETCH_EVENT_CATEGORIES
});

const resetEventCategories = (): ResetEventCategoryAction => ({
  type: RESET_EVENT_CATEGORIES
});

export const actions = {
  fetchEventCategories,
  resetEventCategories
};

// State/reducer
type State = {
  eventCategories: EDEventCategory[],
  loading: boolean,
  error: ?Error
};

export const initialState: State = {
  eventCategories: [],
  loading: false,
  error: null
};

type Store = {
  eventCategory: State
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_EVENT_CATEGORIES:
      return { ...state, loading: true };
    case FETCH_EVENT_CATEGORIES_SUCCESS:
      return { ...state, loading: false, eventCategories: action.payload };
    case FETCH_EVENT_CATEGORIES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case RESET_EVENT_CATEGORIES:
      return { ...initialState };
    default:
      return state;
  }
};

// selectors
const selectAllEventCategories = (store: Store) =>
  store.eventCategory.eventCategories;

const selectEventCategoryMap = (store: Store) =>
  store.eventCategory.eventCategories.reduce((acc, eventCategory) => {
    const { id, ...rest } = eventCategory;
    return { ...acc, [id]: rest };
  }, {});

const selectIsLoading = (store: Store) => store.eventCategory.loading;

export const selectors = {
  selectAllEventCategories,
  selectEventCategoryMap,
  selectIsLoading
};
