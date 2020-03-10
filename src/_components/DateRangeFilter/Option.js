import styled, { css } from 'styled-components';

import { colors } from '_constants';

export const Option = styled.div`
  padding: 12px 16px;
  width: 164px;
  background-color: ${colors.white};
  transition: 0.1s ease-in-out all;
  color: ${colors.black};
  border-left: 1px solid ${colors.blue};
  border-right: 1px solid ${colors.blue};

  :first-child {
    border-top: 1px solid ${colors.blue};
    border-radius: 0 4px 0 0;
  }
  :last-child {
    border-bottom: 1px solid ${colors.blue};
    border-radius: 0 0 4px 4px;
  }

  :hover {
    cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
    background-color: ${colors.lightGray};
  }

  ${(props) =>
    props.dateRangePickerOpen &&
    css`
      border-right: 1px solid ${colors.gray};
      :first-child {
        border-radius: 0;
      }
      :last-child {
        border-radius: 0 0 0 4px;
      }
    `};
`;
Option.displayName = 'Option';
