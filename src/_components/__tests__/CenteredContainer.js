import React from 'react';
import { CenteredContainer } from '..';
import renderer from 'react-test-renderer';

describe('<CenteredContainer />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CenteredContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with maxWidth', () => {
    const tree = renderer
      .create(<CenteredContainer maxWidth="1000px" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
