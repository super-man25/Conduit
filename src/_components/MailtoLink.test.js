import React from 'react';
import { MailtoLink } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<MailtoLink />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
