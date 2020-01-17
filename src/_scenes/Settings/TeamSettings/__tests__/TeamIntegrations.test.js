import React from 'react';
import { shallow } from 'enzyme';
import { TeamIntegrations } from '../components/TeamIntegrations';

describe('<TeamIntegrations />', () => {
  const props = {
    primary: [
      {
        name: 'tickets.com',
        isPrimary: true,
        isActive: true,
      },
    ],
    secondary: [
      {
        name: 'seatgeek.com',
        isPrimary: false,
        isActive: true,
      },
    ],
    handleIntegrationToggle: jest.fn(),
    handleSecondaryPriceRuleUpdate: jest.fn(),
  };

  it('render correctly', () => {
    const wrapper = shallow(<TeamIntegrations {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
