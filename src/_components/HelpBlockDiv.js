import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const HelpBlockDiv = styled.div`
  color: ${(props) => {
    if (props.type && props.type === 'alert-danger') {
      return cssConstants.SECONDARY_RED;
    } else if (props.type && props.type === 'alert-success') {
      return cssConstants.SECONDARY_GREEN;
    } else if (props.type && props.type === 'hint') {
      return cssConstants.SECONDARY_PURPLE;
    } return cssConstants.PRIMARY_LIGHT_BLACK;
  }};
  font-size: 0.9em;
  font-weight: 200;
  width: 100%;
  height: 16px;
  margin: 0;
  margin-top: 0;
  margin-bottom : 15px;
  padding: 0;
  visibility: ${(props) => { return props.show ? 'visible' : 'hidden'; }};
`;
