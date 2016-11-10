import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-bootstrap';
import { Track, steps } from '../components/Track.jsx';
import toggleMatrix from '../actions/toggleMatrix';
import setPlaySequence from '../actions/setPlaySequence';
import updatePlayState from '../actions/updatePlayState';
import request from 'axios';

let currentCol = 1;
let innerPlay;
let playState = false;
class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageCl: 'hidden',
      title: this.props.sequence.name || '',
      titleWarning: ''
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Sequencer updated.', steps.length);
  }

  mute(){
    steps.forEach(function(sample){
      if(sample.props.index[0]===1){
        sample.props.sound._muted = !sample.props.sound._muted;
      }
    });
  }
  play() {
    this.props.updatePlayState(playState);
    if (!playState) {
      playState = true;
      currentCol = 0;
      const context = this;
      innerPlay = setInterval(() =>{
        steps.forEach((step) =>{
          if(step.props.stepIndex === currentCol && step.props.sound.toggled){
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
      playState = false;
    }
  }
  save(sequence){
    if(window.newCookie){
      if(this.state.title !== ''){
        this.setState({
          message: 'Saving Sequence...',
          messageCl: 'show'
        });

        const sendObj = { sequence: sequence, title: this.state.title };

        request.post('/api/save', sendObj)
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
      }
    }else {
      alert('Login to save your beats');
    }
  }
  setTitle(event) {
    this.props.sequence.name = '';
    let title = event.target.value;

    this.setState({
      title: title,
      titleWarning: 'New titles will save as new beats!'
    });
  }

  render() {
    let message = this.state.message;
    let play = '';

    if(this.state.playing === false){
      play = 'Play';
    } else {
      play = 'Stop';
    }

    console.log(this.props.sequence, ' inside sequence.jsx');
    return(
      <div className="sequence">
        <Alert className={this.state.messageCl} bsStyle="info">
          {message}
        </Alert>

        <button onClick={this.play.bind(this, null)}>{play}</button>
        <form action='javascript:void(0)'>
          <input type='text' name='title' value={this.state.title || this.props.sequence.name} onChange={this.setTitle.bind(this)} required/>
          <button onClick={this.save.bind(this, this.props.sequence)}>Save</button> <span>{this.state.titleWarning}</span>
        </form>

        {this.props.sequence.matrix.map((track, index) =>
            <Track
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
    playSequence: state.playSequence,
  }
}

export default connect(mapStateToProps, {
  toggleMatrix: toggleMatrix,
  setPlaySequence: setPlaySequence,
  updatePlayState: updatePlayState
})(Sequencer);
