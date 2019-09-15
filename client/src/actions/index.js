import { API_ROOT, HEADERS, UNDEFINED } from '../constants';
import { exists } from './helpers';

export const updateThreads = (threads) => {
  return {
    type: UPDATE_THREADS,
    payload: { threads }
  };
}

export const appendThreadMessages = (threadId, messages) => {
  return {
    type: APPEND_THREAD_MESSAGES,
    payload: { threadId, messages }
  }
}

export const updateCachedThread = (impulseId, thread) => {
  return {
    type: UPDATE_CACHED_THREAD,
    payload: { impulseId, thread }
  }
}

export const updateThreadOffset = (threadId, offset) => {
  return {
    type: UPDATE_THREAD_OFFSET,
    payload: { threadId, offset }
  }
}

export const receiveMessage = (threadId, message) => {
  return {
    type: PREPEND_THREAD_MESSAGES,
    payload: { threadId, messages: [message] }
  }
}

export const updateLinkedImpulses = (impulses) => {
  return {
    type: UPDATE_LINKED_IMPULSES,
    payload: { impulses }
  };
}

export const updateSessionImpulses = (impulses) => {
  return {
    type: UPDATE_SESSION_IMPULSES,
    payload: { impulses }
  };
}

export const updateLinkedSparks = (sparks) => {
  return {
    type: UPDATE_LINKED_SPARKS,
    payload: { sparks }
  };
}

export const updateSessionSparks = (sparks) => {
  return {
    type: UPDATE_SESSION_SPARKS,
    payload: { sparks }
  };
}

export const setActiveImpulse = (impulse, spark) => {
  let centerComponent = !exists(spark) ? 
    CenterComponent.SPARK : CenterComponent.ACTIVE;

  return {
    type: SET_ACTIVE_IMPULSE,
    payload: { impulse, spark, centerComponent }
  };
}

export const setActiveThread = (thread) => {
  return {
    type: SET_ACTIVE_THREAD,
    payload: { thread }
  };
}

export const setCenterComponent = (centerComponent) => {
  return {
    type: SET_CENTER_COMPONENT,
    payload: { centerComponent }
  }
}

export const logIn = (accountId, accountSessionToken) => {
  return {
    type: LOGIN,
    payload: { accountId, accountSessionToken }
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
      method: 'GET',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountSessionToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res.json();
    })
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
      return;
    }

    fetch(`${API_ROOT}/accounts/${accountId}/impulses`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountSessionToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res.json();
    })
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
      return;
    }

    fetch(`${API_ROOT}/accounts/${accountId}/sparks`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountSessionToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res.json();
    })
    .then(impulses => {
      dispatch(updateLinkedSparks(sparks));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

// update to allow spark session validation
export const getThreadMessages = threadId => {
  return (dispatch, getState) => {
    const accountSessionToken = getState().accountSessionToken;
    const sparkSessionToken = getState().sparkSessionToken;
    const offset = getState.cachedThreadOffsets[threadId];

    // use current date to grab the most recent messages for the thread
    if (!exists(offset)) {
      let date = new Date();
      offset = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    fetch(`${API_ROOT}${PATH_THREADS}/${threadId}/messages?offset=${offset}`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountSessionToken}`,
        AuthorizationSession: `Bearer ${sparkSessionToken}`
      },
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res.json();
    })
    .then(messagesNew => {
      dispatch(appendThreadMessages(threadId, messagesNew.reverse()));
      dispatch(updateThreadOffset(threadId, new Date(messagesNew[messagesNew.length - 1].created_at)));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const createMessage = (impulseId, sparkId, threadId, body) => {
  return (dispatch, getState) => {
    const accountSessionToken = getState().accountSessionToken;
    const sparkSessionToken = getState().sparkSessionToken;

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountSessionToken}`,
        AuthorizationSession: `Bearer ${sparkSessionToken}`
      },
      body: JSON.stringify({
        impulse_id: impulseId,
        spark_id: sparkId,
        thread_id: threadId,
        body: body })
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res.json();
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const createImpulse = (name, description) => {
  return (dispatch, getState) => {
    fetch(`${API_ROOT}/impulses`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({name, description})
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res.json();
    })
    .then(newImpulse => {
      // add the new impulse and set the active impulse to allow the user
      // to create a new spark
      dispatch(updateSessionImpulses([newImpulse]));
      dispatch(setActiveImpulse(newImpulse, null));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const joinImpulse = (impulseHash) => {
  return (dispatch, getState) => {

    fetch(`${API_ROOT}/impulses/invite/${this.state.impulse_hash}`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => {
      if (!res.ok) throw Error(response.statusText);
      return res.json();
    })
    .then(newImpulse => {
      let existingImpulse = 
        {...getState().linkedImpulses, ...getState().sessionImpulses}[newImpulse.id];
      let existingSpark = null;

      // add the new impulse to the list of session impulses
      if (!exists(existingImpulse)) {
        dispatch(updateSessionImpulses([newImpulse]));
        existingImpulse = newImpulse;
      }
      else {
        // iterate through the values in the spark dicts and find the
        // impulses' corresponding spark
        const sparks = {...getState().linkedSparks, ...getState().sessionSparks};
        for (const [sparkId, spark] of Object.entries(sparks)) {
          if (spark.impulse_id === existingImpulse.id) existingSpark = spark;
        }
      }

      // spark may be null if the impulse is new, or if the user has yet to
      // create a spark for the already joined session impulse
      dispatch(setActiveImpulse(existingImpulse, existingSpark));
    })
    .catch((e) => {
      // set invalid hash error flag
      console.log(e);
      dispatch(setInvalidHashError(true));
    });
  }
}
