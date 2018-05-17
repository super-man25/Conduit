// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  Spacing,
  Panel,
  PanelHeader,
  PanelContent,
  Flex,
  FlexItem,
  ChartLegendItem,
  Tabbable,
  Loader,
  ChipButton,
  ChipButtonGroup,
  DateRangeDropdown
} from '_components';
import { cssConstants } from '_constants';
import { LineSeriesChart } from './LineSeriesChart';
import { RevenueBreakdown } from './RevenueBreakdown';
import type { EventStatState } from '_state/eventStats/reducer';
import type { EventStatChartData } from '_state/eventStats/selectors';
import typeof EventStatActions from '_state/eventStats/actions';

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

const DateFilterOptions = styled.div`
  display: flex;

  > * + * {
    margin-left: 6px;
  }
`;

type Props = {
  eventStatState: EventStatState,
  eventStatActions: EventStatActions,
  eventStatsSelectors: {
    chartData: EventStatChartData
  },
  eventStatActions: EventStatActions
};

export class SeasonRevenuePanel extends React.Component<Props> {
  componentDidMount() {
    this.props.eventStatActions.fetch();
  }

  render() {
    const {
      eventStatState: {
        loading,
        groupFilters,
        dateRange: { from, to },
        eventDateLimits,
        selectedGroupFilter
      },
      eventStatsSelectors: {
        chartData: { inventory, revenue }
      },
      eventStatActions: { setDateRange, setGroupFilter }
    } = this.props;

    return (
      <Tabbable>
        {(selectedTab, onTabChange) => (
          <Panel>
            <PanelHeader>
              <Flex align="center" justify="space-between" height="100%">
                <FlexItem flex={1}>
                  <TabLink
                    isActive={selectedTab === 0}
                    onClick={() => onTabChange(0)}
                  >
                    Revenue
                  </TabLink>
                  <TabLink
                    isActive={selectedTab === 1}
                    onClick={() => onTabChange(1)}
                  >
                    Inventory
                  </TabLink>
                </FlexItem>
                <FlexItem flex="0" margin="0 0 0 auto">
                  <ChipButtonGroup
                    onChange={setGroupFilter}
                    value={selectedGroupFilter}
                  >
                    {groupFilters.map((group, idx) => (
                      <ChipButton key={idx} value={group.value}>
                        {group.label}
                      </ChipButton>
                    ))}
                  </ChipButtonGroup>
                </FlexItem>
              </Flex>
            </PanelHeader>
            {loading && (
              <PanelContent>
                <Spacing padding="200px 0">
                  <Loader />
                </Spacing>
              </PanelContent>
            )}

            {!loading && (
              <PanelContent>
                <Flex align="center" justify="space-between">
                  <FlexItem>
                    <DateFilterOptions>
                      <DateRangeDropdown
                        startPlaceholder="Start Date"
                        endPlaceholder="End Date"
                        from={from}
                        to={to}
                        disabledDays={{
                          before: eventDateLimits.from,
                          after: eventDateLimits.to
                        }}
                        onChange={setDateRange}
                      />
                    </DateFilterOptions>
                  </FlexItem>
                  <FlexItem flex={0}>
                    <Flex>
                      {selectedTab === 0 && (
                        <Fragment>
                          <ChartLegendItem dashed label="Projected Revenue" />
                          <ChartLegendItem label="Real Revenue" />
                        </Fragment>
                      )}

                      {selectedTab === 1 && (
                        <Fragment>
                          <ChartLegendItem dashed label="Projected Inventory" />
                          <ChartLegendItem label="Real Inventory" />
                        </Fragment>
                      )}
                    </Flex>
                  </FlexItem>
                </Flex>
                <Spacing height="18px" />
                <ChartContainer>
                  {selectedTab === 0 && (
                    <LineSeriesChart
                      height={400}
                      data={revenue}
                      xAxisLabel="Date"
                      yAxisLabel="Revenue"
                    />
                  )}

                  {selectedTab === 1 && (
                    <LineSeriesChart
                      height={400}
                      data={inventory}
                      xAxisLabel="Date"
                      yAxisLabel="Inventory"
                    />
                  )}
                </ChartContainer>
                <Spacing height="18px" />
                <RevenueBreakdown
                  data={[12, 20, 30, 40]}
                  colors={['#144670', '#4B98CF', '#4B98CF', '#C4D2E1']}
                />
              </PanelContent>
            )}
          </Panel>
        )}
      </Tabbable>
    );
  }
}
