import styled from 'styled-components';
import { cssConstants } from '../_constants';

function capString(word) {
  return word && word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : '';
}

export const UserWelcome = styled.div`
  height: 70px;
  line-height: 70px;
  width: auto;
  float: right;
  margin: 0;
  padding: 0;
  padding-right: 15px;
  font-size: 13px;
  font-weight: lighter;
  letter-spacing: .05em;
  color: ${cssConstants.PRIMARY_WHITE};
  background: 'none';
  ::before {
    content: '${(props) => {
    if (props.user) {
      return `Welcome, ${ capString(props.user.firstName) } ${ capString(props.user.lastName)}`;
    } return '';
  }};
`;
