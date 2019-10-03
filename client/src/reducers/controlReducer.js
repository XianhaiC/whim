import {
  SET_ACTIVE_ITEMS,
  SET_ACTIVE_THREAD_ID,
  SET_CENTER_COMPONENT,
  ERROR_OCCURED,
  SET_INVALID_HASH_ERROR,
  SET_FETCH_MESSAGES,
  SET_USERNAME_TAKEN_ERROR,
  SET_EMAIL_TAKEN_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  activeImpulseId: null,
  activeSparkId: null,
  activeThreadId: null,
  errorOccured: false,
  invalidHashError: false,
  fetchMessages: false, 
  usernameTakenError: false, 
  emailTakenError: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_ACTIVE_ITEMS:
      return {...state,
        activeImpulseId: action.payload.impulseId,
        activeSparkId: action.payload.sparkId,
        activeThreadId: action.payload.threadId
      };

    case SET_ACTIVE_THREAD_ID:
      return {...state, activeThreadId: action.payload.threadId}

    case SET_CENTER_COMPONENT:
      return {...state, centerComponent: action.payload.centerComponent};

    case ERROR_OCCURED:
      return {...state, errorOccured: action.payload.occured};

    case SET_INVALID_HASH_ERROR:
      return {...state,
        errorOccured: action.payload.occured,
        invalidHashError: action.payload.occured};

    case SET_FETCH_MESSAGES:
      return {...state, fetchMessages: action.payload.fetchMessages};

    case SET_USERNAME_TAKEN_ERROR: 
      return {...state, usernameTakenError: action.payload.occured};
    
    case SET_EMAIL_TAKEN_ERROR: 
      return {...state, emailTakenError: action.payload.occured};

    default:
      return state;
  }
}
