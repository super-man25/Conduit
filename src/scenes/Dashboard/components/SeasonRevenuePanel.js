import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  P1,
  Spacing,
  HorizontalBars,
  Panel,
  PanelHeader,
  PanelContent,
  Flex,
  FlexItem,
  LegendItem,
  ChartLegendItem,
  Tabbable,
  Loader,
  SelectDropdown,
  ChipButton,
  ChipButtonGroup
} from '_components';
import { cssConstants } from '_constants';
import { CumulativeRevenueChart } from './CumulativeRevenueChart';
import { isBefore, isSameDay } from 'date-fns';

const selectOptions = [
  { label: 'Seasonal', value: 0 },
  { label: 'Month', value: 1 },
  { label: 'Week', value: 2 }
];

const ChartContainer = styled.div`
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  border: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  position: relative;
  padding: 14px 14px;
`;

const TabLink = styled.span`
  color: ${(props) =>
    props.isActive
      ? cssConstants.PRIMARY_LIGHT_BLUE
      : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: 14px;

  &:hover {
    color: ${cssConstants.PRIMARY_LIGHT_BLUE};
    cursor: pointer;
  }

  & + ${() => TabLink} {
    margin-left: 28px;
  }
`;

const RevenueBreakdown = () => (
  <React.Fragment>
    <P1>Revenue Breakdown</P1>
    <Spacing height="12px" />
    <HorizontalBars
      data={[12, 20, 30, 40]}
      colors={['#144670', '#4B98CF', '#4B98CF', '#C4D2E1']}
    />
    <Spacing height="12px" />
    <div>
      <LegendItem label="Single Game" value="$9504.13" color="#144670" />

      <LegendItem label="Group Tickets" value="$9504.13" color="#4B98CF" />

      <LegendItem label="Single Suites" value="$9504.13" color="#2670AE" />

      <LegendItem label="Season Tickets" value="$9504.13" color="#C4D2E1" />
    </div>
  </React.Fragment>
);

export class SeasonRevenuePanel extends React.Component {
  // Temporarily storing these filters in state while still using mock data
  state = {
    groupingType: 'Periodic',
    dateRangeType: selectOptions[0],
    selectedDay: null
  };

  componentDidMount() {
    this.props.eventStatsActions.fetch();
  }

  onGroupingChange = (newType) => {
    this.setState({
      groupingType: newType
    });
  };

  onDateRangeTypeChanged = (dateOption) => {
    this.setState({
      dateRangeType: dateOption
    });
  };

  onDateChanged = (date) => {
    this.setState({
      selectedDay: date
    });
  };

  formatEventStats() {
    const { model } = this.props.eventStatsState;
    const { selectedDay } = this.state;

    const actual = [];
    const projected = [];

    for (const d of model) {
      const formattedModel = {
        ...d,
        x: d.date,
        y: d.revenue
      };

      if (selectedDay && !isSameDay(d.date, selectedDay)) {
        continue;
      }

      if (d.isProjected) {
        projected.push(formattedModel);
      } else {
        actual.push(formattedModel);
      }
    }

    return { actual, projected };
  }

  render() {
    const { groupingType, dateRangeType, selectedDay } = this.state;
    const { loading } = this.props.eventStatsState;

    return (
      <Tabbable>
        {(selectedTab, onTabChange) => (
          <Panel>
            <PanelHeader>
              <Flex align="center" justify="space-between">
                <FlexItem flex={1}>
                  <TabLink
                    isActive={selectedTab === 0}
                    onClick={() => onTabChange(0)}
                  >
                    Revenue Over Time
                  </TabLink>
                  <TabLink
                    isActive={selectedTab === 1}
                    onClick={() => onTabChange(1)}
                  >
                    Inventory / Velocity
                  </TabLink>
                </FlexItem>
                <div>
                  <ChipButtonGroup
                    onChange={this.onGroupingChange}
                    value={groupingType}
                  >
                    <ChipButton value="Periodic">Periodic</ChipButton>
                    <ChipButton value="Cumulative">Cumulative</ChipButton>
                  </ChipButtonGroup>
                </div>
              </Flex>
            </PanelHeader>
            {loading && (
              <PanelContent>
                <Spacing padding="200px 0">
                  <Loader />
                </Spacing>
              </PanelContent>
            )}

            {!loading &&
              selectedTab === 0 && (
                <PanelContent>
                  <Flex align="center" justify="flex-start">
                    <SelectDropdown
                      selected={dateRangeType}
                      options={selectOptions}
                      onChange={this.onDateRangeTypeChanged}
                    />
                  </Flex>
                  <Spacing height="18px" />
                  <ChartContainer>
                    <CumulativeRevenueChart
                      height={400}
                      data={this.formatEventStats()}
                    />
                  </ChartContainer>
                  <Spacing height="18px" />
                  <RevenueBreakdown />
                </PanelContent>
              )}

            {!loading &&
              selectedTab === 1 && (
                <PanelContent>
                  <Flex align="flex-end" justify="flex-end">
                    <ChartLegendItem dashed label="Projected Revenue" />
                    <ChartLegendItem label="Real Revenue" />
                  </Flex>
                  <Spacing height="18px" />
                  <ChartContainer>
                    <CumulativeRevenueChart
                      height={400}
                      data={this.formatEventStats()}
                    />
                  </ChartContainer>
                  <Spacing height="18px" />
                  <RevenueBreakdown />
                </PanelContent>
              )}
          </Panel>
        )}
      </Tabbable>
    );
  }
}

SeasonRevenuePanel.propTypes = {
  eventStatsState: PropTypes.shape(),
  eventStatsActions: PropTypes.shape()
};
