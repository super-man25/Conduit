import React from 'react';
import { shallow } from 'enzyme';
import { EventListPresenter } from '../EventListPresenter';

const defaultProps = {
  filterOptions: [{ id: 1, label: 'one' }],
  activeId: 1,
  title: 'title',
  onSearchInputChange: () => {},
  onClick: () => {},
  loading: false,
  events: [
    {
      clientId: 1,
      createdAt: 1529336865706,
      id: 1,
      integrationId: 1,
      modifiedAt: 1529336865706,
      name: 'Some Event',
      seasonId: 1,
      timestamp: 1529336865706,
      venueId: 1,
    },
    {
      clientId: 1,
      createdAt: 1529336865706,
      id: 1,
      integrationId: 1,
      modifiedAt: 1529336865706,
      name: 'Some Event',
      seasonId: 1,
      timestamp: 1529336865706,
      venueId: 1,
    },
    {
      clientId: 1,
      createdAt: 1529336865706,
      id: 1,
      integrationId: 1,
      modifiedAt: 1529336865706,
      name: 'Some Event',
      seasonId: 1,
      timestamp: 1529336865706,
      venueId: 1,
    },
  ],
  filter: '',
};

describe('<EventListPresenter />', () => {
  it('when loading', () => {
    const wrapper = shallow(<EventListPresenter {...defaultProps} loading />);
    expect(wrapper).toMatchSnapshot();
  });

  it('when passed no events', () => {
    const wrapper = shallow(
      <EventListPresenter {...defaultProps} events={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('with no active event', () => {
    const wrapper = shallow(
      <EventListPresenter {...defaultProps} activeId={-1} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('with active event', () => {
    const wrapper = shallow(
      <EventListPresenter {...defaultProps} activeId={1} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when filtered', () => {
    const wrapper = shallow(
      <EventListPresenter {...defaultProps} filter="Query" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
