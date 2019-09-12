//TODO: divide genReducer into multiple smaller reducers later
import { combineReducers } from 'redux';
import genReducer from './genReducer';

export default combineReducers({
  gen: genReducer
});
