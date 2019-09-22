import { API_ROOT, HEADERS, PATH_THREADS } from '../constants';
import { CenterComponent, exists } from '../helpers';
import {
  UPDATE_THREADS,
  APPEND_THREAD_MESSAGES,
  PREPEND_THREAD_MESSAGES,
  UPDATE_CACHED_THREAD_ID,
  UPDATE_THREAD_OFFSET,
  UPDATE_LINKED_IMPULSES,
  UPDATE_SESSION_IMPULSES,
  UPDATE_LINKED_SPARKS,
  UPDATE_SESSION_SPARKS,
  SET_ACTIVE_THREAD_ID,
  SET_CENTER_COMPONENT,
  LOGIN,
  SET_SESSION,
  SET_ACTIVE_ITEMS,
  ERROR_OCCURED,
  SET_INVALID_HASH_ERROR,
  SET_FETCH_MESSAGES
} from '../actions/types';

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
  };
}

export const updateCachedThreadId = (impulseId, threadId) => {
  return {
    type: UPDATE_CACHED_THREAD_ID,
    payload: { impulseId, threadId }
  };
}

export const updateThreadOffset = (threadId, offset) => {
  return {
    type: UPDATE_THREAD_OFFSET,
    payload: { threadId, offset }
  };
}

// TODO the recieved response has two keys, message and thread if messages is an inspo
export const receiveMessage = (threadId, message) => {
  return {
    type: PREPEND_THREAD_MESSAGES,
    payload: { threadId, messages: [message] }
  };
}

export const updateLinkedImpulses = (impulses,
  remove = false, toRemoveIds = []) => {
  return {
    type: UPDATE_LINKED_IMPULSES,
    payload: { impulses, remove, toRemoveIds }
  };
}

export const updateSessionImpulses = (impulses,
  remove = false, toRemoveIds = []) => {
  return {
    type: UPDATE_SESSION_IMPULSES,
    payload: { impulses, remove, toRemoveIds }
  };
}

export const updateLinkedSparks = (sparks,
  remove = false, toRemoveIds = []) => {
  return {
    type: UPDATE_LINKED_SPARKS,
    payload: { sparks, remove, toRemoveIds }
  };
}

export const updateSessionSparks = (sparks,
  remove = false, toRemoveIds = []) => {
  return {
    type: UPDATE_SESSION_SPARKS,
    payload: { sparks, remove, toRemoveIds }
  };
}

export const setActiveThreadId = (threadId) => {
  return {
    type: SET_ACTIVE_THREAD_ID,
    payload: { threadId }
  };
}

export const setCenterComponent = (centerComponent) => {
  return {
    type: SET_CENTER_COMPONENT,
    payload: { centerComponent }
  }
}

export const login = (accountId, accountToken) => {
  return {
    type: LOGIN,
    payload: { accountId, accountToken }
  };
}

export const setSession = (sessionToken) => {
  return {
    type: SET_SESSION,
    payload: { sessionToken }
  };
}

export const setActiveItems = (impulseId, sparkId, threadId) => {
  return {
    type: SET_ACTIVE_ITEMS,
    payload: { impulseId, sparkId, threadId }
  };
}

export const errorOccured = (occured) => {
  return {
    type: ERROR_OCCURED,
    payload: { occured }
  };
}

export const setInvalidHashError = (occured) => {
  return {
    type: SET_INVALID_HASH_ERROR,
    payload: { occured }
  };
}

export const setFetchMessages = (fetchMessages) => {
  return {
    type: SET_FETCH_MESSAGES,
    payload: { fetchMessages }
  }
}

