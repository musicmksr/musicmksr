import React from 'react';
import request from 'axios';

class UserSamples extends React.Component {
  render() {
    return(
      <div className='col-md-3 userSample-container'>
        <div className='userSample'>
          <h3>{this.props.sample.name}.wav</h3>
         <center><img src='imgs/sample.jpg' /></center>
          <audio controls>
            <source 
              src={`/api/sample/${this.props.sample.name}.wav`} 
              type={`audio/wav`}>
            </source>
          </audio>
        </div>
      </div>
    )
  }

}

/*
            
*/

export default UserSamples;
