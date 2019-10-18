import {
  LOGIN,
  SET_SESSION
} from '../actions/types';

const INITIAL_STATE = {
  loggedIn: false,
  accountId: null,
  accountHandle: null,
  accountActivated: false,
  accountToken: null,
  sessionToken: null,
}

export default (state = INITIAL_STATE, action) => {
  let newState = null;

  switch(action.type) {
    case LOGIN:
      return {...state,
        loggedIn: true,
        accountId: action.payload.accountId,
        accountHandle: action.payload.accountHandle,
        accountActivated: action.payload.accountActivated,
        accountToken: action.payload.accountToken
      };
    
    case SET_SESSION:
      return {...state, sessionToken: action.payload.sessionToken};

    default:
      return state;
  }
}
