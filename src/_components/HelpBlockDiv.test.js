import React from 'react';
import { HelpBlockDiv } from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<HelpBlockDiv></HelpBlockDiv>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show prop', () => {
  const tree = renderer
    .create(<HelpBlockDiv show>message</HelpBlockDiv>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show and type="alert-danger" props', () => {
  const tree = renderer
    .create(<HelpBlockDiv show type="alert-danger">error message</HelpBlockDiv>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show and type="alert-success" props', () => {
  const tree = renderer
    .create(<HelpBlockDiv show type="alert-success">error message</HelpBlockDiv>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show and type="hint" props', () => {
  const tree = renderer
    .create(<HelpBlockDiv show type="hint">error message</HelpBlockDiv>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
