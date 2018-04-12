import React from 'react';
import { Button } from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<Button></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with hidden prop', () => {
  const tree = renderer
    .create(<Button hidden></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with disabled prop', () => {
  const tree = renderer
    .create(<Button disabled></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with secondary prop', () => {
  const tree = renderer
    .create(<Button secondary></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with small prop', () => {
  const tree = renderer
    .create(<Button small></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with collapse prop', () => {
  const tree = renderer
    .create(<Button collapse></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with expand prop', () => {
  const tree = renderer
    .create(<Button expand></Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


