import {
  UPDATE_LINKED_IMPULSES,
  UPDATE_SESSION_IMPULSES,
  UPDATE_LINKED_SPARKS,
  UPDATE_SESSION_SPARKS,
} from '../actions/types';

const INITIAL_STATE = {
  linkedImpulses: {},
  sessionImpulses: {},
  linkedSparks: {},
  sessionSparks: {},
}

export default (state = INITIAL_STATE, action) => {
  let newState = null;

  switch(action.type) {
    case UPDATE_LINKED_IMPULSES:
      newState = {...state, linkedImpulses: {...state.linkedImpulses}};
      action.payload.impulses.forEach(impulse =>
        newState.linkedImpulses[impulse.id] = impulse);
      return newState;

    case UPDATE_SESSION_IMPULSES:
      newState = {...state, sessionImpulses: {...state.sessionImpulses}};
      action.payload.impulses.forEach(impulse =>
        newState.sessionImpulses[impulse.id] = impulse);
      return newState;

    case UPDATE_LINKED_SPARKS:
      newState = {...state, linkedSparks: {...state.linkedSparks}};
      action.payload.sparks.forEach(spark =>
        newState.linkedSparks[spark.id] = spark);
      return newState;

    case UPDATE_SESSION_SPARKS:
      newState = {...state, sessionSparks: {...state.sessionSparks}};
      action.payload.sparks.forEach(spark =>
        newState.sessionSparks[spark.id] = spark);
      return newState;

    default:
      return state;
  }
}
