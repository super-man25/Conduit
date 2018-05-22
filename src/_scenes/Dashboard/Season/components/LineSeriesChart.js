// @flow
import * as React from 'react';
import {
  XAxis,
  FlexibleWidthXYPlot,
  LineSeries,
  HorizontalGridLines,
  YAxis,
  Crosshair
} from 'react-vis';
import { CustomAxisLabel } from '_components';
import { cssConstants } from '_constants';
import { getAxisTickOptions, getChartRange } from '_helpers/chart-utils';
import styled from 'styled-components';

function yAxisTickFormat(tickValue: number): string {
  if (tickValue >= 1000) {
    const thousands = tickValue / 1000;
    return `${thousands}K`;
  }

  return '' + tickValue;
}

const TooltipWrapper = styled.div`
  width: 0;
  height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type ChartDataPoint = {
  x: Date,
  y: number
};

type Props = {
  height: number,
  data: {
    actual: ChartDataPoint[],
    projected: ChartDataPoint[]
  },
  xAxisLabel: string,
  yAxisLabel: string,
  renderTooltip: ({
    value: ChartDataPoint,
    type: 'ACTUAL' | 'PROJECTED'
  }) => {},
  renderNoData: () => React.Node
};

type State = {
  isMouseOver: boolean,
  tooltipValue: ?ChartDataPoint,
  actualTooltipIndex: ?number,
  projectedTooltipIndex: ?number
};

// https://github.com/uber/react-vis/issues/713 - need to find a good way to test this
// TODO: Solve chart not adjusting width when the sidebar closes & Error/No Data state
export class LineSeriesChart extends React.Component<Props, State> {
  state = {
    isMouseOver: false,
    tooltipValue: null,
    projectedTooltipIndex: null,
    actualTooltipIndex: null
  };

  getTooltipValue() {
    const { actualTooltipIndex, projectedTooltipIndex } = this.state;
    const {
      data: { actual, projected }
    } = this.props;

    const shouldShowActualTooltip =
      projectedTooltipIndex === null || projectedTooltipIndex === 0;

    if (actualTooltipIndex && shouldShowActualTooltip) {
      return { value: actual[actualTooltipIndex], type: 'ACTUAL' };
    } else if (projectedTooltipIndex) {
      return { value: projected[projectedTooltipIndex], type: 'PROJECTED' };
    }
  }

  onMouseEnterHandler = () => {
    this.setState({ isMouseOver: true });
  };

  onMouseLeaveHandler = () => {
    this.setState({
      isMouseOver: false,
      actualTooltipIndex: null,
      projectedTooltipIndex: null
    });
  };

  onNearestXHandlerActual = (
    value: ChartDataPoint,
    { index }: { index: number }
  ) => {
    this.setState({ tooltipValue: value, actualTooltipIndex: index });
  };

  onNearestXHandlerProjected = (
    value: ChartDataPoint,
    { index }: { index: number }
  ) => {
    this.setState({ tooltipValue: value, projectedTooltipIndex: index });
  };

  render() {
    const {
      height,
      data: { actual, projected },
      xAxisLabel,
      yAxisLabel,
      renderTooltip,
      renderNoData
    } = this.props;

    const { isMouseOver } = this.state;
    const tooltipValue = this.getTooltipValue();
    const showTooltip = (actual.length || projected.length) && isMouseOver;

    if (!actual.length && !projected.length) {
      return renderNoData();
    }

    return (
      <FlexibleWidthXYPlot
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        height={height}
        style={{ paddingLeft: 10, paddingRight: 10 }}
        yDomain={getChartRange({ actual, projected })}
      >
        <HorizontalGridLines />

        <XAxis
          orientation="bottom"
          tickSize={0}
          tickPadding={10}
          {...getAxisTickOptions({ actual, projected })}
          style={{
            text: {
              fontWeight: 400,
              stroke: 'none',
              fill: cssConstants.PRIMARY_DARK_GRAY,
              fontSize: 10
            }
          }}
        />

        <YAxis
          tickFormat={yAxisTickFormat}
          tickSize={0}
          tickPadding={10}
          style={{
            line: { stroke: 'transparent' },
            text: {
              fontWeight: 400,
              stroke: 'none',
              fill: cssConstants.PRIMARY_DARK_GRAY,
              fontSize: 10
            }
          }}
        />

        <CustomAxisLabel title={xAxisLabel} xAxis />
        <CustomAxisLabel title={yAxisLabel} />

        {!!actual.length && (
          <LineSeries
            onNearestX={this.onNearestXHandlerActual}
            data={actual}
            animation
            stroke={cssConstants.PRIMARY_LIGHT_BLUE}
            curve="curveMonotoneX"
            strokeWidth={2}
          />
        )}

        {!!projected.length && (
          <LineSeries
            onNearestX={this.onNearestXHandlerProjected}
            data={projected}
            animation
            stroke={cssConstants.PRIMARY_LIGHT_BLUE}
            curve="curveMonotoneX"
            strokeWidth={2}
            strokeDasharray="6 6"
          />
        )}

        {showTooltip &&
          tooltipValue &&
          renderTooltip && (
            <Crosshair
              style={{
                line: {
                  background: cssConstants.PRIMARY_LIGHT_BLUE
                }
              }}
              values={[tooltipValue.value]}
            >
              <TooltipWrapper>{renderTooltip(tooltipValue)}</TooltipWrapper>
            </Crosshair>
          )}
      </FlexibleWidthXYPlot>
    );
  }
}
