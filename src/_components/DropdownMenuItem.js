import styled from 'styled-components';
import { cssConstants } from '_constants';

const attrs = {
  hidden: (props) => {
    return (
      (props.hidden && 'none') ||
      'block'
    );
  },
  floating: (props) => {
    return (
      (props.right && 'right') ||
      (props.left && 'left') ||
      'none'
    );
  },
  color: (props) => {
    return (
      (props.disabled && cssConstants.PRIMARY_DARK_GRAY) ||
      cssConstants.PRIMARY_WHITE
    )
  },
}

export const DropdownMenuItem = styled.span.attrs({ ... attrs })`
  display: ${(props) => props.hidden};
  position: relative;
  float: ${(props) => props.floating};
  margin: 0;
  padding-left: 10px;
  font-size: 13px;
  font-weight: lighter;
  line-height: 40px;
  color: ${(props) => props.color};
  background: transparent; 
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) => props.color};
  ::before {
    content: '${(props) => props.content}';
  }
`;
