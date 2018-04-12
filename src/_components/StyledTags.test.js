import React from 'react';
import { H1, H2, H3, H4, H5, P1, P2, S1, Label } from './';
import renderer from 'react-test-renderer';
import localStorageTest from '../setupTests';

it('H1 renders correctly with no props', () => {
  const tree = renderer
    .create(<H1></H1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H1 floatLeft></H1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H1 floatRight></H1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H1 color='red'></H1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H1 size='31px'></H1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H1 weight='bold'></H1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with no props', () => {
  const tree = renderer
    .create(<H2></H2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H2 floatLeft></H2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H2 floatRight></H2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H2 color='red'></H2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H2 size='31px'></H2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H2 weight='bold'></H2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with no props', () => {
  const tree = renderer
    .create(<H3></H3>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H3 floatLeft></H3>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H3 floatRight></H3>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H3 color='red'></H3>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H3 size='31px'></H3>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H3 weight='bold'></H3>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with no props', () => {
  const tree = renderer
    .create(<H4></H4>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H4 floatLeft></H4>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H4 floatRight></H4>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H4 color='red'></H4>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H4 size='31px'></H4>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H4 weight='bold'></H4>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with no props', () => {
  const tree = renderer
    .create(<H5></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H5 floatLeft></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H5 floatRight></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with clearLeft prop', () => {
  const tree = renderer
    .create(<H5 clearLeft></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with clearRight prop', () => {
  const tree = renderer
    .create(<H5 clearRight></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H5 color='red'></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H5 size='31px'></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H5 weight='bold'></H5>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('P1 renders correctly with no props', () => {
  const tree = renderer
    .create(<P1></P1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('P2 renders correctly with no props', () => {
  const tree = renderer
    .create(<P2></P2>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('S1 renders correctly with no props', () => {
  const tree = renderer
    .create(<S1></S1>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Label renders correctly with no props', () => {
  const tree = renderer
    .create(<Label></Label>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});