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

const display = (props) =>
  props.display !== undefined &&
  css`
    display: ${props.display};
  `;

export const Spacing = styled.div`
  ${padding}
  ${margin}
  ${height}
  ${width}
  ${display}
`;

Spacing.propTypes = {
  padding: PropTypes.string,
  margin: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  display: PropTypes.string
};
