import Presenter from './presenter';
import { bindActionCreators } from 'redux';
import { actions as alertActions } from '_state/alert';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch)
  };
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(Presenter);
