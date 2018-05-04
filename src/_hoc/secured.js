import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UNSECURED_ROUTE = '/login';
const SECURED_ROUTE = '/';

/**
 * Helper HOC that handles redirect logic
 *
 * @param {Function} selector - Function to read state and return boolean (authorized or not)
 * @param {string} redirectUrl - Redirect URL for when the user is unauthorized
 */
const connectedRedirect = (selector, redirectUrl) => (Component) => {
  const mapStateToProps = (state) => ({
    authorized: selector(state)
  });

  const RedirectComponent = ({ authorized }) => {
    return authorized ? <Component /> : <Redirect to={redirectUrl} />;
  };

  RedirectComponent.propTypes = {
    authorized: PropTypes.bool.isRequired
  };

  return connect(mapStateToProps)(RedirectComponent);
};

/**
 * Wrapper for general authorized routes (non-admin)
 *
 * @param {Object} Component
 */
export const secured = connectedRedirect(
  (state) => !!state.auth.model || state.auth.loading, // don't redirect to login screen during refreshes
  UNSECURED_ROUTE
);

/**
 * Wrapper for pre-auth routes
 */
export const unsecured = connectedRedirect(
  (state) => !state.auth.model,
  SECURED_ROUTE
);

/**
 * Wrapper for admin routes
 */
export const admin = connectedRedirect(
  (state) => !!state.auth.model && state.auth.model.isAdmin,
  SECURED_ROUTE
);
