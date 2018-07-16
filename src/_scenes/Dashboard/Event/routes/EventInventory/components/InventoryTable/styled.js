import styled from 'styled-components';
import { cssConstants } from '_constants';
import { Button, Input, Flex, Box } from '_components';

export const ManualPricingInput = Input.extend`
  box-sizing: border-box;
  margin: 0 0.5rem 0 0;
  padding: 10px 16px;
  max-height: 35px;
  max-width: 80px;
`;

export const ManualPricingButton = Button.extend`
  box-sizing: border-box;
  margin: 0;
  max-width: 80px;
  max-height: 35px;
`;

export const TableHeaderCell = styled.div`
  text-align: ${(props) => props.align || 'left'};
  color: ${cssConstants.PRIMARY_DARKEST_GRAY};
  font-weight: 500;
`;

export const IconContainer = Flex.extend`
  display: inline-flex;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.667;
`;

export const PositionedCellContent = Box.extend`
  position: relative;
`;
