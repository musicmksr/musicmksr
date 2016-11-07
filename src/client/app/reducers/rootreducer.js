import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducerPlaying from './reducer_playing'

const rootReducer = combineReducers({
  routing: routerReducer,
  sequence: reducerPlaying
});

export default rootReducer;
