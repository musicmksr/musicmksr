import _ from 'lodash';
import initialMatrix from '../data.json';

export default (state = initialMatrix, action) => {
  const newSequence = _.cloneDeep(state);

  switch (action.type){
    case "TOGGLE_SAMPLE":
    	const index = action.payload[0];

			// mutate toggle 
			newSequence.matrix[index[0]][index[1]].toggled = !newSequence.matrix[index[0]][index[1]].toggled;

			// mutate class
			if(newSequence.matrix[index[0]][index[1]].class === 'step-tf'){
				newSequence.matrix[index[0]][index[1]].class = 'step-tt';
			}else {
				newSequence.matrix[index[0]][index[1]].class = 'step-tf';
			}

      return newSequence;

    case "CHANGE_SAMPLE":
      console.log('change sample');
      newSequence.samples[action.sampleIndex] = action.sound;
      return newSequence;

    case "LOAD_PROFILE_SEQUENCE":
      console.log('add from profile');
      return action.payload.matrix;

    case "ADD_TRACK":
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
      console.log('delete track');

      console.log(deleteTrackIndex);

      newSequence.matrix.splice(action.deleteTrackIndex, 1);

      delete newSequence.samples[action.deleteTrackIndex];

      let trackLength = newSequence.matrix.length - 1;
      let newSequenceArr = Object.keys(newSequence.samples).map(key => newSequence.samples[key]);

      for(var i=0;i<=trackLength;i++){
        newSequence.samples[i] = newSequenceArr[i];
      }

      console.log(newSequence)
      
    default:
      return state;
  }
};
