import React from 'react';
import { connect } from 'react-redux';
import Sample from './Sample.jsx';
import Howler from 'react-howler';
import setPlaySequence from '../actions/setPlaySequence';

let lastId = 0;
let steps = [];
class Track extends React.Component {
  constructor(props){
    super(props);
    // this.setPlaySequence();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('number of steps in steps:', steps.length);
  }

  setStepIndex() {
    if (lastId === 16){
      lastId = 0;
    }
    lastId++;
    return lastId;
  }

  mute(){
    let context = this;
    steps.forEach(function(sample,index){
      if(sample.props.index[0] === context.props.index){
        sample.props.sound._muted = !sample.props.sound._muted;
      }
    })
  }

  volUp(){
    let context = this;
    steps.forEach(function(sample,index){
      if(sample.props.index[0] === context.props.index){
        if(sample.props.sound._volume<1){
            sample.props.sound._volume += 0.1;
            sample.props.sound._volume.toFixed(1);
            console.log(sample.props.sound._volume);
      } else {
        sample.props.sound._volume = 1;
        sample.props.sound._volume.toFixed(1);
      }
      }
    })
  }
  volDown(){
    let context = this;
    steps.forEach(function(sample,index){
      if(sample.props.index[0] === context.props.index){
        if(sample.props.sound._volume>0 ){
            sample.props.sound._volume -= 0.1;
            sample.props.sound._volume.toFixed(1);
            console.log(sample.props.sound._volume)
        } else if (sample.props.sound._volume > 1){
          sample.props.sound._volume = 0;
          sample.props.sound._volume.toFixed(1);
        } else if (sample.props.sound._volume < 0){
          sample.props.sound._volume = 0;
          sample.props.sound._volume.toFixed(1);
        }
      }
    })
  }
  // setPlaySequence(){
  //   let ps = this.props.track.map((step, index) =>
  //     {
  //       return <Sample
  //               index={[this.props.index, index]}
  //               stepIndex={this.setStepIndex()}
  //               sound={new Howl( { src: `/api/sample/${this.props.sound}`} )}
  //              />
  //     }
  //   );
  //   this.props.setPlaySequence(ps, this.props.trackLength);
  // }
  render() {
    return(
      <div>
        {this.props.track.map((step, index) =>
          { let sample =
            <Sample
              key={[this.props.index, index]}
              stepIndex={this.setStepIndex()}
              step={step}
              index={[this.props.index, index]}
              sound={new Howl( {
                src: `/api/sample/${this.props.sound}`} )}
              toggleMatrix={this.props.toggleMatrix}
            />
            steps.push(sample);
            return sample;
          }
        )}
        <button onClick={this.mute.bind(this)}>MUTE</button>
        <button onClick={this.volDown.bind(this)}>-</button>
        <button onClick={this.volUp.bind(this)}>+</button>
      </div>
    )
  };
}


export { Track, steps };
