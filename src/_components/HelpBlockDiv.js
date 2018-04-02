import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const HelpBlockDiv = styled.div`
  color: ${props => (props.type && props.type === 'error' ? cssConstants.SECONDARY_RED : props.type && props.type === 'hint' ? cssConstants.PRIMARY_DARK_BLUE : cssConstants.PRIMARY_LIGHT_BLACK)};
  font-size: 0.9em;
  font-weight: 200;
  width: 100%;
  margin: 0;
  margin-top: 0;
  margin-bottom : 25px;
  padding: 0;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
`;