// @flow

import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { actions as seasonStatActions } from '_state/seasonStat';
import { actions as eventStatActions } from '_state/eventStat';
import { actions as eventScoreHistoryActions } from '_state/eventScoreHistory';
import {
  Spacing,
  Panel,
  PanelHeader,
  PanelContent,
  Flex,
  FlexItem,
  Loader,
  ChipButton,
  ChipButtonGroup,
  DateRangeFilter,
  ReportDownloadButton,
  Text,
} from '_components';
import {
  CHART_HEIGHT,
  GROUP_FILTERS,
  CONCISE_READABLE_DATETIME_FORMAT,
  READABLE_DATE_FORMAT,
  mobileBreakpoint,
  colors,
} from '_constants';
import { selectors as seasonSelectors } from '_state/season';
import { selectors as eventSelectors } from '_state/event';
import { getSeasonStatState } from '_state/seasonStat/selectors';
import { getEventStatState } from '_state/eventStat/selectors';
import {
  dateFormatter,
  renderMinorXAxisTicks,
  renderMajorXAxisTicks,
  renderMobileXAxisTicks,
  isMobileDevice,
} from '_helpers';
import RevenueBreakdown from './RevenueBreakdown';
import {
  PeriodicRevenueChartLegend,
  PeriodicRevenueChart,
} from './PeriodicRevenueChart';
import {
  PeriodicInventoryChartLegend,
  PeriodicInventoryChart,
} from './PeriodicInventoryChart';
import {
  CumulativeRevenueChartLegend,
  CumulativeRevenueChart,
} from './CumulativeRevenueChart';
import {
  CumulativeInventoryChartLegend,
  CumulativeInventoryChart,
} from './CumulativeInventoryChart';
import { EventScoreHistoryChart } from './EventScoreHistoryChart';

const StyledOverviewCharts = styled(Panel)`
  margin-bottom: 25px;
`;

