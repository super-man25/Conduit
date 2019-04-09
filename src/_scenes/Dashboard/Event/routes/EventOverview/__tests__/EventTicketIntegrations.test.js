import React from 'react';
import { shallow } from 'enzyme';
import { EventTicketIntegrationsPresenter } from '../components/EventTicketIntegrations';

describe('<EventTicketIntegrations />', () => {
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
    id: 1,
    fetchTicketIntegrations: jest.fn()
  });
  it('should render correctly', () => {
    const props = createProps();
    const wrapper = shallow(<EventTicketIntegrationsPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetch on componentDidMount', () => {
    const props = createProps();
    shallow(<EventTicketIntegrationsPresenter {...props} />);
    expect(props.fetchTicketIntegrations).toHaveBeenCalled();
  });
});
