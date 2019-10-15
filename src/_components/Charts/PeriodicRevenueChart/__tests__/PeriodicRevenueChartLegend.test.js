import React from 'react';
import { shallow } from 'enzyme';
import { PeriodicRevenueChartLegend } from '../PeriodicRevenueChartLegend';

describe('<PeriodicRevenueChartLegend />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PeriodicRevenueChartLegend />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when projections are present', () => {
    const wrapper = shallow(<PeriodicRevenueChartLegend hasProjected={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
