import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const HelpBlockDiv = styled.div`
  color: ${(props) => (props.type && props.type === 'alert-danger' ? cssConstants.SECONDARY_RED : props.type && props.type === 'alert-success' ? cssConstants.SECONDARY_GREEN : props.type && props.type === 'hint' ? cssConstants.SECONDARY_PURPLE : cssConstants.PRIMARY_LIGHT_BLACK)};
  font-size: 0.9em;
  font-weight: 200;
  width: 100%;
  height: 16px;
  margin: 0;
  margin-top: 0;
  margin-bottom : 15px;
  padding: 0;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;
