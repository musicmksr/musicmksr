import React from 'react';
import { connect } from 'react-redux';
import Sample from './Sample.jsx';
import Howler from 'react-howler';
import setPlaySequence from '../actions/setPlaySequence';
import Options from './SampleOptions.jsx';
import request from 'axios';

let lastId = 0;
let lastWrapId = 0;
let steps = [];

class Track extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      samples: Object.keys(this.props.samples).map(key => this.props.samples[key]),
      sound: this.props.samples[this.props.index]
    };
  }
  componentDidMount() {
    this.createPlaySequence.call(this);
    this.getOptionSamples();
  }
  setStepIndex() {
    if (lastId === 16){
      lastId = 0;
    }
    lastId++;
    return lastId;
  }
  setWrapIndex() {
    if (lastWrapId === 16){
      lastWrapId = 0;
    }
    lastWrapId++;
    return lastWrapId;
  }
  mute(){
    this.props.playSequence[this.props.index].forEach(function(sample, index){
      console.log(sample.props.sound._muted, index);
      sample.props.sound._muted = !sample.props.sound._muted;
    });
    console.log('matrix:', this.props.playSequence);
  }
  volUp(){
    this.props.playSequence[this.props.index].forEach(function(sample, index){
      if(sample.props.sound._volume<1){
          sample.props.sound._volume += 0.1;
          console.log(sample.props.sound._volume);
      } else {
        sample.props.sound._volume = 1;
      }
    });
  }
  volDown(){
    this.props.playSequence[this.props.index].forEach(function(sample, index){
      if(sample.props.sound._volume>0){
          sample.props.sound._volume -= 0.1;
          console.log(sample.props.sound._volume);
      } else {
        sample.props.sound._volume = 0;
      }
    });
  }
  createPlaySequence(){
    console.log('hello')
    let ps = this.props.track.map((step, index) =>
      {
        return <Sample
                index={[this.props.index, index]}
                stepIndex={this.setStepIndex()}
                sound={new Howl( { src: `/api/sample/${this.state.sound}`} )}
               />
      }
    );
    this.props.setPlaySequence.call(null, ps, this.props.trackLength);
  }
  getOptionSamples() {
    let samplesArr = this.state.samples.slice();

    if(window.newCookie){
      request.get(`/api/options/${window.newCookie.user.mainId}`)
        .then((response) =>{
          response.data.samples.forEach((sound, index) =>{
            if(samplesArr.indexOf(sound.name) === -1){
              samplesArr.push(sound.name);
            }
          }); 
          this.setState({
            samples: samplesArr
          });
        })
        .catch((err) =>{
          console.log(err);
        });
    }
  }
  changeSample(event) {
    this.setState({
      sound: event.target.value
    });

    this.createPlaySequence.call(this);
  }

  render() {
    return(
      <div>
        {this.props.track.map((step, index) =>
            <div id='step-wrapper' key={[step, index]} className={this.setWrapIndex()}>
              <Sample
                playState={this.props.playState}
                key={[this.props.index, index]}
                stepIndex={this.setStepIndex()}
                step={step}
                index={[this.props.index, index]}
                sound={new Howl( {
                  src: `/api/sample/${this.state.sound}`} )}
                toggleMatrix={this.props.toggleMatrix}
              />
            </div>
        )}
        <button onClick={this.mute.bind(this)}>MUTE</button>
        <button onClick={this.volDown.bind(this)}>-</button>
          {this.props.playSequence[this.props.index]._volume}
        <button onClick={this.volUp.bind(this)}>+</button>
        <select value={this.state.sound} onChange={this.changeSample.bind(this)}>
          {this.state.samples.map((sound, index) =>
            <Options key={sound} sound={sound} />
          )}
        </select>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { playSequence: state.playSequence }
}
export default connect(mapStateToProps, { setPlaySequence: setPlaySequence })(Track);
