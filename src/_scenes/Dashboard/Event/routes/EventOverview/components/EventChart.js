// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { differenceInCalendarDays } from 'date-fns';
import { actions as eventStatActions } from '_state/eventStat';
import {
  Spacing,
  Panel,
  PanelHeader,
  PanelContent,
  Flex,
  FlexItem,
  Tabbable,
  Loader,
  ChipButton,
  ChipButtonGroup,
  DateRangeDropdown,
  PeriodicInventoryChart,
  PeriodicInventoryChartLegend,
  PeriodicRevenueChart,
  PeriodicRevenueChartLegend,
  CumulativeRevenueChart,
  CumulativeRevenueChartLegend,
  CumulativeInventoryChart,
  CumulativeInventoryChartLegend,
  ReportDownloadButton
} from '_components';
import {
  cssConstants,
  DATE_FORMATS,
  CHART_HEIGHT,
  GROUP_FILTERS
} from '_constants';
import type { EventStatState } from '_state/eventStat/reducer';
import { selectors } from '_state/event';
import { EDEvent } from '_models';
import typeof EventStatActions from '_state/eventStat/actions';

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
  align-items: center;

  > * + * {
    margin-left: 6px;
  }
`;

const NoData = ({ type }: { type: 'Revenue' | 'Inventory' }) => (
  <Flex justify="center" align="center" height={`${CHART_HEIGHT}px`}>
    No {type} Data to Display
  </Flex>
);

const ChartLegend = ({
  selectedGroupFilter,
  selectedTab
}: {
  selectedGroupFilter: number,
  selectedTab: number
}) => {
  if (selectedGroupFilter === 0 && selectedTab === 0)
    return <PeriodicRevenueChartLegend />;
  else if (selectedGroupFilter === 0 && selectedTab === 1)
    return <PeriodicInventoryChartLegend />;
  else if (selectedGroupFilter === 1 && selectedTab === 0)
    return <CumulativeRevenueChartLegend />;
  else if (selectedGroupFilter === 1 && selectedTab === 1)
    return <CumulativeInventoryChartLegend />;
  else return null;
};

type Props = {
  eventStatState: EventStatState,
  eventStatActions: EventStatActions,
  activeEvent: EDEvent
};

export class EventChart extends React.Component<Props> {
  componentDidMount() {
    this.props.eventStatActions.fetch();
  }

  componentWillUnmount() {
    this.props.eventStatActions.clear();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.activeEvent.id !== this.props.activeEvent.id) {
      this.props.eventStatActions.clear();
      this.props.eventStatActions.fetch();
    }
  }

  handleDownloadClick = () => {
    const {
      activeEvent: { id },
      eventStatState: {
        dateRange: { from, to }
      },
      eventStatActions: { downloadEventReport }
    } = this.props;
    downloadEventReport({
      id: id,
      type: 'event',
      start: from ? from.toISOString() : null,
      end: to ? to.toISOString() : null
    });
  };

  render() {
    const {
      eventStatState: {
        loading,
        downloading,
        groupFilters,
        dateRange: { from, to },
        eventDateLimits,
        selectedGroupFilter,
        eventStats
      },
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
                      <ReportDownloadButton
                        onClick={this.handleDownloadClick}
                        downloading={downloading}
                      />
                    </DateFilterOptions>
                  </FlexItem>
                  <FlexItem flex={0}>
                    <Flex>
                      <ChartLegend
                        selectedGroupFilter={selectedGroupFilter}
                        selectedTab={selectedTab}
                      />
                    </Flex>
                  </FlexItem>
                </Flex>
                <Spacing height="18px" />
                {selectedTab === 0 && (
                  <Fragment>
                    {selectedGroupFilter === GROUP_FILTERS.periodic && (
                      <PeriodicRevenueChart
                        data={eventStats}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Revenue" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeRevenueChart
                        data={eventStats}
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
                        data={eventStats}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeInventoryChart
                        data={eventStats}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}
                  </Fragment>
                )}
                <Spacing height="18px" />
              </PanelContent>
            )}
          </Panel>
        )}
      </Tabbable>
    );
  }
}

function mapStateToProps(state) {
  return {
    eventStatState: state.eventStat,
    activeEvent: selectors.selectEvent(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventStatActions: bindActionCreators(eventStatActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventChart);
