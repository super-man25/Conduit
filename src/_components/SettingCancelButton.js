import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const SettingCancelButton = styled.div`
  display: none;
  position: relative;
  width: 7.5%;
  height: 40px;
  border: 2px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  border-radius: 3px;
  color: ${cssConstants.PRIMARY_LIGHT_GRAY};
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  clear: right;
  float: right;
  margin: 0;
  margin-right: 14%;
  padding: 0;
  background: ${cssConstants.PRIMARY_WHITE};
  cursor: pointer;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_DARK_GRAY
        : cssConstants.PRIMARY_DARK_GRAY};
    border-color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_DARK_GRAY
        : props.secondary
          ? cssConstants.PRIMARY_DARK_GRAY
          : cssConstants.PRIMARY_DARK_GRAY};
  }
  ::before {
    content: 'Cancel';
  }
`;
