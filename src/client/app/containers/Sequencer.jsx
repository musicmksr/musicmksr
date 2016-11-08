import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Track from '../components/Track.jsx';
import toggleMatrix from '../actions/toggleMatrix.js';
import setPlaySequence from '../actions/setPlaySequence';
import data from '../data.json';
let currentCol = 1;
let innerPlay;
class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
  }
  play() {
    console.log(this);
    if (!this.state.playing) {
      this.setState({
        playing: true
      });
      currentCol = 1;
      const context = this;
      const steps = _.flatten(this.props.playSequence);
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
    return(
        <div className="sequence">
        <button onClick={this.play.bind(this, null)}>Play</button>
        {this.props.sequence.matrix.map((track, index) =>
            <Track
              playState={this.state.playing}
                key={index}
                track={track}
                index={index}
                sound={data.samples[index]}
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