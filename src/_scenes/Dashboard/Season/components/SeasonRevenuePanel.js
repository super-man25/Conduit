// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { actions as seasonStatActions } from '_state/seasonStat';
import styled from 'styled-components';
import RevenueBreakdown from './RevenueBreakdown';
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
  DateRangeFilter,
  PeriodicInventoryChart,
  PeriodicInventoryChartLegend,
  PeriodicRevenueChart,
  PeriodicRevenueChartLegend,
  CumulativeRevenueChart,
  CumulativeRevenueChartLegend,
  CumulativeInventoryChart,
  CumulativeInventoryChartLegend,
  ReportDownloadButton,
  Text
} from '_components';
import {
  cssConstants,
  CHART_HEIGHT,
  GROUP_FILTERS,
  CONCISE_READABLE_DATETIME_FORMAT,
  READABLE_DATE_FORMAT
} from '_constants';
import type { SeasonStatState } from '_state/seasonStat/reducer';
import { selectors as seasonSelectors } from '_state/season';
import { getSeasonStatState } from '_state/seasonStat/selectors';
import typeof SeasonStatActions from '_state/seasonStat/actions';
import type { EDSeason } from '_models';
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

  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  font-size: 14px;

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

type Props = {
  seasonStatState: SeasonStatState,
  selectedSeason: EDSeason,
  seasonStatActions: SeasonStatActions
};

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

export class SeasonRevenuePanel extends React.Component<Props> {
  componentDidMount() {
    const { selectedSeason } = this.props;
    this.props.seasonStatActions.fetch({ seasonId: selectedSeason.id });
  }

  componentWillUnmount() {
    this.props.seasonStatActions.clear();
  }

  componentDidUpdate(prevProps: Props) {
    const { selectedSeason } = this.props;
    if (selectedSeason.id !== prevProps.selectedSeason.id) {
      this.props.seasonStatActions.clear();
      this.props.seasonStatActions.fetch({ seasonId: selectedSeason.id });
    }
  }

  handleDownloadClick = () => {
    const {
      selectedSeason,
      seasonStatState: {
        dateRange: { from, to }
      },
      seasonStatActions: { downloadSeasonReport }
    } = this.props;
    downloadSeasonReport({
      id: selectedSeason.id,
      type: 'season',
      start: from ? from.toISOString() : null,
      end: to ? to.toISOString() : null
    });
  };

  render() {
    const {
      seasonStatState: {
        loading,
        downloading,
        groupFilters,
        dateRange: { from, to },
        dateLimits,
        selectedGroupFilter,
        seasonStats,
        seasonStatsMeta
      },
      seasonStatActions: { setDateRange, setGroupFilter },
      selectedSeason: { startTimestamp, endTimestamp }
    } = this.props;
    const { timeZone, interval } = seasonStatsMeta || {};

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
        dataLength: seasonStats.length
      });
    };

    const majorXAxisTickRenderer = (tickProps) => {
      return renderMajorXAxisTicks({
        tickProps,
        interval,
        timeZone,
        dataLength: seasonStats.length
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
                        to: endTimestamp
                      }}
                      setDateRange={setDateRange}
                      disabledDays={{
                        before: dateLimits.from,
                        after: dateLimits.to
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
                        data={seasonStats}
                        height={CHART_HEIGHT}
                        tooltipDateFormatter={tooltipDateFormatter}
                        minorXAxisTickRenderer={minorXAxisTickRenderer}
                        majorXAxisTickRenderer={majorXAxisTickRenderer}
                        renderNoData={() => <NoData type="Revenue" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeRevenueChart
                        data={seasonStats}
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
                        data={seasonStats}
                        height={CHART_HEIGHT}
                        tooltipDateFormatter={tooltipDateFormatter}
                        minorXAxisTickRenderer={minorXAxisTickRenderer}
                        majorXAxisTickRenderer={majorXAxisTickRenderer}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeInventoryChart
                        data={seasonStats}
                        height={CHART_HEIGHT}
                        tooltipDateFormatter={tooltipDateFormatter}
                        minorXAxisTickRenderer={minorXAxisTickRenderer}
                        majorXAxisTickRenderer={majorXAxisTickRenderer}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}
                  </Fragment>
                )}
              </PanelContent>
            )}
            <PanelContent>
              <RevenueBreakdown
                type={selectedTab === 0 ? 'revenue' : 'inventory'}
              />
            </PanelContent>
          </Panel>
        )}
      </Tabbable>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  seasonStatState: getSeasonStatState,
  selectedSeason: seasonSelectors.selectActiveSeason
});

function mapActionCreators(dispatch) {
  return {
    seasonStatActions: bindActionCreators(seasonStatActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionCreators
)(SeasonRevenuePanel);
