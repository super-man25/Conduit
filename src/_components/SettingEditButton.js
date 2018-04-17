import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const SettingEditButton = styled.span`
  display: block;
  position: relative;
  width: 7.5%;
  clear: right;
  float: right;
  margin: 0;
  margin-right: 23%;
  padding: 0;
  padding-right: 2px;
  font-size: 12px;
  text-align: center;
  color: ${cssConstants.SECONDARY_LIGHTEST_BLUE};
  background: transparent; 
  cursor: pointer;
  ::before {
    content: 'EDIT';
  }
`;
