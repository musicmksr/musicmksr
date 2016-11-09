import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import matrixReducer from './reducer_playing';
import playSequenceReducer from './reducer_playsequence';
import columnReducer from './reducer_changecurrentcol';

const rootReducer = combineReducers({
  routing: routerReducer,
  sequence: matrixReducer,
  playSequence: playSequenceReducer,
  changeCurrCol: columnReducer
});

export default rootReducer;
