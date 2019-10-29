import styled from 'styled-components';

import { cssConstants } from '_constants';

export const LeftNav = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(30% - 10rem);
  height: auto;
  margin: 0;
  background: ${cssConstants.PRIMARY_WHITE};
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
`;
