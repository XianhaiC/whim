import { exists } from '../helpers';
import {
  UPDATE_THREADS,
  APPEND_THREAD_MESSAGES,
  PREPEND_THREAD_MESSAGES,
  UPDATE_CACHED_THREAD_ID,
  UPDATE_THREAD_OFFSET
} from '../actions/types';

const INITIAL_STATE = {
  threads: {},
  cachedThreadIds: {},
  threadOffsets: {},
}

export default (state = INITIAL_STATE, action) => {
  let newState = null;
  let thread = null;

  switch(action.type) {
    case UPDATE_THREADS:
      newState = {...state, threads: {...state.threads}};
      action.payload.threads.forEach(thread => {
        newState.threads[thread.id] = thread
      });
      return newState;

    case APPEND_THREAD_MESSAGES:
      // (the top of the thread is considered the "back" of the messages array,
      // so we're "appending")
      // used for appending loaded messages
      newState = {...state, threads: {...state.threads}};
      thread = newState.threads[action.payload.threadId];

      if (!exists(thread.messages))
        thread.messages = action.payload.messages;
      else
        thread.messages = [...action.payload.messages, ...thread.messages];
      return newState;

    case PREPEND_THREAD_MESSAGES:
      // used for prepending new messages received via sockets
      newState = {...state, threads: {...state.threads}};
      thread = newState.threads[action.payload.threadId];

      if (!exists(thread.messages))
        thread.messages = action.payload.messages;
      else
        thread.messages = [...thread.messages, ...action.payload.messages];
      return newState;

    case UPDATE_CACHED_THREAD_ID:
      newState = {...state, cachedThreadIds: {...state.cachedThreadIds}};
      newState.cachedThreadIds[action.payload.impulseId] =
        action.payload.threadId;
      return newState;

    case UPDATE_THREAD_OFFSET:
      newState = {...state, threadOffsets: {...state.threadOffsets}};
      newState.threadOffsets[action.payload.threadId] = action.payload.offset;
      return newState;

    default:
      return state;
  }
}
