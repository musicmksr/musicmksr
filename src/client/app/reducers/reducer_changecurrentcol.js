export default (state = null, action) => {
  switch (action.type){
    case "CHANGE_CURRENT_COLUMN":
      return action.payload + 1;
    default:
      return state;
  }
};
