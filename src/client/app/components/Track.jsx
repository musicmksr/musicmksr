import React from 'react';
import { connect } from 'react-redux';
import Sample from './Sample.jsx';
import Howler from 'react-howler';
import setPlaySequence from '../actions/setPlaySequence';
import toggleMatrix from '../actions/toggleMatrix';
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
    this.getOptionSamples.call(this);
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
  volChange(){
    let slider = document.getElementById('slider'+this.props.index);
    this.props.playSequence[this.props.index].forEach(function(sample, index){
      sample.props.sound._volume = slider.value/100;
      console.log('VOLUME:', sample.props.sound._volume)
    })
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
  createPlaySequence(sound){
    // let src;

    // if(sound !== undefined){
    //   console.log('old');
    //   src = new Howl({ src: `/api/sample/${sound}` });
    // }else{
    //   console.log('new');
    //   src = this.props.newTestSound;
    // }
    console.log(this.props.newTestSound)

    let ps = this.props.track.map((step, index) =>
      {
        return <Sample
                index={[this.props.index, index]}
                key={[this.props.index, index]}
                stepIndex={this.setStepIndex()}
                sound={this.props.newTestSound}
               />
      }
    );
    this.props.setPlaySequence.call(null, ps, this.props.trackLength, this.props.index);
  }
  getOptionSamples() {
    let samplesArr = this.state.samples.slice();

    if(window.newCookie){
      console.log('inside if statement before get request in track')
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

    this.createPlaySequence.call(this, event.target.value);
    this.props.toggleMatrix(null, undefined, event.target.value, this.props.index);
  }

  render() {

    // deprecated vol controls this.props.playSequence[this.props.index]._volume
    //     <button className='btn' onClick={this.volDown.bind(this)}>-</button>
    //    <button className='btn' onClick={this.volUp.bind(this)}>+</button>

    // what was inside volume this.props.playSequence[this.props.index]._volume
    this.createPlaySequence.call(this);
    
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
                sound={this.props.newTestSound}
                toggleMatrix={this.props.toggleMatrix}
              />
            </div>
        )}
        <div className='buttons'>
          <button className='btn' data-toggle="button" onClick={this.mute.bind(this)}>MUTE</button>
          <input id={`slider${this.props.index}`} type="range" min="0" max="100" step="1" onChange={this.volChange.bind(this)} />
        </div>
        <select value={this.state.sound} onChange={this.changeSample.bind(this)}>
          {this.state.samples.map((sound, index) =>
            <Options key={[sound, index]} sound={sound} />
          )}
        </select>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { playSequence: state.playSequence }
}
export default connect(mapStateToProps, 
  { setPlaySequence: setPlaySequence, 
    toggleMatrix: toggleMatrix 
  })(Track);
