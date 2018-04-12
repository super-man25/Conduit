import React from 'react';
import ContactInfoSettings from './ContactInfoSettings';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<ContactInfoSettings></ContactInfoSettings>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});