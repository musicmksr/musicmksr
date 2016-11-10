import _ from 'lodash';
import initialMatrix from '../data.json';

export default (state = initialMatrix, action) => {
  switch (action.type){
    case "TOGGLE_SAMPLE":

    	const index = action.payload;
    	const newSequence = _.cloneDeep(state);

			// mutate toggle
			newSequence.matrix[index[0]][index[1]].toggled = !newSequence.matrix[index[0]][index[1]].toggled;

			// mutate class
			if(newSequence.matrix[index[0]][index[1]].class === 'step-tf'){
				newSequence.matrix[index[0]][index[1]].class = 'step-tt';
			}else {
				newSequence.matrix[index[0]][index[1]].class = 'step-tf';
			}
      console.log('sequence from toggle matrix: ', newSequence);
      return newSequence;
    default:
      return state;
  }
};
