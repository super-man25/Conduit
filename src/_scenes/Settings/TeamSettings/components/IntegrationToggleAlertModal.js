// @flow
import React from 'react';
import styled from 'styled-components';

import { colors } from '_constants';
import {
  H4,
  Box,
  Text,
  Flex,
  SecondaryButton,
  PrimaryButton,
  Modal,
} from '_components';
import type { EDIntegration } from '_models';

const ModalHeader = styled.div`
  padding: 1.5rem;
  background-color: ${colors.lightGray};
  border-bottom: 1px solid ${colors.gray};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  background-color: ${colors.white};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const Title = styled(H4)`
  margin: 0;
  margin-bottom: 0.25rem;
  color: ${colors.black};
`;

type Props = {
  onCancel: () => void,
  onConfirm: () => void,
  integration: EDIntegration,
};

export const IntegrationToggleAlertModal = ({
  integration,
  onCancel,
  onConfirm,
}: Props) => (
  <Modal closeModal={onCancel}>
    <ModalHeader>
      <Title>Toggle Secondary Integration?</Title>
    </ModalHeader>
    <ModalBody>
      <Box marginBottom="2rem">
        <Text size={16} color={colors.gray}>
          This action will turn the{' '}
          <span style={{ color: colors.blue }}>{integration.name} </span>
          secondary integration{' '}
          <span style={{ color: colors.blue }}>
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
  </Modal>
);
