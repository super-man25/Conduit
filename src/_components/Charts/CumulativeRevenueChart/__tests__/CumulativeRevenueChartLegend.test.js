import React from 'react';
import { shallow } from 'enzyme';
import { CumulativeRevenueChartLegend } from '../CumulativeRevenueChartLegend';

describe('<CumulativeRevenueChartLegend />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CumulativeRevenueChartLegend />);
    expect(wrapper).toMatchSnapshot();
  });
});
