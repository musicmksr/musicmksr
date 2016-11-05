import React from 'react';
import Howler from 'react-howler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Clap extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playing: false
    };
  }
  render(){
    var clap = new Howl({
      src: './samples/clap.wav',
      toggle: false
    });
    return(
    <div>
      <div>
        <button style={{backgroundColor: "#00B1E1", height: '30px', width: '30px', padding: '1px',margin: '15px'}}
        onClick={() => {
          clap.toggle = !clap.toggle;
           console.log(clap.toggle);
            if(clap.toggle){
              clap.play()
            }
          }
        }>Play</button>
      </div>  
    </div>
    )
  }
}

class Chord extends React.Component{
  constructor(props){
    super(props)
    this.state = {

      toggled: true,
      class: 'step-tf'

    }
  }
    changeStyle() {
    if (this.state.toggled === false) {
      this.setState({class: 'step-tf'});
    } else {
      this.setState({class: 'step-tt'});
    }
  }
  render(){
    var chord = new Howl({
      src: './samples/chord4.wav'
    })
    return(
  
      <div style={{display: 'inline-block'}}>
        
        <div className={this.state.class}
         onClick={() => {
          
           console.log(this.state.toggled);
            if(this.state.toggled){
              chord.play()
            }
          this.setState({toggled: !this.state.toggled})
          this.changeStyle();
          }
        }></div>
      </div>  

    )
  }
}




class ChordTrack extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playing: false
    }

  }
  makeRow(steps){
    var results =[];
    for(var i = 1; i <= steps; i++){
      results.push(<Chord />)       
    }
    return results;
  }
  render(){

    return(
      <div>
        {this.makeRow(16).map(function(step){
          return step;
        })}
      </div>
    )
  }
}
class Sequencer extends React.Component {
  render() {
    return(
      <div>
        <ChordTrack />
      </div>
    )
  }
}


// anything returned from this function will be props on
// Sequencer container
function mapStateToProps(state) {
  return {
    playing: state.playing
  }
}

// function mapDispatchToProps(dispatch) {
//   // whenever clickButton is called, the result
//   // is passed to all of our reducers via dispatch
//   return bindActionCreators({ clickButton: clickButton }, dispatch);
// }

// sequencer from component to container
export default Sequencer;
