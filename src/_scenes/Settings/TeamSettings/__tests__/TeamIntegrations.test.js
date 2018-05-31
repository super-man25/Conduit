import React from 'react';
import { shallow } from 'enzyme';
import { TeamIntegrations } from '../components/TeamIntegrations';
import { Integration } from '_components';

describe('<TeamIntegrations />', () => {
  const props = {
    primary: [
      {
        name: 'tickets.com',
        isPrimary: true,
        isActive: true
      }
    ],
    secondary: [
      {
        name: 'seatgeek.com',
        isPrimary: false,
        isActive: true
      }
    ],
    handleIntegrationToggle: jest.fn()
  };

  it('render correctly', () => {
    const wrapper = shallow(<TeamIntegrations {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles onChange on <Integration /> component', () => {
    const wrapper = shallow(<TeamIntegrations {...props} />);
    expect(wrapper.find(Integration)).toHaveLength(2);
    wrapper
      .find(Integration)
      .first()
      .simulate('change');
    expect(props.handleIntegrationToggle).toBeCalled();
  });
});
