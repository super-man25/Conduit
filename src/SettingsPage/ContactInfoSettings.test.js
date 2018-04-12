import React from 'react';
import ContactInfoSettings from './';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<ContactInfoSettings></ContactInfoSettings>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});