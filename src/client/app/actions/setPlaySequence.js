export default (array, trackLength) =>{
	return{
		type: "SET_PLAY_SEQUENCE",
		payload: array,
		trackLength: trackLength
	};
};
