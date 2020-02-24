// @flow
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, H4, NumberInputField, Text } from '_components';
import { cssConstants } from '_constants';
import { fixedOrDash } from '_helpers/string-utils';
import { PendingFactors } from '_models';
import { PricingTableHeader } from './PricingTableHeader';
import {
  velocityScore,
  finalEventScore,
  finalSpringValue,
  SPRING_DECIMALS,
  SCORE_DECIMALS,
} from '_helpers/pricing-utils';

const StyledPricingForm = styled(Flex)`
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  padding: 25px;
  width: 100%;
`;

const EditButton = styled.div`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: bold;
  color: ${({ disabled }) =>
    disabled ? cssConstants.PRIMARY_LIGHT_GRAY : cssConstants.PRIMARY_BLUE};
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
    loading: boolean,
  },
  isEditing: boolean,
  setIsEditing: Function,
};

export const PricingForm = (props: Props) => {
  const {
    handleChange,
    pendingFactors: {
      eventScore,
      eventScoreModifier,
      spring,
      springModifier,
      velocityFactor,
    },
    fetchAutomatedSpring,
    eventId,
    pricingError,
    pricingPreview: {
      error: pricingPreviewError,
      loading: pricingPreviewLoading,
    },
    isEditing,
    setIsEditing,
  } = props;

  const [timer, setTimer] = useState(null);

  // fires request only when user stops typing for 0.5 seconds to prevent over-firing
  const waitUntilFinished = () => {
    clearTimeout(timer);
    setTimer(setTimeout(updateSpring, 500));
  };

  const updateSpring = () => {
    const total = +finalEventScore(
      eventScore,
      velocityFactor,
      eventScoreModifier
    );
    fetchAutomatedSpring(eventId, total);
  };

  useEffect(() => (pricingError ? setIsEditing(true) : setIsEditing(false)), [
    pricingError,
    setIsEditing,
  ]);

  const editButtonDisabled =
    !eventScore || !!pricingPreviewError || pricingPreviewLoading;

  return (
    <StyledPricingForm direction="column">
      <Flex align="center" justify="space-between">
        <H4 margin="0">Modifiers</H4>
        {!isEditing && (
          <EditButton
            onClick={() => !editButtonDisabled && setIsEditing(true)}
            disabled={editButtonDisabled}
          >
            Edit
          </EditButton>
        )}
      </Flex>
      <Box padding="1.5rem">
        <PricingTableHeader headers={['Event Score', 'Spring Value']} />
        <Flex padding="14px 0" direction="row" minHeight="36px" align="center">
          <Box width="33%">
            <Text color={cssConstants.PRIMARY_GRAY}>Predicted</Text>
          </Box>
          <Box width="33%">
            <Text textAlign="right" className="private">
              {fixedOrDash(eventScore, SCORE_DECIMALS)}
            </Text>
          </Box>
          <Box width="33%">
            <Text textAlign="right" className="private">
              {fixedOrDash(spring, SPRING_DECIMALS)}
            </Text>
          </Box>
        </Flex>

        <Flex
          style={{
            borderTop: `1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY}`,
            borderBottom: `1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY}`,
          }}
          padding="14px 0"
          direction="row"
          align="center"
          minHeight="36px"
        >
          <Flex width="33%">
            <Text color={cssConstants.PRIMARY_GRAY}>Modifier</Text>
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
              <Text textAlign="right" className="private">
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
              <Text textAlign="right" className="private">
                {fixedOrDash(springModifier, SPRING_DECIMALS)}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex
          style={{
            borderBottom: `1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY}`,
          }}
          padding="14px 0"
          direction="row"
          align="center"
          minHeight="36px"
        >
          <Flex width="33%">
            <Text color={cssConstants.PRIMARY_GRAY}>Velocity</Text>
          </Flex>
          <Flex width="33%" justify="flex-end">
            <Text textAlign="right" className="private">
              {fixedOrDash(
                velocityScore(eventScore, velocityFactor),
                SCORE_DECIMALS
              )}
            </Text>
          </Flex>
          <Flex width="33%" justify="flex-end"></Flex>
        </Flex>

        <Flex padding="14px 0" direction="row" align="center" minHeight="36px">
          <Box width="33%">
            <Text weight="heavy">Final</Text>
          </Box>
          <Box width="33%">
            <Text weight="heavy" textAlign="right" className="private">
              {finalEventScore(eventScore, velocityFactor, eventScoreModifier)}
            </Text>
          </Box>
          <Box width="33%">
            <Text weight="heavy" textAlign="right" className="private">
              {finalSpringValue(spring, springModifier)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </StyledPricingForm>
  );
};
