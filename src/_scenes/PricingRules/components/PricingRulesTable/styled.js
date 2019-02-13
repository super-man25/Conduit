import styled from 'styled-components';
import { cssConstants } from '_constants';
import { PrimaryButton, Input, Box, SecondaryButton } from '_components';

export const EditPricingRuleInput = Input.extend`
  box-sizing: border-box;
  margin: 0 0.5rem 0 0;
  padding: 10px 8px;
  max-height: 35px;
  max-width: 80px;
`;

export const SavePricingRuleButton = PrimaryButton.extend`
  box-sizing: border-box;
  margin: 0;
  min-width: 50px;
  max-width: 75px;
  max-height: 35px;
`;

export const CancelEditingButton = SecondaryButton.extend`
  box-sizing: border-box;
  margin: 0;
  min-width: 50px;
  max-width: 75px;
  max-height: 35px;
`;

export const TableHeaderCell = styled.div`
  text-align: ${(props) => props.align || 'left'};
  color: ${cssConstants.PRIMARY_DARKEST_GRAY};
  font-weight: 500;
`;

export const PositionedBox = Box.extend`
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
`;

export const MultiSelectList = styled.ul`
  margin: 0;
  height: 100%;
  list-style: none;
  padding: 0;
  overflow: auto;
`;

export const MultiSelectListItem = styled.li`
  margin-bottom: 20px;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  white-space: normal;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;

export const MultiSelectContainer = Box.extend`
  width: 280px;
  border: 1px solid ${cssConstants.SECONDARY_BLUE};
  background-color: ${cssConstants.PRIMARY_WHITE};
  position: relative;
  box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.43);

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    position: absolute;
    top: -5px;
    left: 43px;
    transform: rotate(45deg);
    z-index: 1;
    background-color: ${cssConstants.PRIMARY_WHITE};
    border-top: 1px solid ${cssConstants.SECONDARY_BLUE};
    border-left: 1px solid ${cssConstants.SECONDARY_BLUE};
  }
`;
