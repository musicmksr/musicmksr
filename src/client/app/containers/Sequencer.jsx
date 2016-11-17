import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-bootstrap';
import Track from '../components/Track.jsx';
import toggleMatrix from '../actions/toggleMatrix';
import setPlaySequence from '../actions/setPlaySequence';
import saveBPM from '../actions/saveBPM';
import addTrack from '../actions/addTrack';
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
      title: this.props.sequence.name || '',
      titleWarning: '',
      test: {},
      bpm: this.props.sequence.bpm || 120,
    };
  }
  componentDidMount() {
    clearInterval(window.innerPlay);
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
    if (!this.state.playing) {

      this.setState({
        playing: true
      });

      console.log(this.props.playSequence);
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

          // console.log(context.props.sequence.matrix[step.props.index[0]][step.props.index[1]], step.props.index);

          if(step.props.stepIndex === currentCol &&
              context.props.sequence.matrix[step.props.index[0]][step.props.index[1]].toggled === true && !window.howlObj[step.props.index[0]]._muted
            )
          {
            step.props.sound.play();
          }
        });

        if (currentCol < 16){
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
          message: 'Saving Sequence...',
          messageCl: 'show'
        });

        const sendObj = {
          sequence: sequence,
          title: this.state.title,
          userId: window.newCookie.user.mainId
        };

        request.post('/api/save', sendObj)
          .then((response) =>{
            this.setState({
              message: 'Sequence Saved!',
              messageCl: 'show'
            });
          })
          .catch((error) =>{
            console.log(error);
          });

        setTimeout(() =>{
          this.setState({
            message: '',
            messageCl: 'hidden'
          });
        }, 3000);
      }
    }else {
      alert('Login to save your beats');
    }
  }
  setTitle(event) {
    this.props.sequence.name = '';
    let title = event.target.value;

    this.setState({
      title: title,
      titleWarning: 'New titles will save as new beats!'
    });
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
  render() {
    this.howlObjRequest(this.props.sequence.samples);

    let message = this.state.message;
    let play = '';

    if(this.state.playing === false){
      play = 'Play';
    } else {
      play = 'Stop';
    }

    return(
      <div className='outer container-fluid'>
        <div className='sequencerHeader'>
          <div className='col-md-9'>
            <Alert className={this.state.messageCl} bsStyle="info">
              {message}
            </Alert>
            <form id='bpmForm' action='javascript:void(0)'>
              <input
                name='bpm'
                type='number'
                defaultValue={this.state.bpm || this.props.sequence.bpm}
                onChange={this.setBPM.bind(this)}
                required
              />
            </form>

            <form className='saveForm' action='javascript:void(0)'>
              <input
                type='text'
                name='title'
                className='titleInput'
                value={this.state.title || this.props.sequence.name}
                onChange={this.setTitle.bind(this)}
                required
              />
              <button className='btn'onClick={this.save.bind(this, this.props.sequence)}>
                Save
              </button>
              <span className='saveAlert'>
                {this.state.titleWarning}
              </span>
            </form>

          </div>
          <div className='col-md-3'>
            <button id='playButton' className='btn' onClick={this.play.bind(this, null)}>{play}</button>
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
                sound={this.props.sequence.samples[index]}
                trackLength={this.props.sequence.matrix.length}
                toggleMatrix={this.props.toggleMatrix.bind(this)}
              />
          )}
        </div>
        <div className='addTrack'>
          <button className='btn' onClick={this.addTrack.bind(this)}>Add Track</button>
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
  addTrack: addTrack
})(Sequencer);
