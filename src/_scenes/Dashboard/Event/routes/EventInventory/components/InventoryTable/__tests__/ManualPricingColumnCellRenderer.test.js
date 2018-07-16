import React from 'react';
import { shallow } from 'enzyme';
import { Text, ClearIcon } from '_components';
import { ManualPricingCellPresenter } from '../ManualPricingColumnCellRenderer';
import { ManualPricingButton } from '../styled';

describe('<ManualPricingColumnCellRenderer />', () => {
  const props = {
    isEditing: false,
    setManualPrice: jest.fn(),
    manualPriceLocked: false,
    setEditingManualPrice: jest.fn(),
    cancelEditingManualPrice: jest.fn(),
    rowData: { listedPrice: 12 },
    cellData: null
  };

  it('should render correctly', () => {
    const wrapper = shallow(<ManualPricingCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when the cellData has a value', () => {
    const wrapper = shallow(
      <ManualPricingCellPresenter {...props} cellData={12} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when isEditing is true', () => {
    const wrapper = shallow(
      <ManualPricingCellPresenter {...props} isEditing={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when manualPriceLocked is true', () => {
    const wrapper = shallow(
      <ManualPricingCellPresenter {...props} manualPriceLocked={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call setEditingManualPrice when the set price text is clicked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
      <ManualPricingCellPresenter {...props} setEditingManualPrice={mockFn} />
    );
    wrapper
      .find(Text)
      .first()
      .simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should not call setEditingManualPrice when the set price text is clicked if editing is locked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
      <ManualPricingCellPresenter
        {...props}
        manualPriceLocked={true}
        setEditingManualPrice={mockFn}
      />
    );
    wrapper
      .find(Text)
      .first()
      .simulate('click');

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should call cancelEditingManualPrice when the ClearIcon is clicked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
      <ManualPricingCellPresenter
        {...props}
        isEditing={true}
        cancelEditingManualPrice={mockFn}
      />
    );
    wrapper
      .find(ClearIcon)
      .first()
      .simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should call setManualPrice when the ManualPricingButton is clicked and a value has been set', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
      <ManualPricingCellPresenter
        {...props}
        isEditing={true}
        setManualPrice={mockFn}
      />
    );

    wrapper.setState({
      overridePrice: '12.00'
    });

    wrapper
      .find(ManualPricingButton)
      .first()
      .simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });
});
