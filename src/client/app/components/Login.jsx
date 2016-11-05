import React from 'react';
import { render } from 'react-dom';

class Login extends React.Component {

  render() {
    return(
      <div>
        <div>Login</div>
        <p>
          <a href="auth/facebook">Log In with Facebook</a>
        </p>
        <p>
          <a href="/logout">Log Out</a>
        </p>
      </div>
    )
  }

}

export default Login;
