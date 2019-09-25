import { API_ROOT, HEADERS, PATH_THREADS } from '../constants';
import { CenterComponent, exists } from '../helpers';
import {
  UPDATE_THREADS,
  APPEND_THREAD_MESSAGES,
  PREPEND_THREAD_MESSAGES,
  UPDATE_CACHED_THREAD_ID,
  UPDATE_THREAD_OFFSET,
  UPDATE_IMPULSES,
  UPDATE_SPARKS,
  UPDATE_SESSION_IMPULSE_IDS,
  UPDATE_SESSION_SPARK_IDS,
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

export const updateImpulses = (impulses,
  remove = false, toRemoveIds = []) => {
  return {
    type: UPDATE_IMPULSES,
    payload: { impulses, remove, toRemoveIds }
  };
}

export const updateSparks = (sparks,
  remove = false, toRemoveIds = []) => {
  return {
    type: UPDATE_SPARKS,
    payload: { sparks, remove, toRemoveIds }
  };
}

export const updateSessionImpulseIds = (impulseIds,
  remove = false, toRemoveIds = []) => {
  return {
    type: UPDATE_SESSION_IMPULSE_IDS,
    payload: { impulseIds, remove, toRemoveIds }
  };
}

export const updateSessionSparkIds = (sparkIds,
  remove = false, toRemoveIds = []) => {
  return {
    type: UPDATE_SESSION_SPARK_IDS,
    payload: { sparkIds, remove, toRemoveIds }
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

export const getAccountData = accountId => {
  return (dispatch, getState) => {
    const accountToken = getState().session.accountToken;
    if (!exists(accountToken)) {
      console.log("getAccountData(): Not logged in!");
      dispatch(errorOccured(true));
      return;
    }

    fetch(`${API_ROOT}/accounts/${accountId}/data`, {
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
    .then(data => {
      const { impulses, sparks } = data
      console.log("GET IMPS")
      console.log(impulses);

      let inspirationThreads = [];
      // note that threads will contain information about their parents
      // this allows us to distinguish between impulse threads and
      // inspiration threads later on
      impulses.forEach(impulse => {
        console.log(impulse.message_threads);
        inspirationThreads.push(...impulse.message_threads);

        // we don't store thread data in the impulse list
        delete impulse.message_threads;
      });

      dispatch(updateThreads(inspirationThreads));
      dispatch(updateImpulses(impulses));
      dispatch(updateSparks(sparks));
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
    .then(data => {
      const { impulses, sparks } = data;
      console.log("SESS");
      console.log(data);
      dispatch(updateImpulses(impulses));
      dispatch(updateSparks(sparks));
      dispatch(updateSessionImpulseIds(
        impulses.map(impulse => impulse.id)));
      dispatch(updateSessionSparkIds(data.session_spark_ids));

      // update with session threads as well
      let inspirationThreads = [];
      impulses.forEach(impulse => {
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
      dispatch(updateSparks(sparks));
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

    console.log("GETTING");

    // use current date to grab the most recent messages for the thread
    if (!exists(offset)) {
      let date = new Date();
      offset = dateToString(date);
      console.log(date.getUTCHours());
      console.log("OFFSET STRING");
      console.log(offset);
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
      console.log("NEW MESSAGES ARE BEING RETURNED");
      console.log(messagesNew);
      if (messagesNew.length <= 0) return;
      let sparksNew = [];
      messagesNew.forEach(message => {
        sparksNew.push(message.spark);

        // no longer need this
        delete message.spark;
      });

      dispatch(updateSparks(sparksNew));
      dispatch(appendThreadMessages(threadId, messagesNew.reverse()));
      dispatch(updateThreadOffset(threadId,
        dateToString(new Date(messagesNew[0].created_at))));
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
      dispatch(updateImpulses([newImpulse]));
      dispatch(updateSessionImpulseIds([newImpulse.id]));
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
      const activeImpulse = getState().data.impulses[impulseId];

      // add the new spark to the list of session sparks
      // update the active impulse information to include this new spark
      dispatch(updateSparks([newSpark]));
      dispatch(updateSessionSparkIds([newSpark.id]));
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
    .then(data => {
      const { impulse, sparks } = data;
      console.log("JOINING");
      console.log(data);

      let existingImpulse = getState().data.impulses[impulse.id];
      let existingSpark = null;

      // add the new impulse to the list of session impulses
      if (!exists(existingImpulse)) {
        dispatch(updateImpulses([impulse]));
        dispatch(updateSparks(sparks));
        dispatch(updateSessionImpulseIds([impulse.id]));
        dispatch(updateThreads([impulse.message_thread]));
        existingImpulse = impulse;
      }
      else {
        // find the impulses' corresponding spark
        for (const [sparkId, spark] of Object.entries(getState().data.sparks)) {
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
      activeThreadId = getState().threads
        .threads[activeImpulse.message_thread.id].id;
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
    const thread_id = message.parent_thread_id;

    // save the spark that posted the message
    dispatch(updateSparks([message.spark]));
    delete message.spark;

    // get the initial thread messages if they haven't been
    // loaded yet
    console.log("TEVBING");
    console.log(message);
    console.log(!exists(getState().threads.threads[thread_id]));
    console.log(getState().threads);
    if (!exists(getState().threads.threads[thread_id].messages))
      dispatch(getThreadMessages(thread_id));

    // add the recieved message
    dispatch(receiveMessage(thread_id, message));

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
      dispatch(updateImpulses([impulse]));
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
      const linkedImpulse = getState().data.impulses[spark.impulse_id];

      // remove the linked spark and its impulse from the session lists
      dispatch(updateSessionSparkIds([], true, [spark.id]));
      dispatch(updateSessionImpulseIds([], true, [spark.impulse_id]));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errorOccured(true));
    });
  }
}

const dateToString = (date) => {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`
}
