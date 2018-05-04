import React from 'react';
import { UserWelcome } from '_components/';
import renderer from 'react-test-renderer';

const testUser = { id: 1, firstName: 'John', lastName: 'Smith' };

it('renders correctly with no props', () => {
  const tree = renderer.create(<UserWelcome />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with a valid user prop', () => {
  const tree = renderer.create(<UserWelcome user={testUser} />).toJSON();
  expect(tree).toMatchSnapshot();
});
