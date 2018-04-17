import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Spacing } from './Spacing';

it('renders with no props', () => {
  const tree = renderer
    .create(
      <Spacing>
        <span>Chillen</span>
      </Spacing>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders with optional props', () => {
  const tree = renderer
    .create(
      <Spacing padding="12px" margin="12px" height="12px" width="12px">
        <span>Chillen</span>
      </Spacing>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
