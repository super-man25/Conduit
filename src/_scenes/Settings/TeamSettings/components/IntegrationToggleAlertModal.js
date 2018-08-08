// @flow
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { cssConstants } from '_constants';
import {
  H4,
  Box,
  Text,
  Flex,
  SecondaryButton,
  PrimaryButton
} from '_components';
import type { EDIntegration } from '_models';

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

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  z-index: 9;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.27);
  animation: ${slideUpAnimation} 200ms ease-out;
  animation-fill-mode: forwards;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  border-bottom: 1px solid ${cssConstants.PRIMARY_DARK_GRAY};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  background-color: ${cssConstants.PRIMARY_WHITE};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const Title = H4.extend`
  margin: 0;
  margin-bottom: 0.25rem;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

type Props = {
  onCancel: () => void,
  onConfirm: () => void,
  integration: EDIntegration
};

export class IntegrationToggleAlertModal extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener('keydown', this.closeOnEscapePressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeOnEscapePressed);
  }

  closeOnEscapePressed = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.props.onCancel();
    }
  };

  render() {
    const { integration, onCancel, onConfirm } = this.props;

    return (
      <Box>
        <ModalContent>
          <ModalHeader>
            <Title>Toggle Secondary Integration?</Title>
          </ModalHeader>
          <ModalBody>
            <Box marginBottom="2rem">
              <Text size={16} color={cssConstants.PRIMARY_DARKEST_GRAY}>
                This action will turn the{' '}
                <span style={{ color: cssConstants.SECONDARY_BLUE }}>
                  {integration.name}{' '}
                </span>
                secondary integration{' '}
                <span style={{ color: cssConstants.SECONDARY_BLUE }}>
                  {integration.isActive ? 'off' : 'on'}
                </span>{' '}
                for all events. Are you sure you would like to continue?
              </Text>
            </Box>
            <Flex justify="flex-end">
              <SecondaryButton small onClick={onCancel} margin="0 1rem 0 0">
                Cancel
              </SecondaryButton>
              <PrimaryButton small onClick={onConfirm}>
                Continue
              </PrimaryButton>
            </Flex>
          </ModalBody>
        </ModalContent>
        <ModalOverlay onClick={onCancel} />
      </Box>
    );
  }
}
