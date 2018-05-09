import React from 'react';
import { HorizontalBars } from '_components';
import renderer from 'react-test-renderer';

const data = [20, 30, 50];
const colors = ['#FFF', '#000', '#AAA'];

it('renders correctly', () => {
  const tree = renderer
    .create(<HorizontalBars data={data} colors={colors} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
