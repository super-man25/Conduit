import React from 'react';
import EventList from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<EventList></EventList>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
