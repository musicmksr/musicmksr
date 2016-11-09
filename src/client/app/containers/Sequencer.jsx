import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Track from '../components/Track.jsx';
import toggleMatrix from '../actions/toggleMatrix.js';
import setPlaySequence from '../actions/setPlaySequence';

let currentCol = 1;
let innerPlay;
class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
  }
  mute(){
    const steps = _.flatten(this.props.playSequence);
    steps.forEach(function(sample){
      if(sample.props.index[0]===1){
        sample.props.sound._muted = !sample.props.sound._muted
      }
    })
  }
  play() {
    if (!this.state.playing) {
      this.setState({
        playing: true
      });
      currentCol = 1;
      const context = this;
      const steps = _.flatten(this.props.playSequence);
      steps.forEach((sound)=>{
        console.log('MUTE STATUS:', sound.props.sound._muted)
      })
      innerPlay = setInterval(() =>{
        steps.forEach((step) =>{
          if(step.props.stepIndex === currentCol && context.props.sequence.matrix[step.props.index[0]][step.props.index[1]].toggled === true){
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
      })
    }
  }
  render() {
    console.log('playsequence:', this);
    return(

        <div className="sequence">
        <button onClick = {this.mute.bind(this, null)}>MuteChord</button>
        <button onClick={this.play.bind(this, null)}>Play</button>
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

