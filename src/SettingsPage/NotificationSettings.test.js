import React from 'react';
import NotificationSettings from './';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<NotificationSettings></NotificationSettings>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});