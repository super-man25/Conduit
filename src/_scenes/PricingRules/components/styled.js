import styled, { css } from 'styled-components';

import { colors } from '_constants';
import { withClickAway } from '_hoc';
import { Input, Box } from '_components';

export const EditPricingRuleInput = styled(Input)`
  margin: 0 0.5rem 0 0;
  padding: 10px 8px;
  max-height: 35px;
  max-width: 80px;
`;

export const TableHeaderCell = styled.div`
  font-weight: bold;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`);

export const MultiSelectMenu = styled.div`
  position: absolute;
  width: 250px;
  top: calc(100% + 8px);
  max-height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 10;
  border: 1px solid ${colors.lightGray};
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
    props.isActive ? colors.lightGray : colors.white};
  transition: 0.1s ease-in-out all;
  color: ${colors.black};
  white-space: normal;

  :not(:last-child) {
    border-bottom: 1px solid ${colors.lightGray};
  }

  :hover {
    cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
    background-color: ${colors.lightGray};
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
  border: 1px solid ${colors.blue};
  display: inline-block;
  min-width: 35%;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.isActive ? colors.white : colors.blue)};
  background-color: ${(props) => (props.isActive ? colors.blue : colors.white)};

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

export const DropdownFilterInputContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid ${colors.lightGray};
`;

export const DropdownFilterInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${colors.lightGray};
  border-radius: 3px;
`;
