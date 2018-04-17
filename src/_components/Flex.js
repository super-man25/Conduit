import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;

Flex.propTypes = {
  /** Flex direction */
  direction: PropTypes.string,

  /** Justify content */
  justify: PropTypes.string,

  /** Align items */
  align: PropTypes.string
};