// TODO: update to allow spark session validation
export const getThread = threadId => {
  return (dispatch, getState) => {
    const accountToken = getState().session.accountToken;
    if (!exists(accountToken)) {
      console.log("getThread(): Not logged in!");
      dispatch(errorOccured(true));
    }

    return fetch(`${API_ROOT}/threads/${threadId}`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
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
    const accountToken = getState().session.accountToken;
    if (!exists(accountToken)) {
      console.log("getLinkedImpulses(): Not logged in!");
      dispatch(errorOccured(true));
      return;
    }

    fetch(`${API_ROOT}/accounts/${accountId}/impulses`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(impulses => {
      let inspirationThreads = [];
      // note that threads will contain information about their parents
      // this allows us to distinguish between impulse threads and 
      // inspiration threads later on
      impulses.forEach(impulse => {
        inspirationThreads.push(...impulse.message_threads);

        // we don't store thread data in the impulse list
        delete impulse.message_threads;
      });

      dispatch(updateThreads(inspirationThreads));
      dispatch(updateLinkedImpulses(impulses));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const getSession = () => {
  return (dispatch, getState) => {
    const sessionToken = getState().session.sessionToken;
    if (!exists(sessionToken)) {
      console.log("getSession(): Not logged in!");
      dispatch(errorOccured(true));
      return;
    }

    // token is not sent as a parameter in the url because it won't be 
    // encrypted
    fetch(`${API_ROOT}/session`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        AuthorizationSession: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({ session_token: sessionToken })
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(session => {
      dispatch(updateSessionImpulses(session.impulses));
      dispatch(updateSessionSparks(session.sparks));

      // update with session threads as well
      let inspirationThreads = [];
      session.impulses.forEach(impulse => {
        inspirationThreads.push(...impulse.message_threads);
      });
      dispatch(updateThreads(inspirationThreads));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const getLinkedSparks = accountId => {
  return (dispatch, getState) => {
    const accountToken = getState().session.accountToken;

    if (!exists(accountToken)) {
      console.log("getLinkedSparks(): Not logged in!");
      dispatch(errorOccured(true));
      return;
    }

    fetch(`${API_ROOT}/accounts/${accountId}/sparks`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountToken}`
      }
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(sparks => {
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
    const accountToken = getState().session.accountToken;
    const sessionToken = getState().session.sessionToken;
    let offset = getState().threads.threadOffsets[threadId];

    // use current date to grab the most recent messages for the thread
    if (!exists(offset)) {
      let date = new Date();
      offset = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    fetch(`${API_ROOT}${PATH_THREADS}/${threadId}/messages?offset=${offset}`, {
      method: 'GET',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountToken}`,
        AuthorizationSession: `Bearer ${sessionToken}`
      },
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(messagesNew => {
      let sparksNew = [];
      messagesNew.forEach(message => {
        sparksNew.push(message.spark);

        // no longer need this
        delete message.spark;
      });
      
      dispatch(updateImpulseSparks(sparksNew));
      dispatch(appendThreadMessages(threadId, messagesNew.reverse()));
      dispatch(updateThreadOffset(threadId,
        new Date(messagesNew[messagesNew.length - 1].created_at)));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const createMessage = (impulseId, sparkId, threadId,
  body, isInspiration) => {
  return (dispatch, getState) => {
    const accountToken = getState().session.accountToken;
    const sessionToken = getState().session.sessionToken;

    // no need for handling promise
    // message is received via action cable channels
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountToken}`,
        AuthorizationSession: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        impulse_id: impulseId,
        spark_id: sparkId,
        parent_thread_id: threadId,
        body: body,
        is_inspiration: isInspiration })
    })
    .catch((e) => {
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
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(newImpulse => {
      // add the new impulse and set the active impulse to allow the user
      // to create a new spark
      dispatch(updateSessionImpulses([newImpulse]));
      dispatch(updateThreads([newImpulse.message_thread]));
      dispatch(switchImpulse(newImpulse, null));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const createSpark = (name, impulseId, accountId) => {
  return (dispatch, getState) => {
    const sessionToken = getState().session.sessionToken;

    if (!exists(sessionToken)) {
      console.log("createSpark(): No session registered");
      dispatch(errorOccured(true));
      return;
    }

    if (!exists(impulseId)) {
      console.log("createSpark(): Cannot create spark without parent impulse");
      dispatch(errorOccured(true));
      return;
    }

    fetch(`${API_ROOT}/sparks`, {
      method: 'POST',
      headers: {
        ...HEADERS,
        AuthorizationSession: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        name: name,
        impulse_id: impulseId,
        session_token: sessionToken
      })
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(newSpark => {
      // get the set the active impulse to be the impulse the spark was
      // made for
      const activeImpulse = {...getState().data.linkedImpulses,
        ...getState().data.sessionImpulses}[impulseId];

      // add the new spark to the list of session sparks
      // update the active impulse information to include this new spark
      dispatch(updateSessionSparks([newSpark]));
      dispatch(switchImpulse(activeImpulse, newSpark));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const joinImpulse = (impulseHash) => {
  return (dispatch, getState) => {

    fetch(`${API_ROOT}/impulses/invite/${impulseHash}`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(newImpulse => {
      let existingImpulse = {...getState().data.linkedImpulses,
        ...getState().data.sessionImpulses}[newImpulse.id];
      let existingSpark = null;

      // add the new impulse to the list of session impulses
      if (!exists(existingImpulse)) {
        dispatch(updateSessionImpulses([newImpulse]));
        dispatch(updateThreads([newImpulse.message_thread]));
        existingImpulse = newImpulse;
      }
      else {
        // iterate through the values in the spark dicts and find the
        // impulses' corresponding spark
        const sparks =
          {...getState().data.linkedSparks, ...getState().data.sessionSparks};
        for (const [sparkId, spark] of Object.entries(sparks)) {
          if (spark.impulse_id === existingImpulse.id) existingSpark = spark;
        }
      }

      // spark may be null if the impulse is new, or if the user has yet to
      // create a spark for the already joined session impulse
      dispatch(switchImpulse(existingImpulse, existingSpark));
    })
    .catch((e) => {
      // set invalid hash error flag
      console.log(e);
      dispatch(setInvalidHashError(true));
    });
  }
}

export const loginAccount = (email, password) => {
  return (dispatch, getState) => {

    fetch(`${API_ROOT}/login`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(authPayload => {
      // persist the login for the session
      const token = authPayload.auth_token;
      const accountId = authPayload.account.id;

      sessionStorage.setItem('accountId', accountId);
      sessionStorage.setItem('accountToken', token);

      dispatch(login(accountId, token));
    })
    .catch((e) => {
      // set invalid hash error flag
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const registerSession = () => {
  return (dispatch, getState) => {

    fetch(`${API_ROOT}/register`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(authPayload => {
      const token = authPayload.auth_token;

      sessionStorage.setItem('sessionToken', token);

      dispatch(setSession(token));

      this.loadSessionImpulses();
    })
    .catch((e) => {
      // set invalid hash error flag
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const switchImpulse = (activeImpulse, activeSpark) => {
  return (dispatch, getState) => {
    const centerComponent = !exists(activeSpark) ?
      CenterComponent.SPARK : CenterComponent.ACTIVE;
    const activeSparkId = exists(activeSpark) ? activeSpark.id : null;

    let activeThreadId = getState().threads.cachedThreadIds[activeImpulse.id];
    if (!exists(activeThreadId)) {
      activeThreadId = getState().threads.threads[activeImpulse.message_thread.id].id;
      dispatch(updateCachedThreadId(activeImpulse.id, activeThreadId));
    }

    dispatch(setActiveItems(activeImpulse.id, activeSparkId, activeThreadId));
    dispatch(setCenterComponent(centerComponent));
  }
}

export const receiveUpdate = (update) => {
  return (dispatch, getState) => {
    const message = update.message;
    const thread = update.message_thread;

    dispatch(receiveMessage(message.parent_thread_id, message));
    // thread exists if the message is an inspiration
    if (exists(thread)) dispatch(updateThreads([thread]));
  }
}

export const createInvite = (impulseId) => {
  return (dispatch, getState) => {

    fetch(`${API_ROOT}/impulses/${impulseId}/invite/new`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(impulse => {
      if (exists(getState().data.linkedImpulses[impulse.id]))
        dispatch(updateLinkedImpulses([impulse]));
      else
        dispatch(updateSessionImpulses([impulse]));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

export const linkAccount = (sparkId, accountId) => {
  return (dispatch, getState) => {
    const accountToken = getState().session.accountToken;
    if (!exists(accountToken) || !exists(accountId)) {
      console.log("linkAccount(): Not logged in!");
      dispatch(errorOccured(true));
      return;
    }

    fetch(`${API_ROOT}/sparks/${sparkId}`, {
      method: 'PATCH',
      headers: {
        ...HEADERS,
        AuthorizationLogin: `Bearer ${accountToken}`
      },
      body: JSON.stringify({ account_id: accountId })
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then(spark => {
      const linkedImpulse = {...getState().data.linkedImpulses,
        ...getState().data.sessionImpulses}[spark.impulse_id];

      // remove the linked spark and its impulse from the session lists
      dispatch(updateSessionSparks([], true, [spark.id]));
      dispatch(updateSessionImpulses([], true, [spark.impulse_id]));

      // add the linked spark and its impulse to the linked lists
      dispatch(updateLinkedSparks([spark]));
      dispatch(updateLinkedImpulses([linkedImpulse]));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}
