import styled, { css } from 'styled-components';
import { cssConstants } from '../_constants';

export const Sidebar = styled.div`
  width: 36%;
  max-width: 500px;
  min-width: 380px;
  visibility: visible;
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  overflow-x: hidden;

  transition: 0.1s ease-in-out all;

  ${(props) => props.collapsed && css`
    transform: translate3d(-100%, 0, 0);
    width: 0;
    max-width: 0;
    min-width: 0;
  `}
`;
