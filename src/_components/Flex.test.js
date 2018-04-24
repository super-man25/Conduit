import React from 'react';
import renderer from 'react-test-renderer';
import { Flex } from './Flex';
import 'jest-styled-components';

it('renders correcly', () => {
  const tree = renderer
    .create(
      <Flex direction="row" align="center" justify="center">
        <span>Child</span>
      </Flex>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
