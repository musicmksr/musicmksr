import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Profile from './components/Profile.jsx';
import Upload from './components/Upload.jsx';

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/profile' component={Profile}/>
      <Route path='/upload' component={Upload}/>
      <Route path='/login' component={Login}/>
      <Route path='/logout' component={Logout}/>
    </Route>
  </Router>
), document.getElementById('app'));
