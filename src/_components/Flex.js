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

export const FlexItem = styled.div`
  flex: ${(props) => props.flex || 1};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

FlexItem.propTypes = {
  flex: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string
};
