export default (index, sequence) =>{
	console.log(sequence, ' inside action')
	if(sequence !== undefined){
		const matrix = JSON.parse(sequence.matrix);
		//set the matrix on the matrix
		sequence.matrix = matrix;
		//set the title on the matrix
		sequence.matrix.name = sequence.name;
	}
	return{
		type: 'TOGGLE_SAMPLE',
		payload: [index, sequence]
	};
};
