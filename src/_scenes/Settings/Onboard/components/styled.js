import styled from 'styled-components';

export const OnboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ quarterWidth }) => (quarterWidth ? '25%' : '50%')};
  padding: 10px;
  box-sizing: border-box;
`;
