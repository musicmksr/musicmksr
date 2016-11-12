export default (array, trackLength) =>{
  console.log(array, 'play sequence')
	return{
		type: "SET_PLAY_SEQUENCE",
		payload: array,
		trackLength: trackLength
	};
};
