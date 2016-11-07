import React from 'react';
import Sample from './Sample.jsx';
import Howler from 'react-howler';

class Track extends React.Component {
  render() {
    return(
      <div>
        {this.props.track.map((step, index) => {
          console.log(this.props.sound);
          return <Sample step={step} data={this.props.data} index={this.props.index} sound={new Howl({
              src: `/api/song/${this.props.sound}`
          })}/>
        })}
      </div>
    )
  };
}
export default Track;
