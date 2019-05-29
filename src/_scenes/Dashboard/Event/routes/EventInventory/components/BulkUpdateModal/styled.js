import styled, { keyframes } from 'styled-components';
import { cssConstants } from '_constants';
import { Box, Text, H4 } from '_components';

export const slideUpAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -20%);
  }
  100% {
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.3;
  background-color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  z-index: 9;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.27);
  animation: ${slideUpAnimation} 200ms ease-out;
  animation-fill-mode: forwards;
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  border-bottom: 1px solid ${cssConstants.PRIMARY_BLUE};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  background-color: ${cssConstants.PRIMARY_WHITE};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const Title = styled(H4)`
  margin: 0;
  margin-bottom: 0.25rem;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

export const NumberInput = styled.input`
  background-color: ${cssConstants.PRIMARY_WHITE};
  border: 1px solid ${cssConstants.PRIMARY_GRAY};
  border-radius: 3px;
  box-sizing: border-box;
  height: 40px;
  margin: 0;
  padding: 0 0.5rem;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

export const Field = styled(Box)`
  position: relative;
`;

export const FieldErrorText = styled(Text)`
  position: absolute;
  top: 100%;
`;
