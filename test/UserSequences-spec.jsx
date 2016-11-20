import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import UserSequence from '../src/client/app/containers/UserSequence.jsx';

describe('<UserSequence />', () =>{

  it('should render without exploding', () =>{
    const minProps = {
      message: '',
      messageCl: '',
      bsStyle: ''
      
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