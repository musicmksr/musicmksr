import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Alert } from 'react-bootstrap';
import request from 'axios';
import UserSequence from '../containers/UserSequence.jsx';
import UserSamples from './UserSamples.jsx';

class Profile extends React.Component {
	constructor(props){
		super(props);

    if(window.newCookie === undefined){
      browserHistory.push('/');
    }

    this.state = {
      loading: 'Loading...',
      loadingCL: 'show',
      sequences: [],
      samples: []
    };

    clearInterval(window.innerPlay);
	}

	componentDidMount() {
		this.getUserInfo.call(this);
	}

  getUserInfo() {
    if(this.props.loggedIn){
      request.get(`/api/profile/${window.newCookie.user.mainId}`)
        .then((response) =>{
          this.setState({
            loading: '',
            loadingCL: 'hidden',
            sequences: response.data.sequences,
            samples: response.data.samples
          });
        })
        .catch((err) =>{
          console.log(err);
          this.setState({
            loading: 'An Error Occured, please try refreshing the page or logging back in.',
            loadingCL: 'show'
          });
        });
    }
  }

  render() {
    let userName = '';
    if(window.newCookie === undefined){
      userName = '';
    }else{
      userName = window.newCookie.user.displayName;
    }

    return(
      <div>
        <Alert className={this.state.loadingCL} bsStyle="info">
          {this.state.loading}
        </Alert>
        <div className="container">
          <h2>{userName}</h2>
          <ul className="nav nav-tabs">
            <li className="active"><a data-toggle="tab" href="#home">Sequences</a></li>
            <li><a data-toggle="tab" href="#menu2">Samples</a></li>
          </ul>
          <div className="tab-content">
            <div id="home" className="tab-pane fade in active">
              <h3>All Sequences</h3>
              <div className='row'>
                {this.state.sequences.map((sequence, index) => 
                  <UserSequence key={index} newSequence={sequence} name={sequence.name} getUserInfo={this.getUserInfo.bind(this)}/>
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
