import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const Title = styled.h1`
  color: ${props => (!props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK)};
  font-size: ${props => (!props.size ? props.size : cssConstants.TITLE_SIZE_H1)};
  
  font-weight: 200;
  width: 100%;
  margin: 0;
  margin-top: 10px;
  margin-bottom : 5px;
  border: 2px solid;
  border-radius: 3px;
  border-color: ${props => (props.disabled ? cssConstants.PRIMARY_LIGHT_GRAY : props.secondary ? cssConstants.PRIMARY_LIGHT_BLUE : cssConstants.PRIMARY_LIGHT_BLUE)};
  padding: ${'0.8em'};
  padding-top: ${props => (props.small ? '0.6em' : '0.9em')};
  padding-bottom: ${props => (props.small ? '0.55em' : '0.85em')};
  &:hover {
    color: ${props => (props.disabled ? cssConstants.PRIMARY_WHITE : props.secondary ? cssConstants.SECONDARY_BLUE : cssConstants.PRIMARY_WHITE)};
    background-color: ${props => (props.disabled ? cssConstants.PRIMARY_LIGHT_GRAY : props.secondary ? cssConstants.PRIMARY_WHITE : cssConstants.SECONDARY_BLUE)};
    border-color: ${props => (props.disabled ? cssConstants.PRIMARY_LIGHT_GRAY : props.secondary ? cssConstants.SECONDARY_BLUE : cssConstants.SECONDARY_BLUE)};
  }
`;