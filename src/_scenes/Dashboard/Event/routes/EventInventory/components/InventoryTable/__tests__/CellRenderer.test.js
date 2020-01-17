import React from 'react';
import { shallow } from 'enzyme';
import { DefaultCellPresenter } from '../CellRenderer';

describe('defaultCellRenderer', () => {
  it('should render correctly', () => {
    const props = {
      cellData: 10,
      columnData: {},
    };
    const wrapper = shallow(<DefaultCellPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
