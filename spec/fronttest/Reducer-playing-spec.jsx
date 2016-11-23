import { shallow } from 'enzyme';
import { expect } from 'chai';
import reducerPlaying from '../../src/client/app/reducers/reducer_playing';
import data from '../../src/client/app/data.json';
import _ from 'lodash';

describe('Reducer Playing', () =>{
  it('should return an initial state', () =>{
    expect(reducerPlaying(data, {type: '', payload: ''})).to.have.property('samples');
  });

  it('should return a new state with one toggled step', () =>{
    expect(data.matrix[0][0].toggled).to.equal(false);
    expect(data.matrix[0][0].class).to.equal('step-tf');

    const toggleData = {
      type: "TOGGLE_SAMPLE",
      payload: [0,0]
    };

    const reducerOutput = reducerPlaying(data, toggleData);

    expect(reducerOutput.matrix[0][0].toggled).to.equal(true);
    expect(reducerOutput.matrix[0][0].class).to.equal('step-tt');
  });

  it('should return a new state with a muted track', () =>{
    expect(data.matrix[0][0].class).to.equal('step-tf');

    const toggleData = {
      type: "MUTE_TOGGLE",
      payload: 0 
    };

    const reducerOutput = reducerPlaying(data, toggleData);

    expect(reducerOutput.matrix[0][0].class).to.equal('step-mtf');
  });

  it('should return a new state with a changed sample', () =>{
    expect(data.samples[0]).to.equal('bigkik.wav');

    const toggleData = {
      type: "CHANGE_SAMPLE",
      sound: 'clap.wav',
      sampleIndex: 0
    };

    const reducerOutput = reducerPlaying(data, toggleData);

    expect(reducerOutput.samples[0]).to.equal('clap.wav');
  });

  it('should return a new state with an added track', () =>{
    expect(data.matrix.length).to.equal(10);

    const toggleData = {
      type: "ADD_TRACK",
      addTrack: true
    };

    const reducerOutput = reducerPlaying(data, toggleData);

    expect(reducerOutput.matrix.length).to.equal(11)
  });
});
