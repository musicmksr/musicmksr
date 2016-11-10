import React from 'react';
import { connect } from 'react-redux';

class Sample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      class: 'step-tf'
    }
  }


  changeStyle() {
   if (this.props.sound.toggled === false) {
     this.setState({class: 'step-tf'});
   } else {
     this.setState({class: 'step-tt'});
   }
  }

  render(){
    return(
      <div className='track'>
        <div className={this.state.class}
          onClick={() => {
            if(!this.props.sound.toggled && !this.props.playState) this.props.sound.play();
            this.props.sound.toggled = !this.props.sound.toggled;
            this.changeStyle();
            this.props.toggleMatrix.call(null, this.props.index);
          }
        }>
        </div>
      </div>
    )
  }
}

export default Sample;
