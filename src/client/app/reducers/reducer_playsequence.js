export default (state = null, action) => {
  console.log(action.index, ' inside reducer index for track change');

  switch (action.type){
    case "SET_PLAY_SEQUENCE":
    	state = state || [];

    	if(state.length !== action.trackLength){
    		state.push(action.payload);
    	}else {
        state[action.index] = action.payload;
      }

      return state;
    default:
      return state;
  }
};
