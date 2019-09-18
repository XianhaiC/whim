import {
  SET_ACTIVE_ITEMS,
  SET_ACTIVE_THREAD,
  SET_CENTER_COMPONENT,
  ERROR_OCCURED,
  SET_INVALID_HASH_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  activeImpulse: null,
  activeSpark: null,
  activeThread: null,
  errorOccured: false,
  invalidHashError: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_ACTIVE_ITEMS:
      return {...state,
        activeImpulse: action.payload.impulse,
        activeSpark: action.payload.spark,
        activeThread: action.payload.thread
      };

    case SET_ACTIVE_THREAD:
      return {...state, activeThread: action.payload.thread}

    case SET_CENTER_COMPONENT:
      return {...state, centerComponent: action.payload.centerComponent};

    case ERROR_OCCURED:
      return {...state, errorOccured: action.payload.occured};

    case SET_INVALID_HASH_ERROR:
      return {...state,
        errorOccured: action.payload.occured,
        invalidHashError: action.payload.occured};

    default:
      return state;
  }
}
