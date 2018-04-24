import PropTypes from 'prop-types';

export const Client = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  pricingInterval: PropTypes.number
});
