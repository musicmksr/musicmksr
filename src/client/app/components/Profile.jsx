import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import request from 'axios';
import UserSequence from './UserSequence.jsx';
import UserSamples from './UserSamples.jsx';

class Profile extends React.Component {
	constructor(props){
		super(props);

    if(window.newCookie === undefined){
      browserHistory.push('/');
    }

    this.state = {
      loading: 'Loading...',
      sequences: [],
      samples: []
    };

    clearInterval(window.innerPlay);
	}

	componentDidMount() {
		this.getUserInfo.call(this);
	}

  getUserInfo() {
    request.get(`/api/profile/${window.newCookie.user.mainId}`)
      .then((response) =>{
        this.setState({
          loading: '',
          sequences: response.data.sequences,
          samples: response.data.samples
        });
      })
      .catch((err) =>{
        console.log(err);
      });
  }

  render() {
    return(
      <div>
      	<div>{this.state.loading}</div>
        <div className="container">
          <h2>{window.newCookie.user.displayName}</h2>
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#home">Sequences</a></li>
            <li><a data-toggle="tab" href="#menu2">Samples</a></li>
          </ul>
          <div className="tab-content">
            <div id="home" className="tab-pane fade in active">
              <h3>All Sequences</h3>
              <div className='row'>
                {this.state.sequences.map((sequence, index) => 
                  <UserSequence key={index} newSequence={sequence} name={sequence.name}/>
                )}
              </div>
            </div>
            <div id="menu2" className="tab-pane fade">
              <h3>All Samples</h3>
              <div className='row'>
                {this.state.samples.map((sample, index) =>
                  <UserSamples key={index} sample={sample}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
