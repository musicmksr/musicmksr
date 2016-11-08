import React from 'react';
import { render } from 'react-dom';
import request from 'axios';

class Profile extends React.Component {
	constructor(props){
		super(props);
		request.get('/api/session')
			.then((response) =>{
				if(response.data.userID === undefined){
					console.log('not logged in')
				}else{
					console.log('logged in')
				}
			})
			.catch((error) =>{
		    console.log(error);
		  });
	}

  render() {
    return(
      <div>Profile</div>
    )
  }
}

export default Profile;
