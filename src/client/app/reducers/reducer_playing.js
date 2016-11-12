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
      }else {
        console.log(action.payload[1].matrix);
   	 		return action.payload[1].matrix;
   	 	}
   	 	break;
    default:
      return state;
  }
};
