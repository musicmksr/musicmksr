import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Profile from './components/Profile.jsx';
import Upload from './components/Upload.jsx';
import Sequencer from './containers/Sequencer.jsx';
import rootReducer from './reducers/rootreducer';

const store = createStore(rootReducer);
// const history = syncHistoryWithStore(browserHistory, store)

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/sequencer' component={Sequencer}/>>
        <Route path='/profile' component={Profile}/>
        <Route path='/upload' component={Upload}/>
        <Route path='/login' component={Login}/>
        <Route path='/logout' component={Logout}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
