const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_THREADS:
      let newState = {...state, threads: {...state.threads}};
      payload.threads.forEach(thread => newState.threads[thread.id] = thread);
      return newState;
    case APPEND_THREAD_MESSAGES:
      // expects the new messages array to be in reverse chronological order (descending time)
      let newState = {...state};
      let thread = newState.threads[action.payload.threadId];
      thread.messages = [...action.payload.messages.reverse(), ...thread.messages];
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
    case SET_ACTIVE_IMPULSE:
      return {...state,
        activeImpulseId: action.payload.impulseId,
        activeSparkId: action.payload.sparkId
      };
    case SET_CENTER_COMPONENT:
      return {...state, centerComponent: action.payload.centerComponent};
    case LOGIN:
      return {...state, 
        loggedIn: true,
        accountId: action.payload.accountId,
        accountSessionToken: action.payload.accountSessionToken
      };
    default
      return state;
  }
}
