import React from 'react';
import { render } from 'react-dom';

class UserSamples extends React.Component {
  render() {
    return(
      <div className='col-md-3 userSample-container'>
        <div className='userSample'>
          <h3>{this.props.sample.name}</h3>
         <center><img src='imgs/sample.jpg' /></center>
          <audio controls>
            <source 
              src={`/api/sample/${this.props.sample.name}`} 
              type={`audio/${this.props.sample.name.split('\.')[1]}`}>
            </source>
          </audio>
        </div>
      </div>
    )
  }

}

export default UserSamples;
