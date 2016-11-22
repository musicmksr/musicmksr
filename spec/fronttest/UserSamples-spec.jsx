import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import UserSamples from '../../src/client/app/components/UserSamples.jsx';

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