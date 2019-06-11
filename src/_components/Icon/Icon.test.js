import React from 'react';
import renderer from 'react-test-renderer';
import { Icon } from './Icon';

it('renders with a name', () => {
  const tree = renderer
    .create(<Icon name="arrow-drop-up" size={24} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
