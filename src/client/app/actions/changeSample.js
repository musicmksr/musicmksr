export default (sound, sampleIndex) =>{
  return{
    type: 'CHANGE_SAMPLE',
    sound: sound,
    sampleIndex: sampleIndex
  };
};
