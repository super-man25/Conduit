import styled, { css } from 'styled-components';
import { cssConstants } from '_constants';
import { darken } from 'polished';
import { withClickAway } from '_hoc';
import { PrimaryButton, Input, Box, SecondaryButton } from '_components';

export const EditPricingRuleInput = styled(Input)`
  box-sizing: border-box;
  margin: 0 0.5rem 0 0;
  padding: 10px 8px;
  max-height: 35px;
  max-width: 80px;
`;

export const SavePricingRuleButton = styled(PrimaryButton)`
  box-sizing: border-box;
  margin: 0;
  min-width: 50px;
  max-width: 75px;
  max-height: 35px;
`;

export const CancelEditingButton = styled(SecondaryButton)`
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

export const PositionedBox = styled(Box)`
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
`;
export const Checkbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  margin-right: 0.5rem;
`;

export const MultiSelectContainer = withClickAway(styled.div`
  position: relative;
  cursor: pointer;
`);

export const MultiSelectMenu = styled.div`
  position: absolute;
  width: 250px;
  top: calc(100% + 8px);
  max-height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 10;
  border: 1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY};
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.06);

  transition: 0.1s ease-in-out all;
  opacity: 0;
  transform: translateY(20px);
  visibility: hidden;

  ${(props) =>
    props.show &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    `}
`;

export const MultiSelectOption = styled.div`
  padding: 12px 16px;
  background-color: ${(props) =>
    props.isActive
      ? darken(0.05, cssConstants.PRIMARY_WHITE)
      : cssConstants.PRIMARY_WHITE};
  transition: 0.1s ease-in-out all;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
  white-space: normal;

  :not(:last-child) {
    border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY};
  }

  :hover {
    cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
    background-color: ${darken(0.05, cssConstants.PRIMARY_WHITE)};
  }
`;

export const SplitButtonContainer = styled.div`
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const SplitButtonHalf = styled.span`
  padding: 8px;
  border: 1px solid ${cssConstants.PRIMARY_DARK_BLUE};
  display: inline-block;
  min-width: 35%;
  text-align: center;
  cursor: pointer;

  color: ${(props) =>
    props.isActive
      ? cssConstants.PRIMARY_WHITE
      : cssConstants.PRIMARY_DARK_BLUE}

  background-color: ${(props) =>
    props.isActive
      ? cssConstants.PRIMARY_DARK_BLUE
      : cssConstants.PRIMARY_WHITE}

  :not(:last-child) {
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
    border-right: none;
  }

  :last-child {
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
  }
`;
