import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import matrixReducer from './reducer_playing';
import playSequenceReducer from './reducer_playsequence';

const rootReducer = combineReducers({
  routing: routerReducer,
  sequence: matrixReducer,
  playSequence: playSequenceReducer
});

export default rootReducer;
