import React from 'react';
import { render } from 'react-dom';

class SampleOptions extends React.Component {

  render() {
    return(
    	<option value={this.props.sound}>
    		{this.props.sound}
    	</option>
    )
  }

}

export default SampleOptions;
