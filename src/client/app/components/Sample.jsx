import React from 'react';

class Sample extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          toggled: true,
          class: 'step-tf'
      };
    }

  changeStyle() {
    if (this.state.toggled === false) {
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
              if(this.state.toggled){
                this.props.sound.play()
              }
              this.setState({toggled: !this.state.toggled})
              this.changeStyle();
            }
          }
        >
        </div>
      </div>
    )
  }
}

export default Sample;
