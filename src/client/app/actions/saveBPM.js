export default (BPM) =>{
  console.log("BPM: ", BPM);
  return{
		type: "SAVE_BPM",
		payload: BPM,
	};
};
