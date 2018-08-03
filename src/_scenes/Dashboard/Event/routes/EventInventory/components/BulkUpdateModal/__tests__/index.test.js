import React from 'react';
import { shallow } from 'enzyme';
import { BulkUpdateModalPresenter, selectActions } from '..';
import { SecondaryButton, PrimaryButton } from '_components';

describe('<BulkUpdateModal />', () => {
  const props = {
    rows: [{ seats: [1, 2, 3] }, { seats: [4, 5, 6] }, { seats: [7, 8, 9] }],
    loading: false,
    cancelBulkUpdate: jest.fn(),
    submitBulkUpdate: jest.fn()
  };

  it('should render correctly', () => {
    const wrapper = shallow(<BulkUpdateModalPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when loading is true', () => {
    const wrapper = shallow(
      <BulkUpdateModalPresenter {...props} loading={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when an invalid manual price is entered and blurred', () => {
    const wrapper = shallow(<BulkUpdateModalPresenter {...props} />);
    wrapper.setState({
      touched: {
        price: true
      },
      value: '12.222'
    });
    expect(wrapper.instance().isValidManualPrice).toEqual(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when the selectedAction is changed', () => {
    const wrapper = shallow(
      <BulkUpdateModalPresenter {...props} loading={true} />
    );
    wrapper.setState({
      selectedAction: selectActions[1]
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('submitEnabled should be false if invalid information is set', () => {
    const wrapper = shallow(<BulkUpdateModalPresenter {...props} />);
    wrapper.setState({ value: 'abc' });
    expect(wrapper.instance().submitEnabled()).toBe(false);
  });

  it('submitEnabled should be true if valid information is set', () => {
    const wrapper = shallow(<BulkUpdateModalPresenter {...props} />);
    wrapper.setState({ value: '12.00' });
    expect(wrapper.instance().submitEnabled()).toBe(true);

    wrapper.setState({ selectedAction: selectActions[1], value: false });
    expect(wrapper.instance().submitEnabled()).toBe(true);
  });

  it('should call cancelBulkUpdate when the cancel button is clicked', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <BulkUpdateModalPresenter {...props} cancelBulkUpdate={fn} />
    );

    wrapper.find(SecondaryButton).simulate('click');
    expect(fn).toBeCalled();
  });

  it('should call submitBulkUpdate when the submit button is clicked', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <BulkUpdateModalPresenter {...props} submitBulkUpdate={fn} />
    );
    wrapper.setState({
      value: '12.22'
    });

    wrapper.find(PrimaryButton).simulate('click');
    expect(fn).toBeCalled();
  });
});
