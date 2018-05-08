import React from 'react';
import { ChipButton, ChipButtonGroup } from '_components';
import renderer from 'react-test-renderer';

describe('ChipButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ChipButton>Chip Button</ChipButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with an active prop', () => {
    const tree = renderer
      .create(<ChipButton active>Chip Button</ChipButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ChipButtonGroup', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ChipButtonGroup>
          <ChipButton>ChipButton 1</ChipButton>
          <ChipButton>ChipButton 2</ChipButton>
        </ChipButtonGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a value set', () => {
    const tree = renderer
      .create(
        <ChipButtonGroup value="Active">
          <ChipButton value="Active">ChipButton 1</ChipButton>
          <ChipButton>ChipButton 2</ChipButton>
        </ChipButtonGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
