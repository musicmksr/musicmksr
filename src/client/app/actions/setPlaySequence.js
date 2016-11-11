export default (array, trackLength) =>{
  console.log(array)
	return{
		type: "SET_PLAY_SEQUENCE",
		payload: array,
		trackLength: trackLength
	};
};
