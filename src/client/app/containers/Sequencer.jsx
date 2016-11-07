import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import data from '../data.json';
import Track from '../components/Track.jsx';

class Sequencer extends React.Component {
  render() {
    return(
      <div>
        {this.props.sequence.matrix.map((track, index) =>
            <Track key={index} track={track} index={index} sound={data.samples[index]}/>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { sequence: state.sequence }
}

export default connect(mapStateToProps)(Sequencer);
