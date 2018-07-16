import React from 'react';
import renderer from 'react-test-renderer';
import {
  ManualPricingInput,
  ManualPricingButton,
  TableHeaderCell,
  IconContainer,
  PositionedCellContent
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

  it('<PositionedCellContent /> should render correctly', () => {
    const tree = renderer.create(<PositionedCellContent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
