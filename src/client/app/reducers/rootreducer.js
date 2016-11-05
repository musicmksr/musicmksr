import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import PlayingReducer from './reducer_playing';


const rootReducer = combineReducers({
  playing: PlayingReducer,
  routing: routerReducer
});

export default rootReducer;
