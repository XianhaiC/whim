import {
  LOGIN,
  SET_SESSION,
  UPDATE_SESSION_IMPULSE_IDS,
  UPDATE_SESSION_SPARK_IDS
} from '../actions/types';

const INITIAL_STATE = {
  loggedIn: false,
  accountId: null,
  accountHandle: null,
  accountActivated: false,
  accountToken: null,
  sessionToken: null,
  sessionImpulseIds: {},
  sessionSparkIds: {}
}

export default (state = INITIAL_STATE, action) => {
  let newState = null;

  switch(action.type) {
    case UPDATE_SESSION_IMPULSE_IDS:
      newState = {...state, sessionImpulseIds: {...state.sessionImpulseIds}};

      if (action.payload.remove) {
        action.payload.toRemoveIds.forEach(impulseId =>
          delete newState.sessionImpulseIds[impulseId]
        );
      }
      else {
        action.payload.impulseIds.forEach(impulseId =>
          newState.sessionImpulseIds[impulseId] = true);
      }

      return newState;

    case UPDATE_SESSION_SPARK_IDS:
      newState = {...state, sessionSparkIds: {...state.sessionSparkIds}};

      if (action.payload.remove) {
        action.payload.toRemoveIds.forEach(sparkId =>
          delete newState.sessionSparkIds[sparkId]
        );
      }
      else {
        action.payload.sparkIds.forEach(sparkId =>
          newState.sessionSparkIds[sparkId] = true);
      }

      return newState;

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
