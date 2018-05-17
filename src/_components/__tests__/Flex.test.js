import React from 'react';
import renderer from 'react-test-renderer';
import { Flex, FlexItem } from '_components/Flex';
import 'jest-styled-components';

describe('Flex', () => {
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
});

describe('FlexItem', () => {
  it('renders correcly', () => {
    const tree = renderer
      .create(
        <FlexItem
          flex="1"
          height="100px"
          width="100px"
          alignSelf="center"
          margin="0 auto"
          padding="12px"
        >
          <span>Child</span>
        </FlexItem>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
