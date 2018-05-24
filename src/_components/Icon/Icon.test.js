import React from 'react';
import renderer from 'react-test-renderer';
import { Icon } from './Icon';

it('renders with a name', () => {
  const tree = renderer
    .create(<Icon name="arrow-drop-up" size={24} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders with a data', () => {
  const tree = renderer
    .create(<Icon data="some svg path" size={24} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
