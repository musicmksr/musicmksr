import React from 'react';
import { render } from 'react-dom';

class UserSequence extends React.Component {

	chooseSequence() {
		console.log(this.props.matrix);
	}

  render() {
    return(
      <div onClick={this.chooseSequence.bind(this)} className='col-md-3 userSequence-container'>
      	<div className='userSequence'>
      		<img src='imgs/sequence.jpg'/>
      	</div>
      </div>
    )
  }

}

export default UserSequence;
