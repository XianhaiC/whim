import {
  SET_ACTIVE_ITEMS,
  SET_ACTIVE_THREAD_ID,
  SET_CENTER_COMPONENT,
  SET_RIGHTBAR_COMPONENT,
  SET_INVITE_POPUP_OPEN,
  ERROR_OCCURED,
  SET_INVALID_HASH_ERROR,
  SET_FETCH_MESSAGES,
  FORM_ERRORS_OCCURED,
} from '../actions/types';

const INITIAL_STATE = {
  activeImpulseId: null,
  activeSparkId: null,
  activeThreadId: null,
  errorOccured: false,
  invalidHashError: false,
  fetchMessages: false,
  centerComponent: null,
  rightbarComponent: null,
  invitePopupOpen: false,
  usernameTakenError: false, 
  emailTakenError: false,
  actionFinished: false,
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

    case SET_RIGHTBAR_COMPONENT:
      return {...state, rightbarComponent: action.payload.rightbarComponent};

    case SET_INVITE_POPUP_OPEN:
      return {...state, invitePopupOpen: action.payload.invitePopupOpen};

    case ERROR_OCCURED:
      return {...state, errorOccured: action.payload.occured};

    case SET_INVALID_HASH_ERROR:
      return {...state,
        errorOccured: action.payload.occured,
        invalidHashError: action.payload.occured};

    case SET_FETCH_MESSAGES:
      return {...state, fetchMessages: action.payload.fetchMessages};

    case FORM_ERRORS_OCCURED: 
      return {...state, usernameTakenError: action.payload.user, 
        emailTakenError: action.payload.email,
        actionFinished: action.payload.actiond};
    

    default:
      return state;
  }
}
