import React from 'react';
import { shallow } from 'enzyme';
import { VirtualizedEventInventoryPresenter } from '../';

describe('<VirtualizedEventInventoryPresenter />', () => {
  const props = {
    allRows: [1, 2, 3],
    event: {
      timestamp: '3000-01-01T18:00:00Z'
    },
    loading: false
  };

  it('should render loading state', () => {
    const newProps = {
      loading: true
    };
    const wrapper = shallow(
      <VirtualizedEventInventoryPresenter {...props} {...newProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render empty inventory message', () => {
    const newProps = {
      allRows: []
    };
    const wrapper = shallow(
      <VirtualizedEventInventoryPresenter {...props} {...newProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render inventory list', () => {
    const wrapper = shallow(<VirtualizedEventInventoryPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
