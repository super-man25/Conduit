import * as React from 'react';
import { shallow } from 'enzyme';
import { BuyerTypeStatusModalPresenter } from '../';
import { SecondaryButton, Input } from '_components';
import { BuyerTypeRow } from '../BuyerTypeRow';
import { ModalOverlay } from '../styled';

describe('<BuyerTypeStatusModalPresenter />', () => {
  const props = {
    buyerTypes: [],
    isLoading: false,
    error: null,
    buyerTypesInActivePriceRules: [],
    buyerTypeActions: {
      closeBuyerTypesModal: jest.fn(),
      updateBuyerTypes: jest.fn()
    }
  };

  it('should render correctly', () => {
    const wrapper = shallow(<BuyerTypeStatusModalPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('modal dismissal methods', () => {
    it('should dismiss when cancel is clicked', () => {
      const buyerTypeActions = { closeBuyerTypesModal: jest.fn() };
      const wrapper = shallow(
        <BuyerTypeStatusModalPresenter
          {...props}
          buyerTypeActions={buyerTypeActions}
        />
      );

      wrapper
        .find(SecondaryButton)
        .at(0)
        .simulate('click');

      expect(buyerTypeActions.closeBuyerTypesModal).toBeCalled();
    });

    it('should dismiss with click away', () => {
      const buyerTypeActions = { closeBuyerTypesModal: jest.fn() };
      const wrapper = shallow(
        <BuyerTypeStatusModalPresenter
          {...props}
          buyerTypeActions={buyerTypeActions}
        />
      );

      wrapper
        .find(ModalOverlay)
        .at(0)
        .simulate('click');

      expect(buyerTypeActions.closeBuyerTypesModal).toBeCalled();
    });
  });

  it('should filter buyer types', () => {
    const fn = jest.fn();
    const buyerTypes = [
      { id: 1, code: 'ADULT', publicDescription: 'Adult' },
      { id: 2, code: 'GROUP', publicDescription: 'Group purchase' }
    ];
    const wrapper = shallow(
      <BuyerTypeStatusModalPresenter
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
      <BuyerTypeStatusModalPresenter {...props} buyerTypes={buyerTypes} />
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
