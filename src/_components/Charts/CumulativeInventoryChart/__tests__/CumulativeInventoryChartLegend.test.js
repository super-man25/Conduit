import React from 'react';
import { shallow } from 'enzyme';
import { CumulativeInventoryChartLegend } from '../CumulativeInventoryChartLegend';

describe('<CumulativeInventoryChartLegend />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CumulativeInventoryChartLegend />);
    expect(wrapper).toMatchSnapshot();
  });
});
