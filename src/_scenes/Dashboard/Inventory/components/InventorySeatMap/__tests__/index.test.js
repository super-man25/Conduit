import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { EventInventorySeatMap } from '..';

describe('EventInventorySeatMap', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<EventInventorySeatMap />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when showmap is true', () => {
    const wrapper = shallow(<EventInventorySeatMap />);
    wrapper.setState({ showMap: true });

    expect(wrapper).toMatchSnapshot();
  });
});
