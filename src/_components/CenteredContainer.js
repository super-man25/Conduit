import styled from 'styled-components';

export const CenteredContainer = styled.div`
  max-width: ${(props) => props.maxWidth || '1440px'};
  margin: auto;
`;
