export default (currentPlayState) =>{
  console.log('current play state action');
  return{
		type: "UPDATE_PLAY_STATE",
		payload: currentPlayState
	};
};
