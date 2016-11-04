import React from 'react';
import Howler from 'react-howler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Sequencer extends React.Component {
  render() {
    return(
      <div>
        // {window.Howler.usingWebAudio = true}
        <Howler ref={(ref) => this.audio = ref} src='./samples/clap.wav'/>
        <button onKeyPress={() => this.audio.play() }></button>
      </div>
    )
  }
}


// anything returned from this function will be props on
// Sequencer container
function mapStateToProps(state) {
  return {
    playing: state.playing
  }
}

function mapDispatchToProps(dispatch) {
  // whenever clickButton is called, the result
  // is passed to all of our reducers via dispatch
  return bindActionCreators({ clickButton: clickButton }, dispatch);
}

// sequencer from component to container
export default connect(mapStateToProps, mapDispatchToProps)(Sequencer);
