export default (state = null, action) => {
  switch (action.type){
    case "UPDATE_PLAY_STATE":
      state = !action.payload;
      console.log('in update play state');
      return state;

    default:
      return state;
  }
};
