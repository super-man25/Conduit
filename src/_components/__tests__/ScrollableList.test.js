import React from 'react';
import { ScrollableList } from '_components/ScrollableList';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

const data = ['Mets', 'Rangers', 'Athletics'];

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ScrollableList data={data}>
        {(item, index) => <div key={index}>{item}</div>}
      </ScrollableList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with scrollTo', () => {
  const tree = renderer
    .create(
      <ScrollableList data={data} scrollTo={1}>
        {(item, index) => <div key={index}>{item}</div>}
      </ScrollableList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
