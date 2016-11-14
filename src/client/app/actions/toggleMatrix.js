export default (index, sequence, sound, sampleIndex, addTrack) =>{
	if(sequence !== undefined && typeof sequence.matrix === 'string'){
		const matrix = JSON.parse(sequence.matrix);
		//set the matrix on the matrix
		sequence.matrix = matrix;
		//set the title on the matrix
		sequence.matrix.name = sequence.name;
	}
	return{
		type: 'TOGGLE_SAMPLE',
		payload: [index, sequence],
		sound: sound,
		sampleIndex: sampleIndex,
		addTrack: addTrack
	};
};
