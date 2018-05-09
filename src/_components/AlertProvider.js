import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '_helpers';
import { actions as alertActions } from '_state/alert';

class AlertProviderPresenter extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert, children } = this.props;

    // TODO: style alerts
    return (
      <div>
        {alert &&
          alert.show && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
        {children}
      </div>
    );
  }
}

AlertProviderPresenter.propTypes = {
  /** Redux dispatch */
  dispatch: PropTypes.func,

  /** Alert object */
  alert: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string
  }),

  /** Children */
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    alertState: state.alert
  };
}

export const AlertProvider = connect(mapStateToProps)(AlertProviderPresenter);
