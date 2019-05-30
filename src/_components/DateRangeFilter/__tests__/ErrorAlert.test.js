import React from 'react';
import renderer from 'react-test-renderer';
import { ErrorAlert } from '../ErrorAlert';

it('renders correctly', () => {
  const msg = 'This is a test message';
  const tree = renderer.create(<ErrorAlert msg={msg} />).toJSON();

  expect(tree).toMatchSnapshot();
  expect(JSON.stringify(tree)).toContain(msg);
});
