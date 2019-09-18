import {
  UPDATE_THREADS,
  APPEND_THREAD_MESSAGES,
  PREPEND_THREAD_MESSAGES,
  UPDATE_CACHED_THREAD,
  UPDATE_THREAD_OFFSET
} from '../actions/types';

const INITIAL_STATE = {
  threads: {},
  cachedThreads: {},
  threadOffsets: {},
}

export default (state = INITIAL_STATE, action) => {
  let newState = null;
  let thread = null;

  switch(action.type) {
    case UPDATE_THREADS:
      newState = {...state, threads: {...state.threads}};
      action.payload.threads.forEach(thread => newState.threads[thread.id] = thread);
      return newState;

    case APPEND_THREAD_MESSAGES:
      // (the top of the thread is considered the "back" of the messages array, so we're "appending")
      // used for appending loaded messages
      newState = {...state};
      thread = newState.threads[action.payload.threadId];
      thread.messages = [...action.payload.messages, ...thread.messages];
      return newState;

    case PREPEND_THREAD_MESSAGES:
      // used for prepending new messages received via sockets
      newState = {...state};
      thread = newState.threads[action.payload.threadId];
      thread.messages = [...thread.messages, ...action.payload.messages];
      return newState;

    case UPDATE_CACHED_THREAD:
      newState = {...state};
      newState.cachedThreads[action.payload.impulseId] = action.payload.thread;
      return newState;

    case UPDATE_THREAD_OFFSET:
      newState = {...state};
      newState.threadOffsets[action.payload.threadId] = action.payload.offset;
      return newState;

    default:
      return state;
  }
}
