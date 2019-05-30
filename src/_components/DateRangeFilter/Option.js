import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { cssConstants } from '_constants';

export const Option = styled.div`
  padding: 12px 16px;
  width: 164px;
  background-color: ${cssConstants.PRIMARY_WHITE};
  transition: 0.1s ease-in-out all;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
  border-left: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};

  :first-child {
    border-top: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
    border-radius: 0 4px 0 0;
  }
  :last-child {
    border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
    border-radius: 0 0 4px 4px;
  }

  :hover {
    cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
    background-color: ${darken(0.05, cssConstants.PRIMARY_WHITE)};
  }

  ${(props) =>
    props.dateRangePickerOpen &&
    css`
      border-right: 1px solid ${cssConstants.PRIMARY_GRAY};
      :first-child {
        border-radius: 0;
      }
      :last-child {
        border-radius: 0 0 0 4px;
      }
    `};
`;
Option.displayName = 'Option';
