import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SeasonRevenuePanel } from '_scenes/Dashboard/Season/components/SeasonRevenuePanel';
import { actions as eventStatActions } from '_state/eventStat';
import { getChartData } from '_state/eventStat/selectors';

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
