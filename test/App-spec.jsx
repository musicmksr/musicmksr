import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../src/client/app/components/App.jsx';

describe('<App />', () =>{
  it('should render without exploding', () =>{
    expect(
      shallow(
        <App />
      ).length
    ).to.equal(1);
  });
});