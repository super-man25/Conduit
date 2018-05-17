import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const DropdownMenuItem = styled.span`
  display: ${(props) => (props.hidden ? 'none' : 'block')};;
  position: relative;
  width: 100%;
  float: ${(props) => (props.right ? 'right' : props.left ? 'left' : 'none')};
  margin: 0;
  padding: 5px 25px;
  // padding-left: 25px;
  font-size: 13px;
  height: 50px;
  font-weight: lighter;
  line-height: 50px;
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