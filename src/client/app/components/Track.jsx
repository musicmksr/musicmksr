import React from 'react';
import Sample from './Sample.jsx';
import Howler from 'react-howler';

class Track extends React.Component {
  render() {
    return(
      <div>
        {this.props.track.map((step, index) => 
          <Sample 
            key={[this.props.index, index]} 
            step={step} 
            index={[this.props.index, index]} 
            sound={new Howl( { src: `/api/sample/${this.props.sound}`} )}
          />
        )}
      </div>
    )
  };
}
export default Track;
