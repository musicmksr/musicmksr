import initialMatrix from '../data.json';

export default (state = initialMatrix, action) => {
  switch (action.type){
    case "CLICK_TO_PLAY":
      return action.payload;
    default:
      return state;
  }
};
