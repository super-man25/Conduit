// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { colors } from '_constants';
import {
  EDText,
  Button,
  Modal,
  PrimaryButton,
  SecondaryButton,
} from '_components';
import { readableDuration, sentenceCase } from '_helpers/string-utils';
import { actions as clientActions } from '_state/client';
import { SecondaryPricingRule } from './SecondaryPricingRule';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 20rem;
  box-shadow: 0 4px 4px 0 ${colors.lightGray};
  padding: 25px;
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  height: 100%;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  max-height: 5rem;
  object-fit: contain;
  object-position: left;
  width: 0;
  flex-grow: 1;
  margin-right: 50px;
`;

const DisableButton = styled(Button)`
  background-color: ${colors.red};
  color: white;
  padding: 3px;
  font-size: 10px;
  min-width: 0;
  max-width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: flex-start;

  &:hover {
    background-color: ${colors.red};
  }

  &:disabled {
    background-color: ${colors.lightGray};
    color: ${colors.gray};
  }
`;

const DisableIcon = styled.svg`
  color: inherit;
  fill: currentColor;
  height: 12px;
  width: 12px;
`;

const ConfirmationModal = styled(Modal)`
  background-color: white;
  padding: 25px;
  width: 500px;
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
`;

const ConfirmationText = styled.div``;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`;

const CancelButton = styled(SecondaryButton)``;

const ContinueButton = styled(PrimaryButton)``;

type Props = {
  id: number,
  img?: String,
  modifiedAt: string,
  isActive: boolean,
  isPrimary: boolean,
  logoUrl?: string,
  name: string,
  percent?: number,
  constant?: number,
};

export const Integration = (props: Props) => {
  const { id, modifiedAt, isActive, logoUrl, name, isPrimary } = props;

  const [pendingConfirmation, setPendingConfirmation] = useState(false);

  const dispatch = useDispatch();
  const disableIntegration = () => {
    setPendingConfirmation(false);
    dispatch(clientActions.disableIntegration(id));
  };

  const closeModal = () => setPendingConfirmation(false);

  const allowDisabling = !isPrimary && isActive;

  return (
    <>
      <Card>
        <Details>
          <Img src={logoUrl} alt={name} />
          <DisableButton
            disabled={!allowDisabling}
            title="Disable Integration"
            onClick={allowDisabling ? () => setPendingConfirmation(true) : null}
          >
            <DisableIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path d="M508 990.4c-261.6 0-474.4-212-474.4-474.4S246.4 41.6 508 41.6s474.4 212 474.4 474.4S769.6 990.4 508 990.4zM508 136.8c-209.6 0-379.2 169.6-379.2 379.2 0 209.6 169.6 379.2 379.2 379.2s379.2-169.6 379.2-379.2C887.2 306.4 717.6 136.8 508 136.8zM697.6 563.2 318.4 563.2c-26.4 0-47.2-21.6-47.2-47.2 0-26.4 21.6-47.2 47.2-47.2l379.2 0c26.4 0 47.2 21.6 47.2 47.2C744.8 542.4 724 563.2 697.6 563.2z" />
            </DisableIcon>
          </DisableButton>
        </Details>
        {!isPrimary && <SecondaryPricingRule {...props} />}
        {!isPrimary && (
          <EDText size="small" type="tertiary" marginTop="15px">
            {sentenceCase(`last updated ${readableDuration(modifiedAt)} ago`)}
          </EDText>
        )}
      </Card>
      {pendingConfirmation && (
        <ConfirmationModal closeModal={closeModal}>
          <ConfirmationText>
            This will permanently delist all tickets from {name}, would you like
            to continue? To re-enable this integration, contact
            product@eventdynamic.com
          </ConfirmationText>
          <ConfirmationButtons>
            <CancelButton onClick={closeModal}>Cancel</CancelButton>
            <ContinueButton onClick={disableIntegration}>
              Disable Integration
            </ContinueButton>
          </ConfirmationButtons>
        </ConfirmationModal>
      )}
    </>
  );
};
