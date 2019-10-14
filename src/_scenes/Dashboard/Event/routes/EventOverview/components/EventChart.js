// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
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
  DateRangeFilter
} from '_components';
import {
  cssConstants,
  CHART_HEIGHT,
  GROUP_FILTERS,
  CONCISE_READABLE_DATETIME_FORMAT,
  READABLE_DATE_FORMAT
} from '_constants';
import type { EventStatState } from '_state/eventStat/reducer';
import { selectors } from '_state/event';
import { selectors as seasonSelector } from '_state/season';
import { getEventStatState } from '_state/eventStat/selectors';
import { EDEvent, EDSeason } from '_models';
import { createStructuredSelector } from 'reselect';
import typeof EventStatActions from '_state/eventStat/actions';
import {
  dateFormatter,
  renderMinorXAxisTicks,
  renderMajorXAxisTicks
} from '_helpers';

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
  activeEvent: EDEvent,
  selectedSeason: EDSeason
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
        eventStats,
        eventStatsMeta
      },
      eventStatActions: { setDateRange, setGroupFilter },
      selectedSeason: { startTimestamp },
      activeEvent: { timestamp, totalInventory }
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
        dataLength: eventStats.length
      });
    };

    const majorXAxisTickRenderer = (tickProps) => {
      return renderMajorXAxisTicks({
        tickProps,
        interval,
        timeZone,
        dataLength: eventStats.length
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
                <Text size={11} marginBottom="4px">
                  Filter By
                </Text>
                <Flex align="center" justify="space-between">
                  <DateFilterOptions>
                    <DateRangeFilter
                      dateRange={{ from, to }}
                      allTimeDateRange={{
                        from: startTimestamp,
                        to: timestamp
                      }}
                      setDateRange={setDateRange}
                      disabledDays={{
                        before: eventDateLimits.from,
                        after: eventDateLimits.to
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

const mapStateToProps = createStructuredSelector({
  eventStatState: getEventStatState,
  activeEvent: selectors.selectEvent,
  selectedSeason: seasonSelector.selectActiveSeason
});

function mapDispatchToProps(dispatch) {
  return {
    eventStatActions: bindActionCreators(eventStatActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventChart);
