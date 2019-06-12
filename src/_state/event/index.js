// @flow
import type { EDEvent, PendingFactors } from '_models';
export { default as saga } from './saga';

// Actions Types
const FETCH_EVENT = 'event/FETCH';
const FETCH_EVENT_SUCCESS = 'event/FETCH_SUCCESS';
const FETCH_EVENT_ERROR = 'event/FETCH_ERROR';
const TOGGLE_BROADCASTING = 'event/TOGGLE_BROADCASTING';
const TOGGLE_BROADCASTING_SUCCESS = 'event/TOGGLE_BROADCASTING_SUCCESS';
const TOGGLE_BROADCASTING_ERROR = 'event/TOGGLE_BROADCASTING_ERROR';
const SAVE_ADMIN_MODIFIERS = 'event/SAVE_ADMIN_MODIFIERS';
const SAVE_ADMIN_MODIFIERS_SUCCESS = 'event/SAVE_ADMIN_MODIFIERS_SUCCESS';
const SAVE_ADMIN_MODIFIERS_ERROR = 'event/SAVE_ADMIN_MODIFIERS_ERROR';
const FETCH_AUTOMATED_SPRING_VALUE = 'event/FETCH_AUTOMATED_SPRING_VALUE';
const FETCH_AUTOMATED_SPRING_VALUE_SUCCESS =
  'event/FETCH_AUTOMATED_SPRING_VALUE_SUCCESS';
const FETCH_AUTOMATED_SPRING_VALUE_ERROR =
  'event/FETCH_AUTOMATED_SPRING_VALUE_ERROR';
const HANDLE_MODIFIER_CHANGE = 'event/HANDLE_MODIFIER_CHANGE';
const RESET = 'event/RESET';
const RESET_TO_INITIAL_FACTORS = 'event/RESET_TO_INITIAL_FACTORS';

export type FetchEventAction = {
  type: 'event/FETCH',
  payload: number
};
export type FetchEventSuccessAction = {
  type: 'event/FETCH_SUCCESS',
  payload: EDEvent
};
export type FetchEventErrorAction = {
  type: 'event/FETCH_ERROR',
  payload: Error
};
export type ToggleEventBroadcastingAction = {
  type: 'event/TOGGLE_BROADCASTING',
  payload: { eventId: number, isBroadcast: boolean }
};
export type ToggleEventBroadcastingSuccessAction = {
  type: 'event/TOGGLE_BROADCASTING_SUCCESS',
  payload: { isBroadcast: boolean, modifiedAt: number }
};
export type ToggleEventBroadcastingErrorAction = {
  type: 'event/TOGGLE_BROADCASTING_ERROR',
  payload: Error
};
export type SaveAdminModifiersAction = {
  type: 'event/SAVE_ADMIN_MODIFIERS',
  payload: {
    eventId: number,
    eventScoreModifier: number,
    springModifier: number,
    seasonId: number
  }
};
export type SaveAdminModifiersSuccessAction = {
  type: 'event/SAVE_ADMIN_MODIFIERS_SUCCESS',
  payload: {
    eventScore: number,
    eventScoreModifier: number,
    spring: number,
    springModifier: number
  }
};
export type SaveAdminModifiersErrorAction = {
  type: 'event/SAVE_ADMIN_MODIFIERS_ERROR',
  payload: Error
};
export type ResetEventAction = {
  type: 'event/RESET'
};

export type ResetToInitialFactorsAction = {
  type: 'event/RESET_TO_INITIAL_FACTORS'
};

export type FetchAutomatedSpringValueAction = {
  type: 'event/FETCH_AUTOMATED_SPRING_VALUE',
  payload: {
    id: number,
    eventScore: number
  }
};

export type FetchAutomatedSpringValueSuccessAction = {
  type: 'event/FETCH_AUTOMATED_SPRING_VALUE_SUCCESS',
  payload: number
};

export type FetchAutomatedSpringValueErrorAction = {
  type: 'event/FETCH_AUTOMATED_SPRING_VALUE_ERROR',
  payload: Error
};

export type handleModifierChangeAction = {
  type: 'event/HANDLE_MODIFIER_CHANGE',
  payload: { name: string, value: string }
};

export type Action =
  | FetchEventAction
  | FetchEventSuccessAction
  | FetchEventErrorAction
  | SaveAdminModifiersAction
  | SaveAdminModifiersSuccessAction
  | SaveAdminModifiersErrorAction
  | ResetEventAction;

export const types = {
  FETCH_EVENT,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_ERROR,
  TOGGLE_BROADCASTING,
  TOGGLE_BROADCASTING_SUCCESS,
  TOGGLE_BROADCASTING_ERROR,
  SAVE_ADMIN_MODIFIERS,
  SAVE_ADMIN_MODIFIERS_SUCCESS,
  SAVE_ADMIN_MODIFIERS_ERROR,
  FETCH_AUTOMATED_SPRING_VALUE,
  FETCH_AUTOMATED_SPRING_VALUE_ERROR,
  FETCH_AUTOMATED_SPRING_VALUE_SUCCESS,
  RESET,
  HANDLE_MODIFIER_CHANGE,
  RESET_TO_INITIAL_FACTORS
};

// Actions
const fetchEvent = (eventId: number): FetchEventAction => ({
  type: FETCH_EVENT,
  payload: eventId
});

