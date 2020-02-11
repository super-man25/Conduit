import React from 'react';
import { shallow } from 'enzyme';
import { CumulativeInventoryChartLegend } from '../CumulativeInventoryChartLegend';

describe('<CumulativeInventoryChartLegend />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CumulativeInventoryChartLegend />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when projections are present', () => {
    const wrapper = shallow(
      <CumulativeInventoryChartLegend hasProjected={true} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
