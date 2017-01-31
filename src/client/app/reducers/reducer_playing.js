import _ from 'lodash';
import initialMatrix from '../data.json';

let matrixUsed = {};

if(window.localStorage.length > 0){
  try{
    console.log('local storage set');
    matrixUsed = JSON.parse(window.localStorage.loadSequence);
    window.localStorage.clear();
  } catch(e){
    window.localStorage.clear();
    window.location.href = '/';
  }
}else {
  console.log('local storage not set');
  matrixUsed = initialMatrix;
}

export default (state = matrixUsed, action) => {
  const newSequence = _.cloneDeep(state);

  switch (action.type){
    case "TOGGLE_SAMPLE":
    	const index = action.payload;
      let stepObj = newSequence.matrix[index[0]][index[1]];
			// mutate toggle
			stepObj.toggled = !stepObj.toggled;

			// mutate class
			if(stepObj.class === 'step-tf'){
				stepObj.class = 'step-tt';
			}else if (stepObj.class === 'step-tt'){
				stepObj.class = 'step-tf';
			}else if (stepObj.class === 'step-mtt'){
        stepObj.class = 'step-mtf';
      }else if (stepObj.class === 'step-mtf'){
        stepObj.class = 'step-mtt';
      }

      return newSequence;

    case "MUTE_TOGGLE":
      const muteIndex = action.payload;

      newSequence.matrix[muteIndex].forEach((step, index)=>{
        if(step.class === 'step-tt'){
          step.class = 'step-mtt';
        }else if (step.class === 'step-tf'){
          step.class = 'step-mtf';
        }else if (step.class === 'step-mtt'){
          step.class = 'step-tt';
        }else if (step.class === 'step-mtf'){
          step.class = 'step-tf';
        }
      });


     return newSequence;

    case "CHANGE_SAMPLE":
      newSequence.samples[action.sampleIndex] = action.sound;
      return newSequence;

    case "LOAD_PROFILE_SEQUENCE":
      return action.payload.matrix;

    case "ADD_TRACK":
      if(newSequence.matrix.length === 50){
        return newSequence;
      }

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

    case "CLEAR_SEQUENCER":
      state.matrix.forEach((track, index)=>{
        let clearedTrack = _.clone(state.matrix[index]);
        clearedTrack = clearedTrack.map((step) =>{
          step.class = "step-tf";
          step.toggled = false;
          return step;
        });
        newSequence.matrix[index] = clearedTrack;
      });

      return newSequence;

    case "DELETE_TRACK":
      if(newSequence.matrix.length === 1){
        return newSequence;
      }

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
      state.bpm = bpm;

      return state;

    case "ADD_BAR":
      let numOfSteps = action.payload;
      let currentLength = state.matrix[0].length;
      let difference = currentLength - numOfSteps;
      if(numOfSteps > currentLength){
        state.matrix.map((track,index) => {
          let newBar = _.clone(track);
          newBar = newBar.map((step) => {
            if(step.class === 'step-mtf' || step.class === 'step-mtt'){
              step.class = 'step-mtf';
              step.toggled = false;
              return step;
            } else {
              step.class = 'step-tf';
              step.toggled = false;
              return step;
            }
          });
          newBar.forEach((step)=>{
            newSequence.matrix[index].push(step);
          });

        });
      } else if (numOfSteps < currentLength) {
        state.matrix.map((track, index) => {
          let newBar = track.splice(0, difference);
          newSequence.matrix[index] = newBar;
        });

      }
      return newSequence;

    default:
      return state;
  }
};
