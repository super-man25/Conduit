import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const SettingSaveButton = styled.div`
  display: none;
  position: relative;
  width: 7.5%;
  height: 40px;
  border: 2px solid ${cssConstants.SECONDARY_LIGHTEST_BLUE};
  border-radius: 3px;
  color: ${cssConstants.SECONDARY_LIGHTEST_BLUE};
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  float: right;
  margin: 0;
  margin-right: ${(props) => (props.team ? '23%' : '1%')};
  padding: 0;
  background: ${cssConstants.PRIMARY_WHITE};
  cursor: pointer;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_DARK_GRAY
        : cssConstants.SECONDARY_LIGHT_BLUE};
    border-color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_LIGHT_GRAY
        : props.secondary
          ? cssConstants.SECONDARY_LIGHT_BLUE
          : cssConstants.PRIMARY_LIGHT_BLUE};
  }
  ::before {
    content: 'SAVE';
  }
`;
