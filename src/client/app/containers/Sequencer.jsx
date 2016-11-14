import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-bootstrap';
import Track from '../components/Track.jsx';
import toggleMatrix from '../actions/toggleMatrix';
import setPlaySequence from '../actions/setPlaySequence';
import request from 'axios';

let currentCol = 1;

window.innerPlay;
window.test = {};
class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      message: '',
      messageCl: 'hidden',
      title: this.props.sequence.name || '',
      titleWarning: '',
      test: {}
    };
  }
  componentDidMount(){
    clearInterval(window.innerPlay);
  }
  tryRequest(samplesObj) {
    // this works to load all the samples correctly but does not refire when i change samples from the options
    // i need this to fire on change of object from store, i need it to fire like render fires
    // if this can fire like render fires than i can use its info to effect the sounds on the playsequence
    let samplesArr = Object.keys(samplesObj).map((key) => samplesObj[key]);
    const testObj = {};

    samplesArr.forEach((sample, index) =>{
      console.log('get request for sounds')
      testObj[index] = new Howl( {src: `/api/sample/${sample}`} );
    });

    window.test = testObj;
    // this.setState({
    //   test: testObj
    // });
  }
  mute(){
    const steps = _.flatten(this.props.playSequence);

    steps.forEach(function(sample){
      if(sample.props.index[0]===1){
        sample.props.sound._muted = !sample.props.sound._muted;
      }
    });
  }
  play() {
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
          console.log(step.props);
          if(step.props.stepIndex === currentCol &&
              context.props.sequence.matrix[step.props.index[0]][step.props.index[1]].toggled === true && !step.props.sound._muted
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
      },125);
    } else {
      clearInterval(window.innerPlay);
      this.setState({
        playing: false
      });
    }
  }
  save(sequence){
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
  render() {
    this.tryRequest(this.props.sequence.samples);

    let message = this.state.message;
    let play = '';

    if(this.state.playing === false){
      play = 'Play';
    } else {
      play = 'Stop';
    }

    return(
      <div className="sequence">
        <Alert className={this.state.messageCl} bsStyle="info">
          {message}
        </Alert>
        <button onClick={this.play.bind(this, null)}>{play}</button>

        <form action='javascript:void(0)'>
          <input 
            type='text' 
            name='title' 
            value={this.state.title || this.props.sequence.name} 
            onChange={this.setTitle.bind(this)} 
            required
          />
          <button onClick={this.save.bind(this, this.props.sequence)}>
            Save
          </button> 
          <span>
            {this.state.titleWarning}
          </span>
        </form>

        {this.props.sequence.matrix.map((track, index) =>
            <Track
              playState={this.state.playing}
              key={index}
              track={track}
              index={index}
              newTestSound={window.test[index]}
              matrix={this.props.sequence.matrix}
              samples={this.props.sequence.samples}
              sound={this.props.sequence.samples[index]}
              trackLength={this.props.sequence.matrix.length}
              toggleMatrix={this.props.toggleMatrix.bind(this)}
            />
        )}
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
})(Sequencer);
