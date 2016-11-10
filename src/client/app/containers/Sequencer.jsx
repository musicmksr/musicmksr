import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-bootstrap';
import {Track, steps } from '../components/Track.jsx';
import toggleMatrix from '../actions/toggleMatrix.js';
import setPlaySequence from '../actions/setPlaySequence';
import request from 'axios';

console.log('STEPS: ', steps);
let currentCol = 1;
let innerPlay;
class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      message: '',
      messageCl: 'hidden'
    };
  }
  mute(){
    const steps = steps;
    steps.forEach(function(sample){
      if(sample.props.index[0]===1){
        sample.props.sound._muted = !sample.props.sound._muted;
      }
    });
  }
  play() {
    if (!this.state.playing) {
      this.setState({
        playing: true
      });
      currentCol = 1;
      const context = this;
      innerPlay = setInterval(() =>{
        steps.forEach((step) =>{
          if(step.props.stepIndex === currentCol && step.props.sound.toggled === true){
            step.props.sound.play();
          }
        });
        if (currentCol < 16){
          currentCol++;
        } else {
          currentCol = 1;
        }
      },125);
    } else {
      clearInterval(innerPlay);
      this.setState({
        playing: false
      });
    }
  }
  save(sequence){
    if(window.newCookie){
      this.setState({
        message: 'Saving Sequence...',
        messageCl: 'show'
      });

      request.post('/api/save', JSON.stringify(this.props.sequence))
        .then((response) =>{
          this.setState({
            message: 'Sequence Saved!',
            messageCl: 'show'
          });
        })
        .catch((error) =>{
          console.log(error);
        });

      setTimeout(() =>{
        this.setState({
          message: '',
          messageCl: 'hidden'
        });
      }, 3000);
    }else {
      alert('Login to save your beats');
    }
  }

  render() {

    let message = this.state.message;

    return(

      <div className="sequence">
        <Alert className={this.state.messageCl} bsStyle="info">
          {message}
        </Alert>

        <button onClick={this.play.bind(this, null)}>Play</button>
        <button onClick={this.save.bind(this, this.props.sequence)}>Save</button>
        {this.props.sequence.matrix.map((track, index) =>
            <Track
              playState={this.state.playing}
            	key={index}
            	track={track}
            	index={index}
            	sound={this.props.sequence.samples[index]}
              trackLength={this.props.sequence.matrix.length}
              toggleMatrix={this.props.toggleMatrix.bind(this)}
            />
        )}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    sequence: state.sequence,
    playSequence: state.playSequence
  }
}
export default connect(mapStateToProps, {
  toggleMatrix: toggleMatrix,
  setPlaySequence: setPlaySequence
})(Sequencer);
