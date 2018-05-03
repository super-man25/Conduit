import PropTypes from 'prop-types';

export const User = PropTypes.shape({
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  modifiedAt: PropTypes.instanceOf(Date).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  clientId: PropTypes.number
});
