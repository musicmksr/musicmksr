export default (array, trackLength, index) =>{
	return{
		type: "SET_PLAY_SEQUENCE",
		payload: array,
		trackLength: trackLength,
    index: index
	};
};
