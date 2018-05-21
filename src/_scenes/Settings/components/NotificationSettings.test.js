import React from 'react';
import NotificationSettings from './NotificationSettings';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<NotificationSettings />).toJSON();
  expect(tree).toMatchSnapshot();
});
