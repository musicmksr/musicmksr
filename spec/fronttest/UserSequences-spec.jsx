import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UserSequence } from '../../src/client/app/containers/UserSequence.jsx';
import profileTrack from '../../src/client/app/actions/profileSequence';

describe('<UserSequence />', () =>{

  it('should render without exploding', () =>{
    const minProps = {
      message: '',
      messageCl: '',
      bsStyle: '',
      store: {
        getState: () => {},
        sequence: {
          matrix: [[]],
          samples: {},
          name: ''
        }
      }
    };

    expect(
      shallow(
        <UserSequence 
          {...minProps}
        />
      ).length
    )
    .to.equal(1);
  });
  

});

describe('ProfileTrack - Action', () =>{
  it('should return an object with a type property and payload property', () =>{
    const data = {
      "matrix": "[[{}]]"
    };

    expect(profileTrack(data)).to.have.any.keys('type', 'payload');
  });
});