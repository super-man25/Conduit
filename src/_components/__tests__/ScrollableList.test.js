import React from 'react';
import { ScrollableList } from '_components/ScrollableList';
import renderer from 'react-test-renderer';


const data = ['Mets', 'Rangers', 'Athletics'];

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ScrollableList data={data} scrollIndex={-1}>
        {(item, index) => <div key={index}>{item}</div>}
      </ScrollableList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with scrollIndex', () => {
  const tree = renderer
    .create(
      <div>
        <ScrollableList data={data} scrollIndex={-1}>
          {(item, index) => <div key={index}>{item}</div>}
        </ScrollableList>
      </div>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
