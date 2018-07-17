import React from 'react';
import renderer from 'react-test-renderer';
import {
  ManualPricingInput,
  ManualPricingButton,
  TableHeaderCell,
  IconContainer,
  PositionedBox,
  ScaleFilterContainer,
  ScaleFilterList,
  ScaleFilterListItem,
  Checkbox,
  ScaleFilterButton
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

  it('<ScaleFilterContainer /> should render correctly', () => {
    const tree = renderer.create(<ScaleFilterContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<ScaleFilterList /> should render correctly', () => {
    const tree = renderer.create(<ScaleFilterList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<ScaleFilterListItem /> should render correctly', () => {
    const tree = renderer.create(<ScaleFilterListItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<Checkbox /> should render correctly', () => {
    const tree = renderer.create(<Checkbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<ScaleFilterButton /> should render correctly', () => {
    const tree = renderer.create(<ScaleFilterButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
