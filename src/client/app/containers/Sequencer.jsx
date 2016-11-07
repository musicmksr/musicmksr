import React from 'react';
import Howler from 'react-howler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import data from '../data.json';
import { Track, steps } from '../components/Track.jsx';

let currentCol = 1;
let innerPlay;

class Sequencer extends React.Component {
  play() {
    currentCol = 0;
    innerPlay = setInterval(function(){
      steps.forEach(function(step){
        console.log('step: ', step);
        if(step.props.stepIndex === currentCol && step.props.sound.toggled){
          step.props.sound.play();
        }
      })
      if (currentCol < 16){
        currentCol++
      } else {currentCol = 1}
    },125)
  }

  stop() {
    clearInterval(innerPlay);
  }

  render() {
    return(
      <div>
        <button onClick={this.play}>Play</button>
        <button onClick={this.stop}>Stop</button>
        {data.matrix.map((track, index) =>
            <Track key={index} track={track} data={data} index={index} sound={data.samples[index]}/>
        )}
      </div>
    )
  }
}

export default Sequencer;
