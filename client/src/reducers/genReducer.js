const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_THREADS:
      return {...state, threads: {...state.messages,
        action.payload.thread_id: action.payload.messages}};
    case UPDATE_IMMPULSES:
      return {...state, impulses: {...state.impulses,
        action.payload.impulse_id: action.payload.impulse}};
    default
      return state;
  }
}
