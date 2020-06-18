import { combineReducers } from 'redux';
import api_rdcr     from './api_rdcr';
/* Merge reducers  */
const rootReducer = combineReducers({
  api_rdcr,
});

export default rootReducer;

