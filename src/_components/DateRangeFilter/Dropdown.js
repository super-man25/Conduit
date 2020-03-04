import styled from 'styled-components';

import { colors } from '_constants';

export const Dropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 1px solid ${colors.blue};
  background-color: ${colors.white};
  padding: 8px 12px;
  border-radius: 4px;

  ${(props) =>
    props.isOpen &&
    `
    border-left: 1px solid ${colors.blue};
    border-top: 1px solid ${colors.blue};
    border-right: 1px solid ${colors.blue};
    border-radius: 4px 4px 0 0;
  `};

  :hover {
    cursor: pointer;
  }
`;
Dropdown.displayName = 'Dropdown';
