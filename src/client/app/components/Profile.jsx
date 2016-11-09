import React from 'react';
import { render } from 'react-dom';
import request from 'axios';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loading: 'Loading...'
		}
		this.getUserInfo();
	}

	getUserInfo() {
		request.get('/api/profile')
			.then((response) =>{
				console.log('user info recieved')
				this.setState({
					loading: ''
				});
			});
	}

  render() {
    return(
      <div>Profile
      	<div>{this.state.loading}</div>
      </div>
    )
  }
}

export default Profile;
