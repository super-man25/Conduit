// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { actions as eventStatActions } from '_state/eventStat';
import { actions as eventScoreHistoryActions } from '_state/eventScoreHistory';
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
  PeriodicInventoryChart,
  PeriodicInventoryChartLegend,
  PeriodicRevenueChart,
  PeriodicRevenueChartLegend,
  CumulativeRevenueChart,
  CumulativeRevenueChartLegend,
  CumulativeInventoryChart,
  CumulativeInventoryChartLegend,
  ReportDownloadButton,
  Text,
  DateRangeFilter,
} from '_components';
import {
  cssConstants,
  CHART_HEIGHT,
  GROUP_FILTERS,
  CONCISE_READABLE_DATETIME_FORMAT,
  READABLE_DATE_FORMAT,
  mobileBreakpoint,
} from '_constants';
import type { EventStatState } from '_state/eventStat/reducer';
import { selectors } from '_state/event';
import { selectors as seasonSelector } from '_state/season';
import { getEventStatState, getHasProjected } from '_state/eventStat/selectors';
import { EDEvent, EDSeason } from '_models';
import { createStructuredSelector } from 'reselect';
import typeof EventStatActions from '_state/eventStat/actions';
import {
  dateFormatter,
  renderMinorXAxisTicks,
  renderMajorXAxisTicks,
  renderMobileXAxisTicks,
  isMobileDevice,
} from '_helpers';
import { EventScoreHistoryChart } from '_components/Charts/EventScoreHistoryChart';

