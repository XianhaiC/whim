import {
  UPDATE_IMPULSES,
  UPDATE_SPARKS,
} from '../actions/types';

const INITIAL_STATE = {
  impulses: {},
  sparks: {}
}

export default (state = INITIAL_STATE, action) => {
  let newState = null;

  switch(action.type) {
    case UPDATE_IMPULSES:
      newState = {...state, impulses: {...state.impulses}};

      if (action.payload.remove) {
        action.payload.toRemoveIds.forEach(impulseId =>
          delete newState.impulses[impulseId]);
      }
      else {
        action.payload.impulses.forEach(impulse =>
          newState.impulses[impulse.id] = impulse);
      }

      return newState;

    case UPDATE_SPARKS:
      newState = {...state, sparks: {...state.sparks}};

      if (action.payload.remove) {
        action.payload.toRemoveIds.forEach(sparkId =>
          delete newState.sparks[sparkId]);
      }
      else {
        action.payload.sparks.forEach(spark =>
          newState.sparks[spark.id] = spark);
      }

      return newState;

    default:
      return state;
  }
}
