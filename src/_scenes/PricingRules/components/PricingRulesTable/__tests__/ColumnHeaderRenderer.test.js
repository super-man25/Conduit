import React from 'react';
import { shallow } from 'enzyme';
import { DefaultColumnHeaderPresenter } from '../ColumnHeaderRenderer';

describe('<DefaultColumnHeaderPresenter />', () => {
  const props = {
    label: 'Label'
  };

  it('should render correctly', () => {
    const wrapper = shallow(<DefaultColumnHeaderPresenter {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
