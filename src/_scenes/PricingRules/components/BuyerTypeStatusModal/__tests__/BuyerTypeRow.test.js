import * as React from 'react';
import { shallow } from 'enzyme';
import { Toggle } from '_components';
import { BuyerTypeRow } from '../BuyerTypeRow';

describe('<BuyerTypeRow />', () => {
  const props = {
    buyerType: { id: '333', disabled: false },
    editedBuyerTypes: {},
    onBuyerTypeToggle: jest.fn(),
    toggleDisabled: false
  };

  it('should render correctly', () => {
    const wrapper = shallow(<BuyerTypeRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onBuyerTypeToggle if toggle component changes', () => {
    const fn = jest.fn();
    const wrapper = shallow(<BuyerTypeRow {...props} onBuyerTypeToggle={fn} />);

    wrapper
      .find(Toggle)
      .at(0)
      .simulate('change');

    expect(fn).toBeCalled();
  });

  it('should have a disabled toggle if toggleDisabled props is true', () => {
    const wrapper = shallow(<BuyerTypeRow {...props} toggleDisabled={true} />);

    const toggle = wrapper.find(Toggle).at(0);

    expect(toggle.props().isDisabled).toBe(true);
  });
});
