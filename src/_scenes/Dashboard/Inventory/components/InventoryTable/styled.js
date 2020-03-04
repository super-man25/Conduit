import styled from 'styled-components';
import { colors } from '_constants';
import { PrimaryButton, Input, Flex, Box } from '_components';

export const ManualPricingInput = styled(Input)`
  margin: 0 0.5rem 0 0;
  padding: 10px 8px;
  max-height: 35px;
  max-width: 80px;
`;

export const ManualPricingButton = styled(PrimaryButton)`
  margin: 0;
  min-width: 50px;
  width: 80px;
  max-height: 35px;
  padding: 0.5rem;
`;

export const TableHeaderCell = styled.div`
  text-align: ${(props) => props.align || 'left'};
  color: ${colors.gray};
  font-weight: 500;
`;

export const IconContainer = styled(Flex)`
  display: inline-flex;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.667;
`;

export const PositionedBox = styled(Box)`
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
`;

export const FilterContainer = styled(Box)`
  width: 280px;
  border: 1px solid ${colors.blue};
  background-color: ${colors.white};
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
    background-color: ${colors.white};
    border-top: 1px solid ${colors.blue};
    border-left: 1px solid ${colors.blue};
  }
`;

export const FilterList = styled.ul`
  margin: 0;
  height: 100%;
  list-style: none;
  padding: 0;
  overflow: auto;
`;

export const FilterListItem = styled.li`
  height: 35px;
  display: flex;
  padding: 0 1rem;
  align-items: center;
`;

export const Checkbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
  margin-right: 0.5rem;
`;

export const FilterButton = styled.button`
  background-color: ${colors.blue};
  border: none;
  border-radius: 2px;
  color: ${colors.white};
  font-weight: 300;
  height: 25px;
  min-width: 60px;
  padding: 0 1rem;
`;
