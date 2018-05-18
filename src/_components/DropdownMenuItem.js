import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const DropdownMenuItem = styled.span`
  display: ${(props) => (props.hidden ? 'none' : 'block')};;
  position: relative;
  float: ${(props) => (props.right ? 'right' : props.left ? 'left' : 'none')};
  margin: 0;
  padding-left: 10px;
  font-size: 13px;
  font-weight: lighter;
  line-height: 40px;
  color: ${(props) =>
    props.disabled
      ? cssConstants.PRIMARY_DARK_GRAY
      : cssConstants.PRIMARY_WHITE};
  background: transparent; 
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_DARK_GRAY
        : cssConstants.PRIMARY_WHITE};
  }
  ::before {
    content: '${(props) => props.content}';
  }
`;
