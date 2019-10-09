import {
  SET_ACTIVE_ITEMS,
  SET_ACTIVE_THREAD_ID,
  SET_CENTER_COMPONENT,
  SET_RIGHTBAR_COMPONENT,
  SET_INVITE_POPUP_OPEN,
  ERROR_OCCURED,
  SET_INVALID_HASH_ERROR,
  SET_FETCH_MESSAGES,
  SIGNUP_ERRORS_OCCURED,
  LOGIN_ERRORS_OCCURED,
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
  passwordWrongError: false,
  usernameTakenError: false, 
  emailTakenError: false,
  signupVerified: false,
  loginVerified: false,
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

    case SIGNUP_ERRORS_OCCURED: 
      return {...state, usernameTakenError: action.payload.user, 
        emailTakenError: action.payload.email, 
        signupVerified: action.payload.verified};

    case LOGIN_ERRORS_OCCURED: 
      return {...state, passwordWrongError: action.payload.password, 
        loginVerified: action.payload.verified};

    default:
      return state;
  }
}