const TabLink = styled.span`
  color: ${(props) =>
    props.isActive
      ? cssConstants.SECONDARY_BLUE
      : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: 14px;

  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};

  &:hover {
    color: ${cssConstants.PRIMARY_BLUE_HOVER};
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

  @media (max-width: ${mobileBreakpoint}px) {
    flex-direction: column;
    align-items: flex-start;

    > * + * {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;

const NoData = ({
  type,
}: {
  type: 'Revenue' | 'Inventory' | 'Event Score',
}) => (
  <Flex justify="center" align="center" height={`${CHART_HEIGHT}px`}>
    No {type} Data to Display
  </Flex>
);

const ChartLegend = ({
  selectedGroupFilter,
  selectedTab,
  hasProjected,
}: {
  selectedGroupFilter: number,
  selectedTab: number,
  hasProjected: boolean,
}) => {
  if (selectedGroupFilter === 0 && selectedTab === 0)
    return <PeriodicRevenueChartLegend hasProjected={hasProjected} />;
  else if (selectedGroupFilter === 0 && selectedTab === 1)
    return <PeriodicInventoryChartLegend hasProjected={hasProjected} />;
  else if (selectedGroupFilter === 1 && selectedTab === 0)
    return <CumulativeRevenueChartLegend hasProjected={hasProjected} />;
  else if (selectedGroupFilter === 1 && selectedTab === 1)
    return <CumulativeInventoryChartLegend hasProjected={hasProjected} />;
  else return null;
};

type Props = {
  eventStatState: EventStatState,
  eventStatActions: EventStatActions,
  eventScoreHistoryState: any,
  eventScoreHistoryActions: any,
  activeEvent: EDEvent,
  selectedSeason: EDSeason,
  hasProjected: boolean,
};

export class EventChart extends React.Component<Props> {
  componentDidMount() {
    this.props.eventStatActions.fetch();
    this.props.eventScoreHistoryActions.fetch({
      eventId: this.props.activeEvent.id,
      startDate: this.props.eventStatState.dateRange.from,
      endDate: this.props.eventStatState.dateRange.to,
    });
  }

  componentWillUnmount() {
    this.props.eventStatActions.clear();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.activeEvent.id !== this.props.activeEvent.id) {
      this.props.eventStatActions.clear();
      this.props.eventStatActions.fetch();
    }

    if (
      prevProps.eventStatState.dateRange.from !==
        this.props.eventStatState.dateRange.from ||
      prevProps.eventStatState.dateRange.to !==
        this.props.eventStatState.dateRange.to
    ) {
      this.props.eventScoreHistoryActions.fetch({
        eventId: this.props.activeEvent.id,
        startDate: this.props.eventStatState.dateRange.from,
        endDate: this.props.eventStatState.dateRange.to,
      });
    }
  }

  handleDownloadClick = () => {
    const {
      activeEvent: { id },
      eventStatState: {
        dateRange: { from, to },
      },
      eventStatActions: { downloadEventReport },
    } = this.props;
    downloadEventReport({
      id: id,
      type: 'event',
      start: from ? from.toISOString() : null,
      end: to ? to.toISOString() : null,
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
        eventStats,
        eventStatsMeta,
      },
      eventStatActions: { setDateRange, setGroupFilter },
      eventScoreHistoryState: { eventScoreHistory },
      selectedSeason: { startTimestamp },
      activeEvent: { timestamp, totalInventory },
      hasProjected,
    } = this.props;
    const { interval, timeZone } = eventStatsMeta || {};

    const tooltipDateFormatter = (function() {
      if (!!eventStatsMeta && eventStatsMeta.interval === 'Hours') {
        return dateFormatter(CONCISE_READABLE_DATETIME_FORMAT, timeZone);
      }
      if (!!eventStatsMeta && eventStatsMeta.interval === 'Days') {
        return dateFormatter(READABLE_DATE_FORMAT, timeZone);
      }
      // Fallback to Days
      return dateFormatter(READABLE_DATE_FORMAT, timeZone);
    })();

    const minorXAxisTickRenderer = (tickProps) => {
      return renderMinorXAxisTicks({
        tickProps,
        interval,
        timeZone,
        dataLength: eventStats.length,
      });
    };

    const majorXAxisTickRenderer = (tickProps) => {
      return renderMajorXAxisTicks({
        tickProps,
        interval,
        timeZone,
        dataLength: eventStats.length,
      });
    };

    const mobileXAxisTickRenderer = (tickProps) => {
      return renderMobileXAxisTicks({
        tickProps,
        interval,
        timeZone,
        dataLength: eventStats.length,
      });
    };

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
                    REVENUE
                  </TabLink>
                  <TabLink
                    isActive={selectedTab === 1}
                    onClick={() => onTabChange(1)}
                  >
                    INVENTORY
                  </TabLink>
                  <TabLink
                    isActive={selectedTab === 2}
                    onClick={() => onTabChange(2)}
                  >
                    EVENT SCORE
                  </TabLink>
                </FlexItem>
                {selectedTab !== 2 && (
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
                )}
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
                <Text size={11} marginBottom="4px">
                  Filter By
                </Text>
                <Flex
                  align={isMobileDevice ? 'flex-start' : 'center'}
                  justify="space-between"
                >
                  <DateFilterOptions>
                    <DateRangeFilter
                      dateRange={{ from, to }}
                      allTimeDateRange={{
                        from: startTimestamp,
                        to: timestamp,
                      }}
                      setDateRange={setDateRange}
                      disabledDays={{
                        before: eventDateLimits.from,
                        after: eventDateLimits.to,
                      }}
                    />
                    <ReportDownloadButton
                      onClick={this.handleDownloadClick}
                      downloading={downloading}
                    />
                  </DateFilterOptions>
                  <FlexItem flex={0}>
                    <Flex justify="flex-end">
                      <ChartLegend
                        selectedGroupFilter={selectedGroupFilter}
                        selectedTab={selectedTab}
                        hasProjected={hasProjected}
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
                        tooltipDateFormatter={tooltipDateFormatter}
                        minorXAxisTickRenderer={minorXAxisTickRenderer}
                        majorXAxisTickRenderer={majorXAxisTickRenderer}
                        mobileXAxisTickRenderer={mobileXAxisTickRenderer}
                        renderNoData={() => <NoData type="Revenue" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeRevenueChart
                        data={eventStats}
                        totalInventory={totalInventory}
                        height={CHART_HEIGHT}
                        tooltipDateFormatter={tooltipDateFormatter}
                        minorXAxisTickRenderer={minorXAxisTickRenderer}
                        majorXAxisTickRenderer={majorXAxisTickRenderer}
                        mobileXAxisTickRenderer={mobileXAxisTickRenderer}
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
                        tooltipDateFormatter={tooltipDateFormatter}
                        minorXAxisTickRenderer={minorXAxisTickRenderer}
                        majorXAxisTickRenderer={majorXAxisTickRenderer}
                        mobileXAxisTickRenderer={mobileXAxisTickRenderer}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeInventoryChart
                        data={eventStats}
                        totalInventory={totalInventory}
                        height={CHART_HEIGHT}
                        tooltipDateFormatter={tooltipDateFormatter}
                        minorXAxisTickRenderer={minorXAxisTickRenderer}
                        majorXAxisTickRenderer={majorXAxisTickRenderer}
                        mobileXAxisTickRenderer={mobileXAxisTickRenderer}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}
                  </Fragment>
                )}
                {selectedTab === 2 && (
                  <EventScoreHistoryChart
                    data={eventScoreHistory}
                    height={CHART_HEIGHT}
                    tooltipDateFormatter={tooltipDateFormatter}
                    minorXAxisTickRenderer={minorXAxisTickRenderer}
                    majorXAxisTickRenderer={majorXAxisTickRenderer}
                    mobileXAxisTickRenderer={mobileXAxisTickRenderer}
                    renderNoData={() => <NoData type="Event Score" />}
                  />
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

const mapStateToProps = createStructuredSelector({
  eventStatState: getEventStatState,
  eventScoreHistoryState: (state) => state.eventScoreHistory,
  activeEvent: selectors.selectEvent,
  selectedSeason: seasonSelector.selectActiveSeason,
  hasProjected: getHasProjected,
});

function mapDispatchToProps(dispatch) {
  return {
    eventStatActions: bindActionCreators(eventStatActions, dispatch),
    eventScoreHistoryActions: bindActionCreators(
      eventScoreHistoryActions,
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventChart);
