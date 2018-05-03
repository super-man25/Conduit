import React from 'react';
import { MailtoLink } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<MailtoLink />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
