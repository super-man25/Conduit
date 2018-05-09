import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { cssConstants } from '_constants';

const LegendItemContainer = styled.div`
  display: inline-flex;

  & + & {
    margin-left: 24px;
  }
`;

const LegendItemColoredBar = styled.div`
  background-color: ${(props) => props.color};
  margin-right: 14px;
  width: 7px;
`;

const LegendItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LegendItemTitle = styled.span`
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: 12px;
  margin-bottom: 2px;
`;

const LegendItemValue = styled.span`
  font-size: 18px;
  letter-spacing: 0.4;
`;

export function LegendItem({ color, label, value }) {
  return (
    <LegendItemContainer>
      <LegendItemColoredBar color={color} />
      <LegendItemContent>
        <LegendItemTitle>{label}</LegendItemTitle>
        <LegendItemValue>{value}</LegendItemValue>
      </LegendItemContent>
    </LegendItemContainer>
  );
}

LegendItem.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
