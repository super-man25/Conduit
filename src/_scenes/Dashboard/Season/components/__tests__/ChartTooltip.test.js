import React from 'react';
import { shallow } from 'enzyme';
import { ChartTooltip } from '../ChartTooltip';

describe('<ChartTooltip />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <ChartTooltip bodyComponent={<div />} headerComponent={<div />} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
