// @flow
import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AsyncButton,
  Box,
  Flex,
  H4,
  NumberInputField,
  SecondaryButton,
  Text,
  TextButton
} from '_components';
import { cssConstants } from '_constants';
import { fixedOrDash, safeAdd } from '_helpers/string-utils';
import { PendingFactors } from '_models';
import { PricingTableHeader } from './PricingTableHeader';

const Input = styled.input`
  box-sizing: border-box;
  width: 60%;
  margin-left: 16px;
  padding: 0.5rem 1rem;
  text-align: right;
  border-radius: 3px;
  border: 1px solid ${cssConstants.PRIMARY_GRAY};
`;

const ButtonGroup = styled.div`
  display: flex;

  > *:not(:first-child) {
    margin-left: 8px;
  }
`;

type Props = {
  initialValues: PendingFactors,
  pendingFactors: PendingFactors,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  onSubmit: Function,
  eventId: number,
  fetchAutomatedSpring: (id: number, eventScore: ?number) => void,
  onCancel: Function,
  pricingError: ?Error,
  submitting: boolean
};

const SPRING_DECIMALS = 4;
const SCORE_DECIMALS = 2;

export const PricingForm = (props: Props) => {
  const {
    onChange,
    pendingFactors: { eventScore, eventScoreModifier, spring, springModifier },
    onSubmit,
    onCancel,
    fetchAutomatedSpring,
    eventId,
    pricingError,
    submitting
  } = props;

  const [editing, setEditing] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [timer, setTimer] = useState(null);

  // fires request only when user stops typing for 0.5 seconds to prevent over-firing
  const waitUntilFinished = () => {
    clearTimeout(timer);
    setTimer(setTimeout(updateSpring, 500));
  };

  const updateSpring = () => {
    const total = safeAdd(eventScore, eventScoreModifier, SCORE_DECIMALS);
    fetchAutomatedSpring(eventId, total !== '--' ? Number(total) : eventScore);
  };

  const handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    setHasChanged(true);
    onChange(e);
  };

  const handleCancel = () => {
    onCancel();
    setHasChanged(false);
    setEditing(false);
  };

  useEffect(() => (pricingError ? setEditing(true) : setEditing(false)), [
    pricingError
  ]);

  return (
    <Fragment>
      <Flex margin="0.5rem 0" alignContent="center" justify="space-between">
        <H4 margin="0">Modifiers</H4>
        {!editing && (
          <TextButton
            style={{ fontWeight: 600 }}
            minWidth="0"
            padding="0"
            onClick={() => setEditing(true)}
          >
            Edit
          </TextButton>
        )}
      </Flex>
      <Box padding="10px">
        <PricingTableHeader headers={['EVENT SCORE', 'SPRING VALUE']} />
        <Flex padding="14px 0" direction="row" minHeight="36px" align="center">
          <Box width="33%">
            <Text color={cssConstants.PRIMARY_GRAY}>PREDICTED</Text>
          </Box>
          <Box width="33%">
            <Text textAlign="right">
              {fixedOrDash(eventScore, SCORE_DECIMALS)}
            </Text>
          </Box>
          <Box width="33%">
            <Text textAlign="right">
              {fixedOrDash(spring, SPRING_DECIMALS)}
            </Text>
          </Box>
        </Flex>

        <Flex
          style={{
            borderTop: `1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY}`,
            borderBottom: `1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY}`
          }}
          padding="14px 0"
          direction="row"
          align="center"
          minHeight="36px"
        >
          <Flex width="33%">
            <Text color={cssConstants.PRIMARY_GRAY}>MODIFIER</Text>
          </Flex>
          <Flex width="33%" justify="flex-end">
            {editing ? (
              <NumberInputField
                component={Input}
                name="eventScoreModifier"
                value={eventScoreModifier}
                onKeyUp={waitUntilFinished}
                onChange={handleChange}
              />
            ) : (
              <Text textAlign="right">
                {fixedOrDash(eventScoreModifier, SCORE_DECIMALS)}
              </Text>
            )}
          </Flex>
          <Flex width="33%" justify="flex-end">
            {editing ? (
              <NumberInputField
                component={Input}
                name="springModifier"
                value={springModifier}
                onChange={handleChange}
              />
            ) : (
              <Text textAlign="right">
                {fixedOrDash(springModifier, SPRING_DECIMALS)}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex padding="14px 0" direction="row" align="center" minHeight="36px">
          <Box width="33%">
            <Text weight="heavy">FINAL</Text>
          </Box>
          <Box width="33%">
            <Text weight="heavy" textAlign="right">
              {safeAdd(eventScore, eventScoreModifier, SCORE_DECIMALS)}
            </Text>
          </Box>
          <Box width="33%">
            <Text weight="heavy" textAlign="right">
              {safeAdd(spring, springModifier, SPRING_DECIMALS)}
            </Text>
          </Box>
        </Flex>
      </Box>
      <ButtonGroup>
        {editing && (
          <Fragment>
            <AsyncButton
              isLoading={submitting}
              disabled={submitting || !hasChanged}
              onClick={onSubmit}
            >
              Save
            </AsyncButton>
            <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
          </Fragment>
        )}
      </ButtonGroup>
    </Fragment>
  );
};
