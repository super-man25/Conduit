import React from 'react';
import { UserWelcome } from '_components/';
import renderer from 'react-test-renderer';

const testUser = { id: 1, firstName: 'John', lastName: 'Smith' };
const testClient = { name: 'Mets', logoUrl: '' };
const clientList = {
  clientList: [{ name: 'Mets', logoUrl: '' }, { name: 'Falcons', logoUrl: '' }],
  loading: false,
};

it('renders correctly with a valid user prop', () => {
  const tree = renderer
    .create(
      <UserWelcome
        firstName={testUser.firstName}
        lastName={testUser.lastName}
        client={testClient}
        clientList={clientList}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
