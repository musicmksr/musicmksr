import React from 'react';
import Howler from 'react-howler';
import Sample from './Sample.jsx';

class Track extends React.Component {
  render() {
    return(
      <div>
        {this.props.track.map((step, index) =>
          <Sample step={step} data={this.props.data} index={this.props.index} sound= {new Howl({
              src: `./samples/${this.props.sound}`
          })}/>
        )}
      </div>
    )
  };
}
export default Track;
