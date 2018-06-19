import React from 'react';
import { ForgotLink } from '../components/ForgotLink';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<ForgotLink />).toJSON();

  expect(tree).toMatchSnapshot();
});
