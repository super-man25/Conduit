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
import { cssConstants, DATE_FORMATS } from '_constants';
import { PeriodicInventoryChart } from './PeriodicInventoryChart';
import { PeriodicRevenueChart } from './PeriodicRevenueChart';
import { CumulativeRevenueChart } from './CumulativeRevenueChart';
import { CumulativeInventoryChart } from './CumulativeInventoryChart';
import { RevenueBreakdown } from './RevenueBreakdown';
import { differenceInCalendarDays } from 'date-fns';
import type { EventStatState } from '_state/eventStat/reducer';
import type { EventStat } from '_models/eventStat';
import typeof EventStatActions from '_state/eventStat/actions';

const CHART_HEIGHT = 400;

const GROUP_FILTERS = {
  periodic: 0,
  cumulative: 1
};

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
    model: EventStat[]
  },
  eventStatActions: EventStatActions
};

const NoData = ({ type }: { type: 'Revenue' | 'Inventory' }) => (
  <Flex justify="center" align="center" height={`${CHART_HEIGHT}px`}>
    No {type} Data to Display
  </Flex>
);

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
      eventStatsSelectors: { model },
      eventStatActions: { setDateRange, setGroupFilter }
    } = this.props;

    const tooltipDateFormat =
      from && to && differenceInCalendarDays(to, from) <= 7
        ? DATE_FORMATS.datetime
        : DATE_FORMATS.day;

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
                          <ChartLegendItem
                            dashed={
                              selectedGroupFilter === GROUP_FILTERS.cumulative
                            }
                            color={
                              selectedGroupFilter === GROUP_FILTERS.cumulative
                                ? cssConstants.PRIMARY_LIGHT_BLUE
                                : cssConstants.PRIMARY_DARK_BLUE
                            }
                            label="Projected Revenue"
                          />
                          <ChartLegendItem label="Actual Revenue" />
                        </Fragment>
                      )}

                      {selectedTab === 1 && (
                        <Fragment>
                          <ChartLegendItem
                            dashed={
                              selectedGroupFilter === GROUP_FILTERS.cumulative
                            }
                            color={
                              selectedGroupFilter === GROUP_FILTERS.cumulative
                                ? cssConstants.PRIMARY_LIGHT_BLUE
                                : cssConstants.PRIMARY_DARK_BLUE
                            }
                            label="Projected Inventory"
                          />
                          <ChartLegendItem label="Actual Inventory" />
                        </Fragment>
                      )}
                    </Flex>
                  </FlexItem>
                </Flex>
                <Spacing height="18px" />
                {selectedTab === 0 && (
                  <Fragment>
                    {selectedGroupFilter === GROUP_FILTERS.periodic && (
                      <PeriodicRevenueChart
                        data={model}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Revenue" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeRevenueChart
                        data={model}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Revenue" />}
                      />
                    )}
                  </Fragment>
                )}
                {selectedTab === 1 && (
                  <Fragment>
                    {selectedGroupFilter === GROUP_FILTERS.periodic && (
                      <PeriodicInventoryChart
                        data={model}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeInventoryChart
                        data={model}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}
                  </Fragment>
                )}
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
