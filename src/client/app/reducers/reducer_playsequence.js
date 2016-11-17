export default (state = null, action) => {
  switch (action.type){
    case "SET_PLAY_SEQUENCE":
    	state = state || [];

      console.log(state.length, action.trackLength);

    	if(state.length !== action.trackLength){
        if(state.length > action.trackLength){
          state = [];
        }
    		state.push(action.payload);
    	}else {
        state[action.index] = action.payload;
      }

      return state;
    default:
      return state;
  }
};
