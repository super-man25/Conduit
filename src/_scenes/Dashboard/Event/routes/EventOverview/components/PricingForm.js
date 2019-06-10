// @flow
import React, { Fragment, useState, useEffect } from 'react';
import {
  Flex,
  SecondaryButton,
  H4,
  NumberInputField,
  AsyncButton
} from '_components';
import { PendingFactors } from '_models';
import { fixedOrDash, safeAdd } from '_helpers/string-utils';

import styled from 'styled-components';

const Row = styled.div`
  margin: 4px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 24px;
`;

const Label = styled.label`
  align-self: flex-start;
`;

const Text = styled.span`
  width: 60px;
  margin-left: 16px;
  display: inline-block;
  text-align: right;
  font-size: 1.125rem;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 60px;
  margin-left: 16px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #aaa;
`;

const Group = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  padding-top: 20px;

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

  const handleCancel = () => {
    onCancel();
    setEditing(false);
  };

  useEffect(() => (pricingError ? setEditing(true) : setEditing(false)), [
    pricingError
  ]);

  return (
    <Fragment>
      <Flex direction="row" justify="space-around">
        <Group>
          <H4
            style={{
              alignSelf: 'flex-start',
              padding: '0 4px',
              margin: '0',
              marginBottom: '12px'
            }}
          >
            Event Score
          </H4>
          <div style={{ maxWidth: '160px', paddingLeft: '20px' }}>
            <Row style={{ fontSize: '1.1rem' }}>
              <Label>Base:</Label>
              <Text>{fixedOrDash(eventScore, SCORE_DECIMALS)}</Text>
            </Row>
            <Row style={{ fontSize: '1.1rem' }}>
              <Label>Modifier:</Label>
              {editing ? (
                <NumberInputField
                  component={Input}
                  name="eventScoreModifier"
                  value={eventScoreModifier}
                  onKeyUp={waitUntilFinished}
                  onChange={onChange}
                />
              ) : (
                <Text>{fixedOrDash(eventScoreModifier, SCORE_DECIMALS)}</Text>
              )}
            </Row>
            <Line />
            <Row style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              <Label>Final:</Label>
              <Text>
                {safeAdd(eventScore, eventScoreModifier, SCORE_DECIMALS)}
              </Text>
            </Row>
          </div>
        </Group>
        <Group>
          <H4
            style={{
              alignSelf: 'flex-start',
              padding: '0 4px',
              margin: '0',
              marginBottom: '12px'
            }}
          >
            Spring Value
          </H4>
          <div style={{ maxWidth: '160px', paddingLeft: '20px' }}>
            <Row style={{ fontSize: '1.1rem' }}>
              <Label>Base:</Label>
              <Text>{fixedOrDash(spring, SPRING_DECIMALS)}</Text>
            </Row>
            <Row style={{ fontSize: '1.1rem' }}>
              <Label>Modifier:</Label>
              {editing ? (
                <NumberInputField
                  component={Input}
                  name="springModifier"
                  value={springModifier}
                  onChange={onChange}
                />
              ) : (
                <Text>{fixedOrDash(springModifier, SPRING_DECIMALS)}</Text>
              )}
            </Row>
            <Line />
            <Row style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              <Label>Final:</Label>
              <Text>{safeAdd(spring, springModifier, SPRING_DECIMALS)}</Text>
            </Row>
          </div>
        </Group>
      </Flex>
      <ButtonGroup>
        {editing ? (
          <Fragment>
            <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
            <AsyncButton
              isLoading={submitting}
              disabled={submitting}
              onClick={onSubmit}
            >
              Save
            </AsyncButton>
          </Fragment>
        ) : (
          <SecondaryButton onClick={() => setEditing(true)}>
            Edit
          </SecondaryButton>
        )}
      </ButtonGroup>
    </Fragment>
  );
};
