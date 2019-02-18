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
  padding: 0 0.75rem;
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
export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;
