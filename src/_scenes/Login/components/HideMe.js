import styled from 'styled-components';

export const HideMe = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin: 0;
  padding: 0;
`;
