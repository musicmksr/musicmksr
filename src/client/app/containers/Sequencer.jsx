import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import data from '../data.json';
import { Track, steps } from '../components/Track.jsx';

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
    console.log(steps);
    if (!this.state.playing) {
      this.setState({
        playing: true
      });
      currentCol = 0;
      innerPlay = setInterval(function(){
        steps.forEach(function(step){
          console.log('STEP: ', step);
          if(step.props.stepIndex === currentCol && step.props.sound.toggled){
            step.props.sound.play();
          }
        })
        if (currentCol < 16){
          currentCol++
        } else {currentCol = 1}
      },125)
    } else {
      clearInterval(innerPlay);
      this.setState({
        playing: false
      });
    }
  }

  render() {
    return(
      <div>
        <button onClick={this.play.bind(this, null)}>Play</button>
        {data.matrix.map((track, index) =>
            <Track key={index} track={track} data={data} index={index} sound={data.samples[index]}/>
        )}
      </div>
    )
  }
}

export default Sequencer;