const TabLink = styled.span`
  color: ${({ isActive }) => isActive && colors.blue};

  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  font-size: 14px;

  &:hover {
    color: ${colors.blue};
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
  selectedTabIndex,
  hasProjected,
}: {
  selectedGroupFilter: number,
  selectedTabIndex: number,
  hasProjected: boolean,
}) => {
  if (selectedGroupFilter === 0 && selectedTabIndex === 0)
    return <PeriodicRevenueChartLegend hasProjected={hasProjected} />;
  else if (selectedGroupFilter === 0 && selectedTabIndex === 1)
    return <PeriodicInventoryChartLegend hasProjected={hasProjected} />;
  else if (selectedGroupFilter === 1 && selectedTabIndex === 0)
    return <CumulativeRevenueChartLegend hasProjected={hasProjected} />;
  else if (selectedGroupFilter === 1 && selectedTabIndex === 1)
    return <CumulativeInventoryChartLegend hasProjected={hasProjected} />;
  else return null;
};

export const OverviewCharts = ({
  isSeason,
  isEvent,
}: {
  isSeason: boolean,
  isEvent: boolean,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const dispatch = useDispatch();
  const setDateRange = (value) =>
    isSeason
      ? dispatch(seasonStatActions.setDateRange(value))
      : dispatch(eventStatActions.setDateRange(value));
  const setGroupFilter = (value) =>
    isSeason
      ? dispatch(seasonStatActions.setGroupFilter(value))
      : dispatch(eventStatActions.setGroupFilter(value));
  const downloadReport = (options) =>
    isSeason
      ? dispatch(seasonStatActions.downloadSeasonReport(options))
      : dispatch(eventStatActions.downloadEventReport(options));
  const statState = useSelector(
    isSeason ? getSeasonStatState : getEventStatState
  );
  const selectedSeasonOrEvent = useSelector(
    isSeason ? seasonSelectors.selectActiveSeason : eventSelectors.selectEvent
  );
  const eventScoreHistory = useSelector(
    ({ eventScoreHistory }) => eventScoreHistory.eventScoreHistory
  );

  const {
    loading,
    downloading,
    groupFilters,
    dateRange: { from, to },
    dateLimits,
    eventDateLimits,
    selectedGroupFilter,
    seasonStats,
    seasonStatsMeta,
    eventStats,
    eventStatsMeta,
  } = statState;
  const { timeZone, interval } = isSeason
    ? seasonStatsMeta || {}
    : eventStatsMeta || {};
  const { startTimestamp, endTimestamp } = selectedSeasonOrEvent || {};

  useEffect(() => {
    setSelectedTabIndex(0);
  }, [selectedSeasonOrEvent]);

  useEffect(() => {
    if (isSeason) {
      const fetchSeasonStats = () => dispatch(seasonStatActions.fetch());
      const clearSeasonStats = () => dispatch(seasonStatActions.clear());
      clearSeasonStats();
      fetchSeasonStats();
      return clearSeasonStats;
    } else if (isEvent) {
      const clearEventStats = () => dispatch(eventStatActions.clear());
      const fetchEventStats = () => dispatch(eventStatActions.fetch());
      clearEventStats();
      fetchEventStats();
      return clearEventStats;
    }
  }, [selectedSeasonOrEvent, dispatch, isSeason, isEvent]);

  useEffect(() => {
    if (isSeason) return;

    const fetchEventScoreHistory = () =>
      dispatch(
        eventScoreHistoryActions.fetch({
          eventId: selectedSeasonOrEvent.id,
          startDate: from,
          endDate: to,
        })
      );
    fetchEventScoreHistory();
  }, [selectedSeasonOrEvent, dispatch, isSeason, from, to]);

  const handleDownloadClick = () => {
    downloadReport({
      id: selectedSeasonOrEvent.id,
      type: isSeason ? 'season' : 'event',
      start: from ? from.toISOString() : null,
      end: to ? to.toISOString() : null,
    });
  };

  const tooltipDateFormatter = (function() {
    if (interval === 'Hours') {
      return dateFormatter(CONCISE_READABLE_DATETIME_FORMAT, timeZone);
    }
    if (interval === 'Days') {
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
      dataLength: isSeason ? seasonStats.length : eventStats.length,
    });
  };

  const majorXAxisTickRenderer = (tickProps) => {
    return renderMajorXAxisTicks({
      tickProps,
      interval,
      timeZone,
      dataLength: isSeason ? seasonStats.length : eventStats.length,
    });
  };

  const mobileXAxisTickRenderer = (tickProps) => {
    return renderMobileXAxisTicks({
      tickProps,
      interval,
      timeZone,
      dataLength: isSeason ? seasonStats.length : eventStats.length,
    });
  };

  return (
    <StyledOverviewCharts>
      <PanelHeader>
        <Flex align="center" justify="space-between" height="100%">
          <FlexItem flex={1}>
            <TabLink
              isActive={selectedTabIndex === 0}
              onClick={() => setSelectedTabIndex(0)}
            >
              Revenue
            </TabLink>
            <TabLink
              isActive={selectedTabIndex === 1}
              onClick={() => setSelectedTabIndex(1)}
            >
              Inventory
            </TabLink>
            {isEvent && (
              <TabLink
                isActive={selectedTabIndex === 2}
                onClick={() => setSelectedTabIndex(2)}
              >
                Event Score
              </TabLink>
            )}
          </FlexItem>
          {selectedTabIndex !== 2 && (
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
      {loading ? (
        <PanelContent>
          <Spacing padding="200px 0">
            <Loader centered />
          </Spacing>
        </PanelContent>
      ) : (
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
                  to: endTimestamp,
                }}
                setDateRange={setDateRange}
                disabledDays={
                  dateLimits
                    ? {
                        before: dateLimits.from,
                        after: dateLimits.to,
                      }
                    : {
                        before: eventDateLimits.from,
                        after: eventDateLimits.to,
                      }
                }
              />
              <ReportDownloadButton
                onClick={handleDownloadClick}
                downloading={downloading}
              />
            </DateFilterOptions>
            <FlexItem flex={0}>
              <Flex justify="flex-end">
                <ChartLegend
                  selectedGroupFilter={selectedGroupFilter}
                  selectedTabIndex={selectedTabIndex}
                  hasProjected={
                    isEvent &&
                    !!eventStats.find(({ isProjected }) => isProjected)
                  }
                />
              </Flex>
            </FlexItem>
          </Flex>
          <Spacing height="18px" />
          {selectedTabIndex === 0 && (
            <Fragment>
              {selectedGroupFilter === GROUP_FILTERS.periodic && (
                <PeriodicRevenueChart
                  data={isSeason ? seasonStats : eventStats}
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
                  data={isSeason ? seasonStats : eventStats}
                  height={CHART_HEIGHT}
                  tooltipDateFormatter={tooltipDateFormatter}
                  minorXAxisTickRenderer={minorXAxisTickRenderer}
                  majorXAxisTickRenderer={majorXAxisTickRenderer}
                  mobileXAxisTickRenderer={mobileXAxisTickRenderer}
                  renderNoData={() => <NoData type="Revenue" />}
                  totalInventory={selectedSeasonOrEvent.totalInventory}
                />
              )}
            </Fragment>
          )}
          {selectedTabIndex === 1 && (
            <Fragment>
              {selectedGroupFilter === GROUP_FILTERS.periodic && (
                <PeriodicInventoryChart
                  data={isSeason ? seasonStats : eventStats}
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
                  data={isSeason ? seasonStats : eventStats}
                  height={CHART_HEIGHT}
                  tooltipDateFormatter={tooltipDateFormatter}
                  minorXAxisTickRenderer={minorXAxisTickRenderer}
                  majorXAxisTickRenderer={majorXAxisTickRenderer}
                  mobileXAxisTickRenderer={mobileXAxisTickRenderer}
                  renderNoData={() => <NoData type="Inventory" />}
                  totalInventory={selectedSeasonOrEvent.totalInventory}
                />
              )}
            </Fragment>
          )}
          {selectedTabIndex === 2 && (
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
        </PanelContent>
      )}
      {isSeason && (
        <PanelContent>
          <RevenueBreakdown
            type={selectedTabIndex === 0 ? 'revenue' : 'inventory'}
          />
        </PanelContent>
      )}
    </StyledOverviewCharts>
  );
};
