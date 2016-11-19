export default (index, sequence) =>{
	return{
		type: 'MUTE_TOGGLE',
		payload: index
	};
};
