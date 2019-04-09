import React from 'react';
import { shallow } from 'enzyme';
import { SeasonTicketIntegrationsPresenter } from '../SeasonTicketIntegrations';

describe('<SeasonTicketIntegrations />', () => {
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
    const wrapper = shallow(<SeasonTicketIntegrationsPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetch on componentDidMount', () => {
    const props = createProps();
    shallow(<SeasonTicketIntegrationsPresenter {...props} />);
    expect(props.fetchTicketIntegrations).toHaveBeenCalled();
  });
});
