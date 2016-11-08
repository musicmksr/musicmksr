import _ from 'lodash';

export default (index) =>{
	return{
		type: 'TOGGLE_SAMPLE',
		payload: index
	};
};
