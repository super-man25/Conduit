import React from 'react';
import { shallow } from 'enzyme';
import { EventListItem } from '_scenes/Dashboard/Event/components/EventListItem';

const createProps = () => ({
  event: {
    id: 1,
    name: 'Mets @ Yankees',
    score: 10,
    inventory: 100,
    revenue: 100,
    capacity: 10000,
    timestamp: 1529336865706,
    modifiedAt: 1529336865706,
    createdAt: 1529336865706
  },
  active: true,
  onClick: () => {}
});

describe('<EventListItem />', () => {
  it('should render correctly when active', () => {
    const props = createProps();
    const wrapper = <EventListItem {...props} />;
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when not active', () => {
    const props = createProps();
    props.active = false;
    const wrapper = <EventListItem {...props} />;
    expect(wrapper).toMatchSnapshot();
  });
});
