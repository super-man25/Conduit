import * as React from 'react';
import { shallow } from 'enzyme';
import { BuyerTypeStatusModal } from '../';
import { SecondaryButton, Input } from '_components';
import { BuyerTypeRow } from '../BuyerTypeRow';
import { ModalOverlay } from '../styled';

describe('<BuyerTypeStatusModal />', () => {
  const props = {
    buyerTypes: [],
    closeModal: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<BuyerTypeStatusModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('modal dismissal methods', () => {
    it('should dismiss when cancel is clicked', () => {
      const fn = jest.fn();
      const wrapper = shallow(
        <BuyerTypeStatusModal {...props} closeModal={fn} />
      );

      wrapper
        .find(SecondaryButton)
        .at(0)
        .simulate('click');

      expect(fn).toBeCalled();
    });

    it('should dismiss with click away', () => {
      const fn = jest.fn();
      const wrapper = shallow(
        <BuyerTypeStatusModal {...props} closeModal={fn} />
      );

      wrapper
        .find(ModalOverlay)
        .at(0)
        .simulate('click');

      expect(fn).toBeCalled();
    });
  });

  it('should filter buyer types', () => {
    const fn = jest.fn();
    const buyerTypes = [
      { id: 1, code: 'ADULT', publicDescription: 'Adult' },
      { id: 2, code: 'GROUP', publicDescription: 'Group purchase' }
    ];
    const wrapper = shallow(
      <BuyerTypeStatusModal
        {...props}
        closeModal={fn}
        buyerTypes={buyerTypes}
      />
    );

    wrapper
      .find(Input)
      .at(0)
      .simulate('change', { currentTarget: { value: 'duL' } });

    expect(wrapper.state().visibleBuyerTypes.length).toBe(1);
  });

  it('should change disabled value when toggle is clicked', () => {
    const buyerTypes = [
      { id: 1, code: 'ADULT', publicDescription: 'Adult' },
      { id: 2, code: 'GROUP', publicDescription: 'Group purchase' }
    ];

    const wrapper = shallow(
      <BuyerTypeStatusModal {...props} buyerTypes={buyerTypes} />
    );

    wrapper
      .find(BuyerTypeRow)
      .at(0)
      .props()
      .onBuyerTypeToggle(buyerTypes[0]);

    const editedBuyerTypes = wrapper.state().editedBuyerTypes;

    expect(Object.keys(editedBuyerTypes).length).toBe(1);
  });
});
