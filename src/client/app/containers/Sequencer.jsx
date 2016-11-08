import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import data from '../data.json';
import Track from '../components/Track.jsx';
import toggleMatrix from '../actions/toggleMatrix.js';

let currentCol = 1;
let innerPlay;

class Sequencer extends React.Component {
  play() {
    currentCol = 0;
    const context = this;

    innerPlay = setInterval(() =>{
      console.log('interval');
      steps.forEach((step) =>{
        console.log(step);
        if(step.props.index[1] === currentCol && context.props.sequence.matrix[step.props.index[0]][step.props.index[1]].toggled === true){
          console.log('current sound: ', step.props.index);
          step.props.sound.play();
        }
      });

      if (currentCol < 16){
        currentCol++;
      } else {
        currentCol = 1;
      }

    },125);
  }
  stop() {
    clearInterval(innerPlay);
  }

  render() {
    console.log('playsequence:', this);
    return(
    	<div className="sequence">
         <button onClick={console.log(this.props)}>Play</button>
        <button onClick={this.stop}>Stop</button>

        {this.props.sequence.matrix.map((track, index) =>
            <Track 
            	key={index} 
            	track={track} 
            	index={index} 
            	sound={data.samples[index]}
            	toggleMatrix={this.props.toggleMatrix.bind(this)}
            />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { sequence: state.sequence,
  playSequence: state.playSequence  }
}

export default connect(mapStateToProps, { 
  toggleMatrix: toggleMatrix
 })(Sequencer);

     