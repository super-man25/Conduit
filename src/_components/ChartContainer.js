import styled from 'styled-components';
import { cssConstants } from '_constants';

export const ChartContainer = styled.div`
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  border: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  position: relative;
  padding: 14px 14px;
  overflow: hidden;
`;
