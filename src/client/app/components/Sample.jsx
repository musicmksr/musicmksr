import React from 'react';

class Sample extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        class: 'step-tf'
      };
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
      <div style={{display: 'inline-block'}}>
        <div className={this.state.class}
          onClick={() => {
            if(!this.props.sound.toggled){
              this.props.sound.play()
            }
            this.props.sound.toggled = !this.props.sound.toggled;
            this.changeStyle();
          }
        }>
        </div>
      </div>
    )
  }
}

export default Sample;
