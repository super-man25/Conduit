import styled from 'styled-components';

import { colors } from '_constants';

export const LeftNav = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(30% - 10rem);
  height: auto;
  margin: 0;
  background: ${colors.white};
  border-right: 1px solid ${colors.lightGray};
`;
