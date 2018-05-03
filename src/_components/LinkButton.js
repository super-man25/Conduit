import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const LinkButton = styled.span`
  display: ${(props) => (props.hidden ? 'none' : 'block')};;
  position: relative;
  width: ${(props) => (props.settings ? '7.5%' : '100%')};
  clear: right;
  float: ${(props) => (props.right ? 'right' : props.left ? 'left' : 'none')};
  margin: 0;
  margin-right: ${(props) => (props.settings ? '23%' : '0px')};
  padding: 0;
  padding-right: 2px;
  font-size: 12px;
  line-height: 40px;
  text-align: center;
  color: ${(props) =>
    props.disabled
      ? cssConstants.PRIMARY_DARK_GRAY
      : cssConstants.PRIMARY_LIGHT_BLUE};
  background: transparent; 
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_DARK_GRAY
        : cssConstants.PRIMARY_DARK_BLUE};
    border-color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_LIGHT_GRAY
        : props.secondary
          ? cssConstants.SECONDARY_BLUE
          : cssConstants.SECONDARY_BLUE};
  }
  ::before {
    content: '${(props) => props.content}';
  }
`;
