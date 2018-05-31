import React from 'react';
import { shallow } from 'enzyme';
import { RevenueBreakdown } from '../RevenueBreakdown';

describe('<ChartTooltip />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <RevenueBreakdown colors={['#000', '#111', '#222']} data={[10, 20, 30]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
