import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Profile from './Profile.jsx';

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/profile' component={Profile}/>
      <Route path='/login' component={Login}/>
      <Route path='/logout' component={Logout}/>
    </Route>
  </Router>
), document.getElementById('app'));
