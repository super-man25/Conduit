import { FETCH_ASYNC, FETCH_SUCCESS, FETCH_ERROR } from './actions';

const initialState = {
  loading: false,
  eventScoreHistory: [],
  error: null
};

function serialize(eventScoreHistory) {
  return eventScoreHistory.map((eventScoreHistoryFactor) =>
    eventScoreHistoryFactor.eventScore
      ? {
          ...eventScoreHistoryFactor,
          eventScore: eventScoreHistoryFactor.eventScore.toFixed(2)
        }
      : {
          ...eventScoreHistoryFactor,
          eventScore: null
        }
  );
}

export default function eventScoreHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ASYNC:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        eventScoreHistory: serialize(action.payload)
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
