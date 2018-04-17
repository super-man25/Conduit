import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const SettingSaveButton = styled.div`
  display: none;
  position: relative;
  width: 7.5%;
  height: 34px;
  border: 2px solid ${cssConstants.SECONDARY_LIGHTEST_BLUE};
  border-radius: 3px;
  color: ${cssConstants.SECONDARY_LIGHTEST_BLUE};
  font-size: 14px;
  text-align: center;
  line-height: 34px;
  clear: right;
  float: right;
  margin: 0;
  margin-right: 23.0%;
  padding: 0;
  background: ${cssConstants.PRIMARY_WHITE};;
  cursor: pointer;
  ::before {
    content: 'SAVE';
  }
`;
