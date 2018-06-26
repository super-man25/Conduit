import React from 'react';
import { shallow } from 'enzyme';
import { SeasonRevenuePanel } from '../SeasonRevenuePanel';
import { TicketIntegrationsPresenter } from '../TicketIntegrations';

describe('<SeasonRevenuePanel />', () => {
  const createProps = () => ({
    ticketIntegrations: [
      {
        id: 1,
        name: 'Some Name',
        logoUrl: '#',
        isActive: true,
        sold: 1000,
        total: 1000
      },
      {
        id: 2,
        name: 'Some Name',
        logoUrl: '#',
        isActive: true,
        sold: 1000,
        total: 1000
      }
    ],
    loading: false,
    fetchTicketIntegrations: jest.fn()
  });

  it('should render correctly', () => {
    const props = createProps();
    const wrapper = shallow(<TicketIntegrationsPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when loading is true', () => {
    const props = createProps();
    props.loading = true;

    const wrapper = shallow(<TicketIntegrationsPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when no data is found', () => {
    const props = createProps();
    props.ticketIntegrations = [];

    const wrapper = shallow(<TicketIntegrationsPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when an error occurs', () => {
    const props = createProps();
    props.error = 'Error';

    const wrapper = shallow(<TicketIntegrationsPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetch on componentDidMount', () => {
    const props = createProps();
    const wrapper = shallow(<TicketIntegrationsPresenter {...props} />);
    expect(props.fetchTicketIntegrations).toHaveBeenCalled();
  });
});
