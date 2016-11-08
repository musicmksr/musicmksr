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
    this.setPlaySequence();
  }

  setStepIndex() {
    if (lastId === 16){
      lastId = 0;
    }
    lastId++;
    return lastId;
  }

  setPlaySequence(){
    let ps = this.props.track.map((step, index) =>
      {
        return <Sample
                index={[this.props.index, index]}
                stepIndex={this.setStepIndex()}
                sound={new Howl( { src: `/api/sample/${this.props.sound}`} )}
               />
      }
    );
    this.props.setPlaySequence(ps);
  }

  render() {
    console.log('playsequence:', this.props.playSequence);
    return(
      <div>
        {this.props.track.map((step, index) =>
          {
            let sample =
            <Sample
              key={[this.props.index, index]}
              stepIndex={this.setStepIndex()}
              step={step}
              index={[this.props.index, index]}
              sound={new Howl( { src: `/api/sample/${this.props.sound}`} )}
              toggleMatrix={this.props.toggleMatrix}
            />
            steps.push(sample);
            return sample;
          }
        )}
      </div>
    )
  };
}

function mapStateToProps(state) {
  return { playSequence: state.playSequence }
}

export default connect(mapStateToProps, { setPlaySequence: setPlaySequence })(Track);
