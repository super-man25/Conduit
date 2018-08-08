import React from 'react';
import { shallow } from 'enzyme';
import { TeamIntegrations } from '../components/TeamIntegrations';
import { Integration } from '_components';
import { IntegrationToggleAlertModal } from '../components/IntegrationToggleAlertModal';

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

  it('handles onChange on secondary integrations', () => {
    const wrapper = shallow(<TeamIntegrations {...props} />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'onIntegrationChanged');
    instance.forceUpdate();

    expect(wrapper.find(Integration)).toHaveLength(2);
    wrapper
      .find(Integration)
      .at(1)
      .simulate('change');
    expect(spy).toHaveBeenCalled();
  });

  it('should show the IntegrationToggleAlertModal when attempting to toggle an integration', () => {
    const wrapper = shallow(<TeamIntegrations {...props} />);
    wrapper
      .find(Integration)
      .at(1)
      .simulate('change');

    expect(wrapper.state().toggledIntegration).toBe(props.secondary[0]);
    expect(wrapper.find(IntegrationToggleAlertModal)).toHaveLength(1);
  });
});
