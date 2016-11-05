import React from 'react';
import { render } from 'react-dom';

class Track extends React.Component {

  render() {
    return(
    	<div>
    		{this.props.track.map(step =>
    			<div className='step-tf' data-play={step.on}>step</div>
    		)}
    	</div>
    )
  };

}

export default Track;
