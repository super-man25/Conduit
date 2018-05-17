import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SeasonRevenuePanel } from '_scenes/Dashboard/Season/components/SeasonRevenuePanel';
import { actions as eventStatActions } from '_state/eventStats';
import { getChartData } from '_state/eventStats/selectors';

function mapStateToProps(state) {
  return {
    eventStatState: state.eventStat,
    eventStatsSelectors: {
      chartData: getChartData(state.eventStat)
    }
  };
}

function mapActionCreators(dispatch) {
  return {
    eventStatActions: bindActionCreators(eventStatActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(SeasonRevenuePanel);
