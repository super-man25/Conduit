import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SeasonRevenuePanel } from '_scenes/Dashboard/components/SeasonRevenuePanel';
import { actions as eventStatsActions } from '_state/eventStats';

function mapStateToProps(state) {
  return {
    eventStatsState: state.eventStats
  };
}

function mapActionCreators(dispatch) {
  return {
    eventStatsActions: bindActionCreators(eventStatsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(SeasonRevenuePanel);
