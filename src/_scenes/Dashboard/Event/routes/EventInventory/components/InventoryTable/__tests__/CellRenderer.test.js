import { shallow } from 'enzyme';
import { defaultCellRenderer } from '../CellRenderer';

describe('defaultCellRenderer', () => {
  it('should render correctly', () => {
    const wrapper = shallow(defaultCellRenderer({ cellData: 10 }));
    expect(wrapper).toMatchSnapshot();
  });
});
