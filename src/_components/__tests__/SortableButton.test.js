import React from 'react';
import renderer from 'react-test-renderer';


import { SortableButton } from '_components/SortableButton';

it('should render correctly', () => {
  const tree = renderer.create(<SortableButton />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should render correctly with optional props', () => {
  const tree = renderer
    .create(<SortableButton direction="desc">Button Label</SortableButton>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
