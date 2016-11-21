import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-bootstrap';
import Howler from 'react-howler';
import Track from './Track.jsx';
import toggleMatrix from '../actions/toggleMatrix';
import setPlaySequence from '../actions/setPlaySequence';
import saveBPM from '../actions/saveBPM';
import addTrack from '../actions/addTrack';
import addBar from '../actions/addBar';
import request from 'axios';

let currentCol = 1;

window.innerPlay;
window.howlObj = {};
class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      message: '',
      messageCl: 'hidden',
      bsStyle: 'info',
      originalTitle: this.props.sequence.name,
      title: this.props.sequence.name || '',
      titleWarning: '',
      test: {},
      bpm: this.props.sequence.bpm || 120,
      numOfSteps: 16,
      playIcon: 'glyphicon glyphicon-play'
    };
  }
  componentDidMount() {
    let context = this;
    clearInterval(window.innerPlay);
    document.body.onkeydown = function(e){
    if(e.keyCode == 32){
      e.preventDefault();
      context.play();
      }
  }
  }
  bpmConversion(bpm) {
    let convertedBPM = (1/(bpm)) * 15000;
    return convertedBPM;
  }
  howlObjRequest(samplesObj) {
    let samplesArr = Object.keys(samplesObj).map((key) => samplesObj[key]);
    const newSampObj = {};

    samplesArr.forEach((sample, index) =>{
      if(window.howlObj[index]){
        if(`/api/sample/${samplesArr[index]}` === window.howlObj[index]._src){
          newSampObj[index] = window.howlObj[index];
        }else {
          newSampObj[index] = new Howl( {src: `/api/sample/${sample}`} );
        }
      } else {
        newSampObj[index] = new Howl( {src: `/api/sample/${sample}`} );
      }
    });

    window.howlObj = newSampObj;
  }
  play() {
    if(this.state.playIcon === 'glyphicon glyphicon-play') {
      this.setState({playIcon: 'glyphicon glyphicon-stop'});
    } else {
      this.setState({playIcon: 'glyphicon glyphicon-play'});
    }

    if (!this.state.playing) {
      this.setState({
        playing: true
      });

      currentCol = 1;
      const context = this;
      const steps = _.flatten(this.props.playSequence);

      window.innerPlay = setInterval(() =>{
        steps.forEach((step, index) =>{
          if(step.props.stepIndex === currentCol){
            let elements = document.getElementsByClassName(step.props.stepIndex.toString());
            elements = Array.prototype.slice.call(elements);

            elements.forEach((element)=>{
              element.id='step-wrapper-active';
            });
          }else if(step.props.stepIndex !== currentCol){
            let elements = document.getElementsByClassName(step.props.stepIndex.toString());
            elements = Array.prototype.slice.call(elements);
            elements.forEach((element)=>{
                element.id='step-wrapper';
              });
          }
          if(step.props.stepIndex === currentCol &&
              context.props.sequence.matrix[step.props.index[0]][step.props.index[1]].toggled === true && !window.howlObj[step.props.index[0]]._muted
            )
          {
            step.props.sound.play();
          }
        });

        if (currentCol < this.state.numOfSteps){
          currentCol++;
        } else {
          currentCol = 1;
        }
      },this.bpmConversion(this.state.bpm));
    } else {
      clearInterval(window.innerPlay);
      this.setState({
        playing: false
      });
    }
  }
  save(sequence){
    this.saveBPM();
    if(window.newCookie){
      if(this.state.title !== ''){
        this.setState({
          titleWarning: 'Saving Sequence...'
        });

        const sendObj = {
          sequence: sequence,
          title: this.state.title,
          userId: window.newCookie.user.mainId
        };

        request.post('/api/save', sendObj)
          .then((response) =>{
            this.setState({
              titleWarning: 'Sequence Saved!',
            });
          })
          .catch((error) =>{
            console.log(error);
            this.setState({
              message: 'An Error Occured, please try refreshing the page or logging back in.',
              messageCl: 'show',
              bsStyle: 'danger'
            });
          });
      }
    }else {
      alert('Login to save your beats');
    }
  }
  setTitle(event) {
    this.props.sequence.name = '';
    let title = event.target.value;

    if(title === this.state.originalTitle){
      this.setState({
        title: title,
        titleWarning: ''
      });
    }else {
      this.setState({
        title: title,
        titleWarning: 'New titles will save as new beats!'
      });
    }
  }
  setBPM(event) {
    let bpm = event.target.value;
    if ( bpm <= 150 && bpm >= 80) {
      this.setState({ bpm: bpm });
    }
  }
  saveBPM() {
    this.props.saveBPM(this.state.bpm);
  }
  addTrack() {
    this.props.addTrack(true);
  }
  addBar(e) {
    window.lastId = 0;
    window.lastWrapId = 0;
    this.setState({numOfSteps:e.target.value });
    this.props.addBar(e.target.value);
  }
  render() {
    this.howlObjRequest(this.props.sequence.samples);

    let message = this.state.message;
    let play = '';
    let disabled = '';

    if(this.state.playing === false){
      play = 'Play';
    } else {
      play = 'Stop';
      disabled = 'true';
    }

    return(
      <div className='outer container-fluid'>
        <div className='sequencerHeader'>
          <div className='save_bpm col-md-9'>
            <Alert className={this.state.messageCl} bsStyle={this.state.bsStyle}>
              {message}
            </Alert>
            <div className='col-md-2'>
              <form id='bpmForm' action='javascript:void(0)'>
                <input
                  id='bpmInput'
                  name='bpm'
                  type='number'
                  defaultValue={this.state.bpm || this.props.sequence.bpm}
                  onChange={this.setBPM.bind(this)}
                  required
                />
                <span id='bpmText'>BPM</span>
              </form>
            </div>
            <div className='col-md-7'>
              <form className='saveForm' action='javascript:void(0)'>
                <input
                  type='text'
                  name='title'
                  className='titleInput'
                  value={this.state.title || this.props.sequence.name}
                  onChange={this.setTitle.bind(this)}
                  placeholder='sequence title'
                  required
                />
                <button id='saveBtn'className='btn'onClick={this.save.bind(this, this.props.sequence)}>
                  Save
                </button>
                <span className='saveAlert'>
                  {this.state.titleWarning}
                </span>
              </form>
            </div>
          </div>

          <div className='playCtrl col-md-3'>
            <button id='playButton' className='btn' onClick={this.play.bind(this, null)}><span className={this.state.playIcon}></span></button>
          </div>
      </div>

        <div className='sequence container-fluid col-md-12'>
          {this.props.sequence.matrix.map((track, index) =>
              <Track
                playState={this.state.playing}
                key={index}
                track={track}
                index={index}
                howlerObject={window.howlObj[index]}
                matrix={this.props.sequence.matrix}
                samples={this.props.sequence.samples}
                sample={this.props.sequence.samples[index]}
                sound={this.props.sequence.samples[index]}
                trackLength={this.props.sequence.matrix.length}
                toggleMatrix={this.props.toggleMatrix.bind(this)}
                loggedIn={this.props.loggedIn}
                numOfSteps={this.state.numOfSteps}
                playing={this.state.playing}
              />
          )}
        </div>

        <div className='row addTrack'>
          <div className='btn-toolbar'>
            <button id='addTrackBtn' className='btn' onClick={this.addTrack.bind(this)}>Add Track</button>
            <select id='addSamples' ref='barSet' className='sampleSelect form-control' onChange={this.addBar.bind(this)}>
              <option value='16'>16 Steps</option>
              <option value='32'>32 Steps</option>
            </select>
          </div>
        </div>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    sequence: state.sequence,
    playSequence: state.playSequence,
  }
}
export default connect(mapStateToProps, {
  toggleMatrix: toggleMatrix,
  setPlaySequence: setPlaySequence,
  saveBPM: saveBPM,
  addTrack: addTrack,
  addBar: addBar
})(Sequencer);
