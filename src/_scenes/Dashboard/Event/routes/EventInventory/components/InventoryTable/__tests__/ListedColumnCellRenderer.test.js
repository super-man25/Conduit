import React from 'react';
import { shallow } from 'enzyme';
import { ListedColumnCellPresenter } from '../ListedColumnCellRenderer';
import { Toggle } from '_components';

describe('<ListedColumnCellPresenter />', () => {
  const props = {
    cellData: 'Data',
    updateEditedRowProperty: jest.fn(),
    editedRowState: {
      isListed: true
    }
  };

  it('should render correctly', () => {
    const wrapper = shallow(<ListedColumnCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call setListed when the Toggles onChange is triggered', () => {
    const clonedProps = { ...props };
    const wrapper = shallow(<ListedColumnCellPresenter {...clonedProps} />);
    wrapper
      .find(Toggle)
      .first()
      .prop('onChange')();

    expect(clonedProps.updateEditedRowProperty).toHaveBeenCalled();
  });
});
