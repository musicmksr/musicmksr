import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import toggleMatrix from '../actions/toggleMatrix';

class UserSequence extends React.Component {

	chooseSequence() {
    // right now we are not able to set the store sequence to the new sequence becasue of some parsing error in json

    console.log(this.props.newSequence);
    this.props.toggleMatrix(null, this.props.newSequence);
    browserHistory.push('/sequencer');
	}

  render() {
    return(
      <div onClick={this.chooseSequence.bind(this)} className='col-md-2 userSequence-container'>
        <h3>{this.props.name}</h3>
      	<div className='userSequence'>
      		<img src='imgs/sequence.jpg'/>
      	</div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    sequence: state.sequence,
  }
}

export default connect(mapStateToProps, { toggleMatrix: toggleMatrix })(UserSequence);
