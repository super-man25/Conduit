import React from 'react';
import renderer from 'react-test-renderer';
import { EventInventoryVerticalRule, SeatIcon } from '../styled';

describe('InventorySeatMap styled components', () => {
  it('<EventInventoryVerticalRule /> should render correctly', () => {
    const tree = renderer.create(<EventInventoryVerticalRule />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<SeatIcon /> should render correctly', () => {
    const tree = renderer.create(<SeatIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<SeatMapLoader /> should render correctly', () => {
    const tree = renderer.create(<SeatIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
