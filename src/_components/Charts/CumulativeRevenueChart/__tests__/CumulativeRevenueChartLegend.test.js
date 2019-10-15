import React from 'react';
import { shallow } from 'enzyme';
import { CumulativeRevenueChartLegend } from '../CumulativeRevenueChartLegend';

describe('<CumulativeRevenueChartLegend />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CumulativeRevenueChartLegend />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when projections are present', () => {
    const wrapper = shallow(
      <CumulativeRevenueChartLegend hasProjected={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
