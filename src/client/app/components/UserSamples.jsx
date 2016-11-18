import React from 'react';
import { render } from 'react-dom';
import request from 'axios';

class UserSamples extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sound: ''
    }
  }
  componentDidMount(){
    this.getSongs();
  }
  getSongs() {
    request.get(`/api/samples/${this.props.sample.name}.wav`)
      .then((response) =>{
        this.setState({
          sound: response.data
        });
      });
  }
  render() {
    console.log(this.state.sound)
    return(
      <div className='col-md-3 userSample-container'>
        <div className='userSample'>
          <h3>{this.props.sample.name}.wav</h3>
         <center><img src='imgs/sample.jpg' /></center>
          <audio controls>
            <source 
              src={`/api/samples/${this.props.sample.name}.wav`} 
              type={`audio/wav}`}>
            </source>
          </audio>
        </div>
      </div>
    )
  }

}

export default UserSamples;
