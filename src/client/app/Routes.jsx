import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import App from './components/App.jsx';
import Profile from './components/Profile.jsx';
import Sequencer from './containers/Sequencer.jsx';
import rootReducer from './reducers/rootreducer.js';
import request from 'axios';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const history = syncHistoryWithStore(browserHistory, store);

// if its a load link then we need to save info into local storage and redirect to sequence and load local storage beat
let load = window.location.pathname.split('/');

if(load.indexOf('load') >= 0){
  request.get(`/api/sequence/${load[3]}/${load[2]}`)
    .then((response) =>{
      console.log(response);
      window.localStorage.loadSequence = JSON.stringify(response.data);
      window.location.href = '/';
    })
    .catch((err) =>{
      console.log(err);
      window.location.href = '/';
    });
}

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' activeClassName="active" component={App}>
        <Route path='/sequencer' activeClassName="active" component={Sequencer}/>
        <Route path='/profile' activeClassName="active" component={Profile}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));

module.exports = store;