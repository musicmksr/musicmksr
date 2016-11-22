import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import UserSamples from '../src/client/app/components/UserSamples.jsx';
import profileTrack from '../src/client/app/actions/profileSequence';

describe('<UserSamples />', () =>{

  it('should render without exploding', () =>{
    const minProps = {
      sample: {
        name: ''
      }
    };

    expect(
      shallow(
        <UserSamples 
          {...minProps} 
        />
      ).length
    )
    .to.equal(1);
  });

});

describe('ProfileTrack - Action', () =>{
  it('should return a string', () =>{
    const data = {
      "matrix": "[[{}]]"
    }

    expect(JSON.stringify(profileTrack(data))).to.deep.equal(JSON.stringify( 
      { "type": "LOAD_PROFILE_SEQUENCE", "payload": { "matrix": [[{}]] } } 
    ));
    expect(profileTrack(data))
  });
});