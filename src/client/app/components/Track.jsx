import React from 'react';
import { connect } from 'react-redux';
import Sample from './Sample.jsx';
import Howler from 'react-howler';
import setPlaySequence from '../actions/setPlaySequence';
import changeSample from '../actions/changeSample';
import deleteTrack from '../actions/deleteTrack';
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
    this.syncScroll();
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
    this.props.howlerObject._muted = !this.props.howlerObject._muted;
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
  createPlaySequence(){
    let ps = this.props.track.map((step, index) =>
      {
        return <Sample
                index={[this.props.index, index]}
                key={[this.props.index, index]}
                stepIndex={this.setStepIndex()}
                sound={this.props.howlerObject}
               />
      }
    );
    this.props.setPlaySequence.call(null, ps, this.props.trackLength, this.props.index);
  }
  getOptionSamples() {
    let samplesArr = this.state.samples.slice();

    if(window.newCookie){
      request.get(`/api/options/${window.newCookie.user.mainId}`)
        .then((response) =>{
          response.data.samples.forEach((sound, index) =>{
            if(samplesArr.indexOf(`${sound.name}.wav`) === -1){
              samplesArr.push(`${sound.name}.wav`);
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
    this.props.changeSample(event.target.value, this.props.index);
  }
  deleteTrack(index) {
    this.props.deleteTrack(index);
  }
  syncScroll() {
    $('.stepsWrapper').scroll((e) => {
      $('.stepsWrapper').scrollLeft(e.target.scrollLeft);
    });
  }
  render() {

    // deprecated vol controls this.props.playSequence[this.props.index]._volume
    //     <button className='btn' onClick={this.volDown.bind(this)}>-</button>
    //    <button className='btn' onClick={this.volUp.bind(this)}>+</button>

    // what was inside volume this.props.playSequence[this.props.index]._volume
    this.createPlaySequence.call(this);

    return(
      <div className='tracksWrapper'>
        <div className='stepsWrapper col-md-9 container-fluid' onScroll={_.debounce(this.syncScroll, 500)}>
          {this.props.track.map((step, index) =>
              <div id='step-wrapper' key={[step, index]} className={this.setWrapIndex()}>
                <Sample
                  playState={this.props.playState}
                  key={[this.props.index, index]}
                  stepIndex={this.setStepIndex()}
                  step={step}
                  index={[this.props.index, index]}
                  sound={this.props.howlerObject}
                  toggleMatrix={this.props.toggleMatrix}
                />
              </div>
          )}
        </div>
        <div className='trackControls col-md-3 container-fluid'>
          <div className='col-md-6'>
            <select className='sampleSelect form-control' value={this.state.sound} onChange={this.changeSample.bind(this)}>
              {this.state.samples.map((sound, index) =>
                <Options key={[sound, index]} sound={sound} />
              )}
            </select>
          </div>
          <span className='glyphicon glyphicon-volume-off' onClick={this.mute.bind(this)}/>
          <input className='volSlider' id={`slider${this.props.index}`} type="range" min="0" max="100" step="1" onChange={this.volChange.bind(this)} />
          <span className='glyphicon glyphicon-remove' onClick={this.deleteTrack.bind(this, this.props.index)}/>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { playSequence: state.playSequence }
}
export default connect(mapStateToProps,
  { setPlaySequence: setPlaySequence,
    changeSample: changeSample,
    deleteTrack: deleteTrack
  })(Track);
