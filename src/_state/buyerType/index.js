// @flow
import type { EDBuyerType } from '_models/buyerType';

export { default as saga } from './saga';

const FETCH_BUYER_TYPES = 'buyerType/FETCH_BUYER_TYPES';
const FETCH_BUYER_TYPES_SUCCESS = 'buyerType/FETCH_BUYER_TYPES_SUCCESS';
const FETCH_BUYER_TYPES_ERROR = 'buyerType/FETCH_BUYER_TYPES_ERROR';
const UPDATE_BUYER_TYPES = 'buyerType/UPDATE_BUYER_TYPES';
const UPDATE_BUYER_TYPES_SUCCESS = 'buyerType/UPDATE_BUYER_TYPES_SUCCESS';
const UPDATE_BUYER_TYPES_ERROR = 'buyerType/UPDATE_BUYER_TYPES_ERROR';
const OPEN_BUYER_TYPES_MODAL = 'buyerType/OPEN_BUYER_TYPES_MODAL';
const CLOSE_BUYER_TYPES_MODAL = 'buyerType/CLOSE_BUYER_TYPES_MODAL';
const RESET_BUYER_TYPES = 'buyerType/RESET_BUYER_TYPES';

// Action types
export type FetchBuyerTypesAction = {
  type: 'buyerType/FETCH_BUYER_TYPES'
};

export type FetchBuyerTypesSuccessAction = {
  type: 'buyerType/FETCH_BUYER_TYPES_SUCCESS',
  payload: EDBuyerType[]
};

export type FetchBuyerTypesErrorAction = {
  type: 'buyerType/FETCH_BUYER_TYPES_ERROR',
  payload: Error
};

export type UpdateBuyerTypesAction = {
  type: 'buyerType/UPDATE_BUYER_TYPES',
  payload: any
};

export type UpdateBuyerTypesSuccessAction = {
  type: 'buyerType/UPDATE_BUYER_TYPES_SUCCESS',
  payload: number
};

export type UpdateBuyerTypeErrorAction = {
  type: 'buyerType/UPDATE_BUYER_TYPES_ERROR',
  payload: Error
};

export type OpenBuyerTypesModalAction = {
  type: 'buyerType/OPEN_BUYER_TYPES_MODAL'
};

export type CloseBuyerTypesModalAction = {
  type: 'buyerType/CLOSE_BUYER_TYPES_MODAL'
};

export type Action =
  | FetchBuyerTypesAction
  | FetchBuyerTypesSuccessAction
  | FetchBuyerTypesErrorAction
  | UpdateBuyerTypesAction
  | UpdateBuyerTypesSuccessAction
  | UpdateBuyerTypeErrorAction
  | OpenBuyerTypesModalAction
  | CloseBuyerTypesModalAction;

export const types = {
  FETCH_BUYER_TYPES,
  FETCH_BUYER_TYPES_SUCCESS,
  FETCH_BUYER_TYPES_ERROR,
  UPDATE_BUYER_TYPES,
  UPDATE_BUYER_TYPES_SUCCESS,
  UPDATE_BUYER_TYPES_ERROR,
  OPEN_BUYER_TYPES_MODAL,
  CLOSE_BUYER_TYPES_MODAL,
  RESET_BUYER_TYPES
};

// Actions
const fetchBuyerTypes = (): FetchBuyerTypesAction => ({
  type: FETCH_BUYER_TYPES
});

const updateBuyerTypes = (
  buyerTypes: EDBuyerType[]
): UpdateBuyerTypesAction => ({
  type: UPDATE_BUYER_TYPES,
  payload: buyerTypes
});

const openBuyerTypesModal = (): OpenBuyerTypesModalAction => ({
  type: OPEN_BUYER_TYPES_MODAL
});

const closeBuyerTypesModal = (): CloseBuyerTypesModalAction => ({
  type: CLOSE_BUYER_TYPES_MODAL
});

const resetBuyerTypes = () => ({
  type: RESET_BUYER_TYPES
});

export const actions = {
  fetchBuyerTypes,
  updateBuyerTypes,
  openBuyerTypesModal,
  closeBuyerTypesModal,
  resetBuyerTypes
};

// State/reducer
type State = {
  buyerTypes: EDBuyerType[],
  loading: boolean,
  error: ?Error,
  modalIsOpen: boolean
};

export const initialState: State = {
  buyerTypes: [],
  loading: false,
  error: null,
  modalIsOpen: false
};

type Store = {
  buyerType: State
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_BUYER_TYPES:
      return { ...state, error: null, loading: true };
    case FETCH_BUYER_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        buyerTypes: action.payload
      };
    case FETCH_BUYER_TYPES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_BUYER_TYPES:
      return { ...state, loading: true };
    case UPDATE_BUYER_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        modalIsOpen: false
      };
    case UPDATE_BUYER_TYPES_ERROR:
      return { ...state, error: action.payload, loading: false };
    case OPEN_BUYER_TYPES_MODAL:
      return { ...state, modalIsOpen: true };
    case CLOSE_BUYER_TYPES_MODAL:
      return { ...state, modalIsOpen: false, error: null };
    case RESET_BUYER_TYPES:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// selectors
const selectAllBuyerTypes = (store: Store) => store.buyerType.buyerTypes;
const selectIsLoading = (store: Store) => store.buyerType.loading;
const selectError = (store: Store) => store.buyerType.error;
const selectModalIsOpen = (store: Store) => store.buyerType.modalIsOpen;

export const selectors = {
  selectAllBuyerTypes,
  selectIsLoading,
  selectError,
  selectModalIsOpen
};
