import React from 'react';
import { shallow } from 'enzyme';
import { EventInventory } from '_scenes/Dashboard/Event/routes/EventInventory';
import { TertiaryButton } from '_components';

describe('<EventInventory /> index route', () => {
  const props = {
    event: {},
    selectedEventIds: [],
    isBulkUpdating: false,
    startBulkUpdate: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<EventInventory {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when there are selectedEventIds', () => {
    const wrapper = shallow(
      <EventInventory {...props} selectedEventIds={[1, 2, 3]} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when there are selectedEventIds and isBulkUpdating is true', () => {
    const wrapper = shallow(
      <EventInventory
        {...props}
        selectedEventIds={[1, 2, 3]}
        isBulkUpdating={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger startBulkUpdate when the bulk update button is clied', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <EventInventory
        {...props}
        selectedEventIds={[1, 2, 3]}
        isBulkUpdating={true}
        startBulkUpdate={fn}
      />
    );

    wrapper
      .find(TertiaryButton)
      .at(0)
      .simulate('click');

    expect(fn).toBeCalled();
  });
});
