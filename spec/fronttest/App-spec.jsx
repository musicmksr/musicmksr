import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../../src/client/app/components/App.jsx';

describe('<App />', () =>{
  it('should render without exploding', () =>{
    const minProps = {
      sequence: {
        matrix: [[]],
        samples: {},
        name: ''
      },
      store: {
        getState: () => {},
        subscribe: () => {},
        dispatch: () => {},
        sequence: {
          matrix: [[]],
          samples: {},
          name: ''
        }
      }
    };
    expect(
      shallow(
        <App {...minProps}/>
      ).length
    ).to.equal(1);
  });
});