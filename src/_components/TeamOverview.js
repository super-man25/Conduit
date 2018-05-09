import styled from 'styled-components';
import { cssConstants } from '_constants';

export const TeamOverview = styled.div`
  height: 100%;
  width: auto;
  margin: 0;
  padding-left: 20px;
  color: ${cssConstants.PRIMARY_WHITE};
  background: 'none';
  ::before {
    content: 'Team Overview Here';
  }
`;
