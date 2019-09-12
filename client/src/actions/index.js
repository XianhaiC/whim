import { API_ROOT, HEADERS, UNDEFINED } from '../constants';
import { exists } from './helpers';

export const updateThreads = (threads) => {
  return {
    type: UPDATE_THREADS,
    payload: {threads}
  };
}

export const updateLinkedImpulses = (impulses) => {
  return {
    type: UPDATE_LINKED_IMPULSES,
    payload: {impulses}
  };
}

export const updateSessionImpulses = (impulses) => {
  return {
    type: UPDATE_SESSION_IMPULSES,
    payload: {impulses}
  };
}

export const updateLinkedSparks = (sparks) => {
  return {
    type: UPDATE_LINKED_SPARKS,
    payload: {sparks}
  };
}

export const updateSessionSparks = (sparks) => {
  return {
    type: UPDATE_SESSION_SPARKS,
    payload: {sparks}
  };
}

export const setActiveImpulse = (impulseId, sparkId) => {
  return {
    type: SET_ACTIVE_IMPULSE,
    payload: {impulseId, sparkId}
  }
}

export const setCenterComponent = (centerComponent) => {
  return {
    type: SET_CENTER_COMPONENT,
    payload: {centerComponent}
  }
}

export const logIn = (accountId, accountSessionToken) => {
  return {
    type: LOGIN,
    payload: {accountId, accountSessionToken}
  };
}

// update to allow spark session validation
export const getThread = threadId => {
  return (dispatch, getState) => {
    const accountSessionToken = getState().accountSessionToken;
    if (!exists(accountSessionToken)) {
      console.log("getThread(): Not logged in!");
      dispatch(errorOccured(true));
    }

    return fetch(`${API_ROOT}/threads/${threadId}`, {
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountSessionToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res;
    })
    .then(res => res.json())
    .then(thread => {
      dispatch(updateThreads([thread]));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const getLinkedImpulses = accountId => {
  return (dispatch, getState) => {
    const accountSessionToken = getState().accountSessionToken;
    if (!exists(accountSessionToken)) {
      console.log("getThread(): Not logged in!");
      dispatch(errorOccured(true));
    }

    fetch(`${API_ROOT}/accounts/${accountId}/impulses`, {
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountSessionToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res;
    })
    .then(res => res.json())
    .then(impulses => {
      dispatch(updateLinkedImpulses(impulses));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const getLinkedSparks = accountId => {
  return (dispatch, getState) => {
    const accountSessionToken = getState().accountSessionToken;

    if (!exists(accountSessionToken)) {
      console.log("getThread(): Not logged in!");
      dispatch(errorOccured(true));
    }

    fetch(`${API_ROOT}/accounts/${accountId}/sparks`, {
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountSessionToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res;
    })
    .then(res => res.json())
    .then(impulses => {
      dispatch(updateLinkedSparks(sparks));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}
