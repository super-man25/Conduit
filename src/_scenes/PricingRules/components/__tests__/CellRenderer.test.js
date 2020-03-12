import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { DefaultCellPresenter } from '../CellRenderer';

describe('defaultCellRenderer', () => {
  const props = {
    updatePriceRuleProperty: jest.fn(),
    cellData: 20,
    isEditing: false,
    columnData: {
      displayFn: jest.fn((a) => a),
    },
  };

  it('should render correctly', () => {
    const wrapper = shallow(<DefaultCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when editing', () => {
    const wrapper = shallow(
      <DefaultCellPresenter {...props} isEditing={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger onRulePropertyChange', () => {
    const fn = jest.fn();

    const wrapper = mount(
      <DefaultCellPresenter
        {...props}
        isEditing={true}
        updatePriceRuleProperty={fn}
      />
    );

    wrapper.find('input').simulate('change');

    expect(fn).toBeCalled();

    wrapper.unmount();
  });
});
