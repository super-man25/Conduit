// @flow
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, H4, NumberInputField, Text, TextButton } from '_components';
import { cssConstants } from '_constants';
import { fixedOrDash, safeAdd } from '_helpers/string-utils';
import { PendingFactors } from '_models';
import { PricingTableHeader } from './PricingTableHeader';

const StyledPricingForm = styled(Flex)`
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  padding: 0 20px;
  width: 100%;
`;

const Input = styled.input`
  width: 60%;
  margin-left: 16px;
  padding: 0.5rem 1rem;
  text-align: right;
  border-radius: 3px;
  border: 1px solid ${cssConstants.PRIMARY_GRAY};
`;

type Props = {
  pendingFactors: PendingFactors,
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  eventId: number,
  fetchAutomatedSpring: (id: number, eventScore: ?number) => void,
  pricingError: ?Error,
  pricingPreview: {
    error: ?Error,
    loading: boolean
  },
  isEditing: boolean,
  setIsEditing: Function
};

const SPRING_DECIMALS = 4;
const SCORE_DECIMALS = 2;

export const PricingForm = (props: Props) => {
  const {
    handleChange,
    pendingFactors: { eventScore, eventScoreModifier, spring, springModifier },
    fetchAutomatedSpring,
    eventId,
    pricingError,
    pricingPreview: {
      error: pricingPreviewError,
      loading: pricingPreviewLoading
    },
    isEditing,
    setIsEditing
  } = props;

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

  useEffect(() => (pricingError ? setIsEditing(true) : setIsEditing(false)), [
    pricingError,
    setIsEditing
  ]);

  return (
    <StyledPricingForm direction="column">
      <Flex margin="0.5rem 0" align="center" justify="space-between">
        <H4 margin="0">Modifiers</H4>
        {!isEditing && (
          <TextButton
            style={{ fontWeight: 600 }}
            minWidth="0"
            padding="0"
            onClick={() => setIsEditing(true)}
            disabled={!!pricingPreviewError || pricingPreviewLoading}
          >
            Edit
          </TextButton>
        )}
      </Flex>
      <Box padding="1.5rem">
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
            {isEditing ? (
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
            {isEditing ? (
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
    </StyledPricingForm>
  );
};
