import React from 'react';
import renderer from 'react-test-renderer';
import { Icon } from './Icon';

it('renders with a name', () => {
  const tree = renderer.create(<Icon name="arrowUp" size={24} />).toJSON();

  expect(tree).toMatchSnapshot();
});
