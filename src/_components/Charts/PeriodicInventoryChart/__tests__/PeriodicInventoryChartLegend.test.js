import React from 'react';
import { shallow } from 'enzyme';
import { PeriodicInventoryChartLegend } from '../PeriodicInventoryChartLegend';

describe('<PeriodicInventoryChartLegend />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PeriodicInventoryChartLegend />);
    expect(wrapper).toMatchSnapshot();
  });
});
