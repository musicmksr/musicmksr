import _ from 'lodash';
import initialMatrix from '../data.json';

export default (state = initialMatrix, action) => {
  switch (action.type){
    case "TOGGLE_SAMPLE":
    	const index = action.payload[0];

      const newSequence = _.cloneDeep(state);

    	if(index !== null){

				// mutate toggle 
				newSequence.matrix[index[0]][index[1]].toggled = !newSequence.matrix[index[0]][index[1]].toggled;

				// mutate class
				if(newSequence.matrix[index[0]][index[1]].class === 'step-tf'){
					newSequence.matrix[index[0]][index[1]].class = 'step-tt';
				}else {
					newSequence.matrix[index[0]][index[1]].class = 'step-tf';
				}

	      return newSequence;
   	 	}else if(action.sound !== undefined && action.sampleIndex !== undefined){
        newSequence.samples[action.sampleIndex] = action.sound;
        return newSequence;
      }else if (action.addTrack){
        let newTrack = _.clone(state.matrix[0]);

        newTrack = newTrack.map((step) =>{
          step.class = "step-tf";
          step.toggled = false;
          return step;
        });

        newSequence.matrix.push(newTrack);
        
        let sampleLength = newSequence.matrix.length - 1;

        newSequence.samples[sampleLength] = 'bigkik.wav';

        console.log(newSequence);

        return newSequence;
      }else{
        console.log(action.payload[1].matrix, ' add from profile');
   	 		return action.payload[1].matrix;
   	 	}
   	 	break;
    default:
      return state;
  }
};
