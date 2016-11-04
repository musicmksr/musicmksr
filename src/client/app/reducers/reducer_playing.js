export default (state = null, action) => {
  switch (action.type){
    case "CLICK_TO_PLAY":
      return action.payload;
    default:
      return state;
  }
}
