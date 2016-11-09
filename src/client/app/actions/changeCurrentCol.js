export default (columnCount) =>{
	return{
		type: "CHANGE_CURRENT_COLUMN",
		payload: columnCount
	};
};
