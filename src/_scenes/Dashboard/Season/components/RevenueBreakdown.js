// @flow
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as revenueStatActions } from '_state/revenueStat';
import {
  P1,
  HorizontalBars,
  LegendItem,
  Box,
  CenteredLoader,
  Flex,
  FlexItem,
  Spacing
} from '_components';
import { cssConstants } from '_constants';
import { formatUSD, formatNumber } from '_helpers/string-utils';
import { EDTicketBreakdown } from '_models';
import { ApiError } from '_helpers/api';
import { selectors as seasonSelectors } from '_state/season';

type BreakdownType = 'revenue' | 'inventory';

const BREAKDOWN_COLORSET = [
  cssConstants.PRIMARY_DARK_BLUE,
  cssConstants.SECONDARY_BLUE,
  cssConstants.SECONDARY_LIGHT_BLUE,
  cssConstants.SECONDARY_LIGHTEST_BLUE,
  cssConstants.SECONDARY_BLUE_GRAY,
  cssConstants.SECONDARY_LIGHT_PURPLE,
  cssConstants.SECONDARY_PURPLE
];

const CenteredText = P1.extend`
  text-align: center;
`;

const formatters = {
  revenue: (value) =>
    formatUSD(value, { maximumFractionDigits: 0, minimumFractionDigits: 0 }),
  ticketsSold: formatNumber
};

function hasNonZeroValues(arr: number[]) {
  return arr.some((v) => v !== 0);
}

function getBreakdownTitleFromType(type: BreakdownType) {
  return type === 'inventory' ? 'Tickets Sold Breakdown' : 'Revenue Breakdown';
}

const RevenueBreakdownError = ({ error, onRetry }) => (
  <Box>
    <CenteredText>There was an issue fetching revenue stats.</CenteredText>
  </Box>
);

const BreakdownLoader = () => (
  <div style={{ position: 'relative', height: 100 }}>
    <CenteredLoader />
  </div>
);

const NoData = ({ type }) => <P1>No {type} breakdown data</P1>;

type Props = {
  revenueStatState: {
    loading: boolean,
    ticketBreakdown: EDTicketBreakdown[],
    error?: ApiError
  },
  revenueStatActions: {
    fetch: ({ seasonId: number }) => void,
    reset: () => void
  },
  seasonId: number,
  type: BreakdownType
};

export class RevenueBreakdown extends React.Component<Props> {
  componentDidMount() {
    const { seasonId } = this.props;
    this.props.revenueStatActions.fetch({ seasonId });
  }

  componentDidUpdate(prevProps: Props) {
    const { seasonId } = this.props;
    if (seasonId !== prevProps.seasonId) {
      this.props.revenueStatActions.fetch({ seasonId });
    }
  }

  render() {
    const {
      revenueStatState: { loading, ticketBreakdown, error },
      type
    } = this.props;

    const property = type === 'inventory' ? 'ticketsSold' : 'revenue';

    if (error) {
      return <RevenueBreakdownError error={error} />;
    }

    if (loading) {
      return <BreakdownLoader />;
    }

    if (!ticketBreakdown.length) {
      return <NoData type={type} />;
    }

    const title = getBreakdownTitleFromType(type);
    const data = ticketBreakdown.map((d) => d[property]);
    const hasNonZeroValue = hasNonZeroValues(data);
    const valueFormatter = formatters[property];

    return (
      <Box>
        <P1>{title}</P1>
        <Spacing height="0.75rem" />
        <Fragment>
          {hasNonZeroValue && (
            <HorizontalBars data={data} colors={BREAKDOWN_COLORSET} />
          )}
          <Flex margin="0 -1rem -1rem" flexWrap="wrap">
            {ticketBreakdown.map((d, idx) => (
              <FlexItem key={idx} flex="0 0 auto" padding="1rem">
                <LegendItem
                  label={d.name}
                  value={valueFormatter(d[property])}
                  color={BREAKDOWN_COLORSET[idx]}
                />
              </FlexItem>
            ))}
          </Flex>
        </Fragment>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    revenueStatState: state.revenueStat,
    seasonId: seasonSelectors.selectActiveSeasonId(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    revenueStatActions: bindActionCreators(revenueStatActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RevenueBreakdown);
