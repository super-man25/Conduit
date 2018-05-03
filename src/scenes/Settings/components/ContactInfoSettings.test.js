import React from 'react';
import ContactInfoSettings from './ContactInfoSettings';
import renderer from 'react-test-renderer';

xit('renders correctly with no props', () => {
  // need to add tests here for contact settings
  // if we want to use a snapshot test, export/import the 'unconnected' component
  const tree = renderer.create(<ContactInfoSettings />).toJSON();
  expect(tree).toMatchSnapshot();
});
