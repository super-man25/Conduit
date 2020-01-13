import React from 'react';
import renderer from 'react-test-renderer';
import { PricingTableHeader } from '../PricingTableHeader';

const defaultProps = {
  headers: ['EVENT SCORE', 'SPRING VALUE'],
};

it('renders correctly', () => {
  const tree = renderer.create(<PricingTableHeader {...defaultProps} />);
  expect(tree).toMatchSnapshot();
});
