import React from 'react';
import { H1, H2, H3, H4, H5, P1, P2, S1, Label } from './';
import renderer from 'react-test-renderer';

it('H1 renders correctly', () => {
  const tree = renderer
    .create(<H1></H1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly', () => {
  const tree = renderer
    .create(<H2></H2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly', () => {
  const tree = renderer
    .create(<H3></H3>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly', () => {
  const tree = renderer
    .create(<H4></H4>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly', () => {
  const tree = renderer
    .create(<H5></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('P1 renders correctly', () => {
  const tree = renderer
    .create(<P1></P1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('P2 renders correctly', () => {
  const tree = renderer
    .create(<P2></P2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('S1 renders correctly', () => {
  const tree = renderer
    .create(<S1></S1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Label renders correctly', () => {
  const tree = renderer
    .create(<Label></Label>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});