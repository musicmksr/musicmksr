import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import profileSequence from '../actions/profileSequence';
import request from 'axios';

class UserSequence extends React.Component {

	chooseSequence() {
    // right now we are not able to set the store sequence to the new sequence becasue of some parsing error in json
    this.props.profileSequence(this.props.newSequence);
    browserHistory.push('/sequencer');
	}

  deleteSequence() {
    request.delete(`/api/deleteSequence/${this.props.name}/${window.newCookie.user.mainId}`)
      .then((response) =>{
        this.props.getUserInfo();
      })
      .catch((err) =>{
        console.log(err);
      });
  }

  render() {
    return(
      <div  className='col-md-2 userSequence-container'>
        <div onClick={this.chooseSequence.bind(this)}>
          <h3>{this.props.name}</h3>
        	<div className='userSequence'>
        		<img src='imgs/sequence.jpg'/>
        	</div>
        </div>
        <button className='btn' onClick={this.deleteSequence.bind(this)}>Delete</button>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    sequence: state.sequence,
  }
}

export default connect(mapStateToProps, 
  { 
    profileSequence: profileSequence
  }
)(UserSequence);
