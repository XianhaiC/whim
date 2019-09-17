const INITIAL_STATE = {
  linkedImpulses: {},
  sessionImpulses: {},
  linkedSparks: {},
  sessionSparks: {},
  threads: {},
  cachedThreads: {},
  threadOffsets: {},
  activeImpulse: null,
  activeSpark: null,
  activeThread: null
  loggedIn: false,
  accountId: null,
  accountToken: null,
  sessionToken: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_THREADS:
      let newState = {...state, threads: {...state.threads}};
      payload.threads.forEach(thread => newState.threads[thread.id] = thread);
      return newState;

    case APPEND_THREAD_MESSAGES:
      // (the top of the thread is considered the "back" of the messages array, so we're "appending")
      // used for appending loaded messages
      let newState = {...state};
      let thread = newState.threads[action.payload.threadId];
      thread.messages = [...action.payload.messages, ...thread.messages];
      return newState;

    case PREPEND_THREAD_MESSAGES:
      // used for prepending new messages received via sockets
      let newState = {...state};
      let thread = newState.threads[action.payload.threadId];
      thread.messages = [...thread.messages, ...action.payload.messages];
      return newState;

    case UPDATE_CACHED_THREAD:
      let newState = {...state};
      newState.cachedThreads[action.payload.impulseId] = action.payload.thread;
      return newState;

    case UPDATE_THREAD_OFFSET:
      let newState = {...state};
      newState.threadOffsets[action.payload.threadId] = action.payload.offset;
      return newState;

    case UPDATE_LINKED_IMPULSES:
      let newState = {...state, linkedImpulses: {...state.linkedImpulses}};
      payload.impulses.forEach(impulse => newState.linkedImpulses[impulse.id] = impulse);
      return newState;

    case UPDATE_SESSION_IMPULSES:
      let newState = {...state, sessionImpulses: {...state.sessionImpulses}};
      payload.impulses.forEach(impulse => newState.sessionImpulses[impulse.id] = impulse);
      return newState;

    case UPDATE_LINKED_SPARKS:
      let newState = {...state, linkedSparks: {...state.linkedSparks}};
      payload.sparks.forEach(spark => newState.linkedSparks[spark.id] = spark);
      return newState;

    case UPDATE_SESSION_SPARKS:
      let newState = {...state, sessionSparks: {...state.sessionSparks}};
      payload.sparks.forEach(spark => newState.sessionSparks[spark.id] = spark);
      return newState;

    case SET_ACTIVE_THREAD:
      return {...state, activeThread: action.payload.thread}

    case SET_CENTER_COMPONENT:
      return {...state, centerComponent: action.payload.centerComponent};

    case LOGIN:
      return {...state,
        loggedIn: true,
        accountId: action.payload.accountId,
        accountToken: action.payload.accountToken
      };
    
    case SET_SESSION:
      return {...state, sessionToken: action.payload.sessionToken};

    case SET_ACTIVE_ITEMS:
      return {...state,
        activeImpulse: action.payload.impulse,
        activeSpark: action.payload.spark,
        activeThread: action.payload.thread
      };

    default:
      return state;
  }
}
