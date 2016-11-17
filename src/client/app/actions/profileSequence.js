export default (sequence) =>{
  const matrix = JSON.parse(sequence.matrix);
  //set the matrix on the matrix
  sequence.matrix = matrix;
  //set the title on the matrix
  sequence.matrix.name = sequence.name;
  
  return{
    type: 'LOAD_PROFILE_SEQUENCE',
    payload: sequence
  };
};
