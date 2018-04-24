import React from 'react';
import EventList from './EventList';
import renderer from 'react-test-renderer';

xit('renders correctly with no props', () => {
  const tree = renderer
    .create(<EventList />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
