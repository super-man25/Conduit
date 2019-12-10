import styled from 'styled-components';

import { Flex } from '_components';

export const OnboardWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;

export const InputGroup = styled(Flex)`
  flex-wrap: wrap;
  margin: -10px;
`;

export const InputContainer = styled(Flex)`
  flex-direction: column;
  width: ${({ quarterWidth }) => (quarterWidth ? '25%' : '50%')};
  padding: 10px;
  box-sizing: border-box;
`;
