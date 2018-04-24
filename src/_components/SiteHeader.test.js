import React from 'react';
import renderer from 'react-test-renderer';
// import localStorageTest from '../setupTests';
// import { LogoName, SprocketMenu, UserAvatar, UserWelcome, SiteHeader, SiteHeaderDiv, SiteHeaderTest } from './';
import { SiteHeaderDiv, SiteHeaderTest } from './';
const testUser = { id: 1, firstName: 'John', lastName: 'Smith' };

it('SiteHeaderDiv renders correctly with no props', () => {
  const tree = renderer
    .create(<SiteHeaderDiv />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

xit('renders correctly with a user=testUser prop', () => {
  const tree = renderer
    .create(<SiteHeaderTest user={testUser} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