const setEventBroadcasting = (
  eventId: number,
  isBroadcast: boolean
): ToggleEventBroadcastingAction => ({
  type: TOGGLE_BROADCASTING,
  payload: {
    eventId,
    isBroadcast
  }
});

function saveAdminModifiers(
  eventId: number,
  eventScoreModifier: number,
  springModifier: number,
  seasonId: number
): SaveAdminModifiersAction {
  return {
    type: SAVE_ADMIN_MODIFIERS,
    payload: {
      eventId,
      eventScoreModifier,
      springModifier,
      seasonId
    }
  };
}

function fetchAutomatedSpringValue(
  id: number,
  eventScore: number
): FetchAutomatedSpringValueAction {
  return {
    type: FETCH_AUTOMATED_SPRING_VALUE,
    payload: {
      id,
      eventScore
    }
  };
}

function handleModifierChange(
  name: string,
  value: string
): handleModifierChangeAction {
  return {
    type: HANDLE_MODIFIER_CHANGE,
    payload: {
      name,
      value
    }
  };
}

function resetToInitialFactors(): ResetToInitialFactorsAction {
  return {
    type: RESET_TO_INITIAL_FACTORS
  };
}

export const actions = {
  fetchEvent,
  setEventBroadcasting,
  saveAdminModifiers,
  fetchAutomatedSpringValue,
  handleModifierChange,
  resetToInitialFactors
};

// State/Reducer
export type State = {
  +event: EDEvent,
  +error: ?Error,
  +loading: boolean,
  +isTogglingBroadcasting: boolean,
  +savingAdminModifiers: false,
  +fetchingSpring: boolean,
  +pendingFactors: PendingFactors,
  +pricingError: ?Error
};

export const initialState = {
  event: null,
  error: null,
  loading: false,
  isTogglingBroadcasting: false,
  savingAdminModifiers: false,
  fetchingSpring: false,
  pendingFactors: {
    eventScore: null,
    eventScoreModifier: null,
    spring: null,
    springModifier: null
  },
  pricingError: null
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_EVENT:
      return { ...state, loading: true };
    case FETCH_EVENT_SUCCESS:
      const {
        eventScore,
        eventScoreModifier,
        spring,
        springModifier
      } = action.payload;
      return {
        ...state,
        loading: false,
        event: action.payload,
        pendingFactors: {
          eventScore,
          eventScoreModifier,
          spring,
          springModifier
        }
      };
    case FETCH_EVENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case RESET:
      return initialState;
    case SAVE_ADMIN_MODIFIERS:
      return { ...state, savingAdminModifiers: true };
    case SAVE_ADMIN_MODIFIERS_ERROR:
      return {
        ...state,
        savingAdminModifiers: false,
        pricingError: action.payload
      };
    case SAVE_ADMIN_MODIFIERS_SUCCESS: {
      const {
        eventScore,
        eventScoreModifier,
        spring,
        springModifier
      } = action.payload;
      return {
        ...state,
        savingAdminModifiers: false,
        event: {
          ...state.event,
          eventScore,
          eventScoreModifier,
          spring,
          springModifier
        },
        pendingFactors: {
          eventScore,
          eventScoreModifier,
          spring,
          springModifier
        },
        pricingError: null
      };
    }
    case TOGGLE_BROADCASTING:
      return { ...state, isTogglingBroadcasting: true };
    case TOGGLE_BROADCASTING_SUCCESS:
      return {
        ...state,
        isTogglingBroadcasting: false,
        event: {
          ...state.event,
          isBroadcast: action.payload.isBroadcast,
          modifiedAt: action.payload.modifiedAt
        }
      };
    case TOGGLE_BROADCASTING_ERROR:
      return {
        ...state,
        isTogglingBroadcasting: false
      };
    case FETCH_AUTOMATED_SPRING_VALUE:
      return { ...state, fetchingSpring: true };
    case FETCH_AUTOMATED_SPRING_VALUE_SUCCESS:
      return {
        ...state,
        fetchingSpring: false,
        pendingFactors: { ...state.pendingFactors, spring: action.payload }
      };
    case FETCH_AUTOMATED_SPRING_VALUE_ERROR:
      return { ...state, fetchingSpring: false };
    case HANDLE_MODIFIER_CHANGE:
      const { name, value } = action.payload;
      return {
        ...state,
        pendingFactors: { ...state.pendingFactors, [name]: value }
      };
    case RESET_TO_INITIAL_FACTORS:
      const { event } = state;
      return {
        ...state,
        pendingFactors: {
          eventScore: event.eventScore,
          eventScoreModifier: event.eventScoreModifier,
          spring: event.spring,
          springModifier: event.springModifier
        }
      };
    default:
      return state;
  }
};

// Selectors
type Store = {
  event: State
};

const selectPendingFactors = (store: Store) => store.event.pendingFactors;
const selectEvent = (store: Store) => store.event.event;
const selectPricingError = (store: Store) => store.event.pricingError;
const selectSavingAdminModifiers = (store: Store) =>
  store.event.savingAdminModifiers;
const selectEventTogglingBroadcasting = (store: Store) =>
  store.event.isTogglingBroadcasting;

export const selectors = {
  selectEvent,
  selectEventTogglingBroadcasting,
  selectPendingFactors,
  selectPricingError,
  selectSavingAdminModifiers
};
