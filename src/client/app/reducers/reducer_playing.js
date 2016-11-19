import _ from 'lodash';
import initialMatrix from '../data.json';

export default (state = initialMatrix, action) => {
  const newSequence = _.cloneDeep(state);

  switch (action.type){
    case "TOGGLE_SAMPLE":
    	const index = action.payload;
			// mutate toggle 
			newSequence.matrix[index[0]][index[1]].toggled = !newSequence.matrix[index[0]][index[1]].toggled;

			// mutate class
			if(newSequence.matrix[index[0]][index[1]].class === 'step-tf'){
				newSequence.matrix[index[0]][index[1]].class = 'step-tt';
			} else if (newSequence.matrix[index[0]][index[1]].class === 'step-tt'){
				newSequence.matrix[index[0]][index[1]].class = 'step-tf';
			} else if (newSequence.matrix[index[0]][index[1]].class === 'step-mtt'){
        newSequence.matrix[index[0]][index[1]].class = 'step-mtf';
      }  else if (newSequence.matrix[index[0]][index[1]].class === 'step-mtf'){
        newSequence.matrix[index[0]][index[1]].class = 'step-mtt';
      }
      return newSequence;

  case "MUTE_TOGGLE":
  const muteIndex = action.payload;
  newSequence.matrix[muteIndex].forEach((step, index)=>{
      if(step.class === 'step-tt'){
        step.class = 'step-mtt';
      }else if (step.class === 'step-tf'){
        step.class = 'step-mtf';
      } else if (step.class === 'step-mtt'){
        step.class = 'step-tt'
      } else if (step.class === 'step-mtf'){
        step.class = 'step-tf'
      }  
      console.log(step.class)
  })


   return newSequence; 

    case "CHANGE_SAMPLE":
      console.log('change sample');
      newSequence.samples[action.sampleIndex] = action.sound;
      return newSequence;

    case "LOAD_PROFILE_SEQUENCE":
      console.log('add from profile');
      return action.payload.matrix;

    case "ADD_TRACK":
      if(newSequence.matrix.length === 50){
        return newSequence;
      }

      console.log('add track');

      let newTrack = _.clone(state.matrix[0]);

      newTrack = newTrack.map((step) =>{
        step.class = "step-tf";
        step.toggled = false;
        return step;
      });

      newSequence.matrix.push(newTrack);
      
      let sampleLength = newSequence.matrix.length - 1;

      newSequence.samples[sampleLength] = 'bigkik.wav';

      return newSequence;

    case "DELETE_TRACK":
      if(newSequence.matrix.length === 1){
        return newSequence;
      }

      console.log('delete track');

      newSequence.matrix.splice(action.deleteTrackIndex, 1);

      delete newSequence.samples[action.deleteTrackIndex];

      let trackLength = newSequence.matrix.length - 1;
      let newSequenceArr = Object.keys(newSequence.samples).map(key => newSequence.samples[key]);

      for(var i=0;i<=trackLength;i++){
        newSequence.samples[i] = newSequenceArr[i];
      }

      return newSequence;

    case 'SAVE_BPM':
      const bpm = Number(action.payload);
      console.log('before: ', state);
      state.bpm = bpm;
      console.log('after: ', state);

      return state;

    case "ADD_BAR":

      let numOfSteps = action.payload;
      let currentLength = state.matrix[0].length
      var difference = currentLength - numOfSteps
      if(numOfSteps > currentLength){
        state.matrix.map((track,index) => {
          let newBar = _.clone(track);
          newBar = newBar.map((step) => {
            step.class = 'step-tf';
            step.toggled = false;
            return step
          });
          newBar.forEach((step)=>{
            newSequence.matrix[index].push(step);
          })

        });  
      } else if (numOfSteps < currentLength) {
        state.matrix.map((track, index) => {
          let newBar = track.splice(0, difference)
          newSequence.matrix[index] = newBar;
        })

      }
      return newSequence;  

    default:
      return state;
  }
};
