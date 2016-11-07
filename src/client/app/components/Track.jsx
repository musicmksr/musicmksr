import React from 'react';
import Sample from './Sample.jsx';
import Howler from 'react-howler';

let lastId = 0;
let steps = [];
class Track extends React.Component {

  setStepIndex() {
    if (lastId === 16){
      lastId = 0;
    }
    lastId++;
    return lastId;
  }

  render() {
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
            />
            steps.push(sample);
            return sample;
          }
        )}
      </div>
    )
  };
}
export { Track, steps };
