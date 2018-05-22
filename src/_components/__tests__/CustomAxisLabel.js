import React from 'react';
import { CustomAxisLabel } from '_components/';
import renderer from 'react-test-renderer';

describe('<CustomAxisLabel />', () => {
  it('renders correctly with no props', () => {
    const tree = renderer
      .create(
        <CustomAxisLabel title="Y Axis" innerHeight={100} innerWidth={100} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly as the yAxis', () => {
    const tree = renderer
      .create(
        <CustomAxisLabel
          xAxis
          title="X Axis"
          innerHeight={100}
          innerWidth={100}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
