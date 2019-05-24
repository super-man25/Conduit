// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as seasonStatActions } from '_state/seasonStat';
import { differenceInCalendarDays } from 'date-fns';
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
import type { SeasonStatState } from '_state/seasonStat/reducer';
import { selectors as seasonSelectors } from '_state/season';
import typeof SeasonStatActions from '_state/seasonStat/actions';
import type { EDClient } from '_models';

// temporary hotfix
import { getClient } from '_state/client/selectors';

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

type Props = {
  client: EDClient,
  seasonStatState: SeasonStatState,
  selectedSeasonId: number,
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
    const { selectedSeasonId } = this.props;
    this.props.seasonStatActions.fetch({ seasonId: selectedSeasonId });
  }

  componentWillUnmount() {
    this.props.seasonStatActions.clear();
  }

  componentDidUpdate(prevProps: Props) {
    const { selectedSeasonId } = this.props;
    if (this.props.selectedSeasonId !== prevProps.selectedSeasonId) {
      this.props.seasonStatActions.clear();
      this.props.seasonStatActions.fetch({ seasonId: selectedSeasonId });
    }
  }

  handleDownloadClick = () => {
    const {
      selectedSeasonId,
      seasonStatState: {
        dateRange: { from, to }
      },
      seasonStatActions: { downloadSeasonReport }
    } = this.props;
    downloadSeasonReport({
      id: selectedSeasonId,
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
        seasonStats
      },
      client: { id, name },
      seasonStatActions: { setDateRange, setGroupFilter }
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
                          before: dateLimits.from,
                          after: dateLimits.to
                        }}
                        onChange={setDateRange}
                      />
                      {/* temporarily short circuiting button */}
                      {id !== 5 && name !== 'Mets' && (
                        <ReportDownloadButton
                          onClick={this.handleDownloadClick}
                          downloading={downloading}
                        />
                      )}
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
                        data={seasonStats}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Revenue" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeRevenueChart
                        data={seasonStats}
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
                        data={seasonStats}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
                        renderNoData={() => <NoData type="Inventory" />}
                      />
                    )}

                    {selectedGroupFilter === GROUP_FILTERS.cumulative && (
                      <CumulativeInventoryChart
                        data={seasonStats}
                        height={CHART_HEIGHT}
                        dateFormat={tooltipDateFormat}
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

function mapStateToProps(state) {
  return {
    seasonStatState: state.seasonStat,
    selectedSeasonId: seasonSelectors.selectActiveSeasonId(state),
    //temporary
    client: getClient(state)
  };
}

function mapActionCreators(dispatch) {
  return {
    seasonStatActions: bindActionCreators(seasonStatActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapActionCreators
)(SeasonRevenuePanel);
