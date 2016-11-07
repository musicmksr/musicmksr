import React from 'react';
import Howler from 'react-howler';
import Sample from './Sample.jsx';

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
        {
          this.props.track.map((step, index) =>
            {
              let sample =
              <Sample step={step} data={this.props.data} stepIndex={this.setStepIndex()} index={this.props.index} sound= {new Howl({
                  src: `./samples/${this.props.sound}`
              })}/>
              steps.push(sample);
              return sample;
            }
          )
        }
      </div>
    )
  };
}
export default Track;
