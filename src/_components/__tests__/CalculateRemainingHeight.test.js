import React from 'react';
import { CalculateRemainingHeight } from '_components/CalculateRemainingHeight';
import renderer from 'react-test-renderer';


function createNodeMock() {
  return {
    clientHeight: 100
  };
}

it('renders correctly', () => {
  const tree = renderer
    .create(
      <CalculateRemainingHeight>
        <div />
        <div />
        {() => {
          return <div />;
        }}
      </CalculateRemainingHeight>,
      { createNodeMock }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with one child', () => {
  const tree = renderer
    .create(
      <CalculateRemainingHeight>{() => <div />}</CalculateRemainingHeight>,
      { createNodeMock }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('throws an error if the last child is not a function', () => {
  // Mock console error, so that we don't see the boundary react error from a bad error
  const consoleMock = spyOn(console, 'error'); // eslint-disable-line

  expect(() => {
    renderer.create(
      <CalculateRemainingHeight>
        <div />
        <div />
      </CalculateRemainingHeight>,
      { createNodeMock }
    );
  }).toThrow(
    'CalculateRemainingHeight: Expected the last child to be a function'
  );
});
