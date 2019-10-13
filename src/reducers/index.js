import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import threadsReducer from './threadsReducer';
import controlReducer from './controlReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  data: dataReducer,
  threads: threadsReducer,
  control: controlReducer,
  session: sessionReducer
});
