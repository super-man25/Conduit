import React from 'react';
import { H1, H2, H3, H4, H5, P1, P2, S1, Label } from './';
import renderer from 'react-test-renderer';
// import localStorageTest from '../setupTests';

it('H1 renders correctly with no props', () => {
  const tree = renderer
    .create(<H1 />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H1 floatLeft />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H1 floatRight />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H1 color='red' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H1 size='31px' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H1 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H1 weight='bold' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with no props', () => {
  const tree = renderer
    .create(<H2 />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H2 floatLeft />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H2 floatRight />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H2 color='red' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H2 size='31px' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H2 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H2 weight='bold' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with no props', () => {
  const tree = renderer
    .create(<H3 />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H3 floatLeft />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H3 floatRight />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H3 color='red' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H3 size='31px' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H3 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H3 weight='bold' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with no props', () => {
  const tree = renderer
    .create(<H4 />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H4 floatLeft />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H4 floatRight />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H4 color='red' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H4 size='31px' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H4 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H4 weight='bold' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with no props', () => {
  const tree = renderer
    .create(<H5 />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with floatLeft prop', () => {
  const tree = renderer
    .create(<H5 floatLeft />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with floatRight prop', () => {
  const tree = renderer
    .create(<H5 floatRight />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with clearLeft prop', () => {
  const tree = renderer
    .create(<H5 clearLeft />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with clearRight prop', () => {
  const tree = renderer
    .create(<H5 clearRight />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with color prop', () => {
  const tree = renderer
    .create(<H5 color='red' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with size prop', () => {
  const tree = renderer
    .create(<H5 size='31px' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('H5 renders correctly with weight prop', () => {
  const tree = renderer
    .create(<H5 weight='bold' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('P1 renders correctly with no props', () => {
  const tree = renderer
    .create(<P1 />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('P2 renders correctly with no props', () => {
  const tree = renderer
    .create(<P2 />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('S1 renders correctly with no props', () => {
  const tree = renderer
    .create(<S1 />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Label renders correctly with no props', () => {
  const tree = renderer
    .create(<Label />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
