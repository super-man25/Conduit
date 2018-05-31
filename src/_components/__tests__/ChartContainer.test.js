import React from 'react';
import { ChartContainer } from '..';
import renderer from 'react-test-renderer';

describe('<ChartContainer />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ChartContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
