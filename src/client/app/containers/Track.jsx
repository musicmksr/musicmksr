import React from 'react';
import { connect } from 'react-redux';
import Howler from 'react-howler';
import request from 'axios';
import Sample from '../components/Sample.jsx';
import Options from '../components/SampleOptions.jsx';
import setPlaySequence from '../actions/setPlaySequence';
import changeSample from '../actions/changeSample';
import deleteTrack from '../actions/deleteTrack';
import toggleMuteStyle from '../actions/toggleMuteStyle';

window.lastId = 0;
window.lastWrapId = 0;
let steps = [];
let counter = 0;
class Track extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      samples: Object.keys(this.props.samples).map(key => this.props.samples[key])
    };
  }
  componentDidMount() {
    this.getOptionSamples.call(this);
    this.syncScroll();
  }
  setStepIndex() {
    if (window.lastId >= this.props.numOfSteps){
      window.lastId = 0;
    }
    window.lastId++;
    return window.lastId;
  }
  setWrapIndex() {
    if (window.lastWrapId >= this.props.numOfSteps){
      window.lastWrapId = 0;
    }
    window.lastWrapId++;
    return window.lastWrapId;
  }
  mute(){
    this.props.toggleMuteStyle(this.props.index)
    this.props.howlerObject._muted = !this.props.howlerObject._muted;
  }
  volChange(){
    let slider = document.getElementById('slider'+this.props.index);
    this.props.playSequence[this.props.index].forEach(function(sample, index){
      sample.props.sound._volume = slider.value/100;
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

    if(this.props.loggedIn){
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
    if(!this.props.playing){
      this.props.deleteTrack(index);
    }
  }
  syncScroll() {
    $('.stepsWrapper').scroll((e) => {
      $('.stepsWrapper').scrollLeft(e.target.scrollLeft);
    });
  }
  render() {
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
            <select className='sampleSelect form-control' value={this.props.sample} onChange={this.changeSample.bind(this)}>
              {this.state.samples.map((sound, index) =>
                <Options key={[sound, index]} sound={sound} />
              )}
            </select>
          </div>
          <span className='glyphicon glyphicon-volume-off' onClick={this.mute.bind(this, this.props.index)}/>
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
    deleteTrack: deleteTrack,
    toggleMuteStyle: toggleMuteStyle,
  })(Track);
