import styled, { css } from 'styled-components';
import { zIndexes, shadows } from '_constants';

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% - 1px);
  z-index: ${zIndexes.DROPDOWN_FILTER};

  transition: 0.1s ease-in-out all;
  opacity: 0;
  visibility: hidden;
  box-shadow: ${shadows.SMALL};
  ${(props) =>
    props.show &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    `};
`;
DropdownMenu.displayName = 'DropdownMenu';
