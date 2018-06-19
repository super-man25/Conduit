import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SeasonRevenuePanel } from '_scenes/Dashboard/Season/components/SeasonRevenuePanel';
import { actions as seasonStatActions } from '_state/seasonStat';

function mapStateToProps(state) {
  return {
    seasonStatState: state.seasonStat
  };
}

function mapActionCreators(dispatch) {
  return {
    seasonStatActions: bindActionCreators(seasonStatActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(SeasonRevenuePanel);
