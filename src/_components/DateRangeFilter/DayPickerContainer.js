import styled, { css } from 'styled-components';
import { cssConstants, shadows } from '_constants';

export const DayPickerContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-direction: column;
  border: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
  border-left: none;
  background: ${cssConstants.PRIMARY_WHITE};
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s ease-in-out;

  ${(props) =>
    props.show &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
      box-shadow: ${shadows.SMALL};
      border-radius: 0 4px 4px 0;
    `};
`;
DayPickerContainer.displayName = 'DropdownMenu';
