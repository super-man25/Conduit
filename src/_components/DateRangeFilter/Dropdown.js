import styled, { css } from 'styled-components';
import { cssConstants, zIndexes } from '_constants';

export const Dropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: ${zIndexes.DROPDOWN_FILTER + 1};
  border: 1px solid ${cssConstants.PRIMARY_GRAY};
  background-color: ${cssConstants.PRIMARY_WHITE};
  padding: 8px 12px;
  color: ${cssConstants.PRIMARY_DARKEST_GRAY};
  border-radius: 4px;

  ${(props) =>
    props.isOpen &&
    css`
      border-left: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
      border-top: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
      border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
      border-radius: 4px 4px 0 0;
    `};

  :hover {
    cursor: pointer;
  }
`;
Dropdown.displayName = 'Dropdown';
