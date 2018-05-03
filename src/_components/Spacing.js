import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const padding = (props) =>
  props.padding !== undefined &&
  css`
    padding: ${props.padding};
  `;

const margin = (props) =>
  props.margin !== undefined &&
  css`
    margin: ${props.margin};
  `;

const height = (props) =>
  props.height !== undefined &&
  css`
    height: ${props.height};
  `;

const width = (props) =>
  props.width !== undefined &&
  css`
    width: ${props.width};
  `;

export const Spacing = styled.div`
  ${padding}
  ${margin}
  ${height}
  ${width}
`;

Spacing.propTypes = {
  padding: PropTypes.string,
  margin: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};
