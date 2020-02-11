import React from 'react';
import { shallow } from 'enzyme';
import { PeriodicInventoryChartLegend } from '../PeriodicInventoryChartLegend';

describe('<PeriodicInventoryChartLegend />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PeriodicInventoryChartLegend />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when projections are present', () => {
    const wrapper = shallow(
      <PeriodicInventoryChartLegend hasProjected={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
