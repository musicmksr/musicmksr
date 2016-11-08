import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import matrixReducer from './reducer_playing';

const rootReducer = combineReducers({
  routing: routerReducer,
  sequence: matrixReducer
});

export default rootReducer;
