import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { cssConstants } from '_constants';

export const ChartLegendItemContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-end;
  max-width: 85px;

  & + & {
    margin-left: 16px;
  }
`;

export const ChartLegendBar = styled.div`
  height: 32px;
  width: 8px;
  background: ${(props) =>
    props.dashed
      ? `repeating-linear-gradient(to bottom, ${props.color}, ${
          props.color
        } 15%, transparent 15%, transparent 20%)`
      : props.color};
`;

export const ChartLegendLabel = styled.span`
  color: #323232;
  font-size: 12px;
  margin-left: 10px;
`;

export const ChartLegendItem = ({ label, color, dashed }) => {
  return (
    <ChartLegendItemContainer>
      <ChartLegendBar dashed={dashed} color={color} />
      <ChartLegendLabel>{label}</ChartLegendLabel>
    </ChartLegendItemContainer>
  );
};

ChartLegendItem.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  dashed: PropTypes.bool
};

ChartLegendItem.defaultProps = {
  color: cssConstants.PRIMARY_LIGHT_BLUE
};
