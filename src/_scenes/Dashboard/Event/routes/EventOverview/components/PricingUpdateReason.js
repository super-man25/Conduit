import React from 'react';
import styled from 'styled-components';

import { cssConstants } from '_constants';
import { CheckboxGroup, Checkbox } from '_components';
import { adminModifierReasonTypes } from '_constants/adminModifier.constants';

const PricingUpdateReasonContainer = styled.div`
  border-top: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  margin-top: 20px;
  padding-top: 20px;
`;

const ReasonOptions = styled.div`
  margin: 25px 0;
`;

const CommentBox = styled.textarea`
  width: 100%;
  border: 2px solid ${cssConstants.PRIMARY_BLUE};
  outline: none;
  border-radius: 3px;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 25px;
  padding: 10px;
`;

export const PricingUpdateReason = ({
  reasonType,
  handleTypeChange,
  reasonComments,
  handleCommentChange,
}) => {
  const {
    weather,
    demand,
    teamStats,
    opponentStats,
    other,
  } = adminModifierReasonTypes;
  return (
    <PricingUpdateReasonContainer>
      Why are you making this Event Score or Spring Value modification?
      <ReasonOptions>
        <CheckboxGroup>
          <Checkbox
            label={weather.label}
            checked={reasonType === weather.value}
            handleChange={() => handleTypeChange(weather.value)}
          />
          <Checkbox
            label={demand.label}
            checked={reasonType === demand.value}
            handleChange={() => handleTypeChange(demand.value)}
          />
          <Checkbox
            label={teamStats.label}
            checked={reasonType === teamStats.value}
            handleChange={() => handleTypeChange(teamStats.value)}
          />
          <Checkbox
            label={opponentStats.label}
            checked={reasonType === opponentStats.value}
            handleChange={() => handleTypeChange(opponentStats.value)}
          />
          <Checkbox
            label={other.label}
            checked={reasonType === other.value}
            handleChange={() => handleTypeChange(other.value)}
          />
        </CheckboxGroup>
      </ReasonOptions>
      <CommentBox
        placeholder="Comments"
        value={reasonComments || ''}
        onChange={({ target: { value } }) => handleCommentChange(value || null)}
      />
    </PricingUpdateReasonContainer>
  );
};
