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
				console.log('user info recieved');
				this.setState({
					loading: ''
				});
			});
	}

  render() {
    return(
      <div>
      	<div>{this.state.loading}</div>
        <div className="container">
          <h2>Dynamic Tabs</h2>
          <ul className="nav nav-tabs">
            <li><a data-toggle="tab" href="#menu1">Sequences</a></li>
            <li><a data-toggle="tab" href="#menu2">Samples</a></li>
          </ul>

          <div className="tab-content">
            <div id="menu1" className="tab-pane fade">
              <h3>All Sequences</h3>
            </div>
            <div id="menu2" className="tab-pane fade">
              <h3>All Samples</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
