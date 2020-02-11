import React from 'react';
import renderer from 'react-test-renderer';
import {
  ManualPricingInput,
  ManualPricingButton,
  TableHeaderCell,
  IconContainer,
  PositionedBox,
  FilterContainer,
  FilterList,
  FilterListItem,
  Checkbox,
  FilterButton,
} from '../styled';

describe('InventoryTable styled components', () => {
  it('<ManualPricingInput /> should render correctly', () => {
    const tree = renderer.create(<ManualPricingInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<ManualPricingButton /> should render correctly', () => {
    const tree = renderer.create(<ManualPricingButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<TableHeaderCell /> should render correctly', () => {
    const tree = renderer.create(<TableHeaderCell />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<IconContainer /> should render correctly', () => {
    const tree = renderer.create(<IconContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<PositionedBox /> should render correctly', () => {
    const tree = renderer.create(<PositionedBox />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<FilterContainer /> should render correctly', () => {
    const tree = renderer.create(<FilterContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<FilterList /> should render correctly', () => {
    const tree = renderer.create(<FilterList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<FilterListItem /> should render correctly', () => {
    const tree = renderer.create(<FilterListItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<Checkbox /> should render correctly', () => {
    const tree = renderer.create(<Checkbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<FilterButton /> should render correctly', () => {
    const tree = renderer.create(<FilterButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
