import React from 'react';
import { ChartLegendItem } from '_components';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<ChartLegendItem label="Chart Legend" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with dashed prop', () => {
  const tree = renderer
    .create(<ChartLegendItem label="Chart Legend" dashed />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with color prop', () => {
  const tree = renderer
    .create(<ChartLegendItem color="#CCCCCC" label="Chart Legend" dashed />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
