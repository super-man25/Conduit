import PropTypes from 'prop-types';

export const Evnet = PropTypes.shape({
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  modifiedAt: PropTypes.instanceOf(Date).isRequired,
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date),
  promotion: PropTypes.boolean
});
