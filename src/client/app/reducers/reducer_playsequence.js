export default (state = null, action) => {
  switch (action.type){
    case "SET_PLAY_SEQUENCE":
    	state = state || [];
    	state.push(action.payload);
      return state;
    default:
      return state;
  }
};
