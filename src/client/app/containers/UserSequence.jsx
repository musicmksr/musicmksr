import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import profileSequence from '../actions/profileSequence';
import request from 'axios';

class UserSequence extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      message: '',
      messageCl: 'hidden',
      bsStyle: 'danger'
    };
  }

	chooseSequence() {
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
        this.setState({
          message: 'An Error Occured, please try refreshing the page or logging back in.',
          messageCl: 'show'
        });
      });
  }

  render() {
    return(
      <div  className='col-md-2 userSequence-container'>
        <Alert className={this.state.messageCl} bsStyle={this.state.bsStyle}>
          {this.state.message}
        </Alert>
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